// Contenido de /nodexa-custom — mismo criterio que miniModulosData.ts: un
// módulo de contenido dedicado, separado del componente de la página.

import type { FaqItem } from "./components/shared/FaqAccordion";

export const customHeroTitle = [
  { text: "Soluciones a medida para operaciones que no entran en " },
  { text: "NODEXA Modular", highlight: true },
];
export const customHeroSubtitle =
  "Cuando tu PyME, franquicia o distribuidora necesita automatizaciones complejas, integraciones con sistemas externos o flujos logísticos únicos. Diseñamos el software que tu negocio exige.";
export const customHeroCtaPrimary = "Agendar reunión";
export const customHeroCtaSecondary = "Ver cómo trabajamos";

export const customProblemaTitle =
  "¿Tus ventas crecen pero tu operativa se estanca? ¿Perdés plata pero no sabés cómo? ¿Te faltan datos para tomar decisiones?";
export const customSolucionEyebrow = "NODEXA Custom";
export const customSolucionTitle =
  "Una herramienta a medida. Te acompañamos en la creación de una herramienta que se ajusta a la forma de operar de tu empresa y que va creciendo a la par de tu negocio.";

export const customMetodologiaEyebrow = "Nuestro Procedimiento y Acompañamiento";
export const customMetodologiaTitle = "De la charla inicial a la llave en mano";

export interface CustomStep {
  index: string;
  title: string;
  copy: string;
}
export const customMetodologiaSteps: CustomStep[] = [
  {
    index: "01",
    title: "Entendimiento Operativo",
    copy: "Nos juntamos a entender cómo funciona tu día a día, tus cuellos de botella y qué necesitás resolver de verdad.",
  },
  {
    index: "02",
    title: "Propuesta y Arquitectura",
    copy: "Te presentamos un plan claro de trabajo, tiempos estimados, costos cerrados y el alcance técnico exacto, sin sorpresas.",
  },
  {
    index: "03",
    title: "Desarrollo y Pruebas",
    copy: "Construimos la solución aplicando altos estándares de seguridad y vamos trabajando a la par para que todo funcione a la perfección.",
  },
  {
    index: "04",
    title: "Lanzamiento y Acompañamiento",
    copy: "Implementamos el sistema en tu operación con capacitación directa y soporte técnico continuo como tu socio tecnológico.",
  },
];

export const customEjemplosEyebrow = "Casos de Uso";
export const customEjemplosTitle = "¿Qué podemos resolver con NODEXA Custom?";
export const customEjemploCardTitle =
  "Funcionalidades específicas que se adaptan a las reglas de tu negocio";
export const customEjemploCardCopy =
  "Vos nos mostrás cómo funciona tu negocio y qué reglas siguen tus procesos: nosotros adaptamos la herramienta a las necesidades exactas de tu operación.";

export const customBeneficiosEyebrow = "Ventaja Competitiva";
export const customBeneficiosTitle = "Por qué las empresas eligen NODEXA Custom";

export interface CustomBenefit {
  icon: "scale" | "lock" | "chart" | "link";
  title: string;
  copy: string;
}
export const customBenefits: CustomBenefit[] = [
  {
    icon: "scale",
    title: "Escalabilidad Garantizada",
    copy: "Infraestructura pensada para soportar alto volumen de transacciones sin desacelerarse.",
  },
  {
    icon: "lock",
    title: "Código y Datos Exclusivos",
    copy: "Aislamiento total y seguridad robusta para proteger la información estratégica de tu compañía.",
  },
  {
    icon: "chart",
    title: "Trazabilidad",
    copy: "Nos aseguramos de que tengas un seguimiento de los datos más importantes, para que sean tus aliados en la toma de decisiones y te ayuden a encontrar los puntos débiles de tu negocio.",
  },
  {
    icon: "link",
    title: "Socio Tecnológico Real",
    copy: "No contratás un proveedor que desaparece; tenés un equipo dedicado a evolucionar tu tecnología junto a tu negocio.",
  },
];

export const customFaqsTitle = "Dudas habituales sobre proyectos Custom";
export const customFaqItems: FaqItem[] = [
  {
    question: "¿Cuánto tiempo demoran en entregar un desarrollo a medida?",
    answer:
      "Depende del alcance, pero solemos dividirlo en entregas parciales para que puedas ir usando el sistema de forma progresiva y no tengas que esperar el producto final.",
  },
  {
    question: "¿Qué pasa con el mantenimiento mensual?",
    answer:
      "Incluye soporte dedicado, actualizaciones de seguridad y mejoras evolutivas según el abono acordado.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Sí, trabajamos con estándares de seguridad a nivel de desarrollo y nos aliamos con herramientas que brindan seguridad especializada para que tus datos siempre estén protegidos.",
  },
];

export const customFooterTitle = "Hablemos de tu próximo proyecto tecnológico";
export const customFooterSubtitle =
  "Analizamos tu caso sin compromiso para decirte cómo podemos ayudarte.";
export const customFooterButton = "Contáctanos por WhatsApp sin compromiso";
