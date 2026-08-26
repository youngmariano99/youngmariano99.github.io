"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  FileSpreadsheet,
  FileText,
  Globe,
  Search,
} from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { supabase } from "../lib/supabase";
import { BackToHome } from "../components/shared/BackToHome";
import ResourceDownloadModal from "../components/ResourceDownloadModal";
import {
  bannerCta,
  bannerLines,
  bannerTitle,
  emptyStateText,
  painFilterLabel,
  painFilterOptions,
  recursosHeroSubtitle,
  recursosHeroTitle,
  searchPlaceholder,
  typeBadgeLabels,
  typeCtaLabels,
  typeFilterLabel,
  typeFilterOptions,
} from "../recursosData";
import type { Resource } from "../types";

const ACCENT = "#10B981";

const TYPE_ICONS: Record<Resource["tipo"], () => JSX.Element> = {
  excel: () => <FileSpreadsheet size={13} strokeWidth={2} />,
  web: () => <Globe size={13} strokeWidth={2} />,
  pdf: () => <FileText size={13} strokeWidth={2} />,
};

/* ------------------------------------------------------------------ */

function RecursosHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 lg:pt-40">
      {/* retícula fina de fondo, guía la vista hacia abajo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1)}
        className="relative mx-auto max-w-[820px] text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="mx-auto max-w-[20ch] text-[34px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[44px] lg:text-[52px]"
        >
          {recursosHeroTitle}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-[62ch] text-[16px] leading-relaxed text-white/60 lg:text-[18px]"
        >
          {recursosHeroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}

function SearchAndFilters({
  search,
  onSearch,
  pain,
  onPain,
  type,
  onType,
}: {
  search: string;
  onSearch: (v: string) => void;
  pain: string;
  onPain: (v: string) => void;
  type: string;
  onType: (v: string) => void;
}) {
  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-3 px-6 md:flex-row md:px-10">
      <div className="relative flex-1">
        <Search
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full border border-white/15 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
        />
      </div>
      <select
        value={pain}
        onChange={(e) => onPain(e.target.value)}
        className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-[#10B981] focus:outline-none md:w-[220px]"
      >
        <option value="">{painFilterLabel}</option>
        {painFilterOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => onType(e.target.value)}
        className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-[#10B981] focus:outline-none md:w-[200px]"
      >
        <option value="">{typeFilterLabel}</option>
        {typeFilterOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResourceCard({ resource, onSelect }: { resource: Resource; onSelect: () => void }) {
  const TypeIcon = TYPE_ICONS[resource.tipo];
  const CtaIcon = resource.tipo === "excel" ? Download : ArrowRight;

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col rounded-2xl border border-white/10 bg-black/50 p-6 shadow-md backdrop-blur-md transition-colors duration-300 hover:border-emerald-500/30"
    >
      <span
        className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
        style={{ background: "rgba(16,185,129,.12)", color: ACCENT }}
      >
        <TypeIcon />
        {typeBadgeLabels[resource.tipo]}
      </span>
      <h3 className="mt-4 text-[17px] font-bold text-white">{resource.titulo}</h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-white/55">
        • {resource.descripcion}
      </p>
      <button
        type="button"
        onClick={onSelect}
        className="mt-5 inline-flex items-center gap-2 self-start border-none bg-transparent p-0 text-[13.5px] font-semibold text-[#10B981] transition-colors hover:text-white"
      >
        <CtaIcon size={15} strokeWidth={2} />
        <span>{typeCtaLabels[resource.tipo]}</span>
      </button>
    </motion.div>
  );
}

function UpsellBanner() {
  return (
    <motion.div
      variants={fadeUp}
      className="col-span-full rounded-2xl border p-8 md:p-10"
      style={{ background: "#0D1110", borderColor: "rgba(16,185,129,.35)" }}
    >
      <h3 className="text-[20px] font-bold leading-snug text-white md:text-[24px]">{bannerTitle}</h3>
      <div className="mt-4 flex flex-col gap-1.5">
        {bannerLines.map((line) => (
          <p key={line} className="text-[14px] leading-relaxed text-white/60">
            │ {line}
          </p>
        ))}
      </div>
      <Link
        to="/mini-modulos#nucleo-core"
        className="mt-6 inline-flex items-center gap-2 bg-[#10B981] px-6 py-3 text-sm font-semibold text-[#090B0B] no-underline"
      >
        <span>{bannerCta}</span>
        <ArrowRight size={15} strokeWidth={2} />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function Recursos() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pain, setPain] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState<Resource | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("resources")
      .select("*")
      .eq("activo", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error("No se pudieron cargar los recursos:", error);
        setResources((data as Resource[]) ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesSearch =
        q === "" || r.titulo.toLowerCase().includes(q) || r.descripcion.toLowerCase().includes(q);
      const matchesPain = pain === "" || r.dolor === pain;
      const matchesType = type === "" || r.tipo === type;
      return matchesSearch && matchesPain && matchesType;
    });
  }, [resources, search, pain, type]);

  return (
    <main id="recursos-top" className="relative">
      <BackToHome />
      <RecursosHero />

      <section className="px-6 md:px-10">
        <SearchAndFilters
          search={search}
          onSearch={setSearch}
          pain={pain}
          onPain={setPain}
          type={type}
          onType={setType}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mx-auto mt-10 grid max-w-[1100px] grid-cols-1 gap-5 pb-28 sm:grid-cols-2 lg:grid-cols-3"
        >
          {loading ? (
            <p className="col-span-full text-center text-sm text-white/40">Cargando recursos...</p>
          ) : filtered.length === 0 ? (
            <p className="col-span-full text-center text-sm text-white/40">{emptyStateText}</p>
          ) : (
            filtered.map((resource, i) => (
              <Fragment key={resource.id}>
                <ResourceCard resource={resource} onSelect={() => setSelected(resource)} />
                {i === 2 && <UpsellBanner key="banner" />}
              </Fragment>
            ))
          )}
          {!loading && filtered.length > 0 && filtered.length <= 2 && <UpsellBanner key="banner-tail" />}
        </motion.div>
      </section>

      <ResourceDownloadModal resource={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
