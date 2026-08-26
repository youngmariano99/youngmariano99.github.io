"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  ctaFormPainOptions,
  ctaFormSubtitle,
  ctaFormTitle,
  ctaFormUrgencyOptions,
  ctaFormVolumeOptions,
  whatsappHref,
} from "../data";
import { trackEvent } from "../lib/analytics";
import { computePriority } from "../lib/priority";
import { supabase } from "../lib/supabase";
import type { CtaFormOption } from "../types";

interface Props {
  open: boolean;
  source: string;
  onClose: () => void;
}

const EMPTY = { nombre: "", negocio: "", dolor: "", volumen: "", urgencia: "" };
type FormState = typeof EMPTY;

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const STEP_LABELS = ["Vos", "Dolor", "Volumen", "Urgencia"];
const TOTAL_STEPS = STEP_LABELS.length;

function findOption(options: CtaFormOption[], value: string) {
  return options.find((opt) => opt.value === value);
}

function buildMessage(form: FormState) {
  const dolorOpt = findOption(ctaFormPainOptions, form.dolor)!;
  const volumenOpt = findOption(ctaFormVolumeOptions, form.volumen)!;
  const urgenciaOpt = findOption(ctaFormUrgencyOptions, form.urgencia)!;
  const { score, label } = computePriority(dolorOpt.points + volumenOpt.points + urgenciaOpt.points);
  const nombre = form.nombre.trim();
  const negocio = form.negocio.trim();
  const message = [
    `Hola! Soy ${nombre} de ${negocio}.`,
    "",
    `Mi mayor problema: ${dolorOpt.label}`,
    `Volumen de productos: ${volumenOpt.label}`,
    `Urgencia: ${urgenciaOpt.label}`,
  ].join("\n");
  return { message, dolorOpt, volumenOpt, urgenciaOpt, score, label, nombre, negocio };
}

/* ------------------------------------------------------------------ */

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex flex-none gap-1.5 px-7 pt-5">
      {STEP_LABELS.map((_, i) => (
        <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-[#10B981]"
            initial={false}
            animate={{ width: i <= step ? "100%" : "0%" }}
            transition={{ duration: 0.35, ease: PREMIUM_EASE }}
          />
        </div>
      ))}
    </div>
  );
}

function OptionChip({
  option,
  selected,
  onSelect,
}: {
  option: CtaFormOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-[14px] font-medium leading-snug transition-colors ${
        selected
          ? "border-[#10B981] bg-[#10B981]/[0.12] text-white"
          : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25 hover:bg-white/[0.06]"
      }`}
    >
      <span>{option.label}</span>
      <span
        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border transition-colors ${
          selected ? "border-[#10B981] bg-[#10B981] text-[#05080F]" : "border-white/20 text-transparent"
        }`}
      >
        <Check size={13} strokeWidth={3} />
      </span>
    </motion.button>
  );
}

function StepShell({
  stepKey,
  eyebrow,
  title,
  children,
}: {
  stepKey: number;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: PREMIUM_EASE }}
      className="flex flex-col gap-5"
    >
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10B981]">{eyebrow}</span>
        <h3 className="mt-1.5 text-[19px] font-bold leading-snug tracking-tight text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function LeadFormModal({ open, source, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setStep(0);
      setSubmitting(false);
      trackEvent("modal_open", source);
    }
  }, [open, source]);

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const doSubmit = async (finalForm: FormState) => {
    setSubmitting(true);
    const { message, dolorOpt, volumenOpt, urgenciaOpt, score, label, nombre, negocio } = buildMessage(finalForm);

    try {
      const { error } = await supabase.from("cta_leads").insert({
        nombre,
        negocio,
        dolor: dolorOpt.value,
        volumen: volumenOpt.value,
        urgencia: urgenciaOpt.value,
        prioridad_score: score,
        prioridad_label: label,
        source,
        whatsapp_message: message,
      });
      if (error) console.error("No se pudo guardar el lead:", error);
    } catch (err) {
      console.error("No se pudo guardar el lead:", err);
    }

    trackEvent("form_submit", source);
    window.open(whatsappHref(message), "_blank");
    setSubmitting(false);
    onClose();
  };

  // Seleccionar una opción avanza solo — nada de tildar y después buscar
  // un botón "Siguiente" aparte. En el último paso, en vez de avanzar,
  // ya envía directo (un tap menos).
  const selectAndAdvance = (field: "dolor" | "volumen" | "urgencia", value: string) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    if (field === "urgencia") {
      setTimeout(() => doSubmit(nextForm), 180);
    } else {
      setTimeout(() => setStep((s) => s + 1), 180);
    }
  };

  const step0Valid = form.nombre.trim() !== "" && form.negocio.trim() !== "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: PREMIUM_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0A192F] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-none items-center justify-between px-7 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Paso {step + 1} de {TOTAL_STEPS}
              </span>
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="flex h-8 w-8 items-center justify-center rounded-full border-none bg-white/5 text-lg leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                &times;
              </button>
            </div>

            <ProgressBar step={step} />

            <div className="flex-1 overflow-y-auto px-7 pb-7 pt-6">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <StepShell stepKey={0} eyebrow="Antes de escribirnos" title={ctaFormTitle}>
                    <p className="-mt-2 text-[13.5px] leading-relaxed text-white/55">{ctaFormSubtitle}</p>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          autoFocus
                          value={form.nombre}
                          onChange={(e) => setForm((prev) => ({ ...prev, nombre: e.target.value }))}
                          placeholder="Ej: Martín Gómez"
                          className="w-full rounded-xl border border-white/15 bg-[#05080F] px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">
                          Nombre de tu negocio
                        </label>
                        <input
                          type="text"
                          value={form.negocio}
                          onChange={(e) => setForm((prev) => ({ ...prev, negocio: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && step0Valid) setStep(1);
                          }}
                          placeholder="Ej: Ferretería Los Hermanos"
                          className="w-full rounded-xl border border-white/15 bg-[#05080F] px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={!step0Valid}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-4 py-3.5 text-sm font-semibold text-[#05080F] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>Continuar</span>
                      <ArrowRight size={16} strokeWidth={2.25} />
                    </button>
                  </StepShell>
                )}

                {step === 1 && (
                  <StepShell
                    stepKey={1}
                    eyebrow="1 de 3"
                    title="¿Cuál es el mayor dolor de cabeza que tenés hoy?"
                  >
                    <div className="flex flex-col gap-2.5">
                      {ctaFormPainOptions.map((opt) => (
                        <OptionChip
                          key={opt.value}
                          option={opt}
                          selected={form.dolor === opt.value}
                          onSelect={() => selectAndAdvance("dolor", opt.value)}
                        />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell stepKey={2} eyebrow="2 de 3" title="¿Qué volumen de productos manejás?">
                    <div className="flex flex-col gap-2.5">
                      {ctaFormVolumeOptions.map((opt) => (
                        <OptionChip
                          key={opt.value}
                          option={opt}
                          selected={form.volumen === opt.value}
                          onSelect={() => selectAndAdvance("volumen", opt.value)}
                        />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 3 && (
                  <StepShell stepKey={3} eyebrow="3 de 3" title="¿Para cuándo necesitás tener esto ordenado?">
                    <div className="flex flex-col gap-2.5">
                      {ctaFormUrgencyOptions.map((opt) => (
                        <OptionChip
                          key={opt.value}
                          option={opt}
                          selected={form.urgencia === opt.value}
                          onSelect={() => selectAndAdvance("urgencia", opt.value)}
                        />
                      ))}
                    </div>
                    {submitting && <p className="text-center text-[13px] text-white/40">Enviando...</p>}
                  </StepShell>
                )}
              </AnimatePresence>

              {step > 0 && !submitting && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-5 inline-flex items-center gap-1.5 border-none bg-transparent p-0 text-[13px] font-semibold text-white/45 transition-colors hover:text-white"
                >
                  <ArrowLeft size={14} strokeWidth={2.25} />
                  <span>Volver</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
