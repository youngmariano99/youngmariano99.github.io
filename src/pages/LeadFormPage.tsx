"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { supabase } from "../lib/supabase";
import { whatsappHref } from "../data";
import { Link, useNavigate } from "react-router-dom";

const EMPTY_FORM = {
  problemas: [] as string[],
  solucionActual: "",
  urgencia: "",
  rubro: "",
  rubroOtro: "",
  tamano: "",
  nombre: "",
  empresa: "",
  whatsapp: "",
  email: "",
  mensaje: ""
};

type FormState = typeof EMPTY_FORM;

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export default function LeadFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [rubrosOpciones, setRubrosOpciones] = useState<string[]>([
    "Gastronomía", "Comercio minorista", "Servicios profesionales", "Salud", "Educación", "Tecnología", "Industria", "Logística"
  ]);

  const source = "linktree_direct";

  useEffect(() => {
    supabase.from("cta_leads").select("rubro_otro").not("rubro_otro", "is", null).then(({ data }) => {
      if (data && data.length > 0) {
        const extra = data.map(d => d.rubro_otro?.trim() || "").filter(Boolean);
        const normalized = extra.map(r => r.charAt(0).toUpperCase() + r.slice(1).toLowerCase());
        setRubrosOpciones(prev => Array.from(new Set([...prev, ...normalized])).sort());
      }
    });
    trackEvent("form_started", source);
  }, []);

  const handleClose = () => {
    navigate("/");
  };
  };

  const advance = () => {
    trackEvent("form_step_completed", `step_${step}`);
    setStep(s => s + 1);
  };

  const computeScore = (f: FormState) => {
    let score = 0;
    if (f.problemas.length > 0 && !f.problemas.includes("Otro")) score += 20;
    if (f.urgencia === "Necesito resolverlo cuanto antes") score += 25;
    if (["6-15", "16-50", "50+"].includes(f.tamano)) score += 15;
    if (["Papel", "Una persona lo hace manualmente"].includes(f.solucionActual)) score += 15;
    if (f.urgencia === "Necesito resolverlo cuanto antes") score += 10;
    if (f.whatsapp.trim().length > 5) score += 10;
    return score;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 61) return "Alta";
    if (score >= 31) return "Media";
    return "Baja";
  };

  const doSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    const score = computeScore(form);
    const label = getScoreLabel(score);

    const message = `Hola! Soy ${form.nombre.trim()} de ${form.empresa.trim()}.\n\n` +
      `Problemas: ${form.problemas.join(", ")}\n` +
      `Solución actual: ${form.solucionActual}\n` +
      `Urgencia: ${form.urgencia}\n` +
      `Negocio: ${form.rubro === "Otro" ? form.rubroOtro : form.rubro} (${form.tamano} personas)\n` +
      (form.mensaje ? `\nMensaje adicional:\n${form.mensaje}` : "");

    try {
      const { error } = await supabase.from("cta_leads").insert({
        nombre: form.nombre,
        negocio: form.empresa,
        dolor: form.problemas.join(", "),
        volumen: form.tamano,
        urgencia: form.urgencia,
        prioridad_score: score,
        prioridad_label: label,
        source,
        whatsapp_message: message,
        email: form.email,
        telefono: form.whatsapp,
        rubro: form.rubro,
        rubro_otro: form.rubro === "Otro" ? form.rubroOtro : null
      });
      if (error) {
        console.error("No se pudo guardar el lead:", error);
        setSubmitError(true);
        setSubmitting(false);
        return;
      }
    } catch (err) {
      console.error("No se pudo guardar el lead:", err);
      setSubmitError(true);
      setSubmitting(false);
      return;
    }

    trackEvent("generate_lead", source);
    if (score >= 61) trackEvent("qualify_lead", source);
    
    setSubmitting(false);
    setSubmitted(true);
  };

  const toggleProblema = (val: string) => {
    setForm(prev => {
      const probs = prev.problemas.includes(val) 
        ? prev.problemas.filter(p => p !== val)
        : [...prev.problemas, val];
      
      trackEvent("problem_selected", val);
      return { ...prev, problemas: probs };
    });
  };

  const selectSingle = (field: keyof FormState, val: string, autoAdvance = true) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (autoAdvance) {
      setTimeout(advance, 250);
    }
  };

  return (
    <div className="min-h-screen bg-[#090B0B] flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <Link to="/" className="mb-8 flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-[3px] border-[#16D39A] group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xl font-display font-bold text-white tracking-tight">Nodexa.</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: PREMIUM_EASE }}
        className="flex w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111615] shadow-2xl"
      >
            {/* Header */}
            <div className="flex flex-none items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
              {!submitted ? (
                <div className="flex flex-col gap-1 w-full pr-8">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#16D39A]">
                    Paso {step} de 5
                  </span>
                  {/* Progress Bar */}
                  <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#16D39A]" 
                      initial={false}
                      animate={{ width: `${(step / 5) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              ) : (
                <span className="text-[14px] font-bold uppercase tracking-wider text-[#16D39A]">
                  ¡Listo!
                </span>
              )}
              
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
              <AnimatePresence mode="wait">
                
                {/* STEP 1 */}
                {step === 1 && !submitted && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">¿Qué problema querés resolver?</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Podés seleccionar más de uno.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Stock", "Ventas", "Administración", "Clientes", "Turnos", "Procesos manuales", "Página web", "Automatización", "Información / reportes", "Otro"].map(opt => (
                        <button
                          key={opt}
                          onClick={() => toggleProblema(opt)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl border text-[14px] font-medium transition-colors ${
                            form.problemas.includes(opt)
                              ? "border-[#16D39A] bg-[#16D39A]/10 text-[#F3F5F4]"
                              : "border-white/10 bg-[#0D1110]/40 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                          }`}
                        >
                          {opt}
                          {form.problemas.includes(opt) && <Check size={16} className="text-[#16D39A]" />}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      disabled={form.problemas.length === 0}
                      onClick={advance}
                      className="mt-8 flex items-center justify-center w-full h-[48px] rounded-lg bg-[#16D39A] text-[#090B0B] font-bold disabled:opacity-40 transition-opacity"
                    >
                      Continuar →
                    </button>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && !submitted && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">¿Cómo resolvés esto actualmente?</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">No necesitás saber de tecnología. Queremos entender cómo trabajás hoy.</p>
                    
                    <div className="flex flex-col gap-3">
                      {["Excel / planillas", "Papel", "WhatsApp", "Otro sistema", "Una persona lo hace manualmente", "No tenemos una solución", "Otro"].map(opt => (
                        <button
                          key={opt}
                          onClick={() => selectSingle("solucionActual", opt)}
                          className={`flex items-center justify-between px-5 py-4 rounded-xl border text-left text-[14px] font-medium transition-colors ${
                            form.solucionActual === opt
                              ? "border-[#16D39A] bg-[#16D39A]/10 text-[#F3F5F4]"
                              : "border-white/10 bg-[#0D1110]/40 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                          }`}
                        >
                          {opt}
                          {form.solucionActual === opt && <Check size={16} className="text-[#16D39A]" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && !submitted && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">¿Qué tan importante es solucionarlo?</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Esto nos ayuda a entender qué tipo de solución podría tener sentido.</p>
                    
                    <div className="flex flex-col gap-3">
                      {["Necesito resolverlo cuanto antes", "Me gustaría resolverlo durante los próximos meses", "Estoy investigando opciones"].map(opt => (
                        <button
                          key={opt}
                          onClick={() => selectSingle("urgencia", opt)}
                          className={`flex items-center justify-between px-5 py-4 rounded-xl border text-left text-[14px] font-medium transition-colors ${
                            form.urgencia === opt
                              ? "border-[#16D39A] bg-[#16D39A]/10 text-[#F3F5F4]"
                              : "border-white/10 bg-[#0D1110]/40 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                          }`}
                        >
                          {opt}
                          {form.urgencia === opt && <Check size={16} className="text-[#16D39A]" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4 */}
                {step === 4 && !submitted && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-6">Sobre tu negocio</h3>
                    
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="block text-[13px] font-semibold text-[#A6AEAA] mb-2">¿En qué rubro estás?</label>
                        <select 
                          value={form.rubro}
                          onChange={(e) => setForm(f => ({ ...f, rubro: e.target.value }))}
                          className="w-full h-[48px] rounded-lg border border-white/10 bg-[#0D1110]/40 px-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none mb-3"
                        >
                          <option value="" disabled>Seleccioná tu rubro</option>
                          {rubrosOpciones.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                          <option value="Otro">Otro (Especificar)</option>
                        </select>
                        
                        <AnimatePresence>
                          {form.rubro === "Otro" && (
                            <motion.input
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 48 }}
                              exit={{ opacity: 0, height: 0 }}
                              type="text"
                              placeholder="Escribí tu rubro..."
                              value={form.rubroOtro}
                              onChange={(e) => setForm(f => ({ ...f, rubroOtro: e.target.value }))}
                              className="w-full rounded-lg border border-white/10 bg-[#0D1110]/40 px-4 text-[14px] text-[#F3F5F4] focus:border-[#16D39A] outline-none"
                            />
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label className="block text-[13px] font-semibold text-[#A6AEAA] mb-2">Cantidad aproximada de personas</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["1-5", "6-15", "16-50", "50+"].map(opt => (
                            <button
                              key={opt}
                              onClick={() => setForm(f => ({ ...f, tamano: opt }))}
                              className={`flex items-center justify-center px-4 py-3 rounded-lg border text-[14px] font-medium transition-colors ${
                                form.tamano === opt
                                  ? "border-[#16D39A] bg-[#16D39A]/10 text-[#F3F5F4]"
                                  : "border-white/10 bg-[#0D1110]/40 text-[#A6AEAA] hover:border-white/20 hover:text-[#F3F5F4]"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={!form.rubro || (form.rubro === "Otro" && !form.rubroOtro) || !form.tamano}
                      onClick={advance}
                      className="mt-8 flex items-center justify-center w-full h-[48px] rounded-lg bg-[#16D39A] text-[#090B0B] font-bold disabled:opacity-40 transition-opacity"
                    >
                      Continuar →
                    </button>
                  </motion.div>
                )}

                {/* STEP 5 */}
                {step === 5 && !submitted && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-2">Ahora sí: tus datos</h3>
                    <p className="text-[14px] text-[#A6AEAA] mb-6">Para enviarte una propuesta justa y contactarte.</p>
                    
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
                    <h3 className="text-[28px] font-bold text-[#F3F5F4] mb-3">¡Gracias!</h3>
                    <p className="text-[15px] text-[#A6AEAA] max-w-[340px] leading-relaxed mb-8">
                      Ya tenemos una idea mucho más clara de lo que necesitás. Revisamos tu situación y nos ponemos en contacto.
                    </p>
                    
                    <button
                      onClick={() => {
                        const message = `Hola! Soy ${form.nombre.trim()} de ${form.empresa.trim()}.\n\n` +
                        `Quiero charlar sobre mi negocio. Ya completé el formulario en la web.`;
                        window.open(whatsappHref(message), "_blank");
                        trackEvent("whatsapp_click", source);
                        onClose();
                      }}
                      className="inline-flex items-center justify-center h-[52px] px-8 rounded-lg bg-[#16D39A] text-[#090B0B] font-bold hover:bg-[#12b382] transition-colors"
                    >
                      Continuar por WhatsApp →
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
                      No pudimos guardar tus datos de forma automática. ¡Pero no pierdas lo que completaste! Tocá el botón para enviarnos todo por WhatsApp.
                    </p>
                    
                    <button
                      onClick={() => {
                        const message = `Hola! Tuve un error en la web pero acá están mis datos:\n\nSoy ${form.nombre.trim()} de ${form.empresa.trim()}.\n\n` +
                        `Problemas: ${form.problemas.join(", ")}\n` +
                        `Solución actual: ${form.solucionActual}\n` +
                        `Urgencia: ${form.urgencia}\n` +
                        `Negocio: ${form.rubro === "Otro" ? form.rubroOtro : form.rubro} (${form.tamano} personas)\n` +
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
    </div>
  );
}
