// Contenido fijo de /recursos — el catálogo en sí (los recursos) NO vive
// acá: se lee en vivo de Supabase (tabla `resources`) para que se puedan
// sumar/editar sin tocar código, ver src/pages/Recursos.tsx.

export const recursosHeroTitle = "Empezá a ordenar tu negocio sin costo.";
export const recursosHeroSubtitle =
  "✦ Herramientas aisladas y plantillas para que resuelvas problemas urgentes hoy mismo. Usalas el tiempo que necesites. Cuando tu operación pida más estructura, podés migrar toda tu información a NODEXA Modular sin perder un solo dato.";

export const searchPlaceholder = "Buscar recursos...";

export interface FilterOption {
  value: string;
  label: string;
}

export const painFilterLabel = "¿Qué necesitás resolver?";
export const painFilterOptions: FilterOption[] = [
  { value: "stock", label: "Control de Stock" },
  { value: "caja", label: "Cuentas y Caja" },
  { value: "carga", label: "Carga de Productos" },
  { value: "rentabilidad", label: "Rentabilidad" },
];

export const typeFilterLabel = "Formato del recurso";
export const typeFilterOptions: FilterOption[] = [
  { value: "excel", label: "Plantilla Excel" },
  { value: "web", label: "Herramienta Web" },
  { value: "pdf", label: "Guía PDF" },
];

export const typeBadgeLabels: Record<string, string> = {
  excel: "Plantilla Excel",
  web: "Sistema Web",
  pdf: "Guía PDF",
};

export const typeCtaLabels: Record<string, string> = {
  excel: "Descargar Excel",
  web: "Probar herramienta",
  pdf: "Descargar guía",
};

export const emptyStateText = "No encontramos recursos con esos filtros — probá con otra combinación.";

// --- Banner "up-sell sincero" intercalado en la grilla ---
export const bannerTitle = "¿La planilla de Excel ya te quedó chica?";
export const bannerLines = [
  "Las herramientas sueltas son un gran primer paso, pero el crecimiento exige centralizar.",
  "Pasá a NODEXA Modular: importamos tus planillas actuales para que arranques a operar sin empezar de cero.",
];
export const bannerCta = "Conocer NODEXA Core";

// --- Modal de descarga (gate del recurso) ---
export const downloadModalTitle = "Descargá el recurso ahora mismo.";
export const downloadModalSubtitleLines = [
  "Nada de pedirte el mail para llenarte la bandeja de spam.",
  "Contanos muy por arriba de qué trata tu negocio y te liberamos la descarga al instante.",
];
export const downloadNameLabel = "Tu nombre (o el de tu local)";
export const downloadNamePlaceholder = "Ej: Ferretería Los Hermanos / Martín";

export const rubroLabel = "¿De qué rubro es tu negocio?";
export const rubroOptions: FilterOption[] = [
  { value: "indumentaria", label: "Indumentaria / Calzado" },
  { value: "ferreteria", label: "Ferretería / Corralón" },
  { value: "alimentos", label: "Alimentos / Kiosco / Autoservicio" },
  { value: "bazar", label: "Bazar / Electrónica" },
  { value: "servicios", label: "Servicios / Otros" },
];
export const rubroOtroValue = "otro";
export const rubroOtroLabel = "Otro rubro...";
export const rubroOtroPlaceholder = "Contanos cuál";

export const dolorFormLabel = "¿Qué problema urgente querés resolver hoy?";
export const dolorFormOptions: FilterOption[] = [
  { value: "ordenar_stock", label: "Ordenar el stock y saber qué tengo." },
  { value: "controlar_caja", label: "Controlar la caja y ver si estoy ganando plata." },
  { value: "agilizar_carga", label: "Agilizar la carga de productos y precios." },
  { value: "crecio", label: "Mi negocio creció y necesito algo más estructurado." },
];
export const dolorOtroValue = "otro";
export const dolorOtroLabel = "Otro";
export const dolorOtroPlaceholder = "Contanos cuál";

export const downloadSubmitLabel = "Liberar descarga";
export const downloadReadyLabel = "Abrí tu recurso";

// --- Banner específico dentro de /mini-modulos ---
export const miniModulosBannerEyebrow = "¿Todavía no estás seguro de invertir?";
export const miniModulosBannerTitle =
  "Entrá a NODEXA Recursos con herramientas gratuitas para probar el potencial de Nodexa";
export const miniModulosBannerCta = "Ver recursos gratuitos";
