"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { fadeUp, staggerContainer } from "../lib/motion";
import { useLeadModal } from "../lib/LeadModalContext";
import { supabase } from "../lib/supabase";
import { MagneticButton } from "../components/shared/MagneticButton";
import {
  detailClosingCta,
  detailClosingSubtitle,
  detailClosingTitle,
  detailNotFoundCta,
  detailNotFoundTitle,
  detailProblemLabel,
  detailProcessLabel,
  detailSolutionLabel,
  insigniaTag,
} from "../portfolioData";
import type { PortfolioProject } from "../types";

const ACCENT = "#10B981";
const GOLD = "#e3b866";

function DetailBackLink() {
  return (
    <Link
      to="/casos-de-exito"
      className="fixed left-6 top-6 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-[13px] font-semibold text-white/70 no-underline backdrop-blur-md transition-colors hover:border-[#10B981]/60 hover:text-white"
    >
      <span aria-hidden="true">←</span>
      Casos de Éxito
    </Link>
  );
}

function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <DetailBackLink />
      <h1 className="text-[26px] font-bold text-white">{detailNotFoundTitle}</h1>
      <Link
        to="/casos-de-exito"
        className="inline-flex items-center gap-2 rounded-full bg-[#10B981] px-6 py-3 text-sm font-semibold text-[#05080F] no-underline"
      >
        {detailNotFoundCta}
      </Link>
    </main>
  );
}

export default function CasoDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const { openLeadModal } = useLeadModal();
  const [project, setProject] = useState<PortfolioProject | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    supabase
      .from("portfolio_projects")
      .select("*")
      .eq("slug", slug)
      .eq("activo", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error("No se pudo cargar el caso:", error);
        setProject((data as PortfolioProject) ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (project === undefined) {
    return (
      <main className="relative flex min-h-screen items-center justify-center">
        <span className="text-sm text-white/40">Cargando...</span>
      </main>
    );
  }

  if (project === null) return <NotFound />;

  const accentColor = project.insignia ? GOLD : ACCENT;

  return (
    <main id="caso-detalle-top" className="relative">
      <DetailBackLink />

      <section className="relative overflow-hidden px-6 pb-16 pt-32 text-center md:px-10 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px]"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.insignia ? "rgba(227,184,102,0.1)" : "rgba(16,185,129,0.1)"}, transparent 65%)` }}
        />
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
          className="relative mx-auto max-w-[720px]"
        >
          {project.insignia && (
            <motion.span
              variants={fadeUp}
              className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wide"
              style={{ background: "rgba(227,184,102,.14)", color: GOLD }}
            >
              ✦ {insigniaTag}
            </motion.span>
          )}
          <motion.span
            variants={fadeUp}
            className="block font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            {project.rubro}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[48px]"
          >
            {project.cliente_nombre}
          </motion.h1>
        </motion.div>
      </section>

      {(project.mostrar_desktop || project.mostrar_mobile) && (
        <section className="px-6 md:px-10">
          {/* animate, no whileInView — todo este bloque recién existe
              después del fetch de `project`; si el usuario ya estaba
              scrolleado cuando llegó el dato, el IntersectionObserver de
              whileInView podía no disparar nunca y la sección quedaba
              invisible aunque los datos estuvieran ahí (mismo bug que en
              /recursos). */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-[980px] flex-wrap items-end justify-center gap-8"
          >
            {project.mostrar_desktop && project.imagen_portada_url && (
              <div className="w-full max-w-[640px] overflow-hidden border border-white/10">
                <img
                  src={project.imagen_portada_url}
                  alt={project.cliente_nombre}
                  className="w-full object-cover object-top"
                />
              </div>
            )}
            {project.mostrar_mobile && project.imagen_mobile_url && (
              <div className="w-[140px] flex-none overflow-hidden rounded-[18px] border border-white/10">
                <img
                  src={project.imagen_mobile_url}
                  alt={`${project.cliente_nombre} — versión mobile`}
                  className="w-full object-cover object-top"
                />
              </div>
            )}
          </motion.div>
        </section>
      )}

      <section className="px-6 py-20 md:px-10 lg:py-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
          className="mx-auto flex max-w-[760px] flex-col gap-14"
        >
          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr] sm:gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-red-400/80">
              {detailProblemLabel}
            </span>
            <p className="text-[16px] leading-relaxed text-white">{project.problema}</p>
          </motion.div>

          {project.pasos.length > 0 && (
            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr] sm:gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/45">
                {detailProcessLabel}
              </span>
              <div className="flex flex-col">
                {project.pasos.map((step, i) => (
                  <div key={step.titulo} className="relative flex gap-5 pb-9 last:pb-0">
                    {i < project.pasos.length - 1 && (
                      <span
                        className="absolute left-[15px] top-9 h-full w-px"
                        style={{ background: `linear-gradient(to bottom, ${accentColor}66, transparent)` }}
                      />
                    )}
                    <span
                      className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full border font-mono text-[11px] font-semibold"
                      style={{ borderColor: `${accentColor}80`, color: accentColor, background: `${accentColor}14` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-[15px] font-bold text-white">{step.titulo}</h4>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-white/55">{step.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr] sm:gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: accentColor }}>
              {detailSolutionLabel}
            </span>
            <p className="text-[16px] leading-relaxed text-white">{project.solucion}</p>
          </motion.div>
        </motion.div>
      </section>

      {project.galeria_urls.length > 0 && (
        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-4 sm:grid-cols-2">
            {project.galeria_urls.map((url) => (
              <div key={url} className="overflow-hidden border border-white/10">
                <img src={url} alt="" className="w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="relative border-t border-white/10 px-6 pb-24 pt-20 text-center md:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
          className="mx-auto flex max-w-[560px] flex-col items-center gap-6"
        >
          <motion.h2 variants={fadeUp} className="font-display text-[26px] font-semibold text-white md:text-[32px]">
            {detailClosingTitle}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14.5px] leading-relaxed text-white/55">
            {detailClosingSubtitle}
          </motion.p>
          <motion.div variants={fadeUp}>
            <MagneticButton
              onClick={() => openLeadModal("casos_exito_detalle")}
              className="inline-flex items-center gap-2 rounded-full bg-[#10B981] px-8 py-4 text-[15px] font-bold text-[#05080F] transition-colors duration-300 hover:bg-[#0EA672]"
            >
              <span>{detailClosingCta}</span>
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
