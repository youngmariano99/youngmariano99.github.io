"use client";

import { motion } from "framer-motion";
import { whatsappHref } from "../data";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { AnimatedTitle } from "../components/shared/AnimatedTitle";
import { MagneticButton } from "../components/shared/MagneticButton";
import { ProblemSolutionSection } from "../components/shared/ProblemSolution";
import { FaqSection } from "../components/shared/FaqAccordion";
import { ClosingCta } from "../components/shared/ClosingCta";
import { BackToHome } from "../components/shared/BackToHome";
import {
  CUSTOM_AUDIT_WHATSAPP_MESSAGE,
  CUSTOM_ARCHITECT_WHATSAPP_MESSAGE,
  customHeroTitle,
  customHeroSubtitle,
  customHeroCtaPrimary,
  customHeroCtaSecondary,
  customProblemaTitle,
  customSolucionEyebrow,
  customSolucionTitle,
  customMetodologiaEyebrow,
  customMetodologiaTitle,
  customMetodologiaSteps,
  customEjemplosEyebrow,
  customEjemplosTitle,
  customEjemploCardTitle,
  customEjemploCardCopy,
  customBeneficiosEyebrow,
  customBeneficiosTitle,
  customBenefits,
  type CustomBenefit,
  customFaqsTitle,
  customFaqItems,
  customFooterTitle,
  customFooterSubtitle,
  customFooterButton,
} from "../customData";

const ACCENT = "#10B981";

/* ------------------------------------------------------------------ */
/* Íconos: mismo lenguaje minimalista de trazo grueso que el resto del  */
/* sitio — el ícono "link" (dos nodos conectados) retoma el motivo de   */
/* red neuronal usado en todo NODEXA en vez de un handshake genérico.   */
/* ------------------------------------------------------------------ */

function ScaleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5M4 19h16" />
      <path d="M8 15l4-5 3 3 5-7" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="12" r="3" />
      <path d="M10 12h4" />
    </svg>
  );
}

const BENEFIT_ICONS: Record<CustomBenefit["icon"], () => JSX.Element> = {
  scale: ScaleIcon,
  lock: LockIcon,
  chart: ChartIcon,
  link: LinkIcon,
};

/* ------------------------------------------------------------------ */

function CustomHero() {
  const scrollToMetodologia = () => {
    document.getElementById("metodologia")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)", filter: "blur(60px)" }}
      />
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1)}
        className="relative mx-auto max-w-[900px] text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="mx-auto max-w-[22ch] text-[34px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[44px] lg:text-[54px]"
        >
          {customHeroTitle.map((span, i) =>
            span.highlight ? (
              <span key={i} style={{ color: ACCENT }}>
                {span.text}
              </span>
            ) : (
              <span key={i}>{span.text}</span>
            )
          )}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-[58ch] text-[16px] leading-relaxed text-white/60 lg:text-[18px]"
        >
          {customHeroSubtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton
            href={whatsappHref(CUSTOM_AUDIT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-[#10B981] px-8 py-4 text-[15px] font-bold text-[#05080F] shadow-[0_10px_34px_-8px_rgba(16,185,129,0.55)] transition-all duration-300 hover:bg-[#0EA672] hover:shadow-[0_14px_44px_-6px_rgba(16,185,129,0.7)]"
          >
            {customHeroCtaPrimary}
          </MagneticButton>
          <MagneticButton
            onClick={scrollToMetodologia}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/5"
          >
            {customHeroCtaSecondary}
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CustomMetodologia() {
  return (
    <section id="metodologia" className="relative px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[1100px] rounded-[28px] border border-white/12 bg-white/[0.035] p-10 text-center shadow-[0_0_60px_-20px_rgba(16,185,129,0.25)] md:p-16"
      >
        <motion.span variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
          {customMetodologiaEyebrow}
        </motion.span>
        <AnimatedTitle
          lines={[customMetodologiaTitle]}
          className="mx-auto mt-4 max-w-[26ch] text-[28px] font-extrabold leading-[1.15] tracking-tight text-white md:text-[38px]"
        />

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-14 grid grid-cols-1 gap-6 text-left sm:grid-cols-2"
        >
          {customMetodologiaSteps.map((step) => (
            <div
              key={step.index}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-6"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs font-semibold"
                style={{ borderColor: "rgba(16,185,129,.5)", color: ACCENT, background: "rgba(16,185,129,.08)" }}
              >
                {step.index}
              </span>
              <h3 className="text-[17px] font-bold text-white">{step.title}</h3>
              <p className="text-[14px] leading-relaxed text-white/55">{step.copy}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function CustomEjemplos() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[720px] text-center"
      >
        <motion.span variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
          {customEjemplosEyebrow}
        </motion.span>
        <AnimatedTitle
          lines={[customEjemplosTitle]}
          className="mx-auto mt-4 max-w-[26ch] text-[28px] font-extrabold leading-[1.15] tracking-tight text-white md:text-[38px]"
        />

        <motion.div
          variants={fadeUp}
          className="mt-12 rounded-2xl border border-white/10 bg-black/50 p-8 text-left shadow-md backdrop-blur-md transition-colors duration-300 hover:border-emerald-500/30 md:p-10"
        >
          <h3 className="text-[19px] font-bold leading-snug text-white md:text-[21px]">
            {customEjemploCardTitle}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">{customEjemploCardCopy}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CustomBeneficios() {
  return (
    <section className="relative border-y border-white/10 bg-white/[0.015] px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[1100px] text-center"
      >
        <motion.span variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
          {customBeneficiosEyebrow}
        </motion.span>
        <AnimatedTitle
          lines={[customBeneficiosTitle]}
          className="mx-auto mt-4 max-w-[26ch] text-[28px] font-extrabold leading-[1.15] tracking-tight text-white md:text-[38px]"
        />

        <motion.div variants={fadeUp} className="mt-14 grid grid-cols-1 gap-5 text-left sm:grid-cols-2">
          {customBenefits.map((benefit) => {
            const Icon = BENEFIT_ICONS[benefit.icon];
            return (
              <div
                key={benefit.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-black/30 p-6"
              >
                <span
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-full"
                  style={{ background: "rgba(16,185,129,.1)", color: ACCENT }}
                >
                  <Icon />
                </span>
                <div>
                  <h3 className="text-[16px] font-bold text-white">{benefit.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/55">{benefit.copy}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function NodexaCustom() {
  return (
    <main id="nodexa-custom-top" className="relative">
      <BackToHome />
      <CustomHero />
      <ProblemSolutionSection
        problemLabel="El desafío operativo"
        problemText={customProblemaTitle}
        solutionLabel={customSolucionEyebrow}
        solutionText={customSolucionTitle}
      />
      <CustomMetodologia />
      <CustomEjemplos />
      <CustomBeneficios />
      <FaqSection id="faqs" title={customFaqsTitle} items={customFaqItems} />
      <ClosingCta
        title={customFooterTitle}
        subtitle={customFooterSubtitle}
        buttonLabel={customFooterButton}
        whatsappMessage={CUSTOM_ARCHITECT_WHATSAPP_MESSAGE}
      />
    </main>
  );
}
