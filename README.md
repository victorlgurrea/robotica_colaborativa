# Robótica Colaborativa

Repositorio académico del curso de **Robótica Colaborativa**: prácticas, entregas y materiales organizados por asignatura.

**Autor:** Víctor  
**Repositorio:** [victorlgurrea/robotica_colaborativa](https://github.com/victorlgurrea/robotica_colaborativa)

---

## Contenido

| Asignatura | Entrega | Descripción |
|---|---|---|
| [Robots Móviles Autónomos](robots_moviles_autonomos/) | [01 · Calculadora interfaz](robots_moviles_autonomos/01_calculadora_interfaz/) | Calculadora de escritorio en Python (Tkinter), estilo Windows 11 |
| [Seguridad y Mantenimiento](Seguridad%20y%20Mantenimiento/) | [Trabajo · Presentación web](Seguridad%20y%20Mantenimiento/Trabajo/) | Presentación HTML: prevención y seguridad en la automatización industrial |

---

## Estructura del repositorio

```text
robotica_colaborativa/
├── robots_moviles_autonomos/
│   └── 01_calculadora_interfaz/     # Calculadora Python + documentación
├── Seguridad y Mantenimiento/
│   └── Trabajo/                     # Presentación web (HTML/CSS/JS)
├── render.yaml                      # Despliegue estático en Render
└── README.md
```

---

## 1. Robots Móviles Autónomos — Calculadora

Aplicación de escritorio con operaciones aritméticas, funciones extendidas, historial visual, teclado y gestión de errores (división por cero, overflow, entradas inválidas).

### Requisitos

- Python 3.10+ (probado con 3.14)
- Tkinter (incluido en la distribución oficial de Python en Windows)

### Ejecución

```powershell
cd robots_moviles_autonomos\01_calculadora_interfaz
python calculadora_windows.py
```

Documentación completa de la entrega (controles, pruebas e interfaz):  
[`robots_moviles_autonomos/01_calculadora_interfaz/README.md`](robots_moviles_autonomos/01_calculadora_interfaz/README.md)

---

## 2. Seguridad y Mantenimiento — Presentación web

Presentación interactiva sobre **Prevención y Seguridad en la Automatización Industrial**: hitos históricos (Watt, Ford, Unimate, KUKA, ASEA, Industria 4.0/5.0…), seguridad en profundidad, sistemas SSP, marco normativo (ISO 10218, ANSI/RIA) y fuentes. Multidioma ES/EN.

No requiere backend: HTML + CSS + JavaScript.

### Ejecución local

Abre en el navegador:

```text
Seguridad y Mantenimiento/Trabajo/index.html
```

O sirve la carpeta con un servidor estático (recomendado si el navegador restringe `file://`):

```powershell
cd "Seguridad y Mantenimiento\Trabajo"
python -m http.server 8080
```

Luego visita `http://localhost:8080`.

### Despliegue (Render)

El archivo [`render.yaml`](render.yaml) publica el sitio estático desde `Seguridad y Mantenimiento/Trabajo`.  
En el [dashboard de Render](https://dashboard.render.com/) puedes crear el servicio con *Blueprint* a partir de ese archivo.

Más detalle: [`Seguridad y Mantenimiento/README.md`](Seguridad%20y%20Mantenimiento/README.md)

---

## Controles de la presentación

| Tecla / acción | Efecto |
|---|---|
| Flechas / clic en menú | Cambiar diapositiva |
| `S` | Mostrar / ocultar barra lateral |
| `F` | Pantalla completa |
| Icono de idioma (barra superior) | Desplegable ES / EN con banderas (español por defecto) |

---

## Licencia y uso

Material académico de uso educativo. Los PDFs y recursos de terceros incluidos en `assets/docs` pertenecen a sus respectivos titulares.
