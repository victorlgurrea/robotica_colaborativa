"""Pruebas del filtro de entrada numérica (issue #1)."""

from __future__ import annotations

import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from logica import filtrar_entrada_numerica  # noqa: E402


class TestFiltrarEntrada(unittest.TestCase):
    def test_a7_letras_no_se_conservan(self):
        self.assertEqual(filtrar_entrada_numerica("12a"), "12")
        self.assertEqual(filtrar_entrada_numerica("abc"), "")
        self.assertEqual(filtrar_entrada_numerica("1x2y3"), "123")

    def test_digitos_y_separador(self):
        self.assertEqual(filtrar_entrada_numerica("2,5"), "2,5")
        self.assertEqual(filtrar_entrada_numerica("2.5"), "2.5")
        self.assertEqual(filtrar_entrada_numerica("2,5.3"), "2,53")

    def test_simbolos_y_negativo(self):
        self.assertEqual(filtrar_entrada_numerica("-10"), "10")
        self.assertEqual(filtrar_entrada_numerica("10!"), "10")
        self.assertEqual(filtrar_entrada_numerica(""), "")


if __name__ == "__main__":
    unittest.main()
