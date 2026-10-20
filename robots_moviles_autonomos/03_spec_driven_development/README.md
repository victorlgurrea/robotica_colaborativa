# Conversor de longitudes — Sesión 2 (SDD)

Programa según [SPEC.md](./SPEC.md) y la presentación [Sesion_2_Presentacion_Alumnos.html](./Sesion_2_Presentacion_Alumnos.html).

## Estructura

```
03_spec_driven_development/
├── SPEC.md
├── app.py              # Ventana CustomTkinter
├── logica.py           # Conversión y validación
├── requirements.txt
├── run.bat
└── tests/
    ├── test_logica.py
    └── test_mejora.py  # Botón Intercambiar
```

## Arranque

```powershell
pip install -r requirements.txt
.\run.bat
```

Equivalente: `python app.py`

## Pruebas

```powershell
python -m unittest discover -s tests -v
```

## Controles

| Control | Acción |
|---|---|
| Valor | Número (coma o punto) |
| Origen / Destino | `mm`, `cm`, `m` |
| Convertir | Calcula y muestra el resultado |
| Limpiar | Reinicia campos; resultado → `—` |
| Intercambiar | Origen ↔ Destino; conserva Valor; resultado → `—` (no convierte) |
