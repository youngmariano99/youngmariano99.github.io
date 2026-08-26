"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";
import { useLeadModal } from "../../lib/LeadModalContext";
import { MagneticButton } from "./MagneticButton";

export function ClosingCta({
  title,
  subtitle,
  buttonLabel,
  source,
  trustBadge,
}: {
  title: string;
  subtitle?: string;
  buttonLabel: string;
  source: string;
  trustBadge?: string;
}) {
  const { openLeadModal } = useLeadModal();
  return (
    <section className="relative border-t border-white/10 px-6 pb-20 pt-24 md:px-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto flex max-w-[900px] flex-col items-center gap-7 text-center"
      >
        <motion.h2 variants={fadeUp} className="max-w-[20ch] text-[30px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[44px]">
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={fadeUp} className="-mt-3 max-w-[52ch] text-[15px] leading-relaxed text-white/60 md:text-base">
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeUp}>
          <MagneticButton
            onClick={() => openLeadModal(source)}
            strength={0.25}
            className="inline-block rounded-[4px] border-none bg-[#10B981] px-10 py-6 text-lg font-bold text-[#0B1120] transition-colors hover:bg-[#0E9E70]"
          >
            {buttonLabel}
          </MagneticButton>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[16px] text-white/55">
          <a href="#" className="no-underline transition-colors hover:text-white">
            Términos y Condiciones
          </a>
          <a href="#" className="no-underline transition-colors hover:text-white">
            Política de Privacidad
          </a>
          <a href="#" className="no-underline transition-colors hover:text-white">
            Ingreso al Sistema
          </a>
        </motion.div>

        {trustBadge && (
          <motion.span variants={fadeUp} className="mt-4 text-[12px] uppercase tracking-[0.2em] text-white/35">
            🔒 {trustBadge}
          </motion.span>
        )}
      </motion.div>
    </section>
  );
}
