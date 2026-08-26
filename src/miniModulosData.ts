// Contenido de /mini-modulos — separado de data.ts (que ya es grande) por
// el mismo criterio que projectsData.ts: un módulo de contenido bien
// definido y fácil de extender (agregar un módulo al marketplace, un paso
// al onboarding o una FAQ es sumar un objeto, no tocar el componente).

export const miniHeroTitle = [
  { text: "Tu negocio crece, " },
  { text: "tu sistema también.", highlight: true },
];
export const miniHeroTitleLine2 = "Pagá solo lo que usás.";
export const miniHeroSubtitle =
  "El primer sistema de gestión modular para comercios. Empezá con el control de stock y sumá funciones a medida que las necesites.";
export const miniHeroCta = "Solicitar acceso por WhatsApp";

export const problemaTitle =
  "¿No te convence pagar por sistemas complejos, llenos de botones y funciones que nunca usás y que son difíciles de aprender?";
export const solucionEyebrow = "NODEXA Modular";
export const solucionTitle =
  "Un núcleo sólido para tu stock, y un marketplace de funciones a la carta. Tecnología justa, sin letra chica.";

export const nucleoTitle = "El Núcleo Innegociable: NODEXA Core";
export const nucleoSubtitle =
  "Todo lo que necesitás para tener tu depósito y mostrador bajo control.";
export const nucleoSecondaryCta = "Ver detalles de instalación";

export interface CoreFeature {
  icon: "package" | "boxes" | "monitor" | "upload";
  title: string;
}
export const coreFeatures: CoreFeature[] = [
  { icon: "package", title: "Maestro de Productos" },
  { icon: "boxes", title: "Control de Stock" },
  { icon: "monitor", title: "Panel de Mostrador" },
  { icon: "upload", title: "Carga Masiva (Excel)" },
];

export const marketplaceEyebrow = "Marketplace de Módulos";
export const marketplaceTitle = "Elegí lo que necesitás, apagá costos fijos";
export const marketplaceSubtitle =
  "Módulos a la carta que se conectan a tu núcleo en un clic.";
export const marketplaceCta = "Consultar por estos módulos";

export interface ModuleCard {
  id: string;
  name: string;
  description: string;
  tag?: string;
}
export const marketplaceModules: ModuleCard[] = [
  {
    id: "catalogo-web",
    name: "Catálogo Web",
    description: "Vidriera online de tus productos, siempre sincronizada con tu stock real.",
  },
  {
    id: "carga-magica",
    name: "Carga Mágica IA",
    description: "Sacale una foto a tu lista de precios y la IA la carga sola en tu sistema.",
    tag: "Más elegido",
  },
  {
    id: "cuentas-corrientes",
    name: "Cuentas Corrientes",
    description: "Fiá con tranquilidad: control de saldos y pagos por cliente.",
  },
  {
    id: "devoluciones",
    name: "Devoluciones",
    description: "Gestioná cambios y devoluciones sin perder el hilo de tu stock.",
  },
  {
    id: "bot-whatsapp",
    name: "Bot de WhatsApp",
    description: "Respuestas automáticas de stock y precios directo por WhatsApp.",
  },
];

export const onboardingEyebrow = "Servicio Llave en Mano";
export const onboardingTitle = "Nosotros hacemos el trabajo pesado, vos solo empezás a vender";

export interface OnboardingStep {
  index: string;
  title: string;
  copy: string;
}
export const onboardingSteps: OnboardingStep[] = [
  { index: "01", title: "Auditoría y Setup", copy: "Nos pasás tu Excel y armamos tu base de datos completa." },
  { index: "02", title: "Personalización", copy: "Adaptamos los colores a tu marca si elegís sumar la vidriera web." },
  { index: "03", title: "Capacitación 1 a 1", copy: "Te enseñamos a usarlo en 30 minutos, a tu ritmo." },
];

export const customTitle = "¿Tu PyME necesita algo único?";
export const customDescription =
  "Conocé NODEXA Custom. Desarrollos a medida, infraestructura dedicada y abono de socio tecnológico para operaciones logísticas o flujos complejos.";
export const customCta = "Quiero saber más";

export const faqsTitle = "Preguntas frecuentes";
export interface FaqItem {
  question: string;
  answer: string;
}
export const faqItems: FaqItem[] = [
  {
    question: "¿Qué pasa si un mes no puedo pagar?",
    answer:
      "Tu cuenta se suspende temporalmente, pero nunca perdés tus datos: stock, clientes e historial quedan guardados intactos hasta que la reactivás.",
  },
  {
    question: "¿Necesito tener dominio propio?",
    answer:
      "No para empezar. Arrancás con el subdominio que te damos nosotros y, cuando quieras, migrás a tu propio dominio sin perder nada del setup.",
  },
  {
    question: "¿Cómo funciona el límite del módulo de IA?",
    answer:
      "Cada plan incluye una cantidad de cargas mensuales por IA. Si estás por pasarte, te avisamos antes — nunca hay sorpresas en la factura.",
  },
];

export const footerCtaTitle = "Simplificá tu gestión hoy mismo";
export const footerCtaButton = "Contactar a un asesor por WhatsApp";
export const footerTrustBadge = "Tus datos protegidos y sistema 100% seguro";
