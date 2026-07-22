export interface Pt {
  x: number;
  y: number;
}

function cubicPoint(a: Pt, c1: Pt, c2: Pt, b: Pt, t: number): Pt {
  const mt = 1 - t;
  const x = mt * mt * mt * a.x + 3 * mt * mt * t * c1.x + 3 * mt * t * t * c2.x + t * t * t * b.x;
  const y = mt * mt * mt * a.y + 3 * mt * mt * t * c1.y + 3 * mt * t * t * c2.y + t * t * t * b.y;
  return { x, y };
}

/*
 * Misma técnica de curva S usada en toda la app: cada tramo nace y llega
 * con tangente vertical (control points comparten la "y" del punto medio).
 */
function segmentControls(a: Pt, b: Pt) {
  const midY = (a.y + b.y) / 2;
  return { c1: { x: a.x, y: midY }, c2: { x: b.x, y: midY } };
}

export function buildSmoothPathD(points: Pt[], toPx: (p: Pt) => Pt): string {
  if (points.length === 0) return "";
  const p0 = toPx(points[0]);
  let d = `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const a = toPx(points[i - 1]);
    const b = toPx(points[i]);
    const { c1, c2 } = segmentControls(a, b);
    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

export interface PathSample extends Pt {
  /** progreso normalizado 0..1 a lo largo de TODO el recorrido, por longitud de arco */
  u: number;
}

/**
 * Samplea la curva completa en píxeles reales y devuelve puntos con su
 * progreso acumulado por longitud de arco — así "u" se comporta igual que
 * pathLength/stroke-dasharray nativo de SVG (arc-length based).
 */
export function sampleSmoothPath(
  points: Pt[],
  toPx: (p: Pt) => Pt,
  perSegment = 36
): PathSample[] {
  if (points.length < 2) return [];
  const raw: Pt[] = [];
  for (let i = 1; i < points.length; i++) {
    const a = toPx(points[i - 1]);
    const b = toPx(points[i]);
    const { c1, c2 } = segmentControls(a, b);
    const start = i === 1 ? 0 : 1; // no duplicar el punto compartido entre tramos
    for (let s = start; s <= perSegment; s++) {
      raw.push(cubicPoint(a, c1, c2, b, s / perSegment));
    }
  }

  let total = 0;
  const withLen: (Pt & { cum: number })[] = [{ ...raw[0], cum: 0 }];
  for (let i = 1; i < raw.length; i++) {
    total += Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y);
    withLen.push({ ...raw[i], cum: total });
  }

  return withLen.map((p) => ({ x: p.x, y: p.y, u: total > 0 ? p.cum / total : 0 }));
}
