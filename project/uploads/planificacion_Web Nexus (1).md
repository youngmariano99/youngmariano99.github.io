# Planificación Completa del Proyecto: Web Nexus

## 1. Requisitos Funcionales
Enrutamiento Inteligente hacia WhatsApp (Core Feature):

Camino A (Consulta rápida): Los botones secundarios deben ejecutar un enlace directo a la API de WhatsApp (wa.me/numerodetelefono?text=Hola...) con un mensaje genérico predefinido.

Camino B (Formulario de Diagnóstico): El botón principal debe abrir un Modal (ventana emergente) o deslizar hacia el Footer donde resida un formulario de 3 pasos:

Campo 1: Nombre (Input de texto).

Campo 2: Rubro (Input desplegable tipo Select).

Campo 3: Cuello de Botella (Input desplegable tipo Select).

Generador Dinámico de Mensaje: Al hacer clic en "Enviar" en el formulario, el sistema debe concatenar las respuestas del usuario y generar una URL de WhatsApp dinámica que envíe toda esa información estructurada a tu chat.

Interactividad del "Ecosistema de Nodos":

La sección de casos de éxito debe contar con elementos (nodos) interactivos.

Trigger: Al pasar el cursor (Hover en Desktop) o tocar (Tap en Mobile) sobre un nodo principal, el sistema debe revelar suavemente una tarjeta de información (Card) con el problema y solución del cliente.

Navegación Fluida (Sticky Header):

La barra de navegación superior debe permanecer fija (sticky) al hacer scroll.

Los enlaces del menú deben dirigir a la sección correspondiente mediante un desplazamiento suave (smooth scrolling).

Reproducción de Animación Corporativa:

El video/animación de la sección "El Método" debe reproducirse automáticamente (autoplay), en bucle (loop) y estar silenciado por defecto (muted), optimizado para no frenar la carga de la página.

## 2. Requisitos No Funcionales
Fidelidad Estética y de Diseño (Strict UI/UX):

El diseño final debe respetar obligatoriamente el Design System: sin sombras pesadas, sin degradados, usando exclusivamente la paleta de colores corporativa (Pure White, Graphite Grey, Sapphire Blue, Emerald Green).

Uso mandatorio de tipografías geométricas Sans-Serif (ej. Inter), manteniendo legibilidad impecable en todas las resoluciones.

Rendimiento y Carga (Performance):

La carga inicial de la página (First Contentful Paint) debe ser menor a 1.5 segundos.

Las imágenes, animaciones e íconos deben estar servidos en formatos de próxima generación (WebP, SVG o Lottie Animations) para asegurar la máxima fluidez.

Diseño Responsivo (Mobile-First):

La interfaz debe adaptarse perfectamente a pantallas de dispositivos móviles, tabletas y monitores ultrawide.

El ecosistema de nodos, en particular, debe transformar su diagrama complejo en un diseño apilado vertical o un carrusel táctil amigable para el uso con el pulgar en teléfonos móviles.

Accesibilidad (A11y):

El contraste de colores (ej. texto Graphite Grey sobre fondo Pure White) debe cumplir con el nivel AA de las pautas WCAG 2.1.

Los elementos interactivos (botones de los nodos y el formulario) deben tener estados claros de hover (al pasar el ratón) y focus (al navegar con teclado).

Seguridad Base:

El sitio debe servirse obligatoriamente a través de un certificado SSL (HTTPS) para transmitir confianza B2B, aunque no procese pagos directamente.

## 3. Estructura de Secciones (Sitemap Landing / Institucional)

### {{HEADER_NAVEGACION}}
Barra de navegación superior fija (Sticky Header) con diseño minimalista suizo sobre fondo Pure White (#FFFFFF) o transparente con desenfoque de fondo (backdrop blur).

Isotipo y Logotipo: Monograma "MY" integrado en el nodo circular "Nodexa" en color Sapphire Blue (#0A192F).

Enlaces de navegación con smooth scroll a anclas internas:

"El Problema" (#el-problema)

"Nuestro Método" (#metodo)

"Soluciones" (#servicios)

"Ecosistema de Proyectos" (#ecosistema)

Botón CTA Secundario: "Contactar" (Estilo Ghost Button con borde sutil de 1px en Sapphire Blue, redirecciona suavemente al bloque de contacto final).

### {{HERO_SECTION}}
Sección principal de alto impacto visual inspirada en la tipografía editorial y grilla asimétrica B2B. Espacio en blanco amplio (negative space), sin degradados, luces de neón ni elementos flotantes cliché.

Titular Principal (H1): "Transformamos la información de tu negocio en decisiones que generan resultados." (Tipografía Inter/Helvetica Neue en Bold 800, color Graphite Grey #1F2937).

Subtítulo: "Arquitectura de software, automatización de procesos y control de datos a medida. Diseñamos sistemas robustos que eliminan la fricción operativa para que tu empresa escale sin límites." (Inter Regular, Line-height 1.6).

Contenedor de Llamado a la Acción (Dual CTA):

Botón Principal: "Resolver un problema operativo" (Sólido Emerald Green #10B981 con texto blanco y border-radius sutil de 4px. Acción: Abre el Modal de Diagnóstico Rápido).

Enlace Secundario (debajo del botón): "O simplemente quiero hacer una consulta rápida." (Texto plano Graphite Grey con flecha interactiva en hover. Acción: Redirige directamente a la API de WhatsApp con mensaje pre-armado).

### {{SECCION_EMPATIA}}
Sección #el-problema enfocada en la segmentación de Buyer Personas mediante una grilla de dos columnas con divisores de línea de 1px en gris tenue (#E5E7EB), inspirada en layouts de consultoría corporativa.

Titular (H2): "¿El día a día de tu operativa se convirtió en un cuello de botella?"

Texto Introductorio: "El crecimiento trae caos. Las planillas interminables, el stock desfasado, los sistemas que no se comunican entre sí y los procesos manuales te hacen perder tiempo, dinero y calidad de vida. En Nodexa sabemos que necesitas recuperar el control:"

Tarjeta A (PyME en crecimiento): Tarjeta de fondo blanco con acento de borde superior en Sapphire Blue.

Tag/Título: "Para la PyME en crecimiento"

Copy: "Automatizamos tus tareas repetitivas para que dejes de apagar incendios y recuperes el dominio total de tu inventario."

Tarjeta B (Empresa consolidada): Tarjeta de fondo blanco con acento de borde superior en Sapphire Blue.

Tag/Título: "Para la empresa consolidada"

Copy: "Centralizamos tu información y construimos el backend necesario para predecir escenarios y tomar decisiones basadas en datos reales, no en intuiciones."

### {{METODO_NODEXA}}
Sección #metodo con disposición dividida (Split Screen) de 2 columnas: demostración técnica interactiva a la izquierda y timeline explicativo a la derecha.

Titular (H2): "Del caos operativo a la fluidez tecnológica"

Columna Izquierda (Contenedor de Animación Corporativa): Reproductor de Motion Graphics vectorial en loop automático (sin sonido). Muestra la secuencia de transformación: bloques grises desordenados (caos) ingresan al nodo central Nodexa, se estructuran en líneas zafiro (arquitectura) y emiten un pulso verde esmeralda (solución).

Columna Derecha (Timeline del Método en 3 Pasos):

"1. Escucha y Mapeo:" Nos sentamos a tu lado para entender el latido de tu empresa: cómo entra el dinero, cómo sale la mercadería y dónde están las fugas de información.

"2. El Blueprint Tecnológico:" Antes de programar, te entregamos un diagnóstico claro y un plano arquitectónico con la solución exacta.

"3. Desarrollo a Medida:" Implementamos sistemas que se adaptan a tu realidad operativa, garantizando resultados medibles y sin fricciones.

### {{SOLUCIONES_SERVICIOS}}
Sección #servicios estructurada en una grilla de 3 columnas horizontales ultra-limpias, basadas en tarjetas minimalistas con abundante espacio negativo.

Titular (H2): "Sistemas diseñados para liderar tu industria"

Columna 1 (Servicio Control de Stock):

Icono vectorial geométrico de red/nodos.

Título: "Control de Stock y Planificación"

Copy: "Arquitecturas de software altamente personalizadas. Trazabilidad absoluta de tu mercadería, adaptada a la lógica única de tu negocio."

Columna 2 (Servicio Automatizaciones):

Icono vectorial geométrico de flujo continuo.

Título: "Automatización de Operaciones"

Copy: "Eliminación radical de rutinas manuales. Conectamos tus herramientas para que la información fluya sola y tu equipo se enfoque en tareas de alto valor."

Columna 3 (Servicio IA Integrada):

Icono vectorial geométrico de nodo terminal.

Título: "Inteligencia Artificial Integrada"

Copy: "Implementación de APIs de IA directamente en tus flujos de trabajo diarios para predecir demandas, optimizar recursos y potenciar tu eficiencia."

### {{ECOSISTEMA_PROYECTOS}}
Sección #ecosistema que reemplaza la galería tradicional por un Canvas Interactivo de Red de Nodos (inspirado en la precisión de Nfinite Paper y Armory Framer).

Titular (H2): "Nuestro Ecosistema de Soluciones"

Subtítulo: "No escribimos código aislado; construimos redes de eficiencia. Explora nuestros nodos de éxito y descubre cómo transformamos la operativa de empresas reales."

Diagrama Interactivo de Nodos: Red de puntos interconectados. Al hacer Hover (Desktop) o Tap (Mobile) en un nodo activo, se despliega una tarjeta flotante minimalista:

Nodo 1 (Caso La Leñería):

El Cuello de Botella: Descontrol en el flujo de reservas y gestión de stock manual.

La Solución Nodexa: Arquitectura centralizada que automatizó el 100% de la gestión de pedidos, eliminando el error humano y optimizando la entrega.

Nodo 2 (Caso Argoot):

El Cuello de Botella: Desconexión entre canales de captura de datos y procesamiento de backend.

La Solución Nodexa: Infraestructura a medida para sincronización en tiempo real y trazabilidad operativa centralizada.

### {{AUTORIDAD_SOBRE_MI}}
Sección institucional de construcción de confianza y autoridad B2B, dispuesta en 2 columnas.

Columna Izquierda: Retrato corporativo profesional de Mariano (Estilo tech/consultor B2B, limpio, accesible, sin corbata).

Columna Derecha:

Titular (H2): "¿Quién está detrás de Nodexa?"

Copy: "Soy Mariano, arquitecto de software formado en la UTN, especializado en infraestructuras backend y optimización de datos.\n\nMi misión diaria es impulsar el crecimiento de las empresas, transformando el desorden de los datos en claridad absoluta. En Nodexa no solo escribimos código; lideramos la digitalización B2B construyendo sistemas robustos que mejoran la rentabilidad del negocio y, sobre todo, la calidad de vida de las personas que lo dirigen."

### {{EMBUDO_CONTACTO_FOOTER}}
Bloque de cierre de alto contraste visual en fondo Dark Sapphire Blue (#0A192F) con tipografía en Pure White y acentos en Emerald Green.

Titular (H2): "Es hora de que la tecnología trabaje para tu empresa, y no al revés."

Subtítulo: "Comencemos a mapear la solución que tu operativa necesita para escalar."

Botón Principal (CTA): "Agendar Diagnóstico por WhatsApp" (Sólido Emerald Green #10B981, activa la apertura del Modal de Diagnóstico).

Pie de página (Footer):

Isotipo Nodexa, copyright, aviso de privacidad, certificación SSL base y links secundarios.

### {{MODAL_DIAGNOSTICO}}
Componente flotante (Modal Overlay) de captura de leads calificados que se activa al hacer clic en los botones principales de CTA.

Encabezado (H3): "Formulario de Diagnóstico Rápido"

Subtítulo: "Completa estos 3 datos para iniciar la conversación con contexto directo en WhatsApp:"

Campos del Formulario:

Nombre: [Campo de texto libre]

Rubro de tu empresa: [Menú desplegable: Comercio Mayorista / Retail / Logística / Servicios / Otro]

Tu mayor cuello de botella hoy: [Menú desplegable: Falta de control de stock / Muchas tareas manuales / Sistemas desconectados / Otro]

Botón de Acción: "Enviar Diagnóstico por WhatsApp" (Genera y redirige a una URL dinámica wa.me con el mensaje estructurado con las respuestas seleccionadas).

## 4. Entidades y Modelado 3FN
*No configurado*

