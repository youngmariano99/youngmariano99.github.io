"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { supabase } from "../lib/supabase";
import { BackToHome } from "../components/shared/BackToHome";
import { LaptopFrame, PhoneFrame } from "../components/portfolio/CaseDeviceMockups";
import {
  cardCta,
  heroEmptySubtitle,
  heroEmptyTitle,
  heroEyebrow,
  heroScrollCue,
  heroSubtitleDefault,
  heroSubtitleWithInsignia,
  heroTitleHighlight,
  heroTitleLine1,
  insigniaTag,
  wallEyebrow,
  wallGhostLabel,
  wallTitle,
} from "../portfolioData";
import type { PortfolioProject } from "../types";

const ACCENT = "16,185,129"; // rgb, para armar rgba() dinámicos
const GOLD = "227,184,102";

/* ------------------------------------------------------------------ */
/* Layout de la constelación: si hay un caso insignia, va al centro y   */
/* el resto se reparte en un anillo alrededor. Si no hay ninguno, todos */
/* se reparten parejo — nunca depende de una cantidad fija de casos.    */
/* ------------------------------------------------------------------ */

interface Node {
  project: PortfolioProject;
  xr: number;
  yr: number;
  isInsignia: boolean;
  /** Radio de la órbita en px — 0 para el insignia, que queda fijo como ancla. */
  orbitR: number;
  orbitSpeed: number;
  orbitPhase: number;
}

const MAX_HERO_NODES = 6;
const GOLDEN_ANGLE = 2.399963; // radianes — reparte puntos en espiral sin que ninguno quede alineado con otro

// Sin caso insignia, o para el resto de las marcas: nunca se calculan con
// seno/coseno "prolijo" (eso es lo que colapsaba 2 estrellas en la misma
// línea vertical antes) — espiral tipo semillas de girasol + una órbita
// lenta e individual por estrella, para que floten sueltas por la pantalla.
function computeNodes(projects: PortfolioProject[]): Node[] {
  const insignia = projects.filter((p) => p.insignia);
  const regular = projects.filter((p) => !p.insignia);
  const ordered = [...insignia, ...regular].slice(0, MAX_HERO_NODES);
  const regularOrdered = ordered.filter((p) => !p.insignia);

  const nodes: Node[] = [];

  if (insignia.length > 0) {
    nodes.push({ project: insignia[0], xr: 0.5, yr: 0.5, isInsignia: true, orbitR: 0, orbitSpeed: 0, orbitPhase: 0 });
  }

  regularOrdered.forEach((p, i) => {
    const idx = i + 1;
    const angle = idx * GOLDEN_ANGLE;
    const radius = Math.sqrt(idx / Math.max(regularOrdered.length, 1)) * 0.4;
    nodes.push({
      project: p,
      xr: 0.5 + Math.cos(angle) * radius,
      yr: 0.5 + Math.sin(angle) * radius * 0.75,
      isInsignia: false,
      orbitR: 16 + (idx % 3) * 8,
      orbitSpeed: 0.12 + (idx % 4) * 0.05,
      orbitPhase: idx * 1.7,
    });
  });

  return nodes;
}

/* ------------------------------------------------------------------ */

function ConstellationHero({ projects }: { projects: PortfolioProject[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<Record<string, { hit: HTMLDivElement | null; card: HTMLDivElement | null; label: HTMLDivElement | null }>>({});

  const nodes = useMemo(() => computeNodes(projects), [projects]);
  const insigniaNode = nodes.find((n) => n.isInsignia);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas || nodes.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let particles: { xr: number; yr: number; r: number; phase: number; depth: number }[] = [];
    const parallax = { x: 0, y: 0 };
    let targetX = 0;
    let targetY = 0;
    let raf = 0;
    let t = 0;

    const nodesPx = nodes.map((n) => ({ ...n, x: 0, y: 0 }));

    function layout() {
      if (!section) return;
      w = section.clientWidth;
      h = section.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";

      nodesPx.forEach((n) => {
        n.x = n.xr * w;
        n.y = n.yr * h;
      });

      particles = [];
      const count = Math.floor((w * h) / 2600);
      for (let i = 0; i < count; i++) {
        particles.push({
          xr: Math.random(),
          yr: Math.random(),
          r: Math.random() * 1.1 + 0.3,
          phase: Math.random() * 6,
          depth: 0.3 + Math.random() * 0.7,
        });
      }
    }

    // Posición actual en px CSS (sin dpr): base + paralaje + deriva orbital
    // individual — el insignia (orbitR=0) queda anclado como centro fijo.
    function currentPos(n: (typeof nodesPx)[number]) {
      const spread = n.isInsignia ? 6 : 14;
      let px = n.x + parallax.x * spread;
      let py = n.y + parallax.y * spread;
      if (n.orbitR > 0) {
        px += Math.cos(t * n.orbitSpeed + n.orbitPhase) * n.orbitR;
        py += Math.sin(t * n.orbitSpeed + n.orbitPhase) * n.orbitR * 0.7;
      }
      return { px, py };
    }

    function positionOverlay() {
      nodesPx.forEach((n) => {
        const refs = overlayRefs.current[n.project.id];
        if (!refs) return;
        const { px, py } = currentPos(n);
        const hitR = n.isInsignia ? 96 : 60;

        if (refs.hit) {
          refs.hit.style.left = px + "px";
          refs.hit.style.top = py + "px";
          refs.hit.style.width = hitR + "px";
          refs.hit.style.height = hitR + "px";
        }
        if (refs.card) {
          refs.card.style.left = px + "px";
          refs.card.style.top = py - (n.isInsignia ? 138 : 116) + "px";
        }
        if (refs.label) {
          refs.label.style.left = px + "px";
          refs.label.style.top = py + (n.isInsignia ? 50 : 32) + "px";
        }
      });
    }

    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    function onMouseLeave() {
      targetX = 0;
      targetY = 0;
    }

    function draw() {
      if (!reduced) {
        parallax.x += (targetX - parallax.x) * 0.05;
        parallax.y += (targetY - parallax.y) * 0.05;
      }

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((p) => {
        const px = (p.xr * w + parallax.x * 22 * p.depth) * dpr;
        const py = (p.yr * h + parallax.y * 22 * p.depth) * dpr;
        const a = reduced ? 0.4 : 0.18 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.9 + p.phase));
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(215,228,225,${a.toFixed(2)})`;
        ctx!.arc(px, py, p.r * dpr, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Sin líneas conectando las estrellas — cada marca flota suelta,
      // no "forma parte de una red" con las demás.
      nodesPx.forEach((n) => {
        const pos = currentPos(n);
        const px = pos.px * dpr;
        const py = pos.py * dpr;
        const pulse = reduced ? 1 : 1 + 0.14 * Math.sin(t * 1.3 + n.x);
        const color = n.isInsignia ? GOLD : ACCENT;
        const baseR = n.isInsignia ? 13 : 6.5;
        const glowR = baseR * (n.isInsignia ? 9 : 6) * dpr;

        const glow = ctx!.createRadialGradient(px, py, 0, px, py, glowR);
        glow.addColorStop(0, `rgba(${color},0.6)`);
        glow.addColorStop(0.4, `rgba(${color},0.18)`);
        glow.addColorStop(1, `rgba(${color},0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(px, py, glowR, 0, Math.PI * 2);
        ctx!.fill();

        if (n.isInsignia) {
          ctx!.strokeStyle = "rgba(227,184,102,0.5)";
          ctx!.lineWidth = 1 * dpr;
          ctx!.beginPath();
          ctx!.arc(px, py, baseR * pulse * 2.1 * dpr, 0, Math.PI * 2);
          ctx!.stroke();
        }

        ctx!.beginPath();
        ctx!.fillStyle = n.isInsignia ? "#fff3da" : "#eafff6";
        ctx!.arc(px, py, baseR * pulse * dpr, 0, Math.PI * 2);
        ctx!.fill();
      });

      positionOverlay();
      if (!reduced) t += 0.02;
      raf = requestAnimationFrame(draw);
    }

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", layout);
    layout();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", layout);
    };
  }, [nodes]);

  if (nodes.length === 0) {
    return (
      <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden px-6 text-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{heroEyebrow}</span>
          <h1 className="mt-4 font-display text-[34px] font-semibold text-white sm:text-[44px]">{heroEmptyTitle}</h1>
          <p className="mx-auto mt-4 max-w-[42ch] text-[15px] text-white/55">{heroEmptySubtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[92vh] min-h-[620px] max-h-[900px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, transparent 40%, #05080a 95%), linear-gradient(to bottom, #05080a 0%, transparent 14%, transparent 78%, #05080a 100%)",
        }}
      />

      {/*
        El centrado (left-1/2 + -translate-x-1/2) vive en ESTE wrapper, sin
        animación — el motion.div de adentro solo maneja el fade-in (y),
        nunca la posición. Framer Motion escribe su propio `transform`
        inline sobre el elemento que anima, así que si el centrado vivía en
        el mismo nodo, esa transición pisaba silenciosamente el
        -translate-x-1/2 (por eso el título aparecía corrido a la derecha,
        sin relación con el centro real de la constelación).
      */}
      <div className="pointer-events-none absolute left-1/2 top-[9%] z-[3] w-full -translate-x-1/2 px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{heroEyebrow}</span>
          <h1 className="mt-3 font-display text-[38px] font-semibold leading-[1.02] tracking-tight text-white sm:text-[54px] lg:text-[68px]">
            {heroTitleLine1}
            <br />
            <span className="italic" style={{ color: "#10B981" }}>
              {heroTitleHighlight}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-white/60">
            {insigniaNode ? heroSubtitleWithInsignia(insigniaNode.project.cliente_nombre) : heroSubtitleDefault}
          </p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-[5%] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35">
        <span>{heroScrollCue}</span>
        <span
          className="h-6 w-px animate-pulse"
          style={{ background: "linear-gradient(to bottom, rgba(16,185,129,.4), transparent)" }}
        />
      </div>

      {nodes.map((n) => (
        <NodeOverlay
          key={n.project.id}
          node={n}
          registerRefs={(refs) => {
            overlayRefs.current[n.project.id] = refs;
          }}
        />
      ))}
    </section>
  );
}

function NodeOverlay({
  node,
  registerRefs,
}: {
  node: Node;
  registerRefs: (refs: { hit: HTMLDivElement | null; card: HTMLDivElement | null; label: HTMLDivElement | null }) => void;
}) {
  const hitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    registerRefs({ hit: hitRef.current, card: cardRef.current, label: labelRef.current });
  }, [registerRefs]);

  const { project, isInsignia } = node;

  return (
    <>
      <div
        ref={hitRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute z-[4] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
      >
        <Link to={`/casos-de-exito/${project.slug}`} className="block h-full w-full" aria-label={project.cliente_nombre} />
      </div>

      <div
        ref={labelRef}
        className="pointer-events-none absolute z-[3] -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-200"
        style={{ opacity: hover ? 0 : 1 }}
      >
        <div
          className="whitespace-nowrap text-[13.5px] font-bold"
          style={{ color: isInsignia ? "#f5e6c4" : "#fff", textShadow: "0 2px 12px rgba(0,0,0,.8)" }}
        >
          {project.cliente_nombre}
        </div>
      </div>

      <div
        ref={cardRef}
        className="pointer-events-none absolute z-[5] w-[240px] -translate-x-1/2 -translate-y-1/2 border p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] transition-all duration-300"
        style={{
          background: "#0d151b",
          borderColor: isInsignia ? "rgba(227,184,102,.4)" : "rgba(255,255,255,.09)",
          opacity: hover ? 1 : 0,
          transform: `translate(-50%, ${hover ? "-50%" : "-46%"}) scale(${hover ? 1 : 0.96})`,
        }}
      >
        <div className="relative mb-3 h-[108px] overflow-hidden border border-white/10">
          {isInsignia && (
            <span className="absolute -right-px -top-px z-[1] bg-[#e3b866] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-[#1a1206]">
              {insigniaTag}
            </span>
          )}
          {project.mostrar_desktop && project.imagen_portada_url ? (
            <img src={project.imagen_portada_url} alt="" className="h-full w-full object-cover object-top" />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(140deg, ${isInsignia ? "rgba(227,184,102,.35)" : "rgba(16,185,129,.28)"}, transparent 70%)`,
              }}
            />
          )}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: isInsignia ? "#e3b866" : "#5b6b72" }}>
          {project.rubro}
        </div>
        <div className="mt-1 text-[16px] font-bold text-white">{project.cliente_nombre}</div>
        <div className="mt-2 flex items-center gap-1.5 text-[11.5px] text-white/55">{cardCta}</div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function WallCard({ project }: { project: PortfolioProject }) {
  const [open, setOpen] = useState(false);
  const hasDesktop = project.mostrar_desktop && !!project.imagen_portada_url;
  const hasMobile = project.mostrar_mobile && !!project.imagen_mobile_url;
  const hasAnyDevice = hasDesktop || hasMobile;
  const accentColor = project.insignia ? "#e3b866" : "#10B981";

  return (
    <div
      className={`group relative flex flex-col border border-white/10 bg-[#0d151b] transition-all duration-300 hover:-translate-y-1 ${
        project.insignia ? "hover:border-[#e3b86680] sm:col-span-4" : "hover:border-emerald-500/40 sm:col-span-2"
      }`}
    >
      <div
        role={hasAnyDevice ? "button" : undefined}
        tabIndex={hasAnyDevice ? 0 : undefined}
        onClick={() => hasAnyDevice && setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (hasAnyDevice && (e.key === "Enter" || e.key === " ")) setOpen((o) => !o);
        }}
        className={`relative flex items-center justify-center gap-5 border-b border-white/10 bg-black/25 px-6 py-9 ${
          hasAnyDevice ? "cursor-pointer" : ""
        }`}
      >
        {project.insignia && (
          <span className="absolute right-3.5 top-3.5 z-[2] bg-[#e3b866] px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wide text-[#1a1206]">
            ✦ {insigniaTag}
          </span>
        )}
        {hasAnyDevice ? (
          <>
            {hasDesktop && (
              <LaptopFrame imageUrl={project.imagen_portada_url!} open={open} label={`${project.slug}.nodexa.app`} />
            )}
            {hasMobile && (
              <PhoneFrame imageUrl={project.imagen_mobile_url!} open={open} label={project.cliente_nombre} />
            )}
          </>
        ) : (
          <div
            className="h-[168px] w-full"
            style={{
              background: project.insignia
                ? "linear-gradient(135deg, rgba(227,184,102,.28), rgba(16,185,129,.12) 55%, #0d151b 100%)"
                : "linear-gradient(160deg, rgba(16,185,129,.22), #0d151b 75%)",
            }}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 py-6">
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-white/40">
          {project.cliente_nombre.toUpperCase().slice(0, 3)}-{project.slug.slice(0, 3).toUpperCase()}
        </span>
        <h3 className={`font-display font-semibold text-white ${project.insignia ? "text-[23px]" : "text-[19px]"}`}>
          {project.cliente_nombre}
        </h3>
        <span className="-mt-2 text-[12.5px] font-semibold" style={{ color: accentColor }}>
          {project.rubro}
        </span>
        <p className="flex-1 text-[13.5px] leading-relaxed text-white/55">{project.problema}</p>
        <Link
          to={`/casos-de-exito/${project.slug}`}
          className="mt-1 flex items-center gap-1.5 text-[12.5px] font-semibold text-white/50 no-underline transition-colors hover:text-white"
        >
          {cardCta}
        </Link>
      </div>
    </div>
  );
}

function Wall({ projects }: { projects: PortfolioProject[] }) {
  return (
    <section className="relative px-6 py-24 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.08)}
        className="mx-auto max-w-[1180px]"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">{wallEyebrow}</span>
            <h2 className="mt-2 font-display text-[28px] font-semibold text-white md:text-[34px]">{wallTitle}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          {projects.map((p) => (
            <WallCard key={p.id} project={p} />
          ))}
          <div className="flex min-h-[168px] flex-col items-center justify-center gap-2 border border-dashed border-white/15 px-6 py-10 text-center text-white/35 sm:col-span-2">
            <span className="text-2xl">+</span>
            <span className="text-[12.5px]">{wallGhostLabel}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function CasosDeExito() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("portfolio_projects")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error("No se pudieron cargar los casos de éxito:", error);
        setProjects((data as PortfolioProject[]) ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main id="casos-de-exito-top" className="relative">
      <BackToHome />
      {!loading && <ConstellationHero projects={projects} />}
      {!loading && projects.length > 0 && <Wall projects={projects} />}
    </main>
  );
}
