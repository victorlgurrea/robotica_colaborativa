/**
 * i18n for Seguridad Industrial presentation (ES default + EN).
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'seguridad-presentacion-lang';
  var DEFAULT_LANG = 'es';

  var slidesNav = {
    es: [
      { id: '1', title: 'Portada principal', tag: 'Intro', level: 1 },
      { id: '2', title: 'Resumen cronológico', tag: 'Hitos', level: 1 },
      { id: '2.1', title: '1769 Patente de James Watt', tag: 'Patente', level: 2 },
      { id: '2.2', title: '1769 Máquina de vapor', tag: 'GIF', level: 2 },
      { id: '2.3', title: '1913 Cadena de montaje Ford', tag: 'GIF', level: 2 },
      { id: '2.4', title: '1952 Control numérico en el MIT', tag: 'GIF', level: 2 },
      { id: '2.5', title: '1967 Kawasaki y Bedford (PLC)', tag: 'Hito', level: 2 },
      { id: '2.6', title: '1973 KUKA FAMULUS (6 ejes)', tag: 'GIF', level: 2 },
      { id: '2.7', title: '1974 ASEA IRB 6 y SEAT', tag: 'GIF', level: 2 },
      { id: '3', title: 'Marco legal y normativa', tag: 'Normas', level: 1 },
      { id: '4', title: '¿Dónde ocurren los accidentes?', tag: 'Datos', level: 1 },
      { id: '5', title: 'Seguridad', tag: 'Defensa', level: 1 },
      { id: '5.1', title: 'El robot: seguridad intrínseca', tag: 'Núcleo', level: 2 },
      { id: '5.2', title: 'La célula: perímetro y sensores', tag: 'Perímetro', level: 2 },
      { id: '5.3', title: 'El operario: protocolos', tag: 'Humano', level: 2 },
      { id: '5.4', title: 'Arquitectura del entorno seguro', tag: 'Entorno', level: 2 },
      { id: '6', title: 'Sistemas de seguridad', tag: 'SSP', level: 1 },
      { id: '6.1', title: 'Peligros inherentes y dato técnico', tag: 'Riesgos', level: 2 },
      { id: '6.2', title: 'Principios operativos y SSP', tag: 'Arquitectura', level: 2 },
      { id: '6.3', title: 'Cerramiento y normativa', tag: 'Resguardos', level: 2 },
      { id: '6.4', title: 'Microdiseño de distancias', tag: 'Distancias', level: 2 },
      { id: '6.5', title: 'Célula robótica unificada', tag: 'Síntesis', level: 2 },
      { id: '7', title: 'Fuentes y bibliografía', tag: 'Fuentes', level: 1 }
    ],
    en: [
      { id: '1', title: 'Main cover', tag: 'Intro', level: 1 },
      { id: '2', title: 'Chronological overview', tag: 'Timeline', level: 1 },
      { id: '2.1', title: '1769 James Watt patent', tag: 'Patent', level: 2 },
      { id: '2.2', title: '1769 Steam engine', tag: 'GIF', level: 2 },
      { id: '2.3', title: '1913 Ford assembly line', tag: 'GIF', level: 2 },
      { id: '2.4', title: '1952 Numerical control at MIT', tag: 'GIF', level: 2 },
      { id: '2.5', title: '1967 Kawasaki and Bedford (PLC)', tag: 'Milestone', level: 2 },
      { id: '2.6', title: '1973 KUKA FAMULUS (6 axes)', tag: 'GIF', level: 2 },
      { id: '2.7', title: '1974 ASEA IRB 6 and SEAT', tag: 'GIF', level: 2 },
      { id: '3', title: 'Legal framework and standards', tag: 'Standards', level: 1 },
      { id: '4', title: 'Where do accidents really occur?', tag: 'Data', level: 1 },
      { id: '5', title: 'Safety', tag: 'Defense', level: 1 },
      { id: '5.1', title: 'The robot: intrinsic safety', tag: 'Core', level: 2 },
      { id: '5.2', title: 'The cell: perimeter and sensors', tag: 'Perimeter', level: 2 },
      { id: '5.3', title: 'The operator: protocols', tag: 'Human', level: 2 },
      { id: '5.4', title: 'Safe environment architecture', tag: 'Environment', level: 2 },
      { id: '6', title: 'Safety systems', tag: 'SSP', level: 1 },
      { id: '6.1', title: 'Inherent hazards and technical data', tag: 'Hazards', level: 2 },
      { id: '6.2', title: 'Operating principles and SSP', tag: 'Architecture', level: 2 },
      { id: '6.3', title: 'Guarding and standards', tag: 'Guards', level: 2 },
      { id: '6.4', title: 'Safety distance micro-design', tag: 'Distances', level: 2 },
      { id: '6.5', title: 'Unified robotic cell', tag: 'Synthesis', level: 2 },
      { id: '7', title: 'Sources and bibliography', tag: 'Sources', level: 1 }
    ]
  };

  var es = {
    meta: {
      title: 'Prevención y Seguridad en la Automatización Industrial',
      langAria: 'Idioma'
    },
    ui: {
      sidebarTitle: 'Seguridad Industrial',
      sidebarSubtitle: 'Hitos, Seguridad y Sistemas',
      navAria: 'Navegación de diapositivas',
      themeLabel: 'Tema:',
      toggleSidebar: 'Ocultar / Mostrar menú lateral (S)',
      fullscreen: 'Pantalla completa (F)',
      copyright: '© 2026 Todos los derechos reservados — ',
      pdfTitle: 'Documento: Patente / contrato de James Watt (A.D. 1769 Nº 913)',
      pdfNewTab: 'Pestaña Nueva',
      pdfNewTabTitle: 'Abrir en pestaña nueva',
      pdfDownload: 'Descargar',
      pdfDownloadTitle: 'Descargar archivo PDF',
      pdfClose: 'Cerrar visor PDF (Esc)',
      pdfFrameTitle: 'Visor PDF James Watt',
      lightboxClose: 'Cerrar (Esc)',
      lightboxAlt: 'Imagen ampliada',
      downloadPdf: 'Descargar PDF original',
      clickEnlarge: 'Clic para ampliar imagen',
      enlargeImage: 'Ampliar imagen'
    },
    slide1: {
      coverAlt: 'Portada de la presentación',
      title: 'PREVENCIÓN Y SEGURIDAD EN LA AUTOMATIZACIÓN INDUSTRIAL',
      subtitle: 'De los orígenes de la robótica a la normativa moderna de prevención de riesgos.',
      start: 'Comenzar Presentación',
      timeline: 'Cronograma'
    },
    slide2: {
      title: 'Hitos Históricos: Resumen Cronológico',
      thYear: 'Año',
      thHito: 'Hito',
      thDesc: 'Descripción',
      r1Title: 'Ir a la máquina de vapor de Watt',
      r1Hito: 'Máquina de Vapor de Watt',
      r1Desc: 'Patente de James Watt, mejora con condensador separado y regulador centrífugo, inicio de la mecanización.',
      r2Title: 'Ir a la cadena de montaje Ford',
      r2Hito: 'Cadena de Montaje Móvil',
      r2Desc: 'Implementada por Henry Ford para la fabricación de automóviles, estableciendo el flujo continuo.',
      r3Title: 'Ir al control numérico del MIT',
      r3Hito: 'Control Numérico (NC) y APT',
      r3Desc: 'Desarrollo de la fresadora de control numérico y el sistema de programación automática en el MIT.',
      r4Title: 'Ir a Unimate / Kawasaki',
      r4Hito: 'Primer Robot Industrial (Unimate)',
      r4Desc: 'George Devol y Unimation instalan el primer manipulador programable en General Motors.',
      r5Title: 'Ir a Kawasaki-Unimate y Bedford Associates',
      r5Hito: 'Expansión Japonesa y Bedford Associates',
      r5DescHtml: '<p>Acuerdo entre Kawasaki y Unimation para la producción del robot Kawasaki-Unimate 2000.</p><p>Desarrollo por Bedford Associates del primer PLC (el Modicon 084) para General Motors.</p>',
      r6Title: 'Ir a KUKA Famulus',
      r6Hito: 'KUKA FAMULUS (6 Ejes)',
      r6Desc: 'Primer robot industrial eléctrico de seis ejes presentado en Alemania.',
      r7Title: 'Ir a ASEA IRB 6 y SEAT',
      r7Hito: 'ASEA IRB 6 y SEAT España',
      r7Desc: 'Presentación del robot eléctrico IRB 6 (Suecia) e incorporación de tres robots con tecnología FIAT en SEAT Zona Franca.'
    },
    slide3: {
      title: 'Patente de James Watt (nº 913)',
      page1Title: 'Clic para ampliar página 1',
      page1Alt: 'Patente de James Watt página 1',
      page2Title: 'Clic para ampliar página 2',
      page2Alt: 'Patente de James Watt página 2',
      tag: 'PATENTE DE JAMES WATT',
      p1: 'Método para reducir el consumo de vapor y combustible en las máquinas de fuego.',
      p2: 'Idea clave: un condensador separado del cilindro, que se mantiene siempre caliente.',
      p3: 'Inicio de la mecanización.',
      p4: 'El PDF completo del documento está en la diapositiva de la máquina de vapor.',
      btn: 'Ver máquina de vapor y PDF'
    },
    slide4: {
      title: 'La máquina de vapor de Watt',
      gifAlt: 'Animación: máquina de vapor de Watt',
      pdfBtn: 'Ver contrato / patente de James Watt (PDF 1769)',
      tag: 'MÁQUINA DE VAPOR DE WATT',
      p1: 'Mejora con condensador separado y regulador centrífugo.',
      p2: 'El regulador es un precedente del control con realimentación.',
      p3: 'Documento oficial: patente A.D. 1769, nº 913 (PDF).',
      caption: 'Animación: funcionamiento de la máquina de vapor de Watt'
    },
    slide5: {
      title: 'Cadena de montaje móvil',
      gifAlt: 'Animación: cadena de montaje Ford',
      tag: 'HENRY FORD',
      p1: 'Implementada por Henry Ford para la fabricación de automóviles.',
      p2: 'Establece el flujo continuo de producción.',
      caption: 'Animación: línea de montaje del Ford T (1919)'
    },
    slide6: {
      title: 'Control numérico (NC) y APT',
      gifAlt: 'Animación: control numérico MIT',
      tag: 'MIT',
      p1: 'Desarrollo de la fresadora de control numérico sobre un modelo Cincinnati Hydro-Tel de 3 ejes verticales.',
      p2: 'Sistema de programación automática APT (Automatically Programmed Tools).',
      caption: 'Animación: MIT APT / control numérico (1959)'
    },
    slide7: {
      title: 'Expansión japonesa y el origen del PLC',
      tagKawasaki: 'KAWASAKI Y UNIMATION',
      k1: 'Acuerdo de licencia entre Kawasaki Heavy Industries y Unimation.',
      k2: 'Inicio de la producción masiva del robot industrial Kawasaki-Unimate 2000 en Japón.',
      gifAlt: 'Animación: robot Kawasaki-Unimate',
      tagBedford: 'BEDFORD ASSOCIATES (MODICON 084)',
      b1: 'Dick Morley y el equipo de Bedford Associates conciben en 1968 el Modicon 084.',
      b2: 'Primer PLC de la historia, diseñado para sustituir los bancos de relés cableados en General Motors. 256 E/S y 32 Kb de memoria.',
      imgAlt: 'Equipo de Bedford Associates junto al primer PLC Modicon 084'
    },
    slide8: {
      title: 'KUKA FAMULUS (6 ejes)',
      gifAlt: 'Animación: robot KUKA FAMULUS',
      tag: 'KUKA, ALEMANIA',
      p1: 'Primer robot industrial eléctrico de seis ejes, presentado en Alemania.',
      caption: 'Animación: KUKA FAMULUS (1973)'
    },
    slide9: {
      title: 'ASEA IRB 6 y SEAT España',
      gifAlt: 'Animación: robot ASEA IRB 6',
      tag: 'ASEA, SUECIA',
      p1: 'Presentación del robot eléctrico IRB 6 (Suecia).',
      p2: 'En SEAT Zona Franca (Barcelona) se incorporan los primeros robots de Cataluña: tres unidades con tecnología FIAT.',
      caption: 'Animación: ASEA IRB 6 (1974)'
    },
    slide10: {
      title: 'Marco legal y normativa',
      intro: 'La normativa de seguridad en automatización industrial busca disminuir los riesgos y la gravedad de los accidentes, estableciendo requisitos comunes para el diseño, uso y mantenimiento de robots y sistemas automatizados.',
      intName: 'Normativa Internacional',
      intDesc: 'Norma pionera de ámbito internacional. Define e identifica los riesgos fundamentales asociados a los robots y establece el análisis de seguridad correspondiente. Sus indicaciones son de carácter general.',
      dl1992: 'Descargar ISO 10218:1992',
      dl2011: 'Descargar ISO 10218-2:2011',
      dl2025: 'Descargar ISO 10218-1:2025',
      amName: 'Normativa Americana',
      amDesc: 'Publicada originalmente en 1986 y revisada en 1992. Destaca por incluir estudios empíricos sobre la probabilidad y gravedad de los accidentes, vinculándolos directamente a la experiencia y formación del operador.',
      dlAnsi: 'Descargar ANSI/RIA R15.06',
      euName: 'Normativa Europea y Española',
      euDesc: 'El Comité Europeo de Normalización (CEN) aprobó en 1992 la adaptación europea de la ISO 10218. Inmediatamente, AENOR adoptó este estándar para España bajo la denominación UNE-EN 775.',
      missing: 'EN 775 / AENOR — no disponible',
      missingTitle: 'Documento no disponible'
    },
    slide11: {
      yearTag: 'Estadística',
      title: '¿Dónde ocurren realmente los accidentes?',
      subtitle: 'Datos del Instituto de Seguridad del Trabajador de Tokio revelan una estadística vital:',
      pieCenter: 'Riesgo Crítico',
      majorTitle: 'Operaciones de mantenimiento, programación y ajustes',
      majorExpl: '(El humano entra en el dominio de la máquina).',
      minorTitle: 'Operaciones normales de producción',
      minorExpl: '(El humano está fuera del perímetro activo).'
    },
    slide13: {
      title: 'Seguridad: defensa en profundidad',
      intro: 'La seguridad no es una barrera aislada: es una filosofía de diseño. Fabricante e integrador se reparte responsabilidades bajo el marco UNE-EN 775; la protección real nace al alinear robot, célula y operario.',
      fabTag: 'Fabricante · Seguridad intrínseca',
      fab1: 'Diseño interno del robot',
      fab2: 'Mecanismos de autodefensa',
      fab3: 'Cumplimiento de la normativa base',
      usrTag: 'Usuario / Integrador · Implantación',
      usr1: 'Diseño de la célula perimetral',
      usr2: 'Programación del sistema',
      usr3: 'Protocolos de mantenimiento',
      usr4: 'Formación de operarios',
      onionAria: 'Modelo de defensa en profundidad',
      onionHumanTitle: 'Ir a 5.3 — El operario',
      onionHumanStrong: 'El Humano <span class="onion-phase">(5.3)</span>',
      onionHumanDesc: 'Protocolos de acceso, formación, Teach Pendant, pruebas progresivas.',
      onionCellTitle: 'Ir a 5.2 — La célula',
      onionCellStrong: 'La Célula <span class="onion-phase">(5.2 · 5.4)</span>',
      onionCellDesc: 'Barreras, sensores, zonas y arquitectura del entorno seguro.',
      onionRobotTitle: 'Ir a 5.1 — El robot',
      onionRobotStrong: 'El Robot <span class="onion-phase">(5.1)</span>',
      onionRobotDesc: 'Watchdog, velocidad <0,3 m/s, detectores de colisión.',
      quote: 'Si falla el software, actúa el hardware. Si el humano comete un error, el perímetro lo protege. La seguridad es la alineación de todas las capas.',
      link54: '5.4 Arquitectura del entorno seguro →'
    },
    slide14: {
      title: 'El robot: seguridad intrínseca',
      intro: 'Primera capa del ciclo de protección: el propio robot vigila su comportamiento, se autocomprueba antes de arrancar y restringe quién puede modificar el control.',
      wName: 'El Watchdog',
      wCode: 'Supervisión continua',
      wDesc: 'Monitoriza en tiempo real bucles de realimentación, accionamientos y el propio sistema de control, para detectar fallos antes de que se propaguen.',
      aName: 'Autodiagnóstico previo',
      aCode: 'Antes del primer arranque',
      aDesc: 'Comprobación obligatoria de tensiones, LEDs indicadores y mensajes de error. Sin un estado sano, el ciclo no debe iniciarse.',
      cName: 'Control de acceso',
      cCode: 'Llaves y códigos',
      cDesc: 'Bloqueo de la unidad de control, del arranque y de la modificación de programas mediante llaves físicas o códigos de seguridad.',
      note: 'En la práctica, esta capa se completa con límites de velocidad (p. ej. < 0,3 m/s en modos de enseñanza) y detección de colisión: si falla el software, el hardware debe actuar.'
    },
    slide15: {
      title: 'La célula: perímetro y sensores',
      intro: 'Segunda capa: aislar el riesgo con barreras físicas, zonas de interacción controladas y un ecosistema de sensores del fabricante.',
      barriersTag: 'Barreras físicas de acceso',
      barriers1: 'Vallado perimetral con enclavamientos.',
      barriers2: 'Parada inmediata e incondicional si alguien entra en la zona de trabajo.',
      cellAlt: 'Célula robotizada con vallado perimetral, interbloqueos y baliza de estado',
      cellCaption: 'Célula con vallado, enclavamientos y paro de emergencia',
      auxTag: 'Condiciones de instalación auxiliar',
      aux1: 'Protecciones eléctricas y aislamientos.',
      aux2: 'Sistemas neumáticos e hidráulicos estructurados y seguros.',
      zonesAlt: 'Diagrama de zonas de interacción: intercambio a distancia, movimientos condicionados y zonas de reparación',
      zonesTitle: 'Ampliar diagrama de zonas',
      zoneGreenH: 'Intercambio a distancia',
      zoneGreenP: 'Mesas giratorias para alimentar piezas sin entrar en el área de trabajo automática.',
      zoneYellowH: 'Movimientos condicionados',
      zoneYellowP: 'Pausas absolutas programadas en el instante exacto en que el humano debe intervenir.',
      zoneRedH: 'Zonas de reparación',
      zoneRedP: 'Áreas al alcance físico, excluidas por software/hardware del ciclo automático.',
      zonesCaption: 'Zonas de interacción humano–robot en la célula',
      sensor1Title: 'Ampliar barrera fotoeléctrica',
      sensor1Alt: 'Barreras fotoeléctricas / cortinas de luz',
      sensor1Strong: 'Barreras fotoeléctricas',
      sensor1Span: 'Cortinas de luz en accesos abiertos.',
      sensor2Title: 'Ampliar escáner láser',
      sensor2Alt: 'Escáner láser de seguridad',
      sensor2Strong: 'Escáneres láser',
      sensor2Span: 'Presencia y proximidad en planta.',
      sensor3Title: 'Ampliar interbloqueos y paradas',
      sensor3Alt: 'Interbloqueos y paradas de emergencia',
      sensor3Strong: 'Interbloqueos y paradas',
      sensor3Span: 'Accesos codificados y setas de emergencia.'
    },
    slide16: {
      title: 'El operario: protocolos y factor humano',
      intro: 'Tercera capa: procedimientos, señalización y disciplina operativa. La señalización no sustituye la prevención; la formación continua es obligatoria.',
      ruleName: 'Regla de oro',
      ruleCode: 'Cero entrada',
      ruleDesc: 'No entrar en la zona de trabajo con el robot en automático, ni siquiera en fases de prueba.',
      pairName: 'Programación a dos',
      pairCode: 'Velocidad lenta',
      pairDesc: 'Uno programa a baja velocidad; el otro observa con el dedo en el paro de emergencia.',
      testName: 'Pruebas progresivas',
      testCode: 'Paso a paso hasta producción',
      testDesc: '1º movimiento paso a paso lento → 2º continuo lento → 3º aumento hasta velocidad de producción.',
      avisosTag: 'Avisos previos',
      sirenaTitle: 'Ampliar sirena',
      sirenaAlt: 'Icono de sirena de aviso previo',
      sirenaText: 'Sirenas audibles obligatorias antes de reiniciar el ciclo de trabajo tras una parada.',
      balizaTag: 'Balizas de estado · IEC 60204-1',
      balizaTitle: 'Ampliar baliza',
      balizaAlt: 'Baliza de estado luminosa de cinco colores',
      thColor: 'Color',
      thDesc: 'Descripción',
      colorRed: 'Rojo',
      descRed: 'Emergencia / peligro: acción inmediata.',
      colorYellow: 'Amarillo',
      descYellow: 'Condición anormal: vigilancia o intervención.',
      colorBlue: 'Azul',
      descBlue: 'Acción obligatoria del operario.',
      colorGreen: 'Verde',
      descGreen: 'Condición normal de la máquina.',
      colorWhite: 'Blanco',
      descWhite: 'Neutro / otras condiciones o monitorización.',
      teachTag: 'Teach Pendant — Nunca confiar la seguridad solo al software',
      teach1: 'Probar la maleta antes de entrar en el área.',
      teach2: 'Llevarla siempre en la mano si el robot está encendido.',
      teach3: 'Nunca detener el robot con el cuerpo.',
      teach4: 'No asumir que el programa ha terminado solo porque el robot no se mueve.'
    },
    slide17: {
      title: 'Arquitectura del entorno seguro',
      intro: 'El entorno de la célula debe diseñarse para que el riesgo residual sea controlable: zonas marcadas, suelo despejado, rutas de escape y aislamiento remoto del robot.',
      planAlt: 'Plano de entorno seguro: zona máxima de movimiento, rutas de escape y consola de control exterior',
      planTitle: 'Ampliar plano',
      planCaption: 'Zona máxima de movimiento, rutas de escape y consola fuera del alcance',
      z1Title: 'Ampliar marcado de zonas',
      z1Alt: 'Marcado de zonas',
      z1Tag: 'Marcado de zonas',
      z1Text: 'Identificación clara de la zona máxima de movimiento con marcas en el suelo y señales. Controles ubicados estrictamente fuera de esta zona.',
      z2Title: 'Ampliar entorno despejado',
      z2Alt: 'Entorno despejado',
      z2Tag: 'Entorno despejado',
      z2Text: 'Espacio suficiente para guiar el robot con seguridad y evitar atrapamientos. Suelo libre de aceite, agua o residuos.',
      z3Title: 'Ampliar ruta de escape',
      z3Alt: 'Ruta de escape',
      z3Tag: 'Rutas de escape',
      z3Text: 'Conocer y mantener siempre despejado el camino de salida de la célula ante movimientos anómalos.',
      z4Title: 'Ampliar aislamiento remoto',
      z4Alt: 'Aislamiento remoto del robot',
      z4Tag: 'Aislamiento remoto',
      z4Text: 'Aislar al robot de señales de control remoto que puedan provocar un movimiento inesperado mientras hay personal a su alcance.'
    },
    slide18: {
      title: 'Sistemas de seguridad',
      intro: 'Los robots modernos operan a alta velocidad en instalaciones complejas: la integración multiplica los riesgos y exige medidas técnicas de seguridad, no solo prevención basada en el comportamiento.',
      thApartado: 'Apartado',
      thEnfoque: 'Enfoque',
      thCubre: 'Qué cubre',
      r1Title: 'Ir a 6.1',
      r1Hito: 'Peligros inherentes',
      r1Desc: 'Solapamiento, energía, programación, EMC y factor humano; el dato >50% fallos técnicos.',
      r2Title: 'Ir a 6.2',
      r2Hito: 'Principios y SSP',
      r2Desc: 'Estados automático / intervención manual y arquitectura del Sistema de Seguridad Personal.',
      r3Title: 'Ir a 6.3',
      r3Hito: 'Cerramiento y normativa',
      r3Desc: 'Resguardos (altura + distancia) y marco UNE EN 292, 294, 811 y 953.',
      r4Title: 'Ir a 6.4',
      r4Hito: 'Microdiseño de distancias',
      r4Desc: 'Alcance hacia arriba, ecuación frontal, biomecánica, aberturas y acceso inferior.',
      r5Title: 'Ir a 6.5',
      r5Hito: 'Célula unificada',
      r5Desc: 'Síntesis: perímetro, malla, hueco inferior y cerebro SSP en una sola célula.',
      quote: 'La prevención basada en el comportamiento es insuficiente: los peligros por fallos del sistema exigen medidas técnicas de seguridad.'
    },
    slide19: {
      title: 'Peligros inherentes y el dato técnico',
      intro: 'Cinco familias de peligro caracterizan la automatización moderna. Más de la mitad de los accidentes se atribuyen a fallos técnicos de circuitos y control.',
      s1Title: 'Ampliar solapamiento',
      s1Alt: 'Solapamiento de radios de acción',
      s1Name: 'Solapamiento',
      s1Desc: 'Alta velocidad en radios de acción cruzados entre robots o ejes.',
      s2Title: 'Ampliar liberación de energía',
      s2Alt: 'Liberación de energía y proyecciones',
      s2Name: 'Liberación de energía',
      s2Desc: 'Proyecciones de partículas, láseres o chorros de agua a presión.',
      s3Title: 'Ampliar libertad de programación',
      s3Alt: 'Libertad de programación e imprevisibilidad',
      s3Name: 'Libertad de programación',
      s3Desc: 'Imprevisibilidad de dirección y velocidad del trajeto.',
      s4Title: 'Ampliar errores inducidos externos',
      s4Alt: 'Errores inducidos externos EMC',
      s4Name: 'Errores inducidos externos',
      s4Desc: 'Fallos por compatibilidad electromagnética (EMC).',
      s5Title: 'Ampliar factores humanos',
      s5Alt: 'Factores humanos en operación',
      s5Name: 'Factores humanos',
      s5Desc: 'Errores de operación, mantenimiento o uso del pendant.',
      s6Name: 'Fallos técnicos',
      s6Desc: 'Accidentes atribuibles a circuitos electrónicos y sistemas de control (<20% error humano).'
    },
    slide20: {
      title: 'Principios operativos y Sistema SSP',
      intro: 'Dos estados absolutos rigen la célula; el Sistema de Seguridad Personal (SSP) media entre el cerebro del robot y la frontera física.',
      autoTag: 'Funcionamiento automático',
      autoTitle: 'Ampliar funcionamiento automático',
      autoAlt: 'Funcionamiento automático: perímetro cerrado sin personas',
      autoTextHtml: '<strong>Regla absoluta:</strong> ausencia total de personas en el espacio controlado. Perímetro cerrado y enclavado.',
      manTag: 'Intervención manual',
      manTitle: 'Ampliar intervención manual',
      manAlt: 'Intervención manual con parada segura y power off',
      manTextHtml: '<strong>Regla absoluta:</strong> eliminación o reducción máxima del peligro mediante paradas forzosas (parada segura / power off).',
      sspAlt: 'Arquitectura del Sistema de Seguridad Personal',
      sspTitle: 'Ampliar SSP',
      sspCaption: 'SSP: mediador del circuito de desconexión'
    },
    slide21: {
      title: 'Cerramiento físico y marco normativo',
      formula: 'Eficiencia del Resguardo = Altura + Distancia',
      intro: 'El objetivo principal es proteger al trabajador frente a disfunciones del sistema de control mediante guardas.',
      mediaAlt: 'Cerramiento físico: altura Y y distancia X del robot',
      mediaTitle: 'Ampliar',
      mediaCaption: 'Altura (Y) y distancia del robot (X)',
      n292Title: 'Ampliar UNE EN 292',
      n292Alt: 'Diseño general y conceptos básicos',
      n292Text: 'Diseño general y conceptos básicos de seguridad de máquinas.',
      n294Title: 'Ampliar UNE EN 294',
      n294Alt: 'Alcance de miembros superiores',
      n294Text: 'Impedir el alcance de miembros superiores hacia la zona peligrosa.',
      n811Title: 'Ampliar UNE EN 811',
      n811Alt: 'Alcance de miembros inferiores',
      n811Text: 'Impedir el alcance de miembros inferiores bajo resguardos.',
      n953Title: 'Ampliar UNE EN 953',
      n953Alt: 'Diseño y construcción de resguardos',
      n953Text: 'Diseño y construcción de resguardos fijos y móviles.',
      alert: 'Si el perímetro es violado físicamente, el SSP entra en acción provocando la parada inmediata de la instalación.'
    },
    slide22: {
      title: 'Microdiseño de distancias de seguridad',
      intro: 'El dimensionado de resguardos se basa en tablas normativas: si un valor cae entre dos tabulados, se elige siempre el de mayor seguridad (prohibido interpolar).',
      elevH: 'Elevación (alcance arriba)',
      lowTitle: 'Ampliar riesgo bajo',
      lowAlt: 'Riesgo bajo: alcance a 2,50 m',
      lowLabelHtml: '<strong>Riesgo bajo:</strong> lesiones leves/reversibles',
      lowP: 'La zona peligrosa se considera protegida por distanciamiento si está por encima de 2,5 m.',
      highTitle: 'Ampliar riesgo alto',
      highAlt: 'Riesgo alto: alcance a 2,70 m',
      highLabelHtml: '<strong>Riesgo alto:</strong> lesiones graves/irreversibles',
      highP: 'La zona peligrosa exige un alejamiento mayor situándose por encima de 2,7 m.',
      eqH: 'Ecuación frontal (a, b, c)',
      eqTitle: 'Ampliar ecuación frontal',
      eqAlt: 'Ecuación frontal del resguardo: variables a, b y c',
      eqAHtml: '<strong>a</strong> = distancia del punto de peligro al suelo',
      eqBHtml: '<strong>b</strong> = altura del borde superior de la barrera',
      eqCHtml: '<strong>c</strong> = distancia horizontal desde el peligro al resguardo',
      eqAlertHtml: '<strong>PROHIBIDO INTERPOLAR.</strong> Al consultar las tablas normativas para dimensionar a, b y c, si el cálculo cae entre dos valores tabulados, <strong>se elegirá obligatoriamente el valor que entrañe el mayor nivel de seguridad</strong>.',
      reachH: 'Alcance alrededor',
      reachSub: 'Distancia de seguridad para aberturas de hasta 120 mm',
      reachTitle: 'Ampliar alcance alrededor',
      reachAlt: 'Distancias de seguridad por biomecánica del brazo',
      slotsH: 'Ranuras y excepciones',
      slotsP: 'Las formas geométricas restringen el movimiento de manera diferente. Para aberturas irregulares, se debe inscribir la forma circular o cuadrada más pequeña posible dentro de la irregularidad.',
      slot1Title: 'Ampliar rendija',
      slot1Alt: 'Abertura en rendija: geometría vs distancia ds',
      slot2Title: 'Ampliar cuadrada',
      slot2Alt: 'Abertura cuadrada: geometría vs distancia ds',
      slot3Title: 'Ampliar circular',
      slot3Alt: 'Abertura circular: geometría vs distancia ds',
      slotsAlert: 'En ranuras paralelas de ancho < 65 mm la distancia de seguridad máxima se reduce a 200 mm porque el pulgar actúa como tope anatómico.',
      accessH: 'Acceso inferior',
      accessP: 'La altura del hueco inferior «h» determina hasta dónde puede deslizarse el miembro inferior hacia la zona de peligro.',
      accessTitle: 'Ampliar acceso inferior',
      accessAlt: 'Acceso inferior: relación entre hueco h y distancia de seguridad ds',
      accessAlertHtml: '<strong>Mandato de diseño:</strong> los resguardos deben extenderse lo más cerca posible del nivel de suelo para minimizar la variable «h», reduciendo drásticamente la distancia de seguridad requerida en la instalación.'
    },
    slide23: {
      title: 'La célula robótica unificada',
      intro: 'Un diseño técnico riguroso convierte el peligro inherente en seguridad matemática: perímetro, malla, hueco inferior y lógica SSP trabajan juntos.',
      imgAlt: 'Dossier de diseño: célula robótica unificada con altura perimetral, geometría de aberturas, acceso inferior y SSP',
      imgTitle: 'Ampliar',
      caption: 'El Dossier de Diseño: La Célula Robótica Unificada'
    },
    slide12: {
      title: 'Fuentes Oficiales y Documentación de Referencia',
      s1Html: '<strong>1. Science Museum Group (2019):</strong> James Watt and the separate condenser.',
      s2Html: '<strong>2. Virginia Tech Archives:</strong> Report on MIT Demonstration of Numerically Controlled Milling Machine (1952).',
      s3Html: '<strong>3. Computer History Museum (1961):</strong> Unimate: First programmable robot in GM.',
      s4Html: '<strong>4. Kawasaki Heavy Industries:</strong> History of the robot business (1968–1969).',
      s5Html: '<strong>5. KUKA Robotics:</strong> Historia de la robótica industrial: robot FAMULUS (1973).',
      s6Html: '<strong>6. ABB (2023):</strong> 140 years of ASEA: Presentación del IRB 6 (1974).',
      s7Html: '<strong>7. ISO (1992):</strong> ISO 10218:1992 — Manipulating industrial robots — Safety.',
      s8Html: '<strong>8. ISO (2025):</strong> ISO 10218-1:2025 &amp; ISO 10218-2:2025 Robotics Safety.',
      s9Html: '<strong>9. SEAT S.A.:</strong> Historia de los 70 años de SEAT: Robots en Zona Franca (1974).',
      s10Html: '<strong>10. AENOR / CEN:</strong> UNE-EN 775 — Robots manipuladores industriales. Seguridad (adaptación europea de ISO 10218).'
    }
  };

  var en = {
    meta: {
      title: 'Prevention and Safety in Industrial Automation',
      langAria: 'Language'
    },
    ui: {
      sidebarTitle: 'Industrial Safety',
      sidebarSubtitle: 'Milestones, Safety and Systems',
      navAria: 'Slide navigation',
      themeLabel: 'Topic:',
      toggleSidebar: 'Hide / Show sidebar (S)',
      fullscreen: 'Fullscreen (F)',
      copyright: '© 2026 All rights reserved — ',
      pdfTitle: 'Document: James Watt patent / contract (A.D. 1769 No. 913)',
      pdfNewTab: 'New Tab',
      pdfNewTabTitle: 'Open in new tab',
      pdfDownload: 'Download',
      pdfDownloadTitle: 'Download PDF file',
      pdfClose: 'Close PDF viewer (Esc)',
      pdfFrameTitle: 'James Watt PDF viewer',
      lightboxClose: 'Close (Esc)',
      lightboxAlt: 'Enlarged image',
      downloadPdf: 'Download original PDF',
      clickEnlarge: 'Click to enlarge image',
      enlargeImage: 'Enlarge image'
    },
    slide1: {
      coverAlt: 'Presentation cover',
      title: 'PREVENTION AND SAFETY IN INDUSTRIAL AUTOMATION',
      subtitle: 'From the origins of robotics to modern occupational risk-prevention standards.',
      start: 'Start Presentation',
      timeline: 'Timeline'
    },
    slide2: {
      title: 'Historical Milestones: Chronological Overview',
      thYear: 'Year',
      thHito: 'Milestone',
      thDesc: 'Description',
      r1Title: 'Go to Watt steam engine',
      r1Hito: 'Watt Steam Engine',
      r1Desc: 'James Watt patent, improvement with separate condenser and centrifugal governor — the start of mechanization.',
      r2Title: 'Go to Ford assembly line',
      r2Hito: 'Moving Assembly Line',
      r2Desc: 'Implemented by Henry Ford for automobile manufacturing, establishing continuous flow production.',
      r3Title: 'Go to MIT numerical control',
      r3Hito: 'Numerical Control (NC) and APT',
      r3Desc: 'Development of the numerically controlled milling machine and the automatic programming system at MIT.',
      r4Title: 'Go to Unimate / Kawasaki',
      r4Hito: 'First Industrial Robot (Unimate)',
      r4Desc: 'George Devol and Unimation install the first programmable manipulator at General Motors.',
      r5Title: 'Go to Kawasaki-Unimate and Bedford Associates',
      r5Hito: 'Japanese Expansion and Bedford Associates',
      r5DescHtml: '<p>Agreement between Kawasaki and Unimation for production of the Kawasaki-Unimate 2000 robot.</p><p>Development by Bedford Associates of the first PLC (the Modicon 084) for General Motors.</p>',
      r6Title: 'Go to KUKA Famulus',
      r6Hito: 'KUKA FAMULUS (6 Axes)',
      r6Desc: 'First six-axis electric industrial robot presented in Germany.',
      r7Title: 'Go to ASEA IRB 6 and SEAT',
      r7Hito: 'ASEA IRB 6 and SEAT Spain',
      r7Desc: 'Presentation of the electric IRB 6 robot (Sweden) and installation of three FIAT-technology robots at SEAT Zona Franca.'
    },
    slide3: {
      title: 'James Watt Patent (No. 913)',
      page1Title: 'Click to enlarge page 1',
      page1Alt: 'James Watt patent page 1',
      page2Title: 'Click to enlarge page 2',
      page2Alt: 'James Watt patent page 2',
      tag: 'JAMES WATT PATENT',
      p1: 'Method for reducing steam and fuel consumption in fire engines.',
      p2: 'Key idea: a condenser separate from the cylinder, which is kept always hot.',
      p3: 'The start of mechanization.',
      p4: 'The full PDF document is on the steam-engine slide.',
      btn: 'View steam engine and PDF'
    },
    slide4: {
      title: 'Watt’s steam engine',
      gifAlt: 'Animation: Watt steam engine',
      pdfBtn: 'View James Watt contract / patent (PDF 1769)',
      tag: 'WATT STEAM ENGINE',
      p1: 'Improvement with separate condenser and centrifugal governor.',
      p2: 'The governor is a forerunner of feedback control.',
      p3: 'Official document: patent A.D. 1769, No. 913 (PDF).',
      caption: 'Animation: operation of Watt’s steam engine'
    },
    slide5: {
      title: 'Moving assembly line',
      gifAlt: 'Animation: Ford assembly line',
      tag: 'HENRY FORD',
      p1: 'Implemented by Henry Ford for automobile manufacturing.',
      p2: 'Establishes continuous production flow.',
      caption: 'Animation: Ford Model T assembly line (1919)'
    },
    slide6: {
      title: 'Numerical control (NC) and APT',
      gifAlt: 'Animation: MIT numerical control',
      tag: 'MIT',
      p1: 'Development of the numerically controlled milling machine on a Cincinnati Hydro-Tel 3-axis vertical model.',
      p2: 'APT (Automatically Programmed Tools) automatic programming system.',
      caption: 'Animation: MIT APT / numerical control (1959)'
    },
    slide7: {
      title: 'Japanese expansion and the origin of the PLC',
      tagKawasaki: 'KAWASAKI AND UNIMATION',
      k1: 'License agreement between Kawasaki Heavy Industries and Unimation.',
      k2: 'Start of mass production of the Kawasaki-Unimate 2000 industrial robot in Japan.',
      gifAlt: 'Animation: Kawasaki-Unimate robot',
      tagBedford: 'BEDFORD ASSOCIATES (MODICON 084)',
      b1: 'Dick Morley and the Bedford Associates team conceive the Modicon 084 in 1968.',
      b2: 'First PLC in history, designed to replace hardwired relay banks at General Motors. 256 I/O and 32 Kb of memory.',
      imgAlt: 'Bedford Associates team with the first Modicon 084 PLC'
    },
    slide8: {
      title: 'KUKA FAMULUS (6 axes)',
      gifAlt: 'Animation: KUKA FAMULUS robot',
      tag: 'KUKA, GERMANY',
      p1: 'First six-axis electric industrial robot, presented in Germany.',
      caption: 'Animation: KUKA FAMULUS (1973)'
    },
    slide9: {
      title: 'ASEA IRB 6 and SEAT Spain',
      gifAlt: 'Animation: ASEA IRB 6 robot',
      tag: 'ASEA, SWEDEN',
      p1: 'Presentation of the electric IRB 6 robot (Sweden).',
      p2: 'At SEAT Zona Franca (Barcelona), Catalonia’s first robots are installed: three units with FIAT technology.',
      caption: 'Animation: ASEA IRB 6 (1974)'
    },
    slide10: {
      title: 'Legal framework and standards',
      intro: 'Industrial automation safety standards aim to reduce accident risk and severity by establishing common requirements for the design, use and maintenance of robots and automated systems.',
      intName: 'International Standards',
      intDesc: 'Pioneering international standard. It defines and identifies the fundamental risks associated with robots and establishes the corresponding safety analysis. Its guidance is general in nature.',
      dl1992: 'Download ISO 10218:1992',
      dl2011: 'Download ISO 10218-2:2011',
      dl2025: 'Download ISO 10218-1:2025',
      amName: 'American Standards',
      amDesc: 'Originally published in 1986 and revised in 1992. Notable for including empirical studies on accident probability and severity, linking them directly to operator experience and training.',
      dlAnsi: 'Download ANSI/RIA R15.06',
      euName: 'European and Spanish Standards',
      euDesc: 'The European Committee for Standardization (CEN) approved the European adaptation of ISO 10218 in 1992. AENOR immediately adopted this standard for Spain as UNE-EN 775.',
      missing: 'EN 775 / AENOR — not available',
      missingTitle: 'Document not available'
    },
    slide11: {
      yearTag: 'Statistics',
      title: 'Where do accidents really occur?',
      subtitle: 'Data from the Tokyo Institute for Worker Safety reveal a vital statistic:',
      pieCenter: 'Critical Risk',
      majorTitle: 'Maintenance, programming and adjustment operations',
      majorExpl: '(The human enters the machine’s domain).',
      minorTitle: 'Normal production operations',
      minorExpl: '(The human remains outside the active perimeter).'
    },
    slide13: {
      title: 'Safety: defense in depth',
      intro: 'Safety is not an isolated barrier: it is a design philosophy. Manufacturer and integrator share responsibilities under UNE-EN 775; real protection comes from aligning robot, cell and operator.',
      fabTag: 'Manufacturer · Intrinsic safety',
      fab1: 'Internal robot design',
      fab2: 'Self-defense mechanisms',
      fab3: 'Compliance with baseline standards',
      usrTag: 'User / Integrator · Implementation',
      usr1: 'Perimeter cell design',
      usr2: 'System programming',
      usr3: 'Maintenance protocols',
      usr4: 'Operator training',
      onionAria: 'Defense-in-depth model',
      onionHumanTitle: 'Go to 5.3 — The operator',
      onionHumanStrong: 'The Human <span class="onion-phase">(5.3)</span>',
      onionHumanDesc: 'Access protocols, training, Teach Pendant, progressive testing.',
      onionCellTitle: 'Go to 5.2 — The cell',
      onionCellStrong: 'The Cell <span class="onion-phase">(5.2 · 5.4)</span>',
      onionCellDesc: 'Barriers, sensors, zones and safe-environment architecture.',
      onionRobotTitle: 'Go to 5.1 — The robot',
      onionRobotStrong: 'The Robot <span class="onion-phase">(5.1)</span>',
      onionRobotDesc: 'Watchdog, speed <0.3 m/s, collision detectors.',
      quote: 'If software fails, hardware acts. If the human makes an error, the perimeter protects them. Safety is the alignment of every layer.',
      link54: '5.4 Safe environment architecture →'
    },
    slide14: {
      title: 'The robot: intrinsic safety',
      intro: 'First layer of the protection cycle: the robot itself monitors its behavior, self-checks before start-up and restricts who can modify the control.',
      wName: 'The Watchdog',
      wCode: 'Continuous supervision',
      wDesc: 'Monitors feedback loops, drives and the control system in real time to detect faults before they propagate.',
      aName: 'Pre-start self-diagnostics',
      aCode: 'Before first start-up',
      aDesc: 'Mandatory check of voltages, indicator LEDs and error messages. Without a healthy state, the cycle must not start.',
      cName: 'Access control',
      cCode: 'Keys and codes',
      cDesc: 'Locking of the control unit, start-up and program modification via physical keys or security codes.',
      note: 'In practice, this layer is completed with speed limits (e.g. < 0.3 m/s in teaching modes) and collision detection: if software fails, hardware must act.'
    },
    slide15: {
      title: 'The cell: perimeter and sensors',
      intro: 'Second layer: isolate risk with physical barriers, controlled interaction zones and a manufacturer sensor ecosystem.',
      barriersTag: 'Physical access barriers',
      barriers1: 'Perimeter fencing with interlocking.',
      barriers2: 'Immediate and unconditional stop if anyone enters the work zone.',
      cellAlt: 'Robot cell with perimeter fencing, interlocks and status beacon',
      cellCaption: 'Cell with fencing, interlocks and emergency stop',
      auxTag: 'Auxiliary installation conditions',
      aux1: 'Electrical protection and insulation.',
      aux2: 'Structured and safe pneumatic and hydraulic systems.',
      zonesAlt: 'Interaction zones diagram: remote exchange, conditioned motions and repair zones',
      zonesTitle: 'Enlarge zones diagram',
      zoneGreenH: 'Remote exchange',
      zoneGreenP: 'Turntables to feed parts without entering the automatic work area.',
      zoneYellowH: 'Conditioned motions',
      zoneYellowP: 'Absolute pauses programmed at the exact moment the human must intervene.',
      zoneRedH: 'Repair zones',
      zoneRedP: 'Areas within physical reach, excluded by software/hardware from the automatic cycle.',
      zonesCaption: 'Human–robot interaction zones in the cell',
      sensor1Title: 'Enlarge photoelectric barrier',
      sensor1Alt: 'Photoelectric barriers / light curtains',
      sensor1Strong: 'Photoelectric barriers',
      sensor1Span: 'Light curtains at open access points.',
      sensor2Title: 'Enlarge laser scanner',
      sensor2Alt: 'Safety laser scanner',
      sensor2Strong: 'Laser scanners',
      sensor2Span: 'Presence and proximity on the floor.',
      sensor3Title: 'Enlarge interlocks and stops',
      sensor3Alt: 'Interlocks and emergency stops',
      sensor3Strong: 'Interlocks and stops',
      sensor3Span: 'Coded access and emergency stop mushrooms.'
    },
    slide16: {
      title: 'The operator: protocols and human factors',
      intro: 'Third layer: procedures, signalling and operational discipline. Signalling does not replace prevention; continuous training is mandatory.',
      ruleName: 'Golden rule',
      ruleCode: 'Zero entry',
      ruleDesc: 'Do not enter the work zone with the robot in automatic mode, not even during test phases.',
      pairName: 'Two-person programming',
      pairCode: 'Slow speed',
      pairDesc: 'One person programs at low speed; the other watches with a finger on the emergency stop.',
      testName: 'Progressive testing',
      testCode: 'Step by step to production',
      testDesc: '1st slow step-by-step motion → 2nd slow continuous → 3rd increase up to production speed.',
      avisosTag: 'Advance warnings',
      sirenaTitle: 'Enlarge siren',
      sirenaAlt: 'Advance warning siren icon',
      sirenaText: 'Audible sirens mandatory before restarting the work cycle after a stop.',
      balizaTag: 'Status beacons · IEC 60204-1',
      balizaTitle: 'Enlarge beacon',
      balizaAlt: 'Five-color luminous status beacon',
      thColor: 'Color',
      thDesc: 'Description',
      colorRed: 'Red',
      descRed: 'Emergency / danger: immediate action.',
      colorYellow: 'Yellow',
      descYellow: 'Abnormal condition: vigilance or intervention.',
      colorBlue: 'Blue',
      descBlue: 'Mandatory operator action.',
      colorGreen: 'Green',
      descGreen: 'Normal machine condition.',
      colorWhite: 'White',
      descWhite: 'Neutral / other conditions or monitoring.',
      teachTag: 'Teach Pendant — Never trust safety to software alone',
      teach1: 'Test the teach pendant before entering the area.',
      teach2: 'Always keep it in hand if the robot is powered on.',
      teach3: 'Never stop the robot with your body.',
      teach4: 'Do not assume the program has finished just because the robot is not moving.'
    },
    slide17: {
      title: 'Safe environment architecture',
      intro: 'The cell environment must be designed so residual risk is controllable: marked zones, clear floor, escape routes and remote isolation of the robot.',
      planAlt: 'Safe environment plan: maximum motion zone, escape routes and external control console',
      planTitle: 'Enlarge plan',
      planCaption: 'Maximum motion zone, escape routes and console out of reach',
      z1Title: 'Enlarge zone marking',
      z1Alt: 'Zone marking',
      z1Tag: 'Zone marking',
      z1Text: 'Clear identification of the maximum motion zone with floor marks and signs. Controls located strictly outside this zone.',
      z2Title: 'Enlarge clear environment',
      z2Alt: 'Clear environment',
      z2Tag: 'Clear environment',
      z2Text: 'Enough space to guide the robot safely and avoid entrapment. Floor free of oil, water or debris.',
      z3Title: 'Enlarge escape route',
      z3Alt: 'Escape route',
      z3Tag: 'Escape routes',
      z3Text: 'Know and always keep clear the exit path from the cell in case of anomalous motions.',
      z4Title: 'Enlarge remote isolation',
      z4Alt: 'Remote isolation of the robot',
      z4Tag: 'Remote isolation',
      z4Text: 'Isolate the robot from remote control signals that could cause unexpected motion while personnel are within reach.'
    },
    slide18: {
      title: 'Safety systems',
      intro: 'Modern robots operate at high speed in complex installations: integration multiplies risks and demands technical safety measures, not only behavior-based prevention.',
      thApartado: 'Section',
      thEnfoque: 'Focus',
      thCubre: 'What it covers',
      r1Title: 'Go to 6.1',
      r1Hito: 'Inherent hazards',
      r1Desc: 'Overlap, energy, programming, EMC and human factors; the >50% technical-fault statistic.',
      r2Title: 'Go to 6.2',
      r2Hito: 'Principles and SSP',
      r2Desc: 'Automatic / manual-intervention states and Personal Safety System architecture.',
      r3Title: 'Go to 6.3',
      r3Hito: 'Guarding and standards',
      r3Desc: 'Guards (height + distance) and UNE EN 292, 294, 811 and 953 framework.',
      r4Title: 'Go to 6.4',
      r4Hito: 'Distance micro-design',
      r4Desc: 'Upward reach, frontal equation, biomechanics, openings and lower access.',
      r5Title: 'Go to 6.5',
      r5Hito: 'Unified cell',
      r5Desc: 'Synthesis: perimeter, mesh, lower gap and SSP brain in a single cell.',
      quote: 'Behavior-based prevention is insufficient: hazards from system faults demand technical safety measures.'
    },
    slide19: {
      title: 'Inherent hazards and the technical statistic',
      intro: 'Five hazard families characterize modern automation. More than half of accidents are attributed to technical faults in circuits and control.',
      s1Title: 'Enlarge overlap',
      s1Alt: 'Overlapping working envelopes',
      s1Name: 'Overlap',
      s1Desc: 'High speed in crossing working envelopes between robots or axes.',
      s2Title: 'Enlarge energy release',
      s2Alt: 'Energy release and projectiles',
      s2Name: 'Energy release',
      s2Desc: 'Particle projections, lasers or high-pressure water jets.',
      s3Title: 'Enlarge programming freedom',
      s3Alt: 'Programming freedom and unpredictability',
      s3Name: 'Programming freedom',
      s3Desc: 'Unpredictability of path direction and speed.',
      s4Title: 'Enlarge externally induced errors',
      s4Alt: 'Externally induced EMC errors',
      s4Name: 'Externally induced errors',
      s4Desc: 'Faults due to electromagnetic compatibility (EMC).',
      s5Title: 'Enlarge human factors',
      s5Alt: 'Human factors in operation',
      s5Name: 'Human factors',
      s5Desc: 'Errors in operation, maintenance or pendant use.',
      s6Name: 'Technical faults',
      s6Desc: 'Accidents attributable to electronic circuits and control systems (<20% human error).'
    },
    slide20: {
      title: 'Operating principles and SSP system',
      intro: 'Two absolute states govern the cell; the Personal Safety System (SSP) mediates between the robot brain and the physical boundary.',
      autoTag: 'Automatic operation',
      autoTitle: 'Enlarge automatic operation',
      autoAlt: 'Automatic operation: closed perimeter with no people',
      autoTextHtml: '<strong>Absolute rule:</strong> total absence of people in the controlled space. Perimeter closed and interlocked.',
      manTag: 'Manual intervention',
      manTitle: 'Enlarge manual intervention',
      manAlt: 'Manual intervention with safe stop and power off',
      manTextHtml: '<strong>Absolute rule:</strong> eliminate or maximize reduction of the hazard through forced stops (safe stop / power off).',
      sspAlt: 'Personal Safety System architecture',
      sspTitle: 'Enlarge SSP',
      sspCaption: 'SSP: mediator of the disconnection circuit'
    },
    slide21: {
      title: 'Physical enclosure and regulatory framework',
      formula: 'Guard Efficiency = Height + Distance',
      intro: 'The main objective is to protect the worker against control-system malfunctions by means of guards.',
      mediaAlt: 'Physical enclosure: height Y and robot distance X',
      mediaTitle: 'Enlarge',
      mediaCaption: 'Height (Y) and robot distance (X)',
      n292Title: 'Enlarge UNE EN 292',
      n292Alt: 'General design and basic concepts',
      n292Text: 'General design and basic concepts of machinery safety.',
      n294Title: 'Enlarge UNE EN 294',
      n294Alt: 'Upper-limb reach',
      n294Text: 'Prevent upper-limb reach into the hazard zone.',
      n811Title: 'Enlarge UNE EN 811',
      n811Alt: 'Lower-limb reach',
      n811Text: 'Prevent lower-limb reach under guards.',
      n953Title: 'Enlarge UNE EN 953',
      n953Alt: 'Design and construction of guards',
      n953Text: 'Design and construction of fixed and movable guards.',
      alert: 'If the perimeter is physically breached, the SSP acts by causing an immediate stop of the installation.'
    },
    slide22: {
      title: 'Safety distance micro-design',
      intro: 'Guard sizing is based on normative tables: if a value falls between two tabulated values, always choose the safer one (interpolation is prohibited).',
      elevH: 'Elevation (upward reach)',
      lowTitle: 'Enlarge low risk',
      lowAlt: 'Low risk: reach at 2.50 m',
      lowLabelHtml: '<strong>Low risk:</strong> slight/reversible injuries',
      lowP: 'The hazard zone is considered protected by distancing if it is above 2.5 m.',
      highTitle: 'Enlarge high risk',
      highAlt: 'High risk: reach at 2.70 m',
      highLabelHtml: '<strong>High risk:</strong> serious/irreversible injuries',
      highP: 'The hazard zone requires greater separation, above 2.7 m.',
      eqH: 'Frontal equation (a, b, c)',
      eqTitle: 'Enlarge frontal equation',
      eqAlt: 'Frontal guard equation: variables a, b and c',
      eqAHtml: '<strong>a</strong> = distance from hazard point to floor',
      eqBHtml: '<strong>b</strong> = height of the upper edge of the barrier',
      eqCHtml: '<strong>c</strong> = horizontal distance from hazard to guard',
      eqAlertHtml: '<strong>INTERPOLATION PROHIBITED.</strong> When consulting normative tables to size a, b and c, if the calculation falls between two tabulated values, <strong>the value entailing the higher safety level must be chosen</strong>.',
      reachH: 'Reach around',
      reachSub: 'Safety distance for openings up to 120 mm',
      reachTitle: 'Enlarge reach around',
      reachAlt: 'Safety distances by arm biomechanics',
      slotsH: 'Slots and exceptions',
      slotsP: 'Geometric shapes restrict motion differently. For irregular openings, inscribe the smallest possible circular or square shape within the irregularity.',
      slot1Title: 'Enlarge slot',
      slot1Alt: 'Slot opening: geometry vs distance ds',
      slot2Title: 'Enlarge square',
      slot2Alt: 'Square opening: geometry vs distance ds',
      slot3Title: 'Enlarge circular',
      slot3Alt: 'Circular opening: geometry vs distance ds',
      slotsAlert: 'For parallel slots less than 65 mm wide, the maximum safety distance is reduced to 200 mm because the thumb acts as an anatomical stop.',
      accessH: 'Lower access',
      accessP: 'The height of the lower gap “h” determines how far the lower limb can slide toward the hazard zone.',
      accessTitle: 'Enlarge lower access',
      accessAlt: 'Lower access: relationship between gap h and safety distance ds',
      accessAlertHtml: '<strong>Design mandate:</strong> guards must extend as close as possible to floor level to minimize variable “h”, drastically reducing the safety distance required on the installation.'
    },
    slide23: {
      title: 'The unified robotic cell',
      intro: 'Rigorous technical design turns inherent hazard into mathematical safety: perimeter, mesh, lower gap and SSP logic work together.',
      imgAlt: 'Design dossier: unified robotic cell with perimeter height, opening geometry, lower access and SSP',
      imgTitle: 'Enlarge',
      caption: 'The Design Dossier: The Unified Robotic Cell'
    },
    slide12: {
      title: 'Official Sources and Reference Documentation',
      s1Html: '<strong>1. Science Museum Group (2019):</strong> James Watt and the separate condenser.',
      s2Html: '<strong>2. Virginia Tech Archives:</strong> Report on MIT Demonstration of Numerically Controlled Milling Machine (1952).',
      s3Html: '<strong>3. Computer History Museum (1961):</strong> Unimate: First programmable robot in GM.',
      s4Html: '<strong>4. Kawasaki Heavy Industries:</strong> History of the robot business (1968–1969).',
      s5Html: '<strong>5. KUKA Robotics:</strong> History of industrial robotics: FAMULUS robot (1973).',
      s6Html: '<strong>6. ABB (2023):</strong> 140 years of ASEA: Presentation of the IRB 6 (1974).',
      s7Html: '<strong>7. ISO (1992):</strong> ISO 10218:1992 — Manipulating industrial robots — Safety.',
      s8Html: '<strong>8. ISO (2025):</strong> ISO 10218-1:2025 &amp; ISO 10218-2:2025 Robotics Safety.',
      s9Html: '<strong>9. SEAT S.A.:</strong> History of SEAT’s 70 years: Robots at Zona Franca (1974).',
      s10Html: '<strong>10. AENOR / CEN:</strong> UNE-EN 775 — Manipulating industrial robots. Safety (European adaptation of ISO 10218).'
    }
  };

  var dictionaries = { es: es, en: en };

  function normalizeLang(lang) {
    return lang === 'en' ? 'en' : 'es';
  }

  function getLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
    } catch (_) { /* private mode */ }
    return DEFAULT_LANG;
  }

  function lookup(dict, key) {
    var parts = String(key).split('.');
    var cur = dict;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function t(key) {
    var lang = getLang();
    var val = lookup(dictionaries[lang], key);
    if (val == null) val = lookup(dictionaries.es, key);
    return typeof val === 'string' ? val : key;
  }

  function apply(lang) {
    lang = normalizeLang(lang || getLang());
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) { /* ignore */ }

    document.documentElement.lang = lang;

    var titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = t('meta.title');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!key) return;
      el.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (!key) return;
      el.setAttribute('title', t(key));
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (!key) return;
      el.setAttribute('alt', t(key));
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (!key) return;
      el.setAttribute('aria-label', t(key));
    });

    document.querySelectorAll('.lang-option').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    var flagCurrent = document.getElementById('lang-flag-current');
    if (flagCurrent) {
      flagCurrent.innerHTML = lang === 'en'
        ? '<svg viewBox="0 0 24 16" width="20" height="13"><rect width="24" height="16" rx="2" fill="#012169"/><path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" stroke-width="3.2"/><path d="M0 0 L24 16 M24 0 L0 16" stroke="#c8102e" stroke-width="1.6"/><path d="M12 0 V16 M0 8 H24" stroke="#fff" stroke-width="5.2"/><path d="M12 0 V16 M0 8 H24" stroke="#c8102e" stroke-width="2.6"/></svg>'
        : '<svg viewBox="0 0 24 16" width="20" height="13"><rect width="24" height="16" rx="2" fill="#c60b1e"/><rect y="4" width="24" height="8" fill="#ffc400"/></svg>';
    }

    return lang;
  }

  function setLang(lang) {
    lang = apply(normalizeLang(lang));
    document.dispatchEvent(new CustomEvent('i18n:langchange', { detail: { lang: lang } }));
    return lang;
  }

  function getSlides(lang) {
    lang = normalizeLang(lang || getLang());
    var list = slidesNav[lang] || slidesNav.es;
    return list.map(function (item) {
      return { id: item.id, title: item.title, tag: item.tag, level: item.level };
    });
  }

  global.I18N = {
    defaultLang: DEFAULT_LANG,
    storageKey: STORAGE_KEY,
    getLang: getLang,
    setLang: setLang,
    t: t,
    apply: apply,
    getSlides: getSlides,
    es: es,
    en: en,
    slidesNav: slidesNav
  };
})(typeof window !== 'undefined' ? window : this);
