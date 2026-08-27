"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { supabase } from "../lib/supabase";
import { BackToHome } from "../components/shared/BackToHome";
import { LaptopFrame, PhoneFrame } from "../components/portfolio/CaseDeviceMockups";
import {
  cardCta,
  heroClickHint,
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
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Layout de la constelación: los casos "insignia" (puede haber más de   */
/* uno — todos son igual de destacados, no hay un "primero entre         */
/* iguales") se reparten en una fila central; el resto flota alrededor   */
/* en espiral, cada uno con su propia órbita lenta.                      */
/* ------------------------------------------------------------------ */

interface Node {
  project: PortfolioProject;
  xr: number;
  yr: number;
  isInsignia: boolean;
  /** Radio de la órbita en px — 0 para los insignia, que quedan fijos como ancla. */
  orbitR: number;
  orbitSpeed: number;
  orbitPhase: number;
}

const MAX_HERO_NODES = 8;
const MAX_FEATURED = 3;
const GOLDEN_ANGLE = 2.399963; // radianes — reparte puntos en espiral sin que ninguno quede alineado con otro

function computeNodes(projects: PortfolioProject[]): Node[] {
  const featured = projects.filter((p) => p.insignia).slice(0, MAX_FEATURED);
  const regular = projects.filter((p) => !p.insignia);
  const ordered = [...featured, ...regular].slice(0, MAX_HERO_NODES);
  const featuredOrdered = ordered.filter((p) => p.insignia);
  const regularOrdered = ordered.filter((p) => !p.insignia);

  const nodes: Node[] = [];

  // Insignia: fila central pareja — todos con el mismo trato, ninguno
  // "más grande que los demás insignia" (el tamaño extra es respecto a
  // los NO insignia, no una jerarquía entre insignia).
  featuredOrdered.forEach((p, i) => {
    const n = featuredOrdered.length;
    const spacing = 0.17;
    const xr = 0.5 + (i - (n - 1) / 2) * spacing;
    nodes.push({ project: p, xr, yr: 0.46, isInsignia: true, orbitR: 0, orbitSpeed: 0, orbitPhase: 0 });
  });

  regularOrdered.forEach((p, i) => {
    const idx = i + 1;
    const angle = idx * GOLDEN_ANGLE;
    const radius = 0.16 + Math.sqrt(idx / Math.max(regularOrdered.length, 1)) * 0.32;
    const xr = Math.min(0.93, Math.max(0.07, 0.5 + Math.cos(angle) * radius));
    const yr = Math.min(0.92, Math.max(0.16, 0.5 + Math.sin(angle) * radius * 0.8));
    nodes.push({
      project: p,
      xr,
      yr,
      isInsignia: false,
      orbitR: 16 + (idx % 3) * 8,
      orbitSpeed: 0.12 + (idx % 4) * 0.05,
      orbitPhase: idx * 1.7,
    });
  });

  return nodes;
}

/* ------------------------------------------------------------------ */

function ConstellationHero({
  projects,
  onSelect,
}: {
  projects: PortfolioProject[];
  onSelect: (project: PortfolioProject) => void;
}) {
  const skyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<Record<string, { hit: HTMLButtonElement | null; label: HTMLDivElement | null }>>({});

  const nodes = useMemo(() => computeNodes(projects), [projects]);
  const featuredNodes = nodes.filter((n) => n.isInsignia);

  useEffect(() => {
    const sky = skyRef.current;
    const canvas = canvasRef.current;
    if (!sky || !canvas || nodes.length === 0) return;

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
      if (!sky) return;
      w = sky.clientWidth;
      h = sky.clientHeight;
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
    // individual — los insignia (orbitR=0) quedan anclados.
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
        if (refs.label) {
          refs.label.style.left = px + "px";
          refs.label.style.top = py + (n.isInsignia ? 56 : 32) + "px";
        }
      });
    }

    function onMouseMove(e: MouseEvent) {
      const rect = sky!.getBoundingClientRect();
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

      // Sin líneas conectando las estrellas — cada marca flota suelta.
      nodesPx.forEach((n) => {
        const pos = currentPos(n);
        const px = pos.px * dpr;
        const py = pos.py * dpr;
        const pulse = reduced ? 1 : 1 + 0.14 * Math.sin(t * 1.3 + n.x);
        const color = n.isInsignia ? GOLD : ACCENT;
        const baseR = n.isInsignia ? 12 : 6.5;
        const glowR = baseR * (n.isInsignia ? 8 : 6) * dpr;

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

    sky.addEventListener("mousemove", onMouseMove);
    sky.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", layout);
    layout();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      sky.removeEventListener("mousemove", onMouseMove);
      sky.removeEventListener("mouseleave", onMouseLeave);
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
    <section className="relative">
      {/* Título: en flujo normal, SU PROPIO espacio — ya no flota encima
          del cielo. Antes compartía capa con las estrellas (absolute
          sobre el mismo canvas) y a cualquier ancho/alto de viewport
          alguna quedaba atrás de la otra. Separados, nunca compiten. */}
      <div className="relative z-[2] px-6 pb-10 pt-32 text-center md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{heroEyebrow}</span>
          <h1 className="mx-auto mt-3 max-w-[16ch] font-display text-[38px] font-semibold leading-[1.02] tracking-tight text-white sm:text-[54px] lg:text-[64px]">
            {heroTitleLine1}
            <br />
            <span className="italic" style={{ color: "#10B981" }}>
              {heroTitleHighlight}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-white/60">
            {featuredNodes.length > 0
              ? heroSubtitleWithInsignia(featuredNodes.map((n) => n.project.cliente_nombre))
              : heroSubtitleDefault}
          </p>
        </motion.div>
      </div>

      {/* El cielo: contenedor propio, con su propia altura — coordenadas
          de las estrellas relativas a ESTE bloque, no al viewport entero. */}
      <div ref={skyRef} className="relative h-[56vh] min-h-[420px] max-h-[640px] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 45%, #05080a 96%), linear-gradient(to bottom, #05080a 0%, transparent 12%, transparent 85%, #05080a 100%)",
          }}
        />

        <div className="pointer-events-none absolute bottom-[4%] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35">
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
            onSelect={onSelect}
            registerRefs={(refs) => {
              overlayRefs.current[n.project.id] = refs;
            }}
          />
        ))}
      </div>
    </section>
  );
}

function NodeOverlay({
  node,
  onSelect,
  registerRefs,
}: {
  node: Node;
  onSelect: (project: PortfolioProject) => void;
  registerRefs: (refs: { hit: HTMLButtonElement | null; label: HTMLDivElement | null }) => void;
}) {
  const hitRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerRefs({ hit: hitRef.current, label: labelRef.current });
  }, [registerRefs]);

  const { project, isInsignia } = node;

  return (
    <>
      <button
        ref={hitRef}
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`Ver ${project.cliente_nombre} en detalle`}
        className="absolute z-[4] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-none bg-transparent p-0"
      >
        {/* Anillo discontinuo + invitación a tocar — solo en las
            destacadas, para que el usuario entienda que se puede
            interactuar sin necesitar un tooltip permanente. */}
        {isInsignia && (
          <span
            className="pointer-events-none absolute inset-[-14px] animate-spin rounded-full border border-dashed"
            style={{ borderColor: "rgba(227,184,102,.55)", animationDuration: "22s" }}
          />
        )}
      </button>

      <div ref={labelRef} className="pointer-events-none absolute z-[3] -translate-x-1/2 -translate-y-1/2 text-center">
        <div
          className="whitespace-nowrap text-[13.5px] font-bold"
          style={{ color: isInsignia ? "#f5e6c4" : "#fff", textShadow: "0 2px 12px rgba(0,0,0,.8)" }}
        >
          {project.cliente_nombre}
        </div>
        {isInsignia && (
          <div
            className="mt-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em]"
            style={{ color: "#e3b866" }}
          >
            ↑ {heroClickHint}
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function WallCard({ project, onSelect }: { project: PortfolioProject; onSelect: (project: PortfolioProject) => void }) {
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
        onClick={() => hasAnyDevice && onSelect(project)}
        onKeyDown={(e) => {
          if (hasAnyDevice && (e.key === "Enter" || e.key === " ")) onSelect(project);
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
              <LaptopFrame imageUrl={project.imagen_portada_url!} open label={`${project.slug}.nodexa.app`} />
            )}
            {hasMobile && <PhoneFrame imageUrl={project.imagen_mobile_url!} open label={project.cliente_nombre} />}
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

function Wall({ projects, onSelect }: { projects: PortfolioProject[]; onSelect: (project: PortfolioProject) => void }) {
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
            <WallCard key={p.id} project={p} onSelect={onSelect} />
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
/* Visor de dispositivos: pantalla completa, SIN fondo opaco (un tinte  */
/* sutil + blur nomás, para que el cielo se siga sintiendo detrás) —    */
/* laptop y celular grandes, con botón directo a la ficha completa.     */
/* ------------------------------------------------------------------ */

function DeviceViewerOverlay({
  project,
  onClose,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
}) {
  const hasDesktop = project?.mostrar_desktop && !!project.imagen_portada_url;
  const hasMobile = project?.mostrar_mobile && !!project.imagen_mobile_url;
  const accentColor = project?.insignia ? "#e3b866" : "#10B981";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 overflow-y-auto px-6 py-20 backdrop-blur-md"
          style={{ background: "rgba(5,8,10,0.55)" }}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="fixed right-6 top-6 z-[210] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl leading-none text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            &times;
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-10"
          >
            {(hasDesktop || hasMobile) && (
              <div className="flex flex-wrap items-end justify-center gap-10">
                {hasDesktop && (
                  <LaptopFrame
                    size="lg"
                    imageUrl={project.imagen_portada_url!}
                    open
                    label={`${project.slug}.nodexa.app`}
                  />
                )}
                {hasMobile && (
                  <PhoneFrame size="lg" imageUrl={project.imagen_mobile_url!} open label={project.cliente_nombre} />
                )}
              </div>
            )}

            <div className="flex flex-col items-center gap-2 text-center">
              {project.insignia && (
                <span
                  className="mb-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wide"
                  style={{ background: "rgba(227,184,102,.14)", color: "#e3b866" }}
                >
                  ✦ {insigniaTag}
                </span>
              )}
              <h3 className="font-display text-[26px] font-semibold text-white md:text-[32px]">
                {project.cliente_nombre}
              </h3>
              <span className="text-[13px] font-semibold" style={{ color: accentColor }}>
                {project.rubro}
              </span>
            </div>

            <Link
              to={`/casos-de-exito/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#10B981] px-7 py-3.5 text-[14px] font-bold text-[#05080F] no-underline transition-colors duration-300 hover:bg-[#0EA672]"
            >
              {cardCta}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */

export default function CasosDeExito() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewerProject, setViewerProject] = useState<PortfolioProject | null>(null);

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
      {!loading && <ConstellationHero projects={projects} onSelect={setViewerProject} />}
      {!loading && projects.length > 0 && <Wall projects={projects} onSelect={setViewerProject} />}
      <DeviceViewerOverlay project={viewerProject} onClose={() => setViewerProject(null)} />
    </main>
  );
}
