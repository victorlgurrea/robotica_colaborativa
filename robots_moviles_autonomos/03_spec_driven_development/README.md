# Conversor de longitudes — Sesión 2

Conversor **mm / cm / m** (CustomTkinter) + controlador local con Antigravity.

## App

```powershell
pip install -r requirements.txt
.\run.bat
```

## Estructura

```
app.py / logica.py / SPEC.md
tests/                  # unittest
vigilar_issues.py       # Issues abiertas → Antigravity → main
config.ejemplo.json     # Plantilla (copiar fuera del repo)
LEEME.md                # Guía del controlador
Programar_en_Windows.md # Programador de tareas
docs/                   # Presentación y audio
```

## Automatización

### Con el PC encendido (Antigravity local)
Ver `LEEME.md` y `C:\CursoIA\worker` (`agy corregir`).

### Con el PC apagado (GitHub Actions)
Workflow: `.github/workflows/vigilar-issues.yml`

- Se programa **cada minuto** (GitHub a veces lo atrasa hasta ~5 min).
- También al **abrir** un issue.
- Corrige con **OpenAI** o **Gemini** (API), sube a `main` y cierra el issue.

Secrets del repo (Settings → Secrets → Actions):

| Secret | Uso |
|---|---|
| `OPENAI_API_KEY` | Opcional (si usas OpenAI) |
| `GEMINI_API_KEY` | Opcional (si usas Gemini) |

Hace falta **al menos una** de las dos. Autores permitidos: `victorlgurrea`, `GonzaloSanchis`.
