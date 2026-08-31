// Contenido fijo de /casos-de-exito — igual que recursosData.ts, el
// catálogo en sí (los proyectos) vive en Supabase (tabla
// `portfolio_projects`), acá solo el copy que no cambia.

export const heroEyebrow = "Marcas que confiaron en Nodexa";
export const heroTitleLine1 = "Cada marca,";
export const heroTitleHighlight = "una estrella.";

// El brillo/tamaño mayor NO es por lo que facturó esa marca — es por la
// complejidad del desafío técnico. Evitar cualquier lectura de "pagó más,
// brilla más": la copy tiene que dejarlo explícito.
function joinNombres(nombres: string[]) {
  if (nombres.length === 1) return nombres[0];
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`;
}
export const heroSubtitleWithInsignia = (nombres: string[]) => {
  const plural = nombres.length > 1;
  const brillar = plural ? "brillan" : "brilla";
  const ser = plural ? "fueron" : "fue";
  const desafio = plural ? "los mayores desafíos" : "el mayor desafío";
  const facturar = plural ? "facturaron" : "facturó";
  const lo = plural ? "resolverlos" : "resolverlo";
  return `${joinNombres(nombres)} ${brillar} más porque ${ser} ${desafio} que enfrentamos hasta ahora — no por lo que ${facturar}, sino por lo que exigió ${lo}.`;
};
export const heroSubtitleDefault =
  "Cada trabajo que hacemos se suma a este cielo. Con el tiempo, se convierte en una galaxia.";
export const heroClickHint = "Tocá una estrella para verla en detalle";
export const heroCtaLabel = "Quiero ser parte";
export const heroEmptyTitle = "El cielo todavía está despejado.";
export const heroEmptySubtitle = "Acá van a brillar las próximas marcas que confíen en Nodexa.";

export const insigniaTag = "Caso insignia";
export const cardCta = "Ver el caso completo →";

export const detailProblemLabel = "El problema";
export const detailProcessLabel = "Cómo trabajamos";
export const detailSolutionLabel = "La solución";
export const detailNotFoundTitle = "No encontramos ese caso.";
export const detailNotFoundCta = "Volver a Casos de Éxito";

export const detailClosingTitle = "¿Querés ser el próximo caso de éxito?";
export const detailClosingSubtitle =
  "Contanos qué necesita tu negocio y armamos la solución exacta, igual que con estas marcas.";
export const detailClosingCta = "Quiero ser parte de Nodexa";

export const journeyCtaLabel = "Mirá las marcas que ya confiaron en Nodexa";
