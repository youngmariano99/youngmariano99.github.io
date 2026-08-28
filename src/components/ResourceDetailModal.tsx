"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileSpreadsheet, FileText, Globe, ZoomIn } from "lucide-react";
import {
  detailContinueCta,
  detailStepsLabel,
  detailWhyFormEyebrow,
  detailWhyFormLines,
  typeBadgeLabels,
} from "../recursosData";
import ImageLightbox from "./ImageLightbox";
import type { Resource } from "../types";

interface Props {
  resource: Resource | null;
  onClose: () => void;
  onContinue: () => void;
}

const TYPE_ICONS: Record<Resource["tipo"], () => JSX.Element> = {
  excel: () => <FileSpreadsheet size={13} strokeWidth={2} />,
  web: () => <Globe size={13} strokeWidth={2} />,
  pdf: () => <FileText size={13} strokeWidth={2} />,
};

export default function ResourceDetailModal({ resource, onClose, onContinue }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const open = resource !== null;

  const images = resource
    ? [resource.imagen_principal_url, ...(resource.galeria_urls ?? [])].filter((u): u is string => !!u)
    : [];
  const pasos = resource?.pasos ?? [];

  const TypeIcon = resource ? TYPE_ICONS[resource.tipo] : null;

  return (
    <Fragment>
      <AnimatePresence>
        {open && resource && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
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
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#10B981]">
                {TypeIcon && <TypeIcon />}
                {typeBadgeLabels[resource.tipo]}
              </span>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="border-none bg-transparent p-1 text-xl leading-none text-white"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto p-7">
              {images.length > 0 && (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setLightboxSrc(images[activeImage])}
                    aria-label="Ver imagen más grande"
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30"
                  >
                    <img src={images[activeImage]} alt={resource.titulo} className="w-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11.5px] font-semibold text-white">
                        <ZoomIn size={13} strokeWidth={2} />
                        Ampliar
                      </span>
                    </span>
                  </button>
                  {images.length > 1 && (
                    <div className="flex gap-2">
                      {images.map((url, i) => (
                        <button
                          key={url}
                          onClick={() => setActiveImage(i)}
                          className={`h-14 w-14 flex-none overflow-hidden rounded-lg border transition-colors ${
                            i === activeImage ? "border-[#10B981]" : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <img src={url} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <h3 className="m-0 text-[21px] font-bold leading-tight tracking-tight text-white">
                  {resource.titulo}
                </h3>
                <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-white/65">
                  {resource.descripcion}
                </p>
              </div>

              {pasos.length > 0 && (
                <div>
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-white/45">
                    {detailStepsLabel}
                  </span>
                  <div className="mt-3 flex flex-col">
                    {pasos.map((paso, i) => (
                      <div key={paso.titulo} className="relative flex gap-4 pb-5 last:pb-0">
                        {i < pasos.length - 1 && (
                          <span className="absolute left-[13px] top-8 h-full w-px bg-gradient-to-b from-emerald-500/40 to-transparent" />
                        )}
                        <span className="relative z-10 flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/[0.08] font-mono text-[10.5px] font-semibold text-[#10B981]">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className="text-[13.5px] font-bold text-white">{paso.titulo}</h4>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-white/55">{paso.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border border-white/10 bg-white/[0.03] p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">
                  {detailWhyFormEyebrow}
                </span>
                <div className="mt-2 flex flex-col gap-1">
                  {detailWhyFormLines.map((line) => (
                    <p key={line} className="text-[12.5px] leading-relaxed text-white/55">
                      │ {line}
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={onContinue}
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] px-4 py-3.5 text-center text-sm font-semibold text-[#090B0B] transition-colors hover:bg-[#0EA672]"
              >
                <span>{detailContinueCta}</span>
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
      <ImageLightbox src={lightboxSrc} alt={resource?.titulo} onClose={() => setLightboxSrc(null)} />
    </Fragment>
  );
}
