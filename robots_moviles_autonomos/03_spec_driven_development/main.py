"""Punto de entrada del conversor de unidades de longitud."""

from __future__ import annotations

import argparse
import sys


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Conversor de unidades de longitud (mm, cm, m)."
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--gui",
        action="store_true",
        default=True,
        help="Abrir interfaz gráfica (por defecto).",
    )
    mode.add_argument(
        "--cli",
        action="store_true",
        help="Abrir menú interactivo por consola.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if args.cli:
        from converter.cli import main as cli_main

        return cli_main()

    from converter.gui import main as gui_main

    gui_main()
    return 0


if __name__ == "__main__":
    sys.exit(main())
