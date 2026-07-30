"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

const ACCENT = "#10B981";

export function ProblemSolutionSection({
  problemLabel = "El problema",
  problemText,
  solutionLabel,
  solutionText,
}: {
  problemLabel?: string;
  problemText: string;
  solutionLabel: string;
  solutionText: string;
}) {
  return (
    <section className="relative mx-auto max-w-[1200px] px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-red-500/25 bg-black/50 p-8 backdrop-blur-md md:p-9"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400/80">
            {problemLabel}
          </span>
          <p className="mt-4 text-[19px] font-semibold leading-snug text-white/85 md:text-[21px]">
            {problemText}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-emerald-500/30 bg-black/50 p-8 backdrop-blur-md md:p-9"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            {solutionLabel}
          </span>
          <p className="mt-4 text-[19px] font-semibold leading-snug text-white md:text-[21px]">
            {solutionText}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
