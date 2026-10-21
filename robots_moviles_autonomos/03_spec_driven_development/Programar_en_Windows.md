# Programar cada cinco minutos
La ruta principal usa la interfaz de Windows para evitar problemas con comillas y credenciales.

1. Ejecuta primero el controlador manualmente con --apply y revisa su PR.
2. Busca **Programador de tareas** → Crear tarea. Nombre: Aula-IA-Issues.
3. General: usuario actual; **Ejecutar solo cuando el usuario haya iniciado sesión**; sin privilegios más altos.
4. Desencadenadores: Nuevo → una vez, desde ahora; Repetir cada **5 minutos**, durante **indefinidamente**; Habilitado.
5. Acciones → Iniciar un programa. Programa: ruta ABSOLUTA del python.exe del entorno de pruebas. Agregar argumentos, con rutas adaptadas:
```text
"C:\CursoIA\worker\vigilar_issues.py" --config "C:\CursoIA\worker\config.json" --apply
```
Iniciar en: C:\CursoIA\worker (sin comillas en ese campo).
6. Configuración: Si ya se está ejecutando, **No iniciar una nueva instancia**. No fuerces el cierre por un límite corto: una mejora puede durar varios minutos. El controlador limita los tiempos de cada llamada; un bloqueo residual se revisa manualmente.
7. Condiciones: revisa restricciones por batería y suspensión del equipo. Para la demo, mantenlo encendido y conectado.
8. Guarda, pulsa Ejecutar y consulta Último resultado e Historial. Revisa también state_dir; no basta con ver que la tarea arrancó.
9. Crea un issue nuevo y observa el siguiente ciclo. Después **Deshabilitar**.

No hay un daemon permanente: el Programador lanza una revisión y el proceso termina. No hace falta abrir VS Code. Si falla en la tarea pero no en terminal, revisa usuario, rutas, autenticación y directorio inicial.
