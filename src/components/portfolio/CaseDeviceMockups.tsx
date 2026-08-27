"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const LAPTOP_MAX_WIDTH = { sm: 280, lg: 560 };
const PHONE_WIDTH = { sm: 92, lg: 190 };

/*
 * Mismo lenguaje visual que ProjectLaptopMockup.tsx (home) pero:
 * - toma una sola imagen estática (no crossfade/scroll), pensado para una
 *   captura fija por caso, no una animación de navegación del sitio.
 * - la tapa la controla un click (open/close), no el scroll.
 * - `size="lg"` es la versión grande que se usa en el visor a pantalla
 *   completa (DeviceViewerOverlay) — "sm" es la miniatura del muro.
 */
export function LaptopFrame({
  imageUrl,
  open,
  label,
  size = "sm",
}: {
  imageUrl: string;
  open: boolean;
  label: string;
  size?: "sm" | "lg";
}) {
  const target = useMotionValue(open ? 0 : -78);
  const lid = useSpring(target, { stiffness: 120, damping: 20 });
  const screenGlow = useTransform(lid, [-75, -12], [0, 1]);

  useEffect(() => {
    target.set(open ? 0 : -78);
  }, [open, target]);

  return (
    <div className="w-full [perspective:1600px]" style={{ maxWidth: LAPTOP_MAX_WIDTH[size] }}>
      <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(8deg)" }}>
        <motion.div
          style={{ rotateX: lid, transformOrigin: "50% 100%" }}
          className="relative aspect-[16/10] rounded-xl border border-white/[0.08] bg-[#05070C] p-[2.6%] shadow-2xl shadow-emerald-500/10"
        >
          <span className="absolute left-1/2 top-[1.8%] z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-white/30" />

          <motion.div
            style={{ opacity: screenGlow }}
            className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#111A2C] via-[#0C1322] to-[#090E1A]"
          >
            <div className="flex h-full flex-col">
              <div className="relative z-10 flex items-center gap-1.5 border-b border-white/[0.07] bg-black/40 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/70" />
                <span className="ml-2 truncate text-[9px] font-medium tracking-wide text-white/40">{label}</span>
              </div>
              <div className="relative flex-1 overflow-hidden">
                <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.09]" />
          </motion.div>
        </motion.div>

        <div className="relative mx-auto -mt-px h-[11px] w-[104%] -translate-x-[2%] rounded-b-2xl rounded-t-[3px] border-x border-b border-white/10 bg-gradient-to-b from-[#2A3444] via-[#1A2230] to-[#10151F] shadow-xl shadow-black/50">
          <span className="absolute left-1/2 top-0 h-[4px] w-20 -translate-x-1/2 rounded-b-lg bg-black/60" />
        </div>
      </div>
    </div>
  );
}

export function PhoneFrame({
  imageUrl,
  open,
  label,
  size = "sm",
}: {
  imageUrl: string;
  open: boolean;
  label: string;
  size?: "sm" | "lg";
}) {
  return (
    <motion.div
      animate={{ opacity: open ? 1 : 0.35, scale: open ? 1 : 0.94, y: open ? 0 : 6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-none overflow-hidden rounded-[16px] border border-white/[0.1] bg-[#05070C] p-[3px] shadow-xl shadow-black/40"
      style={{ width: PHONE_WIDTH[size], aspectRatio: "9 / 19.5" }}
    >
      <span className="absolute left-1/2 top-[5px] z-10 h-[3px] w-6 -translate-x-1/2 rounded-full bg-black/60" />
      <div className="relative h-full w-full overflow-hidden rounded-[13px] bg-gradient-to-br from-[#111A2C] via-[#0C1322] to-[#090E1A]">
        <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
      </div>
      <span className="sr-only">{label}</span>
    </motion.div>
  );
}
