"use client";

import { motion } from "framer-motion";
import { authorityBody, authorityEyebrow, authorityLines, authorityQuote } from "../data";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { AnimatedTitle } from "./shared/AnimatedTitle";

export default function Authority() {
  return (
    <section
      id="autoridad"
      className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 border-t border-white/10 px-6 py-24 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-32"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="aspect-[4/5] w-full overflow-hidden border border-white/10 bg-white/[0.03]"
      >
        <img
          src="/mariano-portrait.png"
          alt="Mariano - Fundador de Nodexa"
          className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="flex flex-col gap-6"
      >
        <motion.span
          variants={fadeUp}
          className="text-[13px] font-semibold uppercase tracking-widest text-[#10B981]"
        >
          {authorityEyebrow}
        </motion.span>
        <AnimatedTitle
          lines={authorityLines}
          className="text-[28px] font-bold leading-[1.15] tracking-tight text-white md:text-[36px] lg:text-[42px]"
        />
        <motion.p variants={fadeUp} className="max-w-[56ch] text-lg font-medium leading-[1.6] text-white">
          {authorityQuote}
        </motion.p>
        <motion.p variants={fadeUp} className="max-w-[56ch] text-base leading-[1.7] text-white/65">
          {authorityBody}
        </motion.p>
      </motion.div>
    </section>
  );
}
