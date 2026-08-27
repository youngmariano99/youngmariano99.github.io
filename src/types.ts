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
  /** Nombre técnico entre paréntesis junto al título (ej. "Sistemas a medida") */
  subtitle?: string;
  description: string;
  /** Si está presente, el CTA navega a esta ruta interna en vez de abrir WhatsApp */
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
  /** Puntos que aporta esta opción al cálculo de prioridad del lead */
  points: number;
}

// Mapea 1 a 1 la tabla `resources` de Supabase (ver supabase/migrations/0001_init.sql).
export interface Resource {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: "excel" | "web" | "pdf";
  dolor: "stock" | "caja" | "carga" | "rentabilidad";
  url_acceso: string;
  activo: boolean;
  created_at: string;
}

export interface PortfolioStep {
  titulo: string;
  descripcion: string;
}

// Mapea 1 a 1 la tabla `portfolio_projects` de Supabase (ver
// supabase/migrations/0002_portfolio.sql) — sección "Casos de Éxito".
export interface PortfolioProject {
  id: string;
  slug: string;
  cliente_nombre: string;
  rubro: string;
  imagen_portada_url: string | null;
  problema: string;
  solucion: string;
  pasos: PortfolioStep[];
  galeria_urls: string[];
  insignia: boolean;
  activo: boolean;
  orden: number;
  created_at: string;
}
