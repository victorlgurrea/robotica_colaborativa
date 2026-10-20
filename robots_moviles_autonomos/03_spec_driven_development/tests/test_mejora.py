"""Pruebas de la mejora Intercambiar unidades (Sesión 2)."""

from __future__ import annotations

import unittest

from logica import RESULTADO_VACIO, ConversionError, intercambiar_unidades


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


if __name__ == "__main__":
    unittest.main()
