"""Pruebas de lógica del conversor (Sesión 2 · unittest)."""

from __future__ import annotations

import unittest

from logica import (
    ConversionError,
    convert,
    formatear_resultado,
    parse_value,
)


class TestConversiones(unittest.TestCase):
    def test_a1_1000_mm_a_m(self):
        self.assertEqual(convert("1000", "mm", "m"), 1.0)
        self.assertEqual(formatear_resultado(1.0, "m"), "1 m")

    def test_a2_2_coma_5_m_a_cm(self):
        self.assertEqual(convert("2,5", "m", "cm"), 250.0)
        self.assertEqual(formatear_resultado(250.0, "cm"), "250 cm")

    def test_punto_decimal(self):
        self.assertEqual(convert("2.5", "m", "cm"), 250.0)

    def test_misma_unidad(self):
        self.assertEqual(convert(12, "cm", "cm"), 12.0)

    def test_todas_las_combinaciones(self):
        casos = [
            (1, "m", "cm", 100.0),
            (1, "m", "mm", 1000.0),
            (1, "cm", "mm", 10.0),
            (1, "cm", "m", 0.01),
            (1, "mm", "cm", 0.1),
            (1, "mm", "m", 0.001),
        ]
        for valor, origen, destino, esperado in casos:
            with self.subTest(origen=origen, destino=destino):
                self.assertEqual(convert(valor, origen, destino), esperado)


class TestEntradasInvalidas(unittest.TestCase):
    def test_a3_vacio(self):
        with self.assertRaises(ConversionError):
            convert("", "mm", "m")
        with self.assertRaises(ConversionError):
            parse_value("   ")

    def test_a3_letras(self):
        with self.assertRaises(ConversionError):
            convert("abc", "mm", "m")
        with self.assertRaises(ConversionError):
            convert("12x", "cm", "m")

    def test_negativos(self):
        with self.assertRaises(ConversionError):
            convert("-1", "m", "cm")

    def test_unidad_invalida(self):
        with self.assertRaises(ConversionError):
            convert(1, "km", "m")


if __name__ == "__main__":
    unittest.main()
