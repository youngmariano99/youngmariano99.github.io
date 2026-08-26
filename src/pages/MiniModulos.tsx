"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { useLeadModal } from "../lib/LeadModalContext";
import { AnimatedTitle } from "../components/shared/AnimatedTitle";
import { MagneticButton } from "../components/shared/MagneticButton";
import { ProblemSolutionSection } from "../components/shared/ProblemSolution";
import { FaqSection } from "../components/shared/FaqAccordion";
import { ClosingCta } from "../components/shared/ClosingCta";
import { BackToHome } from "../components/shared/BackToHome";
import {
  miniModulosBannerCta,
  miniModulosBannerEyebrow,
  miniModulosBannerTitle,
} from "../recursosData";
import {
  miniHeroTitle,
  miniHeroTitleLine2,
  miniHeroSubtitle,
  miniHeroCta,
  problemaTitle,
  solucionEyebrow,
  solucionTitle,
  nucleoTitle,
  nucleoSubtitle,
  nucleoSecondaryCta,
  coreFeatures,
  type CoreFeature,
  marketplaceEyebrow,
  marketplaceTitle,
  marketplaceSubtitle,
  marketplaceCta,
  marketplaceModules,
  onboardingEyebrow,
  onboardingTitle,
  onboardingSteps,
  customTitle,
  customDescription,
  customCta,
  faqsTitle,
  faqItems,
  footerCtaTitle,
  footerCtaButton,
  footerTrustBadge,
} from "../miniModulosData";

const ACCENT = "#10B981";

/* ------------------------------------------------------------------ */
/* Íconos: mismo lenguaje minimalista de trazo grueso que el resto del  */
/* sitio (ver HeroHub) — nunca íconos de librería genéricos.            */
/* ------------------------------------------------------------------ */

function PackageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8v8l-9 5-9-5V8l9-5 9 5Z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  );
}

function BoxesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="8" height="8" rx="1" />
      <rect x="13" y="6" width="8" height="8" rx="1" />
      <path d="M15 14v4a1 1 0 0 0 1 1h5" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

const CORE_ICONS: Record<CoreFeature["icon"], () => JSX.Element> = {
  package: PackageIcon,
  boxes: BoxesIcon,
  monitor: MonitorIcon,
  upload: UploadIcon,
};

/* ------------------------------------------------------------------ */
/* Bloques encastrables: composición abstracta (no foto, no 3D real)   */
/* que representa el software modular — cubos que se acoplan entre sí. */
/* ------------------------------------------------------------------ */

const BLOCKS = [
  { size: 132, x: 40, y: 10, rotate: -6, delay: 0, filled: true },
  { size: 100, x: 190, y: 90, rotate: 8, delay: 0.5, filled: false },
  { size: 84, x: 20, y: 190, rotate: 5, delay: 1, filled: false },
  { size: 116, x: 165, y: 240, rotate: -4, delay: 1.4, filled: true },
];

function StackedBlocks() {
  return (
    <div className="relative mx-auto hidden h-[380px] w-[340px] lg:block" aria-hidden="true">
      {BLOCKS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            rotate: b.rotate,
            background: b.filled ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${b.filled ? "rgba(16,185,129,0.45)" : "rgba(255,255,255,0.12)"}`,
            boxShadow: b.filled ? "0 0 40px -8px rgba(16,185,129,0.35)" : undefined,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: b.delay * 0.3 },
            y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay },
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function MiniHero() {
  const { openLeadModal } = useLeadModal();
  const scrollToNucleo = () => {
    document.getElementById("nucleo-core")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:pt-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
          className="text-center lg:text-left"
        >
          <motion.h1
            variants={fadeUp}
            className="max-w-[16ch] text-[36px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[48px] lg:text-[58px]"
          >
            {miniHeroTitle.map((span, i) =>
              span.highlight ? (
                <span key={i} style={{ color: ACCENT }}>
                  {span.text}
                </span>
              ) : (
                <span key={i}>{span.text}</span>
              )
            )}
            <span className="block">{miniHeroTitleLine2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-relaxed text-white/60 lg:mx-0 lg:text-[18px]"
          >
            {miniHeroSubtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <MagneticButton
              onClick={() => openLeadModal("mini_modulos_hero")}
              className="inline-flex items-center gap-2 rounded-full bg-[#10B981] px-8 py-4 text-[15px] font-bold text-[#05080F] shadow-[0_10px_34px_-8px_rgba(16,185,129,0.55)] transition-all duration-300 hover:bg-[#0EA672] hover:shadow-[0_14px_44px_-6px_rgba(16,185,129,0.7)]"
            >
              {miniHeroCta}
            </MagneticButton>
            <button
              type="button"
              onClick={scrollToNucleo}
              className="text-[14px] font-semibold text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Ver qué incluye el núcleo ↓
            </button>
          </motion.div>
        </motion.div>

        <StackedBlocks />
      </div>
    </section>
  );
}

function NucleoCore() {
  return (
    <section id="nucleo-core" className="relative px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[1000px] rounded-[28px] border border-white/12 bg-white/[0.035] p-10 text-center shadow-[0_0_60px_-20px_rgba(16,185,129,0.25)] md:p-16"
      >
        <motion.span variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
          Incluido siempre
        </motion.span>
        <AnimatedTitle
          lines={[nucleoTitle]}
          className="mx-auto mt-4 max-w-[26ch] text-[28px] font-extrabold leading-[1.15] tracking-tight text-white md:text-[38px]"
        />
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/60 md:text-base">
          {nucleoSubtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-10 grid max-w-[720px] grid-cols-2 gap-4 text-left sm:grid-cols-4"
        >
          {coreFeatures.map((feature) => {
            const Icon = CORE_ICONS[feature.icon];
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-6 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "rgba(16,185,129,.1)", color: ACCENT }}>
                  <Icon />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-white">{feature.title}</span>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <a
            href="#onboarding"
            className="text-[14px] font-semibold text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {nucleoSecondaryCta} →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MarketplaceModulos() {
  const { openLeadModal } = useLeadModal();

  return (
    <section className="relative border-y border-white/10 bg-white/[0.015] px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[1200px] text-center"
      >
        <motion.span variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
          {marketplaceEyebrow}
        </motion.span>
        <AnimatedTitle
          lines={[marketplaceTitle]}
          className="mx-auto mt-4 max-w-[24ch] text-[28px] font-extrabold leading-[1.15] tracking-tight text-white md:text-[38px]"
        />
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/60 md:text-base">
          {marketplaceSubtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {marketplaceModules.map((mod) => (
            <div
              key={mod.id}
              className="relative flex flex-col rounded-2xl border border-white/10 bg-black/50 p-6 shadow-md backdrop-blur-md transition-colors duration-300 hover:border-emerald-500/30"
            >
              {mod.tag && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
                  style={{ background: ACCENT }}
                >
                  {mod.tag}
                </span>
              )}
              <h3 className="text-[17px] font-bold text-white">{mod.name}</h3>
              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-white/55">{mod.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <MagneticButton
            onClick={() => openLeadModal("mini_modulos_marketplace")}
            className="inline-flex items-center gap-2 rounded-full bg-[#10B981] px-7 py-3.5 text-[14px] font-bold text-[#05080F] transition-colors duration-300 hover:bg-[#0EA672]"
          >
            <span>{marketplaceCta}</span>
            <span aria-hidden="true">→</span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProcesoOnboarding() {
  return (
    <section id="onboarding" className="relative px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[820px] text-center"
      >
        <motion.span variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
          {onboardingEyebrow}
        </motion.span>
        <AnimatedTitle
          lines={[onboardingTitle]}
          className="mx-auto mt-4 max-w-[28ch] text-[26px] font-extrabold leading-[1.2] tracking-tight text-white md:text-[34px]"
        />

        <motion.div variants={fadeUp} className="mx-auto mt-16 flex max-w-[480px] flex-col text-left">
          {onboardingSteps.map((step, i) => (
            <div key={step.index} className="relative flex gap-6 pb-12 last:pb-0">
              {i < onboardingSteps.length - 1 && (
                <span className="absolute left-[19px] top-10 h-full w-px bg-gradient-to-b from-emerald-500/40 to-transparent" />
              )}
              <span
                className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border font-mono text-xs font-semibold"
                style={{ borderColor: "rgba(16,185,129,.5)", color: ACCENT, background: "rgba(16,185,129,.08)" }}
              >
                {step.index}
              </span>
              <div>
                <h3 className="text-[17px] font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/55">{step.copy}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function DivisionCustom() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[1000px] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-10 text-center md:p-16"
      >
        <AnimatedTitle
          lines={[customTitle]}
          className="mx-auto max-w-[22ch] text-[26px] font-extrabold leading-[1.2] tracking-tight text-white md:text-[34px]"
        />
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white/60 md:text-base">
          {customDescription}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9">
          <Link
            to="/nodexa-custom"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-semibold text-white no-underline transition-colors duration-300 hover:border-white hover:bg-white/5"
          >
            {customCta}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function RecursosBanner() {
  return (
    <section className="relative px-6 pb-20 md:px-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mx-auto max-w-[1000px] rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center md:p-10"
      >
        <motion.span variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
          {miniModulosBannerEyebrow}
        </motion.span>
        <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-[44ch] text-[17px] font-semibold leading-snug text-white md:text-[19px]">
          {miniModulosBannerTitle}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-6">
          <Link
            to="/recursos"
            className="inline-flex items-center gap-2 border-none bg-[#10B981] px-6 py-3 text-sm font-semibold text-[#090B0B] no-underline transition-colors hover:bg-[#0EA672]"
          >
            <span>{miniModulosBannerCta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function MiniModulos() {
  return (
    <main id="mini-modulos-top" className="relative">
      <BackToHome />
      <MiniHero />
      <ProblemSolutionSection
        problemLabel="El problema"
        problemText={problemaTitle}
        solutionLabel={solucionEyebrow}
        solutionText={solucionTitle}
      />
      <NucleoCore />
      <MarketplaceModulos />
      <ProcesoOnboarding />
      <DivisionCustom />
      <RecursosBanner />
      <FaqSection id="faqs" title={faqsTitle} items={faqItems} />
      <ClosingCta
        title={footerCtaTitle}
        buttonLabel={footerCtaButton}
        source="mini_modulos_footer"
        trustBadge={footerTrustBadge}
      />
    </main>
  );
}
