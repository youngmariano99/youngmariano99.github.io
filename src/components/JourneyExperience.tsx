"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  journeyPhases,
  journeyStartPhase,
  projects,
  projectsFinalCta,
  projectsFinalTitle,
  type JourneyPhase,
  type ProjectCard,
} from "../data";
import { MagneticButton } from "./shared/MagneticButton";
import ScrollLaptop from "./ScrollLaptop";
import PathStars from "./PathStars";

/* ------------------------------------------------------------------ */
/* EL MUNDO: mapa serpenteante en coordenadas % sobre un lienzo         */
/* 100vw/100vh. La cámara (x, y, scale) SOLO transforma este lienzo     */
/* gráfico. El texto vive en overlays anclados a pantalla — nunca se    */
/* escala.                                                              */
/* ------------------------------------------------------------------ */

/* Amplitud contenida (serpentina, no zigzag ancho): con curvas suaves, un
   swing horizontal grande relativo al viewport (más ancho que alto) hace
   que la curva tarde demasiado en "enderezarse" cerca de cada nodo e
   invada el lado del contenido. Con ±6 desde el centro, la curva queda
   verticalmente estable durante todo el tramo cercano a cada nodo. */
const START = { x: 50, y: 6 }; // "Todo comienza aquí" — nace del Hero
const N1 = { x: 44, y: 20 }; // 01 El Caos
const N2 = { x: 56, y: 36 }; // 02 La Conexión
const N3 = { x: 44, y: 52 }; // 03 La Solución
const P1 = { x: 56, y: 68 }; // Proyecto: La Leñería
const P2 = { x: 44, y: 84 }; // Proyecto: Argoot
const P3 = { x: 56, y: 97 }; // Proyecto: Tu Negocio
const END = { x: 50, y: 99 }; // cierre, vuelve al centro

const JOURNEY_NODES = [START, N1, N2, N3, P1, P2, P3];

/*
 * El recorrido usa la misma curva S (tangente vertical en cada nodo, sin
 * ángulos de 90°) que antes se dibujaba como trazo — ahora en cambio se
 * puebla de estrellas (ver <PathStars>): el camino se "lee" porque esos
 * puntos brillan más que el resto del campo, no porque haya una línea.
 */
const ROUTE = [START, N1, N2, N3, P1, P2, P3, END];

/* ------------------------------------------------------------------ */
/* LA CÁMARA: keyframes (t = scrollYProgress del wrapper de 750vh).    */
/* Para centrar el nodo (nx, ny) a escala s: translate% = 50 - n * s.  */
/* ------------------------------------------------------------------ */

/* Escalas de lectura reducidas (1.8 / 1.7, antes 2.2 / 2) — menos zoom
   significa menos amplificación de cualquier curva residual cerca del
   nodo, sumado al margen extra que ahora tiene el contenido. */
const CAM = [
  { t: 0.0, nx: START.x, ny: START.y, s: 1.4 },
  { t: 0.05, nx: START.x, ny: START.y, s: 1.4 },
  { t: 0.085, nx: 50, ny: 13, s: 1.1 },
  { t: 0.12, nx: N1.x, ny: N1.y, s: 1.8 },
  { t: 0.19, nx: N1.x, ny: N1.y, s: 1.8 },
  { t: 0.225, nx: 50, ny: 28, s: 1.15 },
  { t: 0.26, nx: N2.x, ny: N2.y, s: 1.8 },
  { t: 0.33, nx: N2.x, ny: N2.y, s: 1.8 },
  { t: 0.365, nx: 50, ny: 44, s: 1.15 },
  { t: 0.4, nx: N3.x, ny: N3.y, s: 1.8 },
  { t: 0.47, nx: N3.x, ny: N3.y, s: 1.8 },
  { t: 0.505, nx: 50, ny: 60, s: 1.15 },
  { t: 0.54, nx: P1.x, ny: P1.y, s: 1.7 },
  { t: 0.64, nx: P1.x, ny: P1.y, s: 1.7 },
  { t: 0.665, nx: 50, ny: 76, s: 1.15 },
  { t: 0.69, nx: P2.x, ny: P2.y, s: 1.7 },
  { t: 0.79, nx: P2.x, ny: P2.y, s: 1.7 },
  { t: 0.815, nx: 50, ny: 90, s: 1.15 },
  { t: 0.84, nx: P3.x, ny: P3.y, s: 1.7 },
  { t: 0.94, nx: P3.x, ny: P3.y, s: 1.7 },
  { t: 0.975, nx: 50, ny: 57, s: 1.05 },
  { t: 1.0, nx: 50, ny: 50, s: 1 },
];

const CAM_T = CAM.map((k) => k.t);
const CAM_X = CAM.map((k) => 50 - k.nx * k.s);
const CAM_Y = CAM.map((k) => 50 - k.ny * k.s);
const CAM_S = CAM.map((k) => k.s);

const CAM_SPRING = { stiffness: 70, damping: 24, restDelta: 0.001 };

/* Ventanas de cada relato: [fadeIn0, fadeIn1, fadeOut0, fadeOut1] */
const START_WIN = [0.0, 0.025, 0.06, 0.08];
const STORY = [
  { phase: journeyPhases[0], side: "right" as const, win: [0.11, 0.135, 0.185, 0.215] },
  { phase: journeyPhases[1], side: "left" as const, win: [0.25, 0.275, 0.325, 0.355] },
  { phase: journeyPhases[2], side: "right" as const, win: [0.39, 0.415, 0.465, 0.495] },
];

/* Proyectos: win = visibilidad del overlay, lidWin = apertura de la tapa */
const PROJ = [
  {
    project: projects[0],
    side: "left" as const,
    win: [0.53, 0.565, 0.635, 0.67],
    lidWin: [0.535, 0.585, 0.62, 0.665],
  },
  {
    project: projects[1],
    side: "right" as const,
    win: [0.68, 0.715, 0.785, 0.82],
    lidWin: [0.685, 0.735, 0.77, 0.815],
  },
  {
    project: projects[2],
    side: "left" as const,
    win: [0.83, 0.865, 0.935, 0.97],
    lidWin: [0.835, 0.885, 0.92, 0.965],
  },
];

/* ------------------------------------------------------------------ */

function WorldNode({ node }: { node: { x: number; y: number } }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <motion.span
        className="absolute inset-0 -m-3 rounded-full border border-[#10B981]/30"
        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
        transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity }}
      />
      {/* una estrella particularmente brillante, no un ícono de UI */}
      <span
        className="relative block h-2 w-2 rounded-full bg-white"
        style={{ boxShadow: "0 0 4px 1px #fff, 0 0 16px 4px rgba(16,185,129,0.9)" }}
      />
    </div>
  );
}

function CenterOverlay({
  progress,
  phase,
  win,
}: {
  progress: MotionValue<number>;
  phase: JourneyPhase;
  win: number[];
}) {
  const opacity = useTransform(progress, win, [0, 1, 1, 0]);
  const y = useTransform(progress, [win[0], win[1]], [24, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-6 bottom-[58%] z-10 flex justify-center text-center md:bottom-[56%]"
    >
      <div className="max-w-md rounded-xl border border-white/10 bg-black/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-md md:p-7">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#10B981]">
          {phase.kicker}
        </span>
        <h2 className="mt-3 text-[24px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[32px]">
          {phase.title}
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
          {phase.copy}
        </p>
      </div>
    </motion.div>
  );
}

function StoryOverlay({
  progress,
  phase,
  side,
  win,
}: {
  progress: MotionValue<number>;
  phase: JourneyPhase;
  side: "left" | "right";
  win: number[];
}) {
  const opacity = useTransform(progress, win, [0, 1, 1, 0]);
  const y = useTransform(progress, [win[0], win[1]], [36, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute bottom-0 top-0 z-10 flex items-end pb-16 md:items-center md:pb-0 ${
        side === "right"
          ? "left-6 right-6 md:left-[64%] md:right-[4%]"
          : "left-6 right-6 md:left-[4%] md:right-[64%] md:justify-end md:text-right"
      }`}
    >
      <div className="max-w-md rounded-xl border border-white/10 bg-black/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-md md:p-7">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#10B981]">
          {phase.kicker}
        </span>
        <h2 className="mt-3 text-[26px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[38px]">
          {phase.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-white/60 md:text-base">
          {phase.copy}
        </p>
      </div>
    </motion.div>
  );
}

function ProjectOverlay({
  progress,
  project,
  side,
  win,
  lidWin,
}: {
  progress: MotionValue<number>;
  project: ProjectCard;
  side: "left" | "right";
  win: number[];
  lidWin: number[];
}) {
  const opacity = useTransform(progress, win, [0, 1, 1, 0]);
  const y = useTransform(progress, [win[0], win[1]], [40, 0]);
  const lidRaw = useTransform(progress, lidWin, [-88, 0, 0, -88]);
  const lid = useSpring(lidRaw, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute bottom-0 top-0 z-10 flex items-center ${
        side === "right"
          ? "left-6 right-6 md:left-[62%] md:right-[4%]"
          : "left-6 right-6 md:left-[4%] md:right-[62%] md:justify-end"
      }`}
    >
      <div className="flex w-full max-w-[480px] flex-col items-start gap-6">
        <ScrollLaptop project={project} lid={lid} />

        <div className="w-full rounded-xl border border-white/10 bg-black/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-md">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#10B981]">
            {project.nombre} — {project.tagline}
          </span>
          <div className="mt-4 divide-y divide-white/10">
            <div className="pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                El Problema
              </span>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/70 md:text-sm">
                {project.problema}
              </p>
            </div>
            <div className="pt-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10B981]">
                La Solución Nodexa
              </span>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/70 md:text-sm">
                {project.solucion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function JourneyExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  /* Medidas reales del lienzo (sticky = viewport) para dibujar en px */
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const measure = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const toPx = (p: { x: number; y: number }) => ({
    x: (p.x / 100) * size.w,
    y: (p.y / 100) * size.h,
  });

  /* Cámara amortiguada: springs sobre valores numéricos, % al final */
  const xRaw = useTransform(scrollYProgress, CAM_T, CAM_X);
  const yRaw = useTransform(scrollYProgress, CAM_T, CAM_Y);
  const sRaw = useTransform(scrollYProgress, CAM_T, CAM_S);
  const xS = useSpring(xRaw, CAM_SPRING);
  const yS = useSpring(yRaw, CAM_SPRING);
  const camScale = useSpring(sRaw, CAM_SPRING);
  const camX = useTransform(xS, (v) => `${v}%`);
  const camY = useTransform(yS, (v) => `${v}%`);

  /* La línea se dibuja a lo largo de todo el recorrido */
  const drawRaw = useTransform(scrollYProgress, [0.01, 0.95], [0, 1]);
  const draw = useSpring(drawRaw, { stiffness: 90, damping: 26, restDelta: 0.001 });

  /* Cierre */
  const finalOpacity = useTransform(scrollYProgress, [0.96, 1.0], [0, 1]);
  const finalEvents = useTransform(finalOpacity, (v) =>
    v > 0.5 ? ("auto" as const) : ("none" as const)
  );

  return (
    <div ref={wrapRef} id="viaje" className="relative h-[750vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ---------------- EL MUNDO (solo gráficos, recibe el zoom) ---------------- */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ x: camX, y: camY, scale: camScale, originX: 0, originY: 0 }}
        >
          {size.w > 0 && (
            <PathStars points={ROUTE} toPx={toPx} draw={draw} width={size.w} height={size.h} />
          )}

          {JOURNEY_NODES.map((node, i) => (
            <WorldNode key={i} node={node} />
          ))}
        </motion.div>

        {/* ---------------- OVERLAYS (anclados a pantalla, sin escalar) ---------------- */}
        <CenterOverlay progress={scrollYProgress} phase={journeyStartPhase} win={START_WIN} />

        {STORY.map((s) => (
          <StoryOverlay
            key={s.phase.id}
            progress={scrollYProgress}
            phase={s.phase}
            side={s.side}
            win={s.win}
          />
        ))}

        {PROJ.map((p) => (
          <ProjectOverlay
            key={p.project.id}
            progress={scrollYProgress}
            project={p.project}
            side={p.side}
            win={p.win}
            lidWin={p.lidWin}
          />
        ))}

        {/* ---------------- CIERRE ---------------- */}
        <motion.div
          style={{ opacity: finalOpacity, pointerEvents: finalEvents }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="relative isolate flex flex-col items-center gap-9 px-10 py-20">
            {/* viñeta oscura difuminada: hunde las líneas del fondo detrás del texto */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-15%] -z-10 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 55%, transparent 80%)",
                filter: "blur(32px)",
              }}
            />
            <h2 className="max-w-[18ch] text-[40px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[64px] lg:text-[72px]">
              {projectsFinalTitle}
            </h2>
            <MagneticButton
              href="#"
              className="inline-block rounded-[4px] border border-white/25 px-8 py-4 text-[15px] font-semibold text-white no-underline transition-colors hover:border-[#10B981] hover:text-[#10B981]"
            >
              {projectsFinalCta}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
