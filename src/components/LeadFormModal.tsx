"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ctaFormPainOptions,
  ctaFormSubmitLabel,
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

function findOption(options: CtaFormOption[], value: string) {
  return options.find((opt) => opt.value === value);
}

function QuestionGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: CtaFormOption[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h4 className="mb-2 text-[13px] font-semibold leading-snug text-white/85">{title}</h4>
      <div className="flex flex-col gap-px border border-white/10 bg-white/10">
        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              aria-pressed={isActive}
              className={`px-4 py-3 text-left text-[13.5px] font-medium leading-snug text-white transition-colors ${
                isActive ? "bg-[#10B981]/[0.14]" : "bg-[#0A192F] hover:bg-[#10B981]/[0.12]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LeadFormModal({ open, source, onClose }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setSubmitting(false);
      trackEvent("modal_open", source);
    }
  }, [open, source]);

  const isValid =
    form.nombre.trim() !== "" &&
    form.negocio.trim() !== "" &&
    form.dolor !== "" &&
    form.volumen !== "" &&
    form.urgencia !== "";

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (!isValid || submitting) return;
    setSubmitting(true);

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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-[560px] flex-col border border-white/10 bg-[#0A192F]"
          >
            <div className="flex flex-none items-center justify-between border-b border-white/10 px-7 py-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#10B981]">
                Antes de escribirnos
              </span>
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="border-none bg-transparent p-1 text-xl leading-none text-white"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto p-7">
              <div>
                <h3 className="m-0 text-[21px] font-bold leading-tight tracking-tight text-white">
                  {ctaFormTitle}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{ctaFormSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Martín Gómez"
                    className="w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
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
                    placeholder="Ej: Ferretería Los Hermanos"
                    className="w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                  />
                </div>
              </div>

              <QuestionGroup
                title="1 — ¿Cuál es el mayor dolor de cabeza que tenés hoy en tu día a día?"
                options={ctaFormPainOptions}
                selected={form.dolor}
                onSelect={(value) => setForm((prev) => ({ ...prev, dolor: value }))}
              />
              <QuestionGroup
                title="2 — ¿Qué volumen de artículos o productos manejás aproximadamente?"
                options={ctaFormVolumeOptions}
                selected={form.volumen}
                onSelect={(value) => setForm((prev) => ({ ...prev, volumen: value }))}
              />
              <QuestionGroup
                title="3 — ¿Para cuándo sentís que necesitás tener esto ordenado?"
                options={ctaFormUrgencyOptions}
                selected={form.urgencia}
                onSelect={(value) => setForm((prev) => ({ ...prev, urgencia: value }))}
              />

              <button
                onClick={handleSubmit}
                disabled={!isValid || submitting}
                className="bg-[#10B981] px-4 py-3.5 text-center text-sm font-semibold text-[#05080F] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Enviando..." : ctaFormSubmitLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
