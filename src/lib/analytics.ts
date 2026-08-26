import { supabase } from "./supabase";

export type AnalyticsEventType = "modal_open" | "form_submit" | "cta_click";

// Fire-and-forget: nunca debe bloquear ni romper el flujo principal
// (abrir WhatsApp, revelar un recurso) si Supabase falla o está mal
// configurado — solo se loguea el error en consola.
export function trackEvent(eventType: AnalyticsEventType, source: string) {
  supabase
    .from("analytics_events")
    .insert({ event_type: eventType, source, page: window.location.pathname })
    .then(({ error }) => {
      if (error) console.error("No se pudo registrar el evento de analítica:", error);
    });
}
