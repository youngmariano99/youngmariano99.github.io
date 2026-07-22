"use client";

import { AnimatePresence, motion } from "framer-motion";
import { diagnosticOptions, whatsappHref, WHATSAPP_QUICK_MESSAGE } from "../data";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DiagnosticModal({ open, onClose }: Props) {
  const selectDiagnostic = (value: string) => {
    window.open(
      whatsappHref(`Hola, mi cuello de botella operativo es: ${value}`),
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {open && (
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
            className="w-full max-w-[520px] border border-white/10 bg-[#0A192F]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#10B981]">
                Diagnóstico Rápido
              </span>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="border-none bg-transparent p-1 text-xl leading-none text-white"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-5 p-7">
              <h3 className="m-0 text-[22px] font-bold leading-tight tracking-tight text-white">
                ¿Cuál es el mayor cuello de botella operativo hoy?
              </h3>

              <div className="flex flex-col gap-px border border-white/10 bg-white/10">
                {diagnosticOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectDiagnostic(opt.value)}
                    className="bg-[#0A192F] px-5 py-4 text-left text-sm font-medium text-white transition-colors hover:bg-[#10B981]/[0.12]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <a
                href={whatsappHref(WHATSAPP_QUICK_MESSAGE)}
                target="_blank"
                rel="noopener"
                className="bg-[#10B981] px-4 py-3.5 text-center text-sm font-semibold text-[#05080F] no-underline"
              >
                Continuar por WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
