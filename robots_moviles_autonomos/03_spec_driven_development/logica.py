"""
Dominio del conversor de longitudes (mm, cm, m).

Regla base: 1 m = 100 cm = 1000 mm (conversión siempre vía metros).
"""

from __future__ import annotations

import math
from typing import Union

# ---------------------------------------------------------------------------
# Constantes
# ---------------------------------------------------------------------------

UNIDADES_PERMITIDAS = frozenset({"mm", "cm", "m"})
UNIDADES_ORDENADAS = ("mm", "cm", "m")

# Cuántas unidades equivalen a 1 metro
_A_METROS = {
    "m": 1.0,
    "cm": 100.0,
    "mm": 1000.0,
}

DECIMALES_POR_DEFECTO = 4
RESULTADO_VACIO = "—"
ORIGEN_POR_DEFECTO = "mm"
DESTINO_POR_DEFECTO = "m"

NumberLike = Union[str, int, float]


class ConversionError(ValueError):
    """Error de validación o conversión controlado (no tumba la UI)."""


# ---------------------------------------------------------------------------
# Validación
# ---------------------------------------------------------------------------

def validar_unidad(unidad: str) -> str:
    """Normaliza y comprueba que la unidad esté en {mm, cm, m}."""
    if unidad is None:
        raise ConversionError("La unidad es obligatoria.")
    normalizada = str(unidad).strip().lower()
    if normalizada not in UNIDADES_PERMITIDAS:
        raise ConversionError(
            f"Unidad no permitida: '{unidad}'. "
            f"Use una de {sorted(UNIDADES_PERMITIDAS)}."
        )
    return normalizada


def filtrar_entrada_numerica(texto: str) -> str:
    """
    Deja solo dígitos y, como máximo, un separador decimal (coma o punto).

    Los caracteres no numéricos no se conservan (issue #1: no escribirlos).
    """
    if not texto:
        return ""
    limpio: list[str] = []
    separador_visto = False
    for caracter in str(texto):
        if caracter.isdigit():
            limpio.append(caracter)
        elif caracter in ".," and not separador_visto:
            limpio.append(caracter)
            separador_visto = True
    return "".join(limpio)


def parsear_valor(bruto: NumberLike) -> float:
    """
    Convierte la entrada a float de forma segura.

    Acepta coma o punto decimal. Rechaza vacío, texto, negativos, NaN e infinito.
    """
    if bruto is None:
        raise ConversionError("El valor es obligatorio.")

    if isinstance(bruto, str):
        texto = bruto.strip().replace(",", ".")
        if texto == "":
            raise ConversionError("El valor no puede estar vacío.")
        try:
            valor = float(texto)
        except (TypeError, ValueError) as exc:
            raise ConversionError(
                f"Entrada no numérica: '{bruto}'. Introduzca un número válido."
            ) from exc
    elif isinstance(bruto, bool):
        raise ConversionError("El valor debe ser numérico, no booleano.")
    elif isinstance(bruto, (int, float)):
        valor = float(bruto)
    else:
        raise ConversionError(f"Tipo de valor no soportado: {type(bruto).__name__}.")

    if math.isnan(valor):
        raise ConversionError("El valor no puede ser NaN.")
    if math.isinf(valor):
        raise ConversionError("El valor no puede ser infinito.")
    if valor < 0:
        raise ConversionError(
            "No se admiten valores negativos (magnitud física no válida)."
        )
    return valor


# ---------------------------------------------------------------------------
# Conversión
# ---------------------------------------------------------------------------

def convertir(
    valor: NumberLike,
    origen: str,
    destino: str,
    decimales: int = DECIMALES_POR_DEFECTO,
) -> float:
    """Convierte `valor` de `origen` a `destino` pasando por metros."""
    if not isinstance(decimales, int) or isinstance(decimales, bool):
        raise ConversionError("El número de decimales debe ser un entero.")
    if decimales < 0:
        raise ConversionError("El número de decimales no puede ser negativo.")

    cantidad = parsear_valor(valor)
    u_origen = validar_unidad(origen)
    u_destino = validar_unidad(destino)

    metros = cantidad / _A_METROS[u_origen]
    resultado = metros * _A_METROS[u_destino]
    return round(resultado, decimales)


def formatear_resultado(valor: float, unidad: str) -> str:
    """Devuelve texto legible con unidad (p. ej. '1 m')."""
    unidad = validar_unidad(unidad)
    if float(valor).is_integer() and abs(valor) < 1e12:
        return f"{int(valor)} {unidad}"
    return f"{valor} {unidad}"


def intercambiar_unidades(origen: str, destino: str) -> tuple[str, str]:
    """
    Intercambia origen y destino (R8).

    No modifica el valor ni realiza la conversión.
    """
    return validar_unidad(destino), validar_unidad(origen)


# Alias en inglés (compatibilidad interna / tests antiguos)
ALLOWED_UNITS = UNIDADES_PERMITIDAS
DEFAULT_DECIMALS = DECIMALES_POR_DEFECTO
validate_unit = validar_unidad
parse_value = parsear_valor
convert = convertir
