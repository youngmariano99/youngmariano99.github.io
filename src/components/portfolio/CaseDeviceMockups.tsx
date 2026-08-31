"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const LAPTOP_MAX_WIDTH = { sm: 280, lg: 560 };
const PHONE_WIDTH = { sm: 92, lg: 190 };

// A partir de qué relación alto/ancho de la imagen la tratamos como una
// captura "de página completa" (tipo la extensión GoFullPage de Chrome) en
// vez de una captura de una sola pantalla. Una mobile normal ya viene alta
// de por sí (9:19.5 ≈ 2.16), así que el umbral queda apenas por encima —
// lo suficiente para no disparar en una sola pantalla, pero sin exigir una
// captura extremadamente larga para activar el scroll.
const LONG_IMAGE_RATIO = { laptop: 1.35, phone: 2.5 };

const SCROLL_TRANSITION = {
  duration: 14,
  times: [0, 0.1, 0.5, 0.6, 1],
  ease: "easeInOut" as const,
  repeat: Infinity,
};

/**
 * Si la imagen cargada es mucho más alta que ancha (una captura de página
 * completa), calcula qué % hay que subirla para que se vea el final —
 * medido contra el tamaño real ya renderizado del contenedor, no contra
 * proporciones fijas, así se ajusta solo a cualquier tamaño de frame.
 * Devuelve `null` mientras no aplica (imagen normal): en ese caso el
 * llamador debe mostrarla estática con object-cover, como antes.
 */
function useAutoScrollReveal(threshold: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scrollPct, setScrollPct] = useState<number | null>(null);

  const measure = () => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img || !img.naturalWidth) return;

    const ratio = img.naturalHeight / img.naturalWidth;
    if (ratio <= threshold) {
      setScrollPct(null);
      return;
    }
    const containerH = container.clientHeight;
    const renderedImgH = container.clientWidth * ratio; // la imagen se muestra a width:100%
    if (renderedImgH <= containerH) {
      setScrollPct(null);
      return;
    }
    setScrollPct(((renderedImgH - containerH) / renderedImgH) * 100);
  };

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { containerRef, imgRef, scrollPct, onLoad: measure };
}

function ScreenImage({
  imageUrl,
  alt,
  threshold,
}: {
  imageUrl: string;
  alt: string;
  threshold: number;
}) {
  const { containerRef, imgRef, scrollPct, onLoad } = useAutoScrollReveal(threshold);
  const isLong = scrollPct !== null;

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <motion.img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        onLoad={onLoad}
        className={isLong ? "absolute left-0 top-0 w-full" : "absolute inset-0 h-full w-full object-cover object-top"}
        animate={isLong ? { y: ["0%", "0%", `-${scrollPct}%`, `-${scrollPct}%`, "0%"] } : { y: 0 }}
        transition={isLong ? SCROLL_TRANSITION : undefined}
      />
    </div>
  );
}

/*
 * Mismo lenguaje visual que ProjectLaptopMockup.tsx (home) pero:
 * - toma una sola imagen estática (no crossfade), pensado para una
 *   captura fija por caso, no una animación de navegación del sitio.
 * - si la imagen es una captura de página completa (muy alta), la recorre
 *   con el mismo scroll automático en loop que usa ProjectLaptopMockup
 *   para su variante "scroll" — sube, hace una pausa, y vuelve.
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
    // Ancho explícito (no width:100% + max-width) — dentro del visor grande
    // el padre es un flex sin ancho propio (shrink-to-fit), así que
    // "100%" se resolvía contra ESE ancho ambiguo y terminaba quedando
    // chico en vez de crecer hasta el tope de 560px.
    <div className="[perspective:1600px]" style={{ width: `min(${LAPTOP_MAX_WIDTH[size]}px, 88vw)` }}>
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
                <ScreenImage imageUrl={imageUrl} alt="" threshold={LONG_IMAGE_RATIO.laptop} />
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
      style={{ width: `min(${PHONE_WIDTH[size]}px, 40vw)`, aspectRatio: "9 / 19.5" }}
    >
      <span className="absolute left-1/2 top-[5px] z-10 h-[3px] w-6 -translate-x-1/2 rounded-full bg-black/60" />
      <div className="relative h-full w-full overflow-hidden rounded-[13px] bg-gradient-to-br from-[#111A2C] via-[#0C1322] to-[#090E1A]">
        <ScreenImage imageUrl={imageUrl} alt="" threshold={LONG_IMAGE_RATIO.phone} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]" />
      </div>
      <span className="sr-only">{label}</span>
    </motion.div>
  );
}
