"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  dolorFormLabel,
  dolorFormOptions,
  dolorOtroLabel,
  dolorOtroPlaceholder,
  dolorOtroValue,
  downloadModalTitle,
  downloadModalSubtitleLines,
  downloadNameLabel,
  downloadNamePlaceholder,
  downloadSubmitLabel,
  rubroLabel,
  rubroOptions,
  rubroOtroLabel,
  rubroOtroPlaceholder,
  rubroOtroValue,
  typeCtaLabels,
} from "../recursosData";
import { trackEvent } from "../lib/analytics";
import { supabase } from "../lib/supabase";
import type { Resource } from "../types";

interface Props {
  resource: Resource | null;
  onClose: () => void;
}

const EMPTY = { nombre: "", rubro: "", rubroOtro: "", dolor: "", dolorOtro: "" };

export default function ResourceDownloadModal({ resource, onClose }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (resource) {
      setForm(EMPTY);
      setSubmitting(false);
      setReady(false);
      trackEvent("modal_open", `recurso_${resource.id}`);
    }
  }, [resource]);

  const rubroValid = form.rubro !== "" && (form.rubro !== rubroOtroValue || form.rubroOtro.trim() !== "");
  const dolorValid = form.dolor !== "" && (form.dolor !== dolorOtroValue || form.dolorOtro.trim() !== "");
  const isValid = form.nombre.trim() !== "" && rubroValid && dolorValid;

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (!resource || !isValid || submitting) return;
    setSubmitting(true);

    const nombre = form.nombre.trim();

    try {
      const { error } = await supabase.from("resource_leads").insert({
        nombre,
        rubro: form.rubro,
        rubro_otro: form.rubro === rubroOtroValue ? form.rubroOtro.trim() : null,
        dolor: form.dolor,
        dolor_otro: form.dolor === dolorOtroValue ? form.dolorOtro.trim() : null,
        resource_id: resource.id,
        resource_titulo: resource.titulo,
      });
      if (error) console.error("No se pudo guardar el lead del recurso:", error);
    } catch (err) {
      console.error("No se pudo guardar el lead del recurso:", err);
    }

    trackEvent("form_submit", `recurso_${resource.id}`);
    window.open(resource.url_acceso, "_blank");
    setSubmitting(false);
    setReady(true);
  };

  const open = resource !== null;

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
            className="flex max-h-[88vh] w-full max-w-[480px] flex-col border border-white/10 bg-[#0A192F]"
          >
            <div className="flex flex-none items-center justify-between border-b border-white/10 px-7 py-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#10B981]">
                {resource?.titulo}
              </span>
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="border-none bg-transparent p-1 text-xl leading-none text-white"
              >
                &times;
              </button>
            </div>

            {ready ? (
              <div className="flex flex-col items-start gap-5 p-7">
                <h3 className="m-0 text-[20px] font-bold leading-tight tracking-tight text-white">
                  Listo — ya podés usar tu recurso.
                </h3>
                <p className="text-[13.5px] leading-relaxed text-white/55">
                  Si la descarga no se abrió sola, usá este botón.
                </p>
                <a
                  href={resource?.url_acceso}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 bg-[#10B981] px-5 py-3 text-sm font-semibold text-[#090B0B] no-underline"
                >
                  <span>{resource ? typeCtaLabels[resource.tipo] : ""}</span>
                  <ArrowRight size={16} strokeWidth={2} />
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-6 overflow-y-auto p-7">
                <div>
                  <h3 className="m-0 text-[21px] font-bold leading-tight tracking-tight text-white">
                    {downloadModalTitle}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1">
                    {downloadModalSubtitleLines.map((line) => (
                      <p key={line} className="text-[13px] leading-relaxed text-white/55">
                        │ {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">
                    {downloadNameLabel}
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder={downloadNamePlaceholder}
                    className="w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">{rubroLabel}</label>
                  <select
                    value={form.rubro}
                    onChange={(e) => setForm((prev) => ({ ...prev, rubro: e.target.value }))}
                    className="w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white focus:border-[#10B981] focus:outline-none"
                  >
                    <option value="" disabled>
                      Elegí una opción
                    </option>
                    {rubroOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                    <option value={rubroOtroValue}>{rubroOtroLabel}</option>
                  </select>
                  {form.rubro === rubroOtroValue && (
                    <input
                      type="text"
                      autoFocus
                      value={form.rubroOtro}
                      onChange={(e) => setForm((prev) => ({ ...prev, rubroOtro: e.target.value }))}
                      placeholder={rubroOtroPlaceholder}
                      className="mt-2 w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">
                    {dolorFormLabel}
                  </label>
                  <select
                    value={form.dolor}
                    onChange={(e) => setForm((prev) => ({ ...prev, dolor: e.target.value }))}
                    className="w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white focus:border-[#10B981] focus:outline-none"
                  >
                    <option value="" disabled>
                      Elegí una opción
                    </option>
                    {dolorFormOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                    <option value={dolorOtroValue}>{dolorOtroLabel}</option>
                  </select>
                  {form.dolor === dolorOtroValue && (
                    <input
                      type="text"
                      autoFocus
                      value={form.dolorOtro}
                      onChange={(e) => setForm((prev) => ({ ...prev, dolorOtro: e.target.value }))}
                      placeholder={dolorOtroPlaceholder}
                      className="mt-2 w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                    />
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!isValid || submitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] px-4 py-3.5 text-center text-sm font-semibold text-[#090B0B] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight size={16} strokeWidth={2} />
                  <span>{submitting ? "Un momento..." : downloadSubmitLabel}</span>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
