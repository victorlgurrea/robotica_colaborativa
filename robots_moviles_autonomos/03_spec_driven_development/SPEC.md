# SPEC · Conversor de longitudes (mm / cm / m)

## Objetivo
Aplicación de escritorio para convertir magnitudes entre milímetros (mm), centímetros (cm) y metros (m).

## Usuario
Alumnado de FP de Robótica colaborativa y móvil que necesita una conversión rápida y comprobable.

## Interfaz
Ventana con CustomTkinter (modo oscuro):
1. Campo **Valor** (texto numérico).
2. Selector **Origen** (`mm`, `cm`, `m`).
3. Selector **Destino** (`mm`, `cm`, `m`).
4. Botón **Convertir**.
5. Botón **Limpiar**.
6. Botón **Intercambiar unidades**.
7. Etiqueta de **Resultado** (muestra `—` cuando no hay resultado).

## Requisitos

| Id | Descripción |
|---|---|
| R1 | El usuario puede escribir un valor numérico (coma o punto decimal). |
| R2 | Convertir entre mm, cm y m usando metros como unidad intermedia (`1 m = 100 cm = 1000 mm`). |
| R3 | Origen y destino se eligen entre `{mm, cm, m}`. |
| R4 | Convertir muestra el resultado con unidades; por defecto 4 decimales. |
| R5 | Limpiar reinicia valor, unidades por defecto y resultado a `—`. |
| R6 | Entradas vacías, letras o no numéricas muestran un error visible (sin cerrar la app). |
| R7 | No se admiten valores negativos, `NaN` ni infinito. |
| R8 | Intercambiar unidades: cambia Origen ↔ Destino, conserva el texto de Valor, borra el resultado a `—` y **no** convierte automáticamente. |

## Criterios de aceptación

| Id | Ejemplo / comprobación |
|---|---|
| A1 | `1000 mm → m` = `1 m` |
| A2 | `2,5 m → cm` = `250 cm` |
| A3 | Campo vacío o letras → error visible |
| A4 | Misma unidad origen/destino → mismo valor |
| A5 | Intercambiar con `mm → m` pasa a `m → mm`; el Valor no cambia; resultado = `—` |
| A6 | Intercambiar dos veces restaura las unidades originales |

## Fuera de alcance
- Otras unidades (km, pulgadas, etc.).
- Servidores, base de datos o historial persistente.
- CLI obligatoria (solo ventana gráfica).
- Git push / PR automáticos en esta entrega base.

## Decisiones (dudas resueltas)
| Pregunta | Decisión |
|---|---|
| ¿Valores negativos? | No. Error visible. |
| ¿Coma o punto? | Se aceptan ambos (`2,5` y `2.5`). |
| ¿Campo vacío? | Error visible; no se convierte. |

## Dicho por el usuario vs propuestas
- **Usuario / sesión:** valor, origen, destino, convertir, limpiar; ejemplos A1–A3; mejora Intercambiar.
- **Propuesta de implementación:** CustomTkinter, validación estricta, 4 decimales, estructura `app.py` + `logica.py` + `tests/`.
