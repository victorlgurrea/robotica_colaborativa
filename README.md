# Calculadora de Víctor (Windows 11 Style)

Una aplicación de escritorio en Python que replica la apariencia y funcionalidades de la Calculadora Estándar de Windows 11 en modo oscuro.

---

## Características

- **Diseño Moderno:** Estilo visual oscuro inspirado en Windows 11 (fuentes Segoe UI, paleta oscura, realces de color y efectos de interacción).
- **Operaciones Básicas:** Suma (`+`), resta (`-`), multiplicación (`×`), división (`÷`).
- **Funciones Científicas y Estándar:** Raíz cuadrada (`√x`), cuadrado (`x²`), recíproco (`1/x`), porcentaje (`%`) e inversión de signo (`±`).
- **Historial de Operación:** Indicador visual de la operación en curso encima del resultado principal.
- **Soporte de Teclado:** Entrada directa numérica, operadores, `Enter` para resolver, `BackSpace` para borrar y `Escape` para limpiar.
- **Manejo Seguro de Errores:** Control de divisiones entre cero y operaciones matemáticas no válidas.

---

## Requisitos

- Python 3.10 o superior (compatible con Python 3.14).
- La interfaz utiliza **Tkinter**, que viene preinstalada con la distribución estándar de Python en Windows.

---

## Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd "TU_REPOSITORIO"
```

### 2. Crear y activar el entorno virtual

En **Windows (PowerShell)**:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

*(Opcional) Instalar dependencias si se agregan en el futuro:*
```powershell
pip install -r requirements.txt
```

### 3. Ejecutar la aplicación
```powershell
python calculadora_windows.py
```

O directamente mediante el intérprete del entorno virtual:
```powershell
.\.venv\Scripts\python.exe calculadora_windows.py
```

---

## Estructura del Proyecto

```text
├── .gitignore              # Excluye .venv, __pycache__ y archivos sensibles
├── calculadora_windows.py  # Código fuente de la calculadora
├── requirements.txt        # Especificación de dependencias
└── README.md               # Documentación del proyecto
```

---

## Licencia

Distribuido bajo la Licencia MIT.
