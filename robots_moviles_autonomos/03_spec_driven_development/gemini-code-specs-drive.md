# Especificación de Requisitos: Conversor de Unidades de Longitud

## 1. Visión General
Aplicación interactiva en Python para la conversión precisa y segura entre milímetros (mm), centímetros (cm) y metros (m). Diseñada bajo principios de validación estricta y código limpio.

## 2. Requisitos Funcionales

### 2.1 Entrada de Datos
- **Valor numérico:** Entrada flotante que representa la magnitud a convertir.
- **Unidad de origen:** Selección obligatoria entre `mm`, `cm`, `m`.
- **Unidad de destino:** Selección obligatoria entre `mm`, `cm`, `m`.

### 2.2 Procesamiento y Lógica de Conversión
- Aplicación de factores de conversión estándar con paso intermedio a metros para minimizar errores:
  - $1 \text{ m} = 100 \text{ cm} = 1000 \text{ mm}$
- Soporte para la misma unidad de origen y destino (devuelve el mismo valor).

### 2.3 Salida y Acciones
- **Resultado:** Muestra el valor convertido redondeado a un número configurable de decimales (por defecto, 4).
- **Opción de Limpieza:** Función para reiniciar/limpiar los campos de entrada y salida para una nueva conversión.

## 3. Seguridad y Validación de Datos

### 3.1 Control de Errores e Inyecciones
- **Sanitización de entradas:** Conversión segura de tipos (`float`) dentro de bloques `try-except` para evitar la ejecución de código no deseado o fallos por texto no numérico.
- **Valores negativos o no válidos:** Advertencia y manejo controlado cuando el valor no sea una magnitud física válida o sea `NaN`/`Infinity`.
- **Validación de unidades:** Verificación de que la unidad de origen y destino pertenezcan estrictamente al conjunto de unidades permitidas (`{"mm", "cm", "m"}`).

## 4. Requisitos de Interfaz (CLI / GUI)
- La aplicación proporcionará una interfaz limpia por consola (o gráfica mediante Tkinter/CustomTkinter si se prefiere) que incluya:
  1. Menú interactivo o formulario.
  2. Opción explícita de "Convertir".
  3. Opción explícita de "Limpiar pantalla/datos".
  4. Salida clara con unidades.

## 5. Estrategia de Pruebas (TDD / SDD)
- **Pruebas unitarias (`unittest` / `pytest`):**
  - Pruebas de conversión entre todas las combinaciones posibles (`mm` ↔ `cm` ↔ `m`).
  - Pruebas con entradas inválidas (letras, símbolos, cadenas vacías).
  - Pruebas con números extremadamente grandes o pequeños.