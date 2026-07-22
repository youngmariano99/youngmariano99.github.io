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

export interface ServiceCard {
  title: string;
  copy: string;
  icon: ServiceIcon;
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

export interface DiagnosticOption {
  value: string;
  label: string;
}
