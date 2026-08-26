// Regla de puntos simple (no IA/ML) para priorizar leads del formulario
// calificador. Suma posible: 4 (mínimo) a 9 (máximo) — ver ctaFormPainOptions
// / ctaFormVolumeOptions / ctaFormUrgencyOptions en data.ts.
export type PriorityLabel = "Alta" | "Media" | "Baja";

export function computePriority(pointsSum: number): { score: number; label: PriorityLabel } {
  const label: PriorityLabel = pointsSum >= 7 ? "Alta" : pointsSum >= 5 ? "Media" : "Baja";
  return { score: pointsSum, label };
}
