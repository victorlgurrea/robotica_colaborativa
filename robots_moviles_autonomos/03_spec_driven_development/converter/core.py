"""
Lógica de conversión y validación de unidades de longitud.

Factores estándar con paso intermedio a metros:
  1 m = 100 cm = 1000 mm
"""

from __future__ import annotations

import math
from typing import Union

ALLOWED_UNITS = frozenset({"mm", "cm", "m"})

# Factores: cuántas unidades caben en 1 metro
_TO_METERS = {
    "m": 1.0,
    "cm": 100.0,
    "mm": 1000.0,
}

DEFAULT_DECIMALS = 4


class ConversionError(ValueError):
    """Error de validación o conversión controlado."""


def validate_unit(unit: str) -> str:
    """Normaliza y valida que la unidad esté en {mm, cm, m}."""
    if unit is None:
        raise ConversionError("La unidad es obligatoria.")
    normalized = str(unit).strip().lower()
    if normalized not in ALLOWED_UNITS:
        raise ConversionError(
            f"Unidad no permitida: '{unit}'. Use una de {sorted(ALLOWED_UNITS)}."
        )
    return normalized


def parse_value(raw: Union[str, int, float]) -> float:
    """
    Convierte la entrada a float de forma segura.

    Rechaza texto no numérico, NaN, Infinity y valores negativos
    (no son magnitudes físicas válidas en este conversor).
    """
    if raw is None:
        raise ConversionError("El valor es obligatorio.")

    if isinstance(raw, str):
        text = raw.strip().replace(",", ".")
        if text == "":
            raise ConversionError("El valor no puede estar vacío.")
        try:
            value = float(text)
        except (TypeError, ValueError) as exc:
            raise ConversionError(
                f"Entrada no numérica: '{raw}'. Introduzca un número válido."
            ) from exc
    elif isinstance(raw, bool):
        # bool es subclase de int; se rechaza explícitamente
        raise ConversionError("El valor debe ser numérico, no booleano.")
    elif isinstance(raw, (int, float)):
        value = float(raw)
    else:
        raise ConversionError(
            f"Tipo de valor no soportado: {type(raw).__name__}."
        )

    if math.isnan(value):
        raise ConversionError("El valor no puede ser NaN.")
    if math.isinf(value):
        raise ConversionError("El valor no puede ser infinito.")
    if value < 0:
        raise ConversionError(
            "No se admiten valores negativos (magnitud física no válida)."
        )

    return value


def convert(
    value: Union[str, int, float],
    from_unit: str,
    to_unit: str,
    decimals: int = DEFAULT_DECIMALS,
) -> float:
    """
    Convierte `value` de `from_unit` a `to_unit`.

    Usa metros como unidad intermedia para minimizar errores de redondeo.
    Si origen y destino coinciden, devuelve el mismo valor (redondeado).
    """
    if not isinstance(decimals, int) or isinstance(decimals, bool):
        raise ConversionError("El número de decimales debe ser un entero.")
    if decimals < 0:
        raise ConversionError("El número de decimales no puede ser negativo.")

    amount = parse_value(value)
    origin = validate_unit(from_unit)
    destination = validate_unit(to_unit)

    meters = amount / _TO_METERS[origin]
    result = meters * _TO_METERS[destination]
    return round(result, decimals)
