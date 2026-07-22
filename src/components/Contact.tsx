"use client";

import { motion } from "framer-motion";
import { contactLines } from "../data";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { AnimatedTitle } from "./shared/AnimatedTitle";
import { MagneticButton } from "./shared/MagneticButton";

export default function Contact({ onOpenModal }: { onOpenModal: () => void }) {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contacto" className="border-t border-white/10 px-6 pt-32 md:px-10">
      {/* CTA final con amplio aire respecto del footer */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto mb-32 flex max-w-[1440px] flex-col items-center gap-7 text-center"
      >
        <AnimatedTitle
          lines={contactLines}
          className="max-w-[20ch] text-[30px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[42px] lg:text-[52px]"
        />
        <motion.p variants={fadeUp} className="max-w-[44ch] text-[17px] leading-relaxed text-white/60">
          Comencemos a mapear la solución que tu operativa necesita para
          escalar.
        </motion.p>
        <motion.div variants={fadeUp}>
          <MagneticButton
            onClick={onOpenModal}
            strength={0.25}
            className="mt-3 inline-block rounded-[4px] border-none bg-[#10B981] px-10 py-6 text-lg font-bold text-[#0B1120] transition-colors hover:bg-[#0E9E70]"
          >
            Agendar Diagnóstico por WhatsApp
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Footer: enlaces legales + marca de agua gigante completa, con aire */}
      <footer className="relative -mx-6 border-t border-white/10 px-6 md:-mx-10 md:px-10">
        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 pt-14">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white">
              <span className="text-[11px] font-bold tracking-tight text-[#0B1120]">MY</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">Nodexa</span>
          </div>

          <div className="flex flex-wrap items-center gap-7">
            <span className="text-xs text-white/45">
              &copy; {currentYear} Nodexa. Todos los derechos reservados.
            </span>
            <a href="#privacidad" className="text-xs text-white/55 no-underline hover:text-white">
              Aviso de Privacidad
            </a>
            <a href="#terminos" className="text-xs text-white/55 no-underline hover:text-white">
              Términos de Servicio
            </a>
            <span className="text-xs text-white/45">Conexión segura SSL</span>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none select-none pb-16 pt-10 text-center">
          <span
            className="block whitespace-nowrap font-black uppercase leading-[0.85] tracking-tighter text-white/[0.03]"
            style={{ fontSize: "clamp(80px, 16vw, 250px)" }}
          >
            Nodexa
          </span>
        </div>
      </footer>
    </section>
  );
}
