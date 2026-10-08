import os

content = """"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { supabase } from "../lib/supabase";
import { whatsappHref } from "../data";

interface Props {
  open: boolean;
  source: string;
  onClose: () => void;
}

const EMPTY_FORM = {
  rubro: "",
  rubroOtro: "",
  problemaPrincipal: "",
  problemaOtro: "",
  modalidadVenta: "",
  tipoProcesos: "",
  nombre: "",
  empresa: "",
  whatsapp: "",
  email: "",
  mensaje: ""
};

type FormState = typeof EMPTY_FORM;

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export default function LeadFormModal({ open, source, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Opciones de rubro predefinidas
  const rubrosOpciones = [
    "Gastronomía y Casas de Comida",
    "Indumentaria, Calzado y Boutiques",
    "Kioscos, Minimarkets y Almacenes",
    "Ferreterías, Pinturerías y Repuestos",
    "Tecnología y Electrónica",
    "Venta a granel / Dietéticas",
    "Otro"
  ];

  const problemasOpciones = [
    "Pierdo mucho tiempo anotando cosas a mano o en planillas (ventas, stock, recetas).",
    "Me consultan todo el tiempo por mis productos/precios y pierdo ventas por no responder rápido.",
    "Me cuesta llevar el control claro de quién me debe plata (fiados o cuentas corrientes).",
    "Cada vez que aumentan los proveedores, tardo horas en actualizar los precios.",
    "Otro"
  ];

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setStep(1);
      setSubmitting(false);
      setSubmitted(false);
      setSubmitError(false);
      trackEvent("form_started", source);
    }
  }, [open, source]);

  const handleClose = () => {
    if (submitting) return;
    if (!submitted && !submitError && step > 1) {
      trackEvent("form_abandoned", source);
    }
    onClose();
  };

  const advance = () => {
    trackEvent("form_step_completed", `step_${step}`);
    setStep(s => s + 1);
  };

  const computePack = (f: FormState) => {
    if (f.tipoProcesos.includes("procesos muy propios y formas de trabajar únicas")) {
      return "Nodexa Custom (A medida)";
    }
    if (f.rubro === "Otro" || f.problemaPrincipal === "Otro") {
      return "Evaluar en reunión (Todavía no encontramos el servicio ideal)";
    }
    
    // Matcheo basico modular
    let base = "Nodexa Core";
    let extra = "";
    
    if (f.rubro.includes("Gastronomía")) extra = " + Producción Gastronómica";
    if (f.rubro.includes("Indumentaria")) extra = " + Matrices (Talle/Color)";
    if (f.rubro.includes("Kioscos") || f.rubro.includes("Ferreterías")) extra = " + Cuentas Corrientes";
    
    if (f.modalidadVenta.includes("WhatsApp/Redes Sociales")) extra += " + Catálogo Web Nivel 2";
    if (f.modalidadVenta.includes("Mitad en el local, mitad online")) extra += " + Catálogo Web Nivel 3";

    return `Sugerido: Pack Modular (${base}${extra})`;
  };

  const doSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    
    const pack = computePack(form);
    const problemStr = form.problemaPrincipal === "Otro" ? form.problemaOtro.trim() : form.problemaPrincipal;

    const message = `Hola Mariano! Soy ${form.nombre.trim()} de ${form.empresa.trim()}.\n\n` +
      `Rubro: ${form.rubro === "Otro" ? form.rubroOtro : form.rubro}\n` +
      `Dolor: ${problemStr}\n` +
      `Venta: ${form.modalidadVenta}\n` +
      `Procesos: ${form.tipoProcesos}\n` +
      (form.mensaje ? `\nMensaje adicional:\n${form.mensaje}` : "");

    const payload = {
      nombre: form.nombre.trim(),
      negocio: form.empresa.trim(),
      dolor: problemStr,
      volumen: "No especificado",
      urgencia: "No especificado",
      prioridad_score: 50,
      prioridad_label: "Media",
      source: source,
      whatsapp_message: message,
      contactado: false,
      telefono: form.whatsapp.trim(),
      email: form.email.trim() || null,
      rubro: form.rubro,
      rubro_otro: form.rubroOtro,
      modalidad_venta: form.modalidadVenta,
      tipo_procesos: form.tipoProcesos,
      pack_sugerido: pack
    };

    const { error } = await supabase.from("cta_leads").insert([payload]);

    if (error) {
      console.error("Error insertando lead:", error);
      setSubmitError(true);
    } else {
      trackEvent("form_completed", source);
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#090B0B]/80 px-4 backdrop-blur-sm overflow-y-auto py-10"
        >
          <div className="absolute inset-0" onClick={handleClose} />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            className="relative w-full max-w-[600px] bg-[#111615] rounded-2xl border border-white/10 shadow-2xl overflow-hidden my-auto"
          >
            {/* Header decorativo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#16D39A]/20 via-[#16D39A] to-[#16D39A]/20" />
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-[#A6AEAA] hover:text-[#F3F5F4] transition-colors rounded-full hover:bg-white/5"
            >
              <X size={20} />
            </button>

            {/* Progress bar */}
            {!submitted && !submitError && (
              <div className="px-8 pt-8 pb-4">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${s <= step ? "bg-[#16D39A]" : "bg-white/10"}`} />
                  ))}
                </div>
                <p className="text-[12px] font-semibold tracking-wider text-[#A6AEAA] uppercase">
                  Paso {step} de 5
                </p>
              </div>
            )}

            <div className="px-8 pb-8 pt-2">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Rubro */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">¿A qué rubro pertenece tu negocio?</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Nos ayuda a entender qué tipo de clientes y stock manejás.</p>
                    
                    <div className="flex flex-col gap-3">
                      {rubrosOpciones.map(r => (
                        <button
                          key={r}
                          onClick={() => setForm(f => ({ ...f, rubro: r }))}
                          className={`text-left px-5 py-4 rounded-xl border transition-all ${
                            form.rubro === r 
                              ? "bg-[#16D39A]/10 border-[#16D39A] text-[#16D39A]" 
                              : "bg-[#0D1110]/40 border-white/5 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                          }`}
                        >
                          <span className="text-[14px] font-semibold">{r}</span>
                        </button>
                      ))}
                    </div>
                    
                    {form.rubro === "Otro" && (
                      <motion.input
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        type="text" placeholder="¿Cuál es tu rubro?"
                        value={form.rubroOtro} onChange={e => setForm(f => ({...f, rubroOtro: e.target.value}))}
                        className="mt-4 w-full h-[48px] rounded-lg border border-white/10 bg-[#0D1110]/40 px-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none"
                      />
                    )}

                    <button
                      disabled={!form.rubro || (form.rubro === "Otro" && !form.rubroOtro.trim())}
                      onClick={advance}
                      className="mt-8 flex items-center justify-center gap-2 w-full h-[48px] rounded-lg bg-white/5 hover:bg-white/10 text-[#F3F5F4] font-semibold disabled:opacity-30 transition-colors"
                    >
                      Continuar <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Dolor */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">¿Cuál es el problema que más te frena hoy?</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Elegí la situación con la que más te identifiques.</p>
                    
                    <div className="flex flex-col gap-3">
                      {problemasOpciones.map(p => (
                        <button
                          key={p}
                          onClick={() => setForm(f => ({ ...f, problemaPrincipal: p }))}
                          className={`text-left px-5 py-4 rounded-xl border transition-all ${
                            form.problemaPrincipal === p
                              ? "bg-[#16D39A]/10 border-[#16D39A] text-[#16D39A]" 
                              : "bg-[#0D1110]/40 border-white/5 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                          }`}
                        >
                          <span className="text-[14px] font-medium leading-snug">{p}</span>
                        </button>
                      ))}
                    </div>

                    {form.problemaPrincipal === "Otro" && (
                      <motion.textarea
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        placeholder="Contanos brevemente qué te está costando más..."
                        value={form.problemaOtro} onChange={e => setForm(f => ({...f, problemaOtro: e.target.value}))}
                        className="mt-4 w-full min-h-[80px] rounded-lg border border-white/10 bg-[#0D1110]/40 p-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none resize-none"
                      />
                    )}

                    <button
                      disabled={!form.problemaPrincipal || (form.problemaPrincipal === "Otro" && !form.problemaOtro.trim())}
                      onClick={advance}
                      className="mt-8 flex items-center justify-center gap-2 w-full h-[48px] rounded-lg bg-white/5 hover:bg-white/10 text-[#F3F5F4] font-semibold disabled:opacity-30 transition-colors"
                    >
                      Continuar <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 3: Modalidad de Venta */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">¿Cómo te compran tus clientes habitualmente?</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Esto nos dice si necesitás conectarte con el mundo digital o solo mostrador.</p>
                    
                    <div className="flex flex-col gap-3">
                      {[
                        "100% presencial en mi local.",
                        "Me piden por WhatsApp/Redes Sociales y preparamos el pedido.",
                        "Mitad en el local, mitad online."
                      ].map(m => (
                        <button
                          key={m}
                          onClick={() => setForm(f => ({ ...f, modalidadVenta: m }))}
                          className={`text-left px-5 py-4 rounded-xl border transition-all ${
                            form.modalidadVenta === m
                              ? "bg-[#16D39A]/10 border-[#16D39A] text-[#16D39A]" 
                              : "bg-[#0D1110]/40 border-white/5 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                          }`}
                        >
                          <span className="text-[14px] font-semibold">{m}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={!form.modalidadVenta}
                      onClick={advance}
                      className="mt-8 flex items-center justify-center gap-2 w-full h-[48px] rounded-lg bg-white/5 hover:bg-white/10 text-[#F3F5F4] font-semibold disabled:opacity-30 transition-colors"
                    >
                      Continuar <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: Tipo de Procesos */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">¿Tu negocio funciona parecido al resto de los locales de tu rubro?</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Esta pregunta es clave para saber si necesitás una herramienta estándar o algo muy a medida.</p>
                    
                    <div className="flex flex-col gap-3">
                      {[
                        "Sí, compramos, vendemos y llevamos stock de forma tradicional.",
                        "No, tenemos procesos muy propios y formas de trabajar únicas que ningún sistema estándar logra cubrir."
                      ].map(t => (
                        <button
                          key={t}
                          onClick={() => setForm(f => ({ ...f, tipoProcesos: t }))}
                          className={`text-left px-5 py-4 rounded-xl border transition-all ${
                            form.tipoProcesos === t
                              ? "bg-[#16D39A]/10 border-[#16D39A] text-[#16D39A]" 
                              : "bg-[#0D1110]/40 border-white/5 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                          }`}
                        >
                          <span className="text-[14px] font-medium leading-relaxed">{t}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={!form.tipoProcesos}
                      onClick={advance}
                      className="mt-8 flex items-center justify-center gap-2 w-full h-[48px] rounded-lg bg-white/5 hover:bg-white/10 text-[#F3F5F4] font-semibold disabled:opacity-30 transition-colors"
                    >
                      Continuar <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 5: Datos */}
                {step === 5 && !submitted && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">Ahora sí: tus datos</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Para enviarte un diagnóstico justo y contactarte.</p>
                    
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px] font-semibold text-[#A6AEAA] mb-1">Nombre *</label>
                          <input type="text" value={form.nombre} onChange={e => setForm(f => ({...f, nombre: e.target.value}))} className="w-full h-[48px] rounded-lg border border-white/10 bg-[#0D1110]/40 px-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-[#A6AEAA] mb-1">Empresa *</label>
                          <input type="text" value={form.empresa} onChange={e => setForm(f => ({...f, empresa: e.target.value}))} className="w-full h-[48px] rounded-lg border border-white/10 bg-[#0D1110]/40 px-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px] font-semibold text-[#A6AEAA] mb-1">WhatsApp *</label>
                          <input type="tel" value={form.whatsapp} onChange={e => setForm(f => ({...f, whatsapp: e.target.value}))} className="w-full h-[48px] rounded-lg border border-white/10 bg-[#0D1110]/40 px-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-[#A6AEAA] mb-1">Email</label>
                          <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="w-full h-[48px] rounded-lg border border-white/10 bg-[#0D1110]/40 px-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-[#A6AEAA] mb-1">¿Querés agregar algo más? (Opcional)</label>
                        <textarea value={form.mensaje} onChange={e => setForm(f => ({...f, mensaje: e.target.value}))} className="w-full rounded-lg border border-white/10 bg-[#0D1110]/40 p-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none min-h-[80px] resize-none" />
                      </div>
                    </div>

                    <button
                      disabled={!form.nombre || !form.empresa || !form.whatsapp || submitting}
                      onClick={doSubmit}
                      className="mt-8 flex items-center justify-center w-full h-[48px] rounded-lg bg-[#16D39A] text-[#090B0B] font-bold disabled:opacity-40 transition-opacity"
                    >
                      {submitting ? "Enviando..." : "Enviar mis datos"}
                    </button>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {submitted && !submitError && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#16D39A]/10 flex items-center justify-center text-[#16D39A] mb-6">
                      <Check size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[28px] font-bold text-[#F3F5F4] mb-3">¡Diagnóstico Listo! 🚀</h3>
                    <p className="text-[15px] text-[#A6AEAA] max-w-[340px] leading-relaxed mb-8">
                      Hemos detectado áreas donde la automatización puede ahorrarte mucho tiempo. Revisamos tu perfil y hablemos para mostrarte cómo.
                    </p>
                    
                    <button
                      onClick={() => {
                        const message = `Hola Mariano! Soy ${form.nombre.trim()} de ${form.empresa.trim()}.\n\n` +
                        `Recién completé el diagnóstico en la web. Me gustaría charlar sobre mi negocio.`;
                        window.open(whatsappHref(message), "_blank");
                        trackEvent("whatsapp_click", source);
                        onClose();
                      }}
                      className="inline-flex items-center justify-center h-[52px] px-8 rounded-lg bg-[#16D39A] text-[#090B0B] font-bold hover:bg-[#12b382] transition-colors"
                    >
                      Hablar con Mariano →
                    </button>
                  </motion.div>
                )}

                {/* ERROR */}
                {submitError && (
                  <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                      <X size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[28px] font-bold text-[#F3F5F4] mb-3">Ocurrió un error</h3>
                    <p className="text-[15px] text-[#A6AEAA] max-w-[340px] leading-relaxed mb-8">
                      No pudimos guardar el diagnóstico de forma automática. ¡Pero no pierdas lo que completaste! Tocá el botón para mandarme todo por WhatsApp.
                    </p>
                    
                    <button
                      onClick={() => {
                        const message = `Hola Mariano! Tuve un error en la web pero acá están mis datos:\n\nSoy ${form.nombre.trim()} de ${form.empresa.trim()}.\n\n` +
                        `Rubro: ${form.rubro === "Otro" ? form.rubroOtro : form.rubro}\n` +
                        `Dolor: ${form.problemaPrincipal === "Otro" ? form.problemaOtro : form.problemaPrincipal}\n` +
                        `Venta: ${form.modalidadVenta}\n` +
                        `Procesos: ${form.tipoProcesos}\n` +
                        (form.mensaje ? `\nMensaje adicional:\n${form.mensaje}` : "");
                        window.open(whatsappHref(message), "_blank");
                        trackEvent("whatsapp_click_fallback", source);
                        onClose();
                      }}
                      className="inline-flex items-center justify-center h-[52px] px-8 rounded-lg bg-[#25D366] text-[#090B0B] font-bold hover:bg-[#1da851] transition-colors"
                    >
                      Enviar datos por WhatsApp →
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer nav */}
            {step > 1 && !submitted && !submitError && (
              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(s => s - 1)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#A6AEAA] hover:text-[#F3F5F4] transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Volver</span>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"""

with open("src/components/LeadFormModal.tsx", "w", encoding="utf-8") as f:
    f.write(content)

with open("src/pages/LeadFormPage.tsx", "w", encoding="utf-8") as f:
    # Similar content for the page version (no modal wrapper)
    page_content = content.replace("export default function LeadFormModal({ open, source, onClose }: Props) {", 
    """import { useNavigate } from "react-router-dom";
export default function LeadFormPage() {
  const open = true;
  const source = "page_contacto";
  const navigate = useNavigate();
  const onClose = () => navigate("/");
""")
    page_content = page_content.replace("""interface Props {
  open: boolean;
  source: string;
  onClose: () => void;
}""", "")
    page_content = page_content.replace("""className="fixed inset-0 z-50 flex items-center justify-center bg-[#090B0B]/80 px-4 backdrop-blur-sm overflow-y-auto py-10"
        >
          <div className="absolute inset-0" onClick={handleClose} />""", """className="min-h-screen flex items-center justify-center bg-[#090B0B] px-4 py-10"
        >""")
    f.write(page_content)

