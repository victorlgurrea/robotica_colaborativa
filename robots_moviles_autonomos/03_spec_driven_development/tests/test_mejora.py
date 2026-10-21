"""Pruebas de la mejora Intercambiar unidades y validación de tema visual."""

from __future__ import annotations

import os
import sys
import unittest
import ast
import pathlib

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from logica import (  # noqa: E402
    RESULTADO_VACIO,
    ConversionError,
    intercambiar_unidades,
)


class TestIntercambiar(unittest.TestCase):
    def test_a5_mm_m_pasa_a_m_mm(self):
        origen, destino = intercambiar_unidades("mm", "m")
        self.assertEqual(origen, "m")
        self.assertEqual(destino, "mm")

    def test_a6_dos_veces_restaura(self):
        o1, d1 = intercambiar_unidades("mm", "m")
        o2, d2 = intercambiar_unidades(o1, d1)
        self.assertEqual((o2, d2), ("mm", "m"))

    def test_constante_resultado_vacio(self):
        self.assertEqual(RESULTADO_VACIO, "—")

    def test_unidades_invalidas(self):
        with self.assertRaises(ConversionError):
            intercambiar_unidades("km", "m")


# ---------------------------------------------------------------------------
# Tests de tema visual (issue: "Pon el fondo rojo")
# ---------------------------------------------------------------------------

_APP_PY = pathlib.Path(__file__).parent.parent / "app.py"


def _clase_tema_constantes() -> dict:
    """Devuelve {nombre: valor_hex} de los atributos de clase Tema."""
    tree = ast.parse(_APP_PY.read_text(encoding="utf-8"))
    constantes: dict = {}
    for nodo in ast.walk(tree):
        if isinstance(nodo, ast.ClassDef) and nodo.name == "Tema":
            for item in nodo.body:
                if isinstance(item, ast.Assign):
                    for target in item.targets:
                        if isinstance(target, ast.Name) and isinstance(
                            item.value, ast.Constant
                        ):
                            constantes[target.id] = item.value.value
    return constantes


def _luminosidad(hex_color: str) -> float:
    """Luminosidad perceptiva [0, 1] de un color #rrggbb."""
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


class TestTemaRojo(unittest.TestCase):
    """Verifica que la clase Tema usa fondo rojo y texto claro."""

    def test_fondo_es_rojo(self):
        """FONDO debe ser rojo puro (#ff0000)."""
        constantes = _clase_tema_constantes()
        self.assertEqual(
            constantes.get("FONDO", "").lower(),
            "#ff0000",
            f"Se esperaba FONDO=#ff0000, se obtuvo {constantes.get('FONDO')!r}",
        )

    def test_fondo_luminosidad_roja(self):
        """FONDO rojo tiene una luminosidad específica (~0.21)."""
        constantes = _clase_tema_constantes()
        fondo = constantes.get("FONDO", "#000000")
        lum = _luminosidad(fondo)
        self.assertTrue(
            0.2 < lum < 0.3, f"FONDO={fondo!r} tiene luminosidad {lum:.3f}; se esperaba ~0.21"
        )

    def test_texto_es_claro(self):
        """TEXTO debe ser claro (blanco) para contrastar con fondo rojo."""
        constantes = _clase_tema_constantes()
        texto = constantes.get("TEXTO", "#000000")
        lum = _luminosidad(texto)
        self.assertGreater(
            lum, 0.9, f"TEXTO={texto!r} tiene luminosidad {lum:.3f}; se esperaba > 0.9"
        )

    def test_superficie_es_roja_oscura(self):
        """SUPERFICIE debe ser un rojo más oscuro que el fondo."""
        constantes = _clase_tema_constantes()
        superficie = constantes.get("SUPERFICIE", "#000000")
        lum = _luminosidad(superficie)
        self.assertLess(
            lum,
            0.2,
            f"SUPERFICIE={superficie!r} tiene luminosidad {lum:.3f}; se esperaba < 0.2",
        )

    def test_appearance_mode_es_light(self):
        """app.py debe invocar set_appearance_mode("light")."""
        fuente = _APP_PY.read_text(encoding="utf-8")
        self.assertIn(
            'set_appearance_mode("light")',
            fuente,
            'No se encontro set_appearance_mode("light") en app.py',
        )


if __name__ == "__main__":
    unittest.main()
