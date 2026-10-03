import { supabase } from "./supabase";

export type AnalyticsEventType = 
  | "page_view"
  | "hero_cta_click"
  | "solution_view"
  | "problem_selected"
  | "case_view"
  | "faq_open"
  | "form_started"
  | "form_step_completed"
  | "form_abandoned"
  | "generate_lead"
  | "qualify_lead"
  | "working_lead"
  | "whatsapp_click"
  | "modal_open"
  | "form_submit"
  | "cta_click";

export function trackEvent(eventType: AnalyticsEventType, source: string) {
  // Guardamos en Supabase
  supabase
    .from("analytics_events")
    .insert({ event_type: eventType, source, page: window.location.pathname })
    .then(({ error }) => {
      if (error) console.error("No se pudo registrar el evento de analítica:", error);
    });

  // Integración base para Google Analytics 4 (GA4)
  // Si gtag está definido en window (cargado via snippet), se envía el evento.
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventType, {
      event_category: "interaction",
      event_label: source,
    });
  }
}

// Función para capturar UTMs desde la URL y guardarlas
export function captureUTMs() {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  
  let hasUTMs = false;
  const currentUTMs: Record<string, string> = {};

  utms.forEach(utm => {
    const value = urlParams.get(utm);
    if (value) {
      currentUTMs[utm] = value;
      hasUTMs = true;
    }
  });

  if (hasUTMs) {
    // Si hay UTMs, guardamos last_touch siempre.
    localStorage.setItem("last_touch_utms", JSON.stringify(currentUTMs));
    
    // Si no existía first_touch, lo guardamos.
    if (!localStorage.getItem("first_touch_utms")) {
      localStorage.setItem("first_touch_utms", JSON.stringify(currentUTMs));
    }
  }
}

export function getUTMs() {
  if (typeof window === "undefined") return { first: null, last: null };
  
  const firstTouch = localStorage.getItem("first_touch_utms");
  const lastTouch = localStorage.getItem("last_touch_utms");

  return {
    first: firstTouch ? JSON.parse(firstTouch) : null,
    last: lastTouch ? JSON.parse(lastTouch) : null
  };
}
