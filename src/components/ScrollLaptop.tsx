"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ProjectCard } from "../data";

/*
 * Laptop 3D controlada por scroll — render de alta fidelidad.
 * `lid` es el ángulo de la tapa en grados: -88 (cerrada) → 0 (abierta).
 * El padre lo deriva de scrollYProgress (con spring) y lo pasa como
 * MotionValue, así este componente queda 100% presentacional.
 */
export default function ScrollLaptop({
  project,
  lid,
}: {
  project: ProjectCard;
  lid: MotionValue<number>;
}) {
  // La pantalla "enciende" a medida que se abre la tapa
  const screenGlow = useTransform(lid, [-75, -12], [0, 1]);

  return (
    <div className="w-full max-w-[320px] [perspective:1600px] md:max-w-[460px]">
      <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(8deg)" }}>
        {/* TAPA / PANTALLA — bisel negro estilo MacBook, gira sobre su borde inferior */}
        <motion.div
          style={{ rotateX: lid, transformOrigin: "50% 100%" }}
          className="relative aspect-[16/10] rounded-xl border border-white/[0.08] bg-[#05070C] p-[2.6%] shadow-2xl shadow-emerald-500/10"
        >
          {/* cámara del equipo */}
          <span className="absolute left-1/2 top-[1.8%] z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-white/30" />

          {/* pantalla dentro del bisel: reemplazar el placeholder por
              <img src={project.imagen} alt={project.nombre} className="h-full w-full object-cover" /> */}
          <motion.div
            style={{ opacity: screenGlow }}
            className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#111A2C] via-[#0C1322] to-[#090E1A]"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-black/30 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/70" />
                <span className="ml-2 text-[9px] font-medium tracking-wide text-white/40">
                  {project.nombre}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <span className="px-4 text-center text-[9px] font-medium uppercase tracking-[0.25em] text-white/30">
                  Captura — {project.tagline}
                </span>
              </div>
            </div>

            {/* brillo glass sobre el vidrio de la pantalla */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.09]" />
            {/* resplandor emerald sutil desde abajo */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(16,185,129,0.08), transparent 70%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* BASE / TECLADO — deck de aluminio, apenas más ancho que la tapa */}
        <div className="relative mx-auto -mt-px h-[13px] w-[104%] -translate-x-[2%] rounded-b-2xl rounded-t-[3px] border-x border-b border-white/10 bg-gradient-to-b from-[#2A3444] via-[#1A2230] to-[#10151F] shadow-xl shadow-black/50">
          <span className="absolute left-1/2 top-0 h-[5px] w-24 -translate-x-1/2 rounded-b-lg bg-black/60" />
        </div>
      </div>
    </div>
  );
}
