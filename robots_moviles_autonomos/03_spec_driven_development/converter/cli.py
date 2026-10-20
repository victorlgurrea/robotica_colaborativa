"""Interfaz de consola interactiva del conversor de longitudes."""

from __future__ import annotations

import os
import sys

from .core import ALLOWED_UNITS, ConversionError, convert

UNITS_HINT = "/".join(sorted(ALLOWED_UNITS))


def clear_screen() -> None:
    """Limpia la pantalla de la consola (Windows / Unix)."""
    command = "cls" if os.name == "nt" else "clear"
    os.system(command)


def _prompt(message: str) -> str:
    try:
        return input(message).strip()
    except EOFError:
        print()
        return "salir"


def run_conversion() -> None:
    """Solicita datos, convierte y muestra el resultado."""
    raw_value = _prompt("Valor numérico: ")
    from_unit = _prompt(f"Unidad de origen ({UNITS_HINT}): ")
    to_unit = _prompt(f"Unidad de destino ({UNITS_HINT}): ")

    try:
        result = convert(raw_value, from_unit, to_unit)
        origin = from_unit.strip().lower()
        destination = to_unit.strip().lower()
        print()
        print("-" * 40)
        print(f"  {raw_value} {origin}  →  {result} {destination}")
        print("-" * 40)
    except ConversionError as exc:
        print(f"\n[Error] {exc}")


def print_menu() -> None:
    print()
    print("=" * 40)
    print("  Conversor de unidades de longitud")
    print("  Unidades: mm | cm | m")
    print("=" * 40)
    print("  1. Convertir")
    print("  2. Limpiar pantalla")
    print("  3. Salir")
    print("=" * 40)


def main() -> int:
    while True:
        print_menu()
        choice = _prompt("Seleccione una opción [1-3]: ").lower()

        if choice in {"1", "convertir", "c"}:
            print()
            run_conversion()
        elif choice in {"2", "limpiar", "l"}:
            clear_screen()
            print("Campos y pantalla limpiados. Listo para una nueva conversión.")
        elif choice in {"3", "salir", "s", "q", "quit", "exit"}:
            print("Hasta luego.")
            return 0
        else:
            print("Opción no válida. Elija 1, 2 o 3.")


if __name__ == "__main__":
    sys.exit(main())
