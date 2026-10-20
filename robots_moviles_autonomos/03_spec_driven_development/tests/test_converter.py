"""Pruebas unitarias del conversor (TDD / SDD)."""

from __future__ import annotations

import math
import unittest

from converter.core import ConversionError, convert, parse_value, validate_unit


class TestValidateUnit(unittest.TestCase):
    def test_allowed_units(self):
        for unit in ("mm", "cm", "m", "MM", " Cm "):
            self.assertIn(validate_unit(unit), {"mm", "cm", "m"})

    def test_invalid_unit(self):
        with self.assertRaises(ConversionError):
            validate_unit("km")
        with self.assertRaises(ConversionError):
            validate_unit("")


class TestParseValue(unittest.TestCase):
    def test_numeric_strings(self):
        self.assertEqual(parse_value("12.5"), 12.5)
        self.assertEqual(parse_value("12,5"), 12.5)
        self.assertEqual(parse_value(" 0 "), 0.0)

    def test_numbers(self):
        self.assertEqual(parse_value(10), 10.0)
        self.assertEqual(parse_value(3.14), 3.14)

    def test_invalid_text(self):
        for raw in ("abc", "12a", "", "   ", "!", "--"):
            with self.assertRaises(ConversionError):
                parse_value(raw)

    def test_negative(self):
        with self.assertRaises(ConversionError):
            parse_value(-1)
        with self.assertRaises(ConversionError):
            parse_value("-0.1")

    def test_nan_and_infinity(self):
        with self.assertRaises(ConversionError):
            parse_value(float("nan"))
        with self.assertRaises(ConversionError):
            parse_value(float("inf"))
        with self.assertRaises(ConversionError):
            parse_value("nan")
        with self.assertRaises(ConversionError):
            parse_value("inf")


class TestConvertCombinations(unittest.TestCase):
    """Todas las combinaciones mm ↔ cm ↔ m."""

    def test_same_unit(self):
        self.assertEqual(convert(5, "m", "m"), 5.0)
        self.assertEqual(convert(12.34567, "cm", "cm"), 12.3457)

    def test_m_to_cm(self):
        self.assertEqual(convert(1, "m", "cm"), 100.0)

    def test_m_to_mm(self):
        self.assertEqual(convert(1, "m", "mm"), 1000.0)

    def test_cm_to_m(self):
        self.assertEqual(convert(100, "cm", "m"), 1.0)

    def test_cm_to_mm(self):
        self.assertEqual(convert(1, "cm", "mm"), 10.0)

    def test_mm_to_m(self):
        self.assertEqual(convert(1000, "mm", "m"), 1.0)

    def test_mm_to_cm(self):
        self.assertEqual(convert(10, "mm", "cm"), 1.0)

    def test_all_pairs(self):
        cases = [
            (1, "m", "m", 1.0),
            (1, "m", "cm", 100.0),
            (1, "m", "mm", 1000.0),
            (1, "cm", "m", 0.01),
            (1, "cm", "cm", 1.0),
            (1, "cm", "mm", 10.0),
            (1, "mm", "m", 0.001),
            (1, "mm", "cm", 0.1),
            (1, "mm", "mm", 1.0),
        ]
        for value, origin, destination, expected in cases:
            with self.subTest(value=value, origin=origin, destination=destination):
                self.assertEqual(convert(value, origin, destination), expected)

    def test_custom_decimals(self):
        self.assertEqual(convert(1, "m", "mm", decimals=0), 1000)
        self.assertEqual(convert(1 / 3, "m", "m", decimals=2), 0.33)


class TestExtremeValues(unittest.TestCase):
    def test_very_large(self):
        result = convert(1e12, "m", "mm")
        self.assertEqual(result, 1e15)

    def test_very_small(self):
        # Con 4 decimales por defecto, 1e-6 se redondea a 0.0;
        # con más precisión se conserva la magnitud.
        self.assertEqual(convert(1e-9, "m", "mm"), 0.0)
        result = convert(1e-9, "m", "mm", decimals=12)
        self.assertAlmostEqual(result, 1e-6, places=12)

    def test_zero(self):
        self.assertEqual(convert(0, "cm", "m"), 0.0)


class TestInvalidConvert(unittest.TestCase):
    def test_bad_units(self):
        with self.assertRaises(ConversionError):
            convert(1, "km", "m")
        with self.assertRaises(ConversionError):
            convert(1, "m", "inch")

    def test_bad_value(self):
        with self.assertRaises(ConversionError):
            convert("xyz", "m", "cm")
        with self.assertRaises(ConversionError):
            convert(math.nan, "m", "cm")


if __name__ == "__main__":
    unittest.main()
