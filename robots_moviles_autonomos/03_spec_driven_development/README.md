# Conversor de unidades de longitud (Spec-Driven Development)

Implementación según [gemini-code-specs-drive.md](./gemini-code-specs-drive.md): conversión precisa y validada entre **mm**, **cm** y **m**.

## Estructura

```
03_spec_driven_development/
├── gemini-code-specs-drive.md   # Especificación de requisitos
├── main.py                      # Punto de entrada (CLI / GUI)
├── converter/
│   ├── core.py                  # Lógica + validación
│   ├── cli.py                   # Interfaz de consola
│   └── gui.py                   # Interfaz Tkinter
├── tests/
│   └── test_converter.py
└── requirements.txt
```

## Ejecución

Un solo comando (abre la interfaz gráfica):

```powershell
.\run.bat
```

Equivalente: `python main.py`  
Consola: `python main.py --cli`

### Menú CLI

1. **Convertir** — pide valor, unidad origen y destino  
2. **Limpiar pantalla** — reinicia la vista para una nueva conversión  
3. **Salir**

## Pruebas

```powershell
python -m unittest discover -s tests -v
```

## Criterios de la spec cubiertos

| Requisito | Implementación |
|---|---|
| Conversión mm ↔ cm ↔ m vía metros | `converter/core.py` → `convert()` |
| Misma unidad origen/destino | Devuelve el valor (redondeado) |
| Decimales configurables (defecto 4) | Parámetro `decimals` |
| Sanitización float / try-except | `parse_value()` |
| Rechazo de negativos, NaN, Infinity | `parse_value()` |
| Unidades estrictas `{mm, cm, m}` | `validate_unit()` |
| Convertir + Limpiar | CLI y GUI |
| Pruebas unitarias | `tests/test_converter.py` |
