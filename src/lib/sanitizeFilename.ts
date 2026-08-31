// Supabase Storage rechaza keys con espacios, acentos, ñ, paréntesis, etc.
// (error "InvalidKey") — los nombres de archivo que suben los usuarios
// (ej. "Diseño sin título (2).png") vienen tal cual del explorador de
// Windows/Mac, así que hay que normalizarlos antes de armar la key.
export function sanitizeFilename(name: string) {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "";

  const cleanBase = base
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // saca acentos: ñ→n, í→i, etc.
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  const safeBase = cleanBase || "archivo";
  return ext ? `${safeBase}.${ext}` : safeBase;
}
