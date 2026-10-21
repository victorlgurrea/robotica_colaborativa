#!/usr/bin/env python3
"""
Corrección de issues en GitHub Actions (PC apagado OK).
Usa OPENAI_API_KEY o GEMINI_API_KEY. Un issue por ejecución.
(Claude via Antigravity/agy solo en el PC local; no hay API key aquí.)
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWED = {"app.py", "logica.py", "SPEC.md", "tests/test_mejora.py"}
ALLOWED_AUTHORS = {
    a.strip().casefold()
    for a in os.environ.get("ALLOWED_AUTHORS", "victorlgurrea,GonzaloSanchis").split(",")
    if a.strip()
}
MARKER = "<!-- ci-auto-fixed -->"


def run(args: list[str], cwd: Path | None = None) -> str:
    r = subprocess.run(
        args,
        cwd=str(cwd or ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if r.returncode:
        raise RuntimeError(f"{args[0]} failed: {r.stderr[-2000:]}\n{r.stdout[-2000:]}")
    return r.stdout


def gh_api(method: str, path: str, body: dict | None = None) -> dict | list:
    token = os.environ["GITHUB_TOKEN"]
    repo = os.environ["GITHUB_REPOSITORY"]  # owner/repo
    url = f"https://api.github.com/repos/{repo}{path}"
    data = None if body is None else json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "conversor-ci-fixer",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            raw = resp.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"GitHub API {method} {path}: {exc.code} {detail[:500]}") from exc


def list_open_issues() -> list[dict]:
    issues = gh_api("GET", "/issues?state=open&per_page=50")
    assert isinstance(issues, list)
    return [i for i in issues if "pull_request" not in i]


def already_processed(number: int) -> bool:
    comments = gh_api("GET", f"/issues/{number}/comments?per_page=50")
    assert isinstance(comments, list)
    return any(MARKER in (c.get("body") or "") for c in comments)


def collect_context() -> str:
    chunks = []
    for rel in sorted(ALLOWED | {"tests/test_logica.py"}):
        path = ROOT / rel
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        if len(text) > 10000:
            text = text[:10000] + "\n...[truncado]...\n"
        chunks.append(f"### {rel}\n```\n{text}\n```\n")
    return "\n".join(chunks)


def extract_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        m = re.search(r"\{[\s\S]*\}", text)
        if not m:
            raise RuntimeError("La IA no devolvió JSON")
        return json.loads(m.group(0))


def call_openai(prompt: str) -> str:
    key = os.environ["OPENAI_API_KEY"]
    model = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
    payload = {
        "model": model,
        "temperature": 0.2,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Eres un agente de código. Responde SOLO JSON válido:\n"
                    '{"summary":"...","files":[{"path":"app.py","content":"...contenido completo..."}]}\n'
                    "Edita SOLO app.py, logica.py, SPEC.md o tests/test_mejora.py."
                ),
            },
            {"role": "user", "content": prompt},
        ],
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data["choices"][0]["message"]["content"]


def call_gemini(prompt: str) -> str:
    key = os.environ["GEMINI_API_KEY"]
    preferred = (os.environ.get("GEMINI_MODEL") or "").strip()
    # Probar varios ids: el 404 suele ser modelo inexistente/retirado
    models = [
        m
        for m in [
            preferred,
            "gemini-3.8-flash",
            "gemini-3-flash-preview",
            "gemini-2.5-flash",
            "gemini-2.5-pro",
            "gemini-2.0-flash",
            "gemini-flash-latest",
        ]
        if m
    ]
    # quitar duplicados preservando orden
    seen: set[str] = set()
    models = [m for m in models if not (m in seen or seen.add(m))]

    system = (
        "Responde SOLO JSON válido con forma "
        '{"summary":"...","files":[{"path":"app.py","content":"..."}]}. '
        "Edita SOLO app.py, logica.py, SPEC.md o tests/test_mejora.py."
    )
    payload = {
        "system_instruction": {"parts": [{"text": system}]},
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.2},
    }
    errors: list[str] = []
    for model in models:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{model}:generateContent?key={key}"
        )
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            method="POST",
            headers={"Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            print(f"Gemini OK con modelo: {model}")
            return data["candidates"][0]["content"]["parts"][0]["text"]
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")[:400]
            errors.append(f"{model}: {exc.code} {detail}")
            continue
    raise RuntimeError("Gemini falló con todos los modelos:\n" + "\n".join(errors))


def propose_fix(title: str, body: str, author: str) -> dict:
    prompt = (
        f"Issue de {author}\nTítulo: {title}\n\n{body or '(sin cuerpo)'}\n\n"
        f"Contexto del repo:\n{collect_context()}\n"
        "Devuelve el JSON con los archivos completos a actualizar."
    )
    if os.environ.get("OPENAI_API_KEY"):
        raw = call_openai(prompt)
    elif os.environ.get("GEMINI_API_KEY"):
        raw = call_gemini(prompt)
    else:
        raise RuntimeError("Falta OPENAI_API_KEY o GEMINI_API_KEY en secrets")
    data = extract_json(raw)
    files = data.get("files") or []
    if not files:
        raise RuntimeError("La IA no propuso archivos")
    for item in files:
        path = str(item.get("path", "")).replace("\\", "/")
        if path not in ALLOWED or ".." in path:
            raise RuntimeError(f"Ruta no permitida: {path}")
        if "content" not in item:
            raise RuntimeError(f"Falta content en {path}")
        item["path"] = path
    return data


def apply_and_push(files: list[dict], number: int) -> str:
    for item in files:
        target = ROOT / item["path"]
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(item["content"], encoding="utf-8")
    run(["git", "config", "user.name", "github-actions[bot]"])
    run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"])
    run(["git", "add", "--", *[f["path"] for f in files]])
    # Puede no haber diff real
    status = run(["git", "status", "--porcelain"])
    if not status.strip():
        raise RuntimeError("No hay cambios que commitear")
    run(["git", "commit", "-m", f"Implementar mejora del issue #{number}"])
    run(["git", "push", "origin", "HEAD:main"])
    return run(["git", "rev-parse", "--short", "HEAD"]).strip()


def main() -> int:
    issues = list_open_issues()
    candidates = []
    for issue in sorted(issues, key=lambda i: i["number"]):
        author = (issue.get("user") or {}).get("login", "")
        if author.casefold() not in ALLOWED_AUTHORS:
            continue
        if already_processed(issue["number"]):
            continue
        candidates.append(issue)
    if not candidates:
        print("No hay issues abiertas nuevas para procesar.")
        return 0

    issue = candidates[0]
    number = issue["number"]
    title = issue.get("title") or f"Issue #{number}"
    body = issue.get("body") or ""
    author = (issue.get("user") or {}).get("login", "")
    print(f"Procesando #{number}: {title} (@{author})")

    proposal = propose_fix(title, body, author)
    commit = apply_and_push(proposal["files"], number)
    repo = os.environ["GITHUB_REPOSITORY"]
    url = f"https://github.com/{repo}/commit/{commit}"
    summary = proposal.get("summary", "Cambio aplicado por CI")
    gh_api(
        "POST",
        f"/issues/{number}/comments",
        {
            "body": (
                f"{MARKER}\n"
                f"Actualizado en `main` por GitHub Actions.\n\n"
                f"{summary}\n\nCommit: {url}"
            )
        },
    )
    gh_api("PATCH", f"/issues/{number}", {"state": "closed"})
    print(f"OK #{number} cerrado · {url}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(1)
