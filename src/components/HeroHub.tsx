"use client";

import { motion } from "framer-motion";
import {
  heroLines,
  heroPrimaryCta,
  heroSecondaryCta,
  heroSubtitle,
  whatsappHref,
  WHATSAPP_QUICK_MESSAGE,
} from "../data";
import { AnimatedTitle } from "./shared/AnimatedTitle";
import { MagneticButton } from "./shared/MagneticButton";

export default function HeroHub({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Video de fondo inmersivo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/NODEXA_logo_HERO.mp4" type="video/mp4" />
      </video>
      {/* capa oscura para que el título y el CTA destaquen sobre el video */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="relative flex flex-col items-center">
        <AnimatedTitle
          as="h1"
          lines={heroLines}
          className="max-w-[22ch] text-[34px] font-extrabold leading-[1.08] tracking-tight text-white md:text-[54px] lg:text-[64px]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/70 md:text-lg"
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <MagneticButton
            onClick={onOpenModal}
            className="rounded-[4px] border-none bg-[#10B981] px-8 py-4 text-[15px] font-semibold text-[#0B1120] transition-colors hover:bg-[#0E9E70]"
          >
            {heroPrimaryCta}
          </MagneticButton>
          <a
            href={whatsappHref(WHATSAPP_QUICK_MESSAGE)}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 no-underline transition-colors hover:text-white/90"
          >
            <span>{heroSecondaryCta}</span>
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        {/* Hub central: el origen de la línea de datos — se retoma como
            "Todo comienza aquí" apenas arranca el viaje pineado de abajo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative mt-20 flex h-10 w-10 items-center justify-center"
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-[#10B981]/40"
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-[#10B981]/40"
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity, delay: 1.3 }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full bg-[#10B981]"
            style={{ boxShadow: "0 0 12px rgba(16,185,129,0.6)" }}
          />
        </motion.div>
      </div>

      <motion.span
        className="absolute bottom-7 text-[11px] font-medium uppercase tracking-[0.3em] text-white/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      >
        Scroll
      </motion.span>
    </section>
  );
}
