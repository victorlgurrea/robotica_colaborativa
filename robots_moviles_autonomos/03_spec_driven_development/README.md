# Conversor de longitudes — Sesión 2 (SDD)

Conversor **mm / cm / m** según [SPEC.md](./SPEC.md).

## Estructura

```
03_spec_driven_development/
├── SPEC.md                 # Especificación de requisitos
├── app.py                  # Interfaz CustomTkinter (entrada)
├── logica.py               # Validación y conversión
├── requirements.txt
├── run.bat                 # Arranque en un comando
├── .gitignore
├── docs/                   # Materiales de la sesión
│   ├── Sesion_2_Presentacion_Alumnos.html
│   └── Grabación.m4a
└── tests/
    ├── test_logica.py      # A1–A4 (conversión y errores)
    └── test_mejora.py      # A5–A6 (intercambiar)
```

| Capa | Archivo | Responsabilidad |
|---|---|---|
| Dominio | `logica.py` | Parseo, validación, conversión, intercambiar |
| Presentación | `app.py` | Ventana, botones, mensajes de error |
| Pruebas | `tests/` | Criterios de aceptación A1–A6 |
| Spec | `SPEC.md` | Contrato de lo implementado |

## Arranque

```powershell
pip install -r requirements.txt
.\run.bat
```

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
| Intercambiar | Origen ↔ Destino; conserva Valor; resultado → `—` |
