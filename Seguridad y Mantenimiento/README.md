# Seguridad y Mantenimiento

Material y entregas de la asignatura **Seguridad y Mantenimiento** dentro del curso de Robótica Colaborativa.

## Trabajo: Prevención y Seguridad en la Automatización Industrial

Presentación web interactiva (HTML + CSS + JS) sobre los orígenes de la automatización, hitos de la robótica industrial, defensa en profundidad y el marco normativo de prevención de riesgos.

### Contenido de las diapositivas

1. Portada  
2. Resumen cronológico (timeline)  
   - 1769 · Patente / máquina de vapor de Watt  
   - 1913 · Cadena de montaje Ford  
   - 1952 · Control numérico (MIT)  
   - 1961–1969 · Unimate, Kawasaki y primer PLC  
   - 1973 · KUKA FAMULUS (6 ejes)  
   - 1974 · ASEA IRB 6 y SEAT  
   - 2011 · Industria 4.0 e IoT  
   - 2021 · Industria 5.0 e IA  
3. Marco legal y normativa (ISO 10218, ANSI/RIA, UNE-EN 775…)  
4. ¿Dónde ocurren los accidentes?  
5. Seguridad (defensa en profundidad)  
   - 5.1 Robot · seguridad intrínseca  
   - 5.2 Célula · perímetro y sensores  
   - 5.3 Operario · protocolos  
   - 5.4 Arquitectura del entorno seguro  
6. Sistemas de seguridad (SSP)  
   - 6.1 Peligros inherentes  
   - 6.2 Principios operativos y SSP  
   - 6.3 Cerramiento y normativa  
   - 6.4 Microdiseño de distancias  
   - 6.5 Célula robótica unificada  
7. Fuentes y bibliografía  

### Cómo verla

1. Abre `Trabajo/index.html` en el navegador, **o**
2. Sirve la carpeta localmente:

```powershell
cd "Seguridad y Mantenimiento\Trabajo"
python -m http.server 8080
```

Abrir: [http://localhost:8080](http://localhost:8080)

### Estructura

```text
Trabajo/
├── index.html              # Entrada (todas las diapositivas embebidas)
├── css/styles.css          # Estilos + responsive / TV
├── js/
│   ├── presentation.js     # Navegación, menú, modales
│   └── i18n.js             # Traducciones ES / EN
└── assets/
    ├── images/             # Ilustraciones y esquemas
    ├── gifs/               # Animaciones históricas
    └── docs/               # PDFs (normativa, patente, apuntes)
```

### Idiomas

Español por defecto e inglés. En la barra superior (icono de idioma + banderas) se cambia el idioma; la preferencia se guarda en el navegador.

### Controles

| Tecla / acción | Efecto |
|---|---|
| Flechas / menú lateral | Cambiar diapositiva |
| `S` | Mostrar / ocultar barra lateral |
| `F` | Pantalla completa |

### Despliegue

Configurado en el `render.yaml` de la raíz del repositorio como sitio estático (`staticPublishPath`: `./Seguridad y Mantenimiento/Trabajo`).
