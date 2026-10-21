# Controlador local · guía breve
Este código es una plantilla funcional para un repositorio de clase. No se ha activado ninguna tarea ni se han publicado cambios con este paquete. Prueba el ciclo manual antes de programarlo.

## 1. Preparar las rutas
Mantén la automatización FUERA del repositorio que modificará la IA, por ejemplo C:\CursoIA\worker. Copia allí vigilar_issues.py y config.ejemplo.json, renombrado config.json. El proyecto estará en C:\CursoIA\conversor y debe tener origin correcto, rama main publicada y tests/test_logica.py. Si generaste otro proyecto, adapta conscientemente archivos permitidos y pruebas del controlador, o usa la base de rescate.
Completa todas las rutas absolutas del JSON; para las rutas reales usa:
```powershell
Get-Command agy, gh, git, python | Select-Object Name, Source
```
Usa ejecutables nativos (.exe) en la configuración, no alias ni lanzadores .cmd. Si la instalación solo proporciona otro lanzador, revisa la instalación nativa antes de activar el ejemplo. En allowed_authors escribe los usuarios GitHub permitidos. No es una lista de correos.

## 2. Entorno fijo de pruebas fuera del proyecto
```powershell
py -m venv C:\CursoIA\entorno-pruebas
C:\CursoIA\entorno-pruebas\Scripts\python.exe -m pip install customtkinter==5.2.2
```
Pon ese python.exe en config.json. El controlador no instala paquetes. No se abre la GUI en las pruebas programadas.

## 3. Ensayar en tres pasos
Desde la carpeta worker:
```powershell
py vigilar_issues.py --demo
py vigilar_issues.py --config config.json
py vigilar_issues.py --config config.json --apply
```
Demo no usa red. La segunda orden lee GitHub pero no llama a la IA ni publica. La tercera trabaja en una nueva carpeta/rama, llama al agente y puede publicar una PR borrador.

## 4. Qué hace en cada llamada
Lee hasta 500 issues abiertos y filtra literalmente @IA en el cuerpo y el autor autorizado. Procesa como máximo uno nuevo. Crea un worktree desde origin/main, pide la mejora al agente, verifica el alcance, ejecuta unittest y permite UN intento de corrección si fallan las pruebas. Si pasan, hace commit, push y abre PR borrador. No cambia tu carpeta de trabajo original ni hace merge.

## 5. Cómo evita bucles
Guarda estado por repositorio, número y contenido del issue. El mismo contenido no se procesa dos veces, incluso tras fallo: queda needs-review. Hay un bloqueo para no solapar ejecuciones. No repite PR de la misma rama, incluidas las ya cerradas. Para una petición nueva es preferible abrir un issue nuevo; editar título/cuerpo cambia la huella y puede generar otra propuesta. Comentarios y cambios de labels no activan una revisión.

## 6. Fallos y recuperación
Consulta state.json y la carpeta de logs en state_dir. Si aparece needs-review, revisa primero si el push o PR llegaron a GitHub: un fallo de red no demuestra que no se publicaran. No borres estado ni ramas a ciegas. Si quedó worker.lock tras apagado, confirma que no existe proceso activo antes de quitarlo. Las carpetas worktree se conservan para revisar y se limpian manualmente con git worktree remove RUTA cuando ya no hagan falta.
La automatización necesita una sesión `agy` y `gh` válida bajo el mismo usuario de Windows. Si pide acceso o agota cuota, vuelve a autenticar/comprueba cuota manualmente antes de reintentar con una petición nueva.

## 7. Límites del ejemplo
El controlador limita qué archivos publica, no es un aislamiento completo del ordenador. El agente y las pruebas ejecutan bajo tu usuario; úsalo solo con el proyecto didáctico y autores de confianza. No conectes issues de desconocidos. Los tests base no se pueden editar; tests/test_mejora.py es opcional y no sustituye tu comprobación manual. La tarea externa puede seguir usando cuota cuando hay peticiones pendientes: desactívala al terminar.
