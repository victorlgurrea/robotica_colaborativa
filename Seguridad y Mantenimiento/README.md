# Seguridad y Mantenimiento

Material y entregas de la asignatura **Seguridad y Mantenimiento** dentro del curso de Robótica Colaborativa.

## Trabajo: Prevención y Seguridad en la Automatización Industrial

Presentación web interactiva (HTML + CSS + JS) sobre los orígenes de la automatización, hitos de la robótica industrial y el marco normativo de prevención de riesgos.

### Contenido de las diapositivas

1. Portada  
2. Resumen cronológico  
   - 1769 · Patente de James Watt / máquina de vapor  
   - 1913 · Cadena de montaje Ford  
   - 1952 · Control numérico (MIT)  
   - 1967 · Kawasaki-Unimate  
   - 1973 · KUKA FAMULUS (6 ejes)  
   - 1974 · ASEA IRB 6 y SEAT  
3. Marco legal y normativa (ISO 10218, ANSI/RIA, etc.)  
4. ¿Dónde ocurren los accidentes?  
5. Fuentes y bibliografía  

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
├── index.html              # Entrada principal (todas las diapositivas)
├── css/styles.css
├── js/
│   ├── presentation.js     # Navegación, modales, idioma
│   └── i18n.js             # Traducciones ES / EN
└── assets/
    ├── images/
    ├── gifs/
    └── docs/               # PDFs de normativa y patente
```

### Idiomas

La presentación es **multidioma** (español por defecto e inglés). En la barra superior, junto a pantalla completa, hay un icono de idioma con desplegable y banderas. La preferencia se guarda en el navegador.

### Despliegue

Configurado en el `render.yaml` de la raíz del repositorio como sitio estático (`staticPublishPath`: `./Seguridad y Mantenimiento/Trabajo`).
