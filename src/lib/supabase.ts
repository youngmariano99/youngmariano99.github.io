import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    "Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — copiá .env.example a .env.local y completá tus credenciales. " +
      "Usando un proyecto placeholder mientras tanto: los formularios no van a persistir nada hasta que configures las variables."
  );
}

// createClient() tira una excepción síncrona si la URL no es válida — con
// placeholders evitamos que TODA la app crashee en el import cuando todavía
// no existe .env.local (ej. en este entorno de desarrollo). Las llamadas
// reales van a fallar en runtime (capturadas y logueadas), nunca en el import.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
