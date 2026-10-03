export interface NavItem {
  label: string;
  href: string;
}

export interface GridRow {
  index: string;
  label: string;
}

export interface PersonaCard {
  tag: string;
  copy: string;
}

export interface MethodStep {
  index: string;
  title: string;
  copy: string;
}

export type ServiceIcon = "network" | "flow" | "terminal";

export interface Service {
  index: string;
  title: string;
  subtitle?: string;
  description: string;
  route?: string;
  ctaLabel?: string;
}

export interface CaseNode {
  id: string;
  caso: string;
  x: number;
  y: number;
  cardX: number;
  cardY: number;
  problema: string;
  solucion: string;
  resultado: string;
}

export interface DecorativeNode {
  x: number;
  y: number;
}

export interface NetworkLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface CtaFormOption {
  value: string;
  label: string;
  points: number;
}

export interface Step {
  titulo: string;
  descripcion: string;
}

export interface Resource {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: "excel" | "web" | "pdf";
  dolor: "stock" | "caja" | "carga" | "rentabilidad";
  url_acceso: string;
  imagen_principal_url: string | null;
  galeria_urls: string[];
  pasos: Step[];
  activo: boolean;
  created_at: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  cliente_nombre: string;
  rubro: string;
  imagen_portada_url: string | null;
  imagen_mobile_url: string | null;
  mostrar_desktop: boolean;
  mostrar_mobile: boolean;
  problema: string;
  solucion: string;
  pasos: Step[];
  galeria_urls: string[];
  insignia: boolean;
  activo: boolean;
  orden: number;
  created_at: string;
}

export interface PatitasLead {
  id: string;
  created_at: string;
  rol: string;
  nombre: string;
  experiencia_general: string;
  pregunta_especifica: string | null;
  contacto_email: string | null;
  contacto_whatsapp: string | null;
  contacto_redes: string | null;
}

export interface PatitasTimeline {
  id: string;
  created_at: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: "completado" | "actual" | "pendiente";
  orden: number;
}

export interface PatitasImage {
  id: string;
  created_at: string;
  desktop_url: string;
  mobile_url: string;
  orden: number;
  activo: boolean;
}

export interface PatitasConfig {
  id: number;
  whatsapp_number: string | null;
  launch_date: string | null;
  updated_at: string;
}
