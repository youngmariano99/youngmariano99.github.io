"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services, servicesEyebrow, servicesTitle, whatsappHref } from "../data";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { AnimatedTitle } from "./shared/AnimatedTitle";
import { MagneticButton } from "./shared/MagneticButton";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/*
 * Consola de Control de Servicios: selector tipo terminal a la izquierda,
 * panel glassmorphism a la derecha que responde en vivo. El nodo superior
 * retoma visualmente el lenguaje de <WorldNode> del viaje — la red neuronal
 * de fondo (NeuralCanvas, fixed global) sigue corriendo detrás sin cortes.
 */
export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section
      id="servicios"
      className="relative mx-auto max-w-[1440px] border-t border-white/10 px-6 pb-24 pt-24 md:px-10 lg:pb-32 lg:pt-32"
    >
      {/* nodo de continuación: la línea del viaje "sigue" hasta acá */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <motion.span
          className="absolute inset-0 -m-2.5 rounded-full border border-[#10B981]/35"
          animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
          transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity }}
        />
        <span
          className="relative block h-2.5 w-2.5 rounded-full bg-white"
          style={{ boxShadow: "0 0 4px 1px #fff, 0 0 18px 5px rgba(16,185,129,0.9)" }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="flex flex-col items-center text-center"
      >
        <motion.span
          variants={fadeUp}
          className="text-[13px] font-semibold uppercase tracking-widest text-[#10B981]"
        >
          {servicesEyebrow}
        </motion.span>
        <AnimatedTitle
          lines={[servicesTitle]}
          className="mt-4 max-w-[24ch] text-[28px] font-bold leading-[1.15] tracking-tight text-white md:text-[36px] lg:text-[42px]"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
      >
        {/* ---------------- Columna izquierda: selector terminal ---------------- */}
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10 lg:border-y-0 lg:border-t">
          {services.map((service, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={service.index}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                aria-pressed={isActive}
                className={`group relative flex items-center gap-5 border-l-2 py-6 pl-6 text-left transition-colors duration-300 ${
                  isActive
                    ? "border-[#10B981] bg-white/[0.03]"
                    : "border-transparent hover:border-white/20 hover:bg-white/[0.02]"
                }`}
              >
                <span
                  className={`font-mono text-xs tabular-nums transition-colors duration-300 ${
                    isActive ? "text-[#10B981]" : "text-white/35"
                  }`}
                >
                  {service.index}
                </span>
                <span className="relative flex h-2 w-2 flex-none items-center justify-center">
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 -m-1.5 rounded-full border border-[#10B981]/40"
                      animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
                    />
                  )}
                  <span
                    className={`block h-full w-full rounded-full transition-all duration-300 ${
                      isActive ? "bg-[#10B981]" : "bg-white/25"
                    }`}
                    style={isActive ? { boxShadow: "0 0 8px 2px rgba(16,185,129,0.7)" } : undefined}
                  />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/50"
                    }`}
                  >
                    {service.title}
                  </span>
                  {service.subtitle && (
                    <span className="text-[12px] font-normal text-white/35">({service.subtitle})</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- Columna derecha: panel de visualización ---------------- */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-black/80 p-8 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-xl md:p-10">
          <div className="mb-8 flex items-center gap-2 border-b border-white/10 pb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/60" />
            <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
              nodexa — servicio {active.index}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#10B981]">
                {active.index}
              </span>
              <h3 className="mt-3 text-[26px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[32px]">
                {active.title}
                {active.subtitle && (
                  <span className="ml-2 align-middle text-[15px] font-medium text-white/40">
                    ({active.subtitle})
                  </span>
                )}
              </h3>
              <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white/65 md:text-base">
                {active.description}
              </p>

              {/* NODEXA Custom y NODEXA Modular tienen su propia página con
                  detalle y precios — el resto sigue abriendo WhatsApp directo. */}
              {active.route ? (
                <Link
                  to={active.route}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] no-underline transition-colors hover:text-white"
                >
                  <span>{active.ctaLabel ?? `Quiero ${active.title.toLowerCase()}`}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ) : (
                <MagneticButton
                  href={whatsappHref(`Hola, quiero más información sobre "${active.title}".`)}
                  target="_blank"
                  rel="noopener"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] no-underline transition-colors hover:text-white"
                >
                  <span>Quiero {active.title.toLowerCase()}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </MagneticButton>
              )}
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
