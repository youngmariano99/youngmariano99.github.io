import type {
  NavItem,
  GridRow,
  PersonaCard,
  MethodStep,
  Service,
  CaseNode,
  DecorativeNode,
  NetworkLine,
  DiagnosticOption,
} from "./types";

// NOTA: número de WhatsApp de placeholder — reemplazar por el número real del negocio.
export const WHATSAPP_NUMBER = "2923511691";
export const WHATSAPP_QUICK_MESSAGE =
  "Hola, quiero hacer una consulta rápida.";
export const WHATSAPP_CONTROL_MESSAGE =
  "Hola, quiero recuperar el control de mi Negocio con Nodexa.";
export const WHATSAPP_CASE_MESSAGE =
  "Hola, vi los casos de éxito de Nodexa y quiero una solución así para mi negocio.";

export const whatsappHref = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const navItems: NavItem[] = [
  { label: "El Viaje", href: "#viaje" },
  { label: "Servicios", href: "#servicios" },
  { label: "Fundador", href: "#autoridad" },
  { label: "Contacto", href: "#contacto" },
];

// --- SHOWCASE DE PROYECTOS ---
// Los datos de cada proyecto viven en src/projectsData.ts (Project /
// projectsData) — módulo dedicado y escalable, agregar uno nuevo es sumar
// un objeto al array.
export const projectsFinalTitle =
  "¿Te gustaría ser parte de los negocios que ya recuperaron su tranquilidad con NODEXA?";
export const projectsFinalCta = "Agendar charla sin compromiso";
export const WHATSAPP_CHAT_MESSAGE =
  "Hola, quiero agendar una charla sin compromiso para ver cómo Nodexa puede ayudar a mi negocio.";

// --- EL VIAJE (Pinned Scrollytelling) ---
export interface JourneyPhase {
  id: string;
  kicker: string;
  title: string;
  copy: string;
  /** CTA sutil opcional dentro de la tarjeta — abre WhatsApp con ctaMessage */
  ctaLabel?: string;
  ctaMessage?: string;
}

export const journeyStartPhase: JourneyPhase = {
  id: "inicio",
  kicker: "",
  title: "Todo comienza escuchándote.",
  copy: "Cada gran cambio empieza con una charla. Contanos qué le falta o qué frena a tu negocio hoy y trazamos el camino.",
  ctaLabel: "Contanos tu caso →",
  ctaMessage: "Hola, quiero contarte cuál es mi caso para ver cómo Nodexa puede ayudarme.",
};

export const journeyPhases: JourneyPhase[] = [
  {
    id: "caos",
    kicker: "",
    title: "01 — Identificamos la falla real.",
    copy: "Analizamos a fondo lo que le pasa a tu negocio: falta de automatización, dificultad para llegar a nuevos clientes o pérdidas de dinero invisibles.",
    ctaLabel: "Agendar consulta gratuita →",
    ctaMessage: "Hola, quiero agendar una consulta gratuita para ver qué le pasa a mi negocio.",
  },
  {
    id: "conexion",
    kicker: "",
    title: "02 — Unimos los puntos clave.",
    copy: "No nos quedamos con lo primero que nos contás. Conectamos la información de tus ventas, stock y tareas diarias para diseñar la solución exacta a tu medida.",
  },
  {
    id: "solucion",
    kicker: "",
    title: "03 — Una herramienta que resuelve (y evoluciona).",
    copy: "Te entregamos un sistema simple y listo para usar. Y cuando tu negocio crezca, seguimos a tu lado para adaptarlo y actualizarlo.",
  },
];

export const journeyFinalLines = [
  "La información se convirtió",
  "en una decisión clara.",
];
export const journeyFinalCta = "Agendar Diagnóstico por WhatsApp";

// --- 1. EL GANCHO (Hero — Nodo Cero) ---
export const heroEyebrow = "Estructura. Datos. Resultados.";

// Cada línea es un array de tramos — los tramos con highlight:true van en
// verde de marca y peso 700, el resto en blanco/300 (ver HeroHub).
export interface HeroTitleSpan {
  text: string;
  highlight?: boolean;
}
export const heroTitleLines: HeroTitleSpan[][] = [
  [{ text: "Organizamos tu negocio" }],
  [{ text: "para que trabajes " }, { text: "mejor", highlight: true }],
  [{ text: "y tomes decisiones con" }],
  [{ text: "claridad.", highlight: true }],
];

export const heroDescription =
  "Ayudamos a comercios y empresas a ordenar sus procesos, centralizar su información y transformar datos en resultados reales.";

export interface HeroFeature {
  title: string;
  subtitle: string;
  icon: "chart" | "gear" | "trend";
}
export const heroFeatures: HeroFeature[] = [
  { title: "Más control", subtitle: "de tu negocio", icon: "chart" },
  { title: "Procesos claros", subtitle: "y eficientes", icon: "gear" },
  { title: "Decisiones", subtitle: "con datos", icon: "trend" },
];

export interface HeroStat {
  value: string;
  label: string;
  icon: "trend" | "calendar" | "users";
}
// Métricas de impacto real (no datos genéricos de dashboard) — lo que el
// visitante gana al trabajar con Nodexa, no un ejemplo de "Resumen general".
export const heroStats: HeroStat[] = [
  { value: "+18 hrs", label: "Semanales recuperadas por automatización", icon: "trend" },
  { value: "-35%", label: "En pérdidas por descontrol de stock y caja", icon: "calendar" },
  { value: "100%", label: "Visibilidad operativa en tiempo real", icon: "users" },
];

// CTA reservados para cuando se diseñe el bloque inferior del Hero —
// no se renderizan todavía (ver nota "VERY IMPORTANT" del brief de diseño).
export const heroScrollCta = "Agendar charla sin compromiso";
export const heroSecondaryCta = "Conocé cómo podemos ayudarte";

export const gridRows: GridRow[] = [
  { index: "01", label: "Arquitectura de software a medida" },
  { index: "02", label: "Automatización de procesos" },
  { index: "03", label: "Control y gobierno de datos" },
];

// --- 2. PRUEBA SOCIAL NARRATIVA (Ecosistema) ---
export const ecosystemEyebrow = "Prueba Social";
export const ecosystemLines = ["Ya transformamos negocios", "como el tuyo."];
export const ecosystemIntro =
  "No te vamos a hablar de tecnología en abstracto. Esto es lo que pasó cuando dos negocios reales nos abrieron las puertas de su operativa.";
export const ecosystemCta = "Quiero una solución así para mi negocio.";

// --- 3. EMPATÍA Y DOLOR (El Problema) ---
export const problemEyebrow = "El Problema";
export const problemLines = [
  "Planillas que no cuadran,",
  "sistemas que no se hablan",
  "y horas apagando incendios.",
];
export const problemIntro =
  "Sabemos por lo que estás pasando. El crecimiento trae caos: el stock se desfasa, los sistemas no se comunican entre sí y los procesos manuales te roban tiempo, dinero y calidad de vida. En Nodexa te ayudamos a recuperar el control:";

export const personaCards: PersonaCard[] = [
  {
    tag: "Para la PyME en crecimiento",
    copy: "Automatizamos tus tareas repetitivas para que dejes de apagar incendios y recuperes el dominio total de tu inventario.",
  },
  {
    tag: "Para la empresa consolidada",
    copy: "Centralizamos tu información y construimos el backend necesario para predecir escenarios y tomar decisiones basadas en datos reales, no en intuiciones.",
  },
];

// --- 4. EL CÓMO (Nuestro Método) ---
export const methodEyebrow = "Nuestro Método";
export const methodLines = ["Así convertimos tu operativa", "en un sistema que funciona solo."];
export const methodSteps: MethodStep[] = [
  {
    index: "01",
    title: "Entendemos tu negocio",
    copy: "Nos sentamos a tu lado para entender el latido de tu empresa: cómo entra el dinero, cómo sale la mercadería y dónde están las fugas de información.",
  },
  {
    index: "02",
    title: "Diseñamos la solución",
    copy: "Antes de programar, te entregamos un diagnóstico claro y un plano arquitectónico con la solución exacta para tu operativa.",
  },
  {
    index: "03",
    title: "Desarrollamos a medida",
    copy: "Implementamos sistemas que se adaptan a tu realidad operativa, garantizando resultados medibles y sin fricciones.",
  },
];

// --- SERVICIOS (Consola de Control) ---
export const servicesEyebrow = "Arquitectura de Soluciones";
export const servicesTitle = "Cómo podemos ayudarte — Soluciones simples a problemas reales";

export const services: Service[] = [
  {
    index: "01",
    title: "NODEXA Custom",
    subtitle: "Sistemas a medida",
    description:
      "Te escuchamos, entendemos tu problema operativo y te devolvemos una herramienta diseñada exactamente a la medida de tu negocio para resolverlo de raíz.",
    route: "/nodexa-custom",
    ctaLabel: "Quiero ver NODEXA Custom",
  },
  {
    index: "02",
    title: "NODEXA Modular",
    subtitle: "Mini-módulos",
    description:
      "¿No te decidís a invertir en un sistema grande? Contamos con módulos independientes que solucionan un problema a la vez, con un modelo de suscripción accesible (estilo mensualidad).",
    route: "/mini-modulos",
    ctaLabel: "Quiero ver NODEXA Modular",
  },
  {
    index: "03",
    title: "Asesoramiento",
    description:
      "¿Sabés que algo anda mal en tu operativa pero no sabés cómo solucionarlo? Te asesoramos de forma 100% gratuita y sin compromiso para mapear la solución ideal.",
  },
];

export const decorativeNodes: DecorativeNode[] = [
  { x: 12, y: 22 },
  { x: 50, y: 16 },
  { x: 86, y: 24 },
  { x: 18, y: 82 },
  { x: 60, y: 88 },
  { x: 92, y: 78 },
];

export const caseNodes: CaseNode[] = [
  {
    id: "lenneria",
    caso: "La Leñería",
    x: 28,
    y: 45,
    cardX: 28,
    cardY: 60,
    problema:
      "La Leñería perdía ventas por un control de stock manual y caótico: nadie sabía con certeza qué había en el depósito hasta que era tarde.",
    solucion:
      "Entendimos su operativa, conectamos su información y les devolvimos una herramienta centralizada.",
    resultado:
      "Hoy, desde la caja hasta el repartidor, todos operan sincronizados, ahorrando horas de trabajo diario.",
  },
  {
    id: "argoot",
    caso: "Argoot",
    x: 68,
    y: 58,
    cardX: 68,
    cardY: 73,
    problema:
      "Argoot capturaba datos por canales que no se hablaban entre sí, y cada reporte era un trabajo manual de armar contra reloj.",
    solucion:
      "Construimos una infraestructura a medida que sincroniza la información en tiempo real, canal por canal.",
    resultado:
      "Ahora tienen trazabilidad operativa centralizada y reportes que antes tardaban un día, listos al instante.",
  },
];

export const networkLines: NetworkLine[] = [
  { x1: 28, y1: 45, x2: 68, y2: 58 },
  { x1: 12, y1: 22, x2: 28, y2: 45 },
  { x1: 50, y1: 16, x2: 28, y2: 45 },
  { x1: 86, y1: 24, x2: 68, y2: 58 },
  { x1: 18, y1: 82, x2: 28, y2: 45 },
  { x1: 92, y1: 78, x2: 68, y2: 58 },
  { x1: 60, y1: 88, x2: 68, y2: 58 },
];

// --- 5. AUTORIDAD Y CIERRE ---
export const authorityEyebrow = "Fundador";
export const authorityLines = ["¿Quién está detrás", "de Nodexa?"];
export const authorityQuote =
  "Soy Mariano. Mi trabajo no es venderte tecnología complicada, sino darte herramientas simples y útiles para que dirijas tu negocio con tranquilidad y sin perder tiempo en tareas repetitivas.";
export const authorityBody =
  "Técnico de la UTN. Sé lo frustrante que es lidiar con anotaciones que se traspapelan o procesos manuales que te quitan el día. Por eso creé Nodexa: para sentarme a escucharte, entender qué frena tu crecimiento y armarte algo a tu medida. Queremos que tu negocio rinda más, pero sobre todo, devolverte el tiempo y el control.";

export const contactLines = [
  "Es hora de que la tecnología",
  "trabaje para tu negocio,",
  "y no al revés.",
];
export const contactSubtitle =
  "Sin importar el tamaño de tu comercio o empresa, coordinemos una breve charla sin compromiso para ver cómo podemos ayudarte.";

export const diagnosticOptions: DiagnosticOption[] = [
  {
    value: "manual",
    label: "Tareas manuales en papel, planillas o chats que te consumen horas.",
  },
  {
    value: "control",
    label: "Falta de control en stock, ventas o caja (datos desordenados).",
  },
  {
    value: "visibilidad",
    label: "Dificultad para mostrar mis productos/servicios y vender más.",
  },
  {
    value: "otro",
    label: "Otro motivo...",
  },
];
