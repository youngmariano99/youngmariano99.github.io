"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { diagnosticOptions, whatsappHref, WHATSAPP_QUICK_MESSAGE } from "../data";

interface Props {
  open: boolean;
  onClose: () => void;
}

const OTHER_VALUE = "otro";

export default function DiagnosticModal({ open, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");

  const reset = () => {
    setSelected(null);
    setOtherText("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const selectDiagnostic = (value: string, label: string) => {
    if (value === OTHER_VALUE) {
      setSelected(OTHER_VALUE);
      return;
    }
    setSelected(value);
    window.open(whatsappHref(`Hola, mi problema es: ${label}`), "_blank");
  };

  const isOtherSelected = selected === OTHER_VALUE;
  const otherTextTrimmed = otherText.trim();

  const handleContinue = () => {
    const message =
      isOtherSelected && otherTextTrimmed
        ? `Hola, mi problema es: ${otherTextTrimmed}`
        : WHATSAPP_QUICK_MESSAGE;
    window.open(whatsappHref(message), "_blank");
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
            className="w-full max-w-[520px] border border-white/10 bg-[#0A192F]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#10B981]">
                Diagnóstico Rápido
              </span>
              <button
                onClick={handleClose}
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
                {diagnosticOptions.map((opt) => {
                  const isActive = selected === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => selectDiagnostic(opt.value, opt.label)}
                      aria-pressed={isActive}
                      className={`px-5 py-4 text-left text-sm font-medium text-white transition-colors ${
                        isActive ? "bg-[#10B981]/[0.14]" : "bg-[#0A192F] hover:bg-[#10B981]/[0.12]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isOtherSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <textarea
                      autoFocus
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      placeholder="Contanos brevemente cuál es tu problema..."
                      rows={3}
                      className="w-full resize-none border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleContinue}
                disabled={isOtherSelected && !otherTextTrimmed}
                className="bg-[#10B981] px-4 py-3.5 text-center text-sm font-semibold text-[#05080F] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isOtherSelected ? "Enviar por WhatsApp" : "Continuar por WhatsApp"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
