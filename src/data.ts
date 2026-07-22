import type {
  NavItem,
  GridRow,
  PersonaCard,
  MethodStep,
  ServiceCard,
  CaseNode,
  DecorativeNode,
  NetworkLine,
  DiagnosticOption,
} from "./types";

// NOTA: número de WhatsApp de placeholder — reemplazar por el número real del negocio.
export const WHATSAPP_NUMBER = "000000000000";
export const WHATSAPP_QUICK_MESSAGE =
  "Hola, quiero hacer una consulta rápida sobre mi operación.";
export const WHATSAPP_CONTROL_MESSAGE =
  "Hola, quiero recuperar el control de mi operación con Nodexa.";
export const WHATSAPP_CASE_MESSAGE =
  "Hola, vi los casos de éxito de Nodexa y quiero una solución así para mi negocio.";

export const whatsappHref = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const navItems: NavItem[] = [
  { label: "El Viaje", href: "#viaje" },
  { label: "Fundador", href: "#autoridad" },
  { label: "Contacto", href: "#contacto" },
];

// --- SHOWCASE DE PROYECTOS (Flip Cards) ---
export interface ProjectCard {
  id: string;
  nombre: string;
  tagline: string;
  problema: string;
  solucion: string;
  imagen: string; // ruta en /public — placeholder hasta tener capturas reales
}

export const projects: ProjectCard[] = [
  {
    id: "lenneria",
    nombre: "La Leñería",
    tagline: "Control de stock y pedidos",
    problema:
      "Perdía ventas por un control de stock manual y caótico: nadie sabía con certeza qué había en el depósito hasta que era tarde.",
    solucion:
      "Herramienta centralizada que sincroniza caja, depósito y reparto. Hoy todos operan sobre la misma información, ahorrando horas diarias.",
    imagen: "/projects/lenneria.jpg",
  },
  {
    id: "argoot",
    nombre: "Argoot",
    tagline: "Sincronización de datos en tiempo real",
    problema:
      "Capturaba datos por canales que no se hablaban entre sí; cada reporte era un trabajo manual contra reloj.",
    solucion:
      "Infraestructura a medida con sincronización en tiempo real. Reportes que tardaban un día, listos al instante.",
    imagen: "/projects/argoot.jpg",
  },
  {
    id: "tu-negocio",
    nombre: "Tu Negocio",
    tagline: "El próximo nodo de la red",
    problema:
      "Ese cuello de botella que hoy te roba horas: planillas, stock desfasado, sistemas que no se hablan.",
    solucion:
      "Contanos tu operativa y diseñamos el sistema que lo resuelve, a tu medida.",
    imagen: "/projects/tu-negocio.jpg",
  },
];

export const projectsFinalTitle = "Descubre de lo que somos capaces";
export const projectsFinalCta = "Ver más proyectos";

// --- EL VIAJE (Pinned Scrollytelling) ---
export interface JourneyPhase {
  id: string;
  kicker: string;
  title: string;
  copy: string;
}

export const journeyStartPhase: JourneyPhase = {
  id: "inicio",
  kicker: "Nodexa",
  title: "Todo comienza aquí.",
  copy: "Un origen, una red de datos por ordenar. Seguí bajando.",
};

export const journeyPhases: JourneyPhase[] = [
  {
    id: "caos",
    kicker: "01 — El Caos",
    title: "Tus datos están por todas partes.",
    copy: "Planillas que no cuadran, stock desfasado y horas apagando incendios. El desorden te cuesta tiempo y ventas.",
  },
  {
    id: "conexion",
    kicker: "02 — La Conexión",
    title: "Unimos cada punta de tu operación.",
    copy: "No vendemos tecnología: conectamos tu información para que fluya sola, en un solo sistema.",
  },
  {
    id: "solucion",
    kicker: "03 — La Solución",
    title: "Un sistema que trabaja por ti.",
    copy: "Negocios reales que ya operan sincronizados, con el control de vuelta en sus manos.",
  },
];

export const journeyFinalLines = [
  "La información se convirtió",
  "en una decisión clara.",
];
export const journeyFinalCta = "Agendar Diagnóstico por WhatsApp";

// --- 1. EL GANCHO (Hero) ---
export const heroEyebrow = "Nodexa — Sistemas de Datos";
export const heroLines = ["Tu negocio crece,", "pero el desorden operativo te frena."];
export const heroSubtitle =
  "Convertimos tu caos de datos en un sistema que trabaja por ti, para que recuperes el control y tu tiempo.";
export const heroPrimaryCta = "Quiero recuperar el control";
export const heroSecondaryCta = "Solo tengo una duda rápida";

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

export const serviceCards: ServiceCard[] = [
  {
    title: "Control de Stock y Planificación",
    copy: "Arquitecturas de software altamente personalizadas. Trazabilidad absoluta de tu mercadería, adaptada a la lógica única de tu negocio.",
    icon: "network",
  },
  {
    title: "Automatización de Operaciones",
    copy: "Eliminación radical de rutinas manuales. Conectamos tus herramientas para que la información fluya sola y tu equipo se enfoque en tareas de alto valor.",
    icon: "flow",
  },
  {
    title: "Inteligencia Artificial Integrada",
    copy: "Implementación de APIs de IA directamente en tus flujos de trabajo diarios para predecir demandas, optimizar recursos y potenciar tu eficiencia.",
    icon: "terminal",
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
  "Soy Mariano. Mi trabajo no es escribir código complejo, es darte herramientas tecnológicas para que disfrutes dirigir tu negocio sin que la operativa te consuma.";
export const authorityBody =
  "Técnico de la UTN. Sé lo frustrante que es cuando la información está desordenada o las tareas manuales te quitan tiempo valioso. Por eso creé Nodexa: me siento a escucharte, entiendo qué le frena el crecimiento a tu negocio y armo un sistema que lo resuelva. Queremos mejorar tu rentabilidad, pero, principalmente, devolverte la tranquilidad de saber que todo está bajo control.";

export const contactLines = ["Es hora de que la tecnología", "trabaje para tu empresa,", "y no al revés."];

export const diagnosticOptions: DiagnosticOption[] = [
  {
    value: "procesos-manuales",
    label: "Procesos manuales que consumen demasiado tiempo",
  },
  {
    value: "datos-dispersos",
    label: "Datos dispersos entre sistemas sin integrar",
  },
  {
    value: "escalabilidad",
    label: "La operación no escala al ritmo del negocio",
  },
];
