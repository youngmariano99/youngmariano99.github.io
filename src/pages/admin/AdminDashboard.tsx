"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/AuthContext";
import { ctaFormPainOptions, ctaFormUrgencyOptions, ctaFormVolumeOptions } from "../../data";
import { dolorFormOptions, painFilterOptions, rubroOptions, typeFilterOptions } from "../../recursosData";
import type { CtaFormOption, Resource } from "../../types";
import type { FilterOption } from "../../recursosData";
import GestionPortfolioTab from "./PortfolioTab";

/* ------------------------------------------------------------------ */
/* Tipos — mapean 1 a 1 las tablas de Supabase (ver 0001_init.sql)      */
/* ------------------------------------------------------------------ */

interface ResourceLead {
  id: string;
  nombre: string;
  rubro: string;
  rubro_otro: string | null;
  dolor: string;
  dolor_otro: string | null;
  resource_titulo: string;
  created_at: string;
}

interface CtaLead {
  id: string;
  nombre: string;
  negocio: string;
  dolor: string;
  volumen: string;
  urgencia: string;
  prioridad_score: number;
  prioridad_label: "Alta" | "Media" | "Baja";
  source: string;
  whatsapp_message: string;
  contactado: boolean;
  created_at: string;
}

interface AnalyticsEvent {
  id: string;
  event_type: "modal_open" | "form_submit" | "cta_click";
  source: string;
  page: string;
  created_at: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function labelFor(options: (FilterOption | CtaFormOption)[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PRIORITY_STYLES: Record<CtaLead["prioridad_label"], string> = {
  Alta: "border-red-500/30 bg-red-500/15 text-red-400",
  Media: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  Baja: "border-white/15 bg-white/10 text-white/50",
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-white/10 bg-white/[0.02] px-5 py-4">
      <div className="text-[26px] font-bold leading-none text-white">{value}</div>
      <div className="mt-1.5 text-[12px] text-white/45">{label}</div>
    </div>
  );
}

function mostFrequent(values: string[]): string | null {
  if (values.length === 0) return null;
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

/* ------------------------------------------------------------------ */
/* Tab: Leads de Recursos                                               */
/* ------------------------------------------------------------------ */

function LeadsRecursosTab() {
  const [leads, setLeads] = useState<ResourceLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [rubroFilter, setRubroFilter] = useState("");
  const [dolorFilter, setDolorFilter] = useState("");

  useEffect(() => {
    supabase
      .from("resource_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("No se pudieron cargar los leads de recursos:", error);
        setLeads((data as ResourceLead[]) ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = leads.filter(
    (l) => (rubroFilter === "" || l.rubro === rubroFilter) && (dolorFilter === "" || l.dolor === dolorFilter)
  );

  const topRubro = mostFrequent(leads.map((l) => l.rubro));
  const topDolor = mostFrequent(leads.map((l) => l.dolor));
  const topRecurso = mostFrequent(leads.map((l) => l.resource_titulo));

  if (loading) return <p className="text-sm text-white/40">Cargando...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total de leads" value={leads.length} />
        <StatCard label="Rubro más común" value={topRubro ? labelFor(rubroOptions, topRubro) : "—"} />
        <StatCard label="Dolor más común" value={topDolor ? labelFor(dolorFormOptions, topDolor) : "—"} />
        <StatCard label="Recurso más pedido" value={topRecurso ?? "—"} />
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={rubroFilter}
          onChange={(e) => setRubroFilter(e.target.value)}
          className="border border-white/15 bg-black/40 px-3 py-2 text-[13px] text-white"
        >
          <option value="">Todos los rubros</option>
          {rubroOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={dolorFilter}
          onChange={(e) => setDolorFilter(e.target.value)}
          className="border border-white/15 bg-black/40 px-3 py-2 text-[13px] text-white"
        >
          <option value="">Todos los dolores</option>
          {dolorFormOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-white/10 text-white/45">
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Rubro</th>
              <th className="px-4 py-3 font-semibold">Dolor</th>
              <th className="px-4 py-3 font-semibold">Recurso</th>
              <th className="px-4 py-3 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-white/5">
                <td className="px-4 py-3 text-white">{l.nombre}</td>
                <td className="px-4 py-3 text-white/70">
                  {l.rubro_otro || labelFor(rubroOptions, l.rubro)}
                </td>
                <td className="px-4 py-3 text-white/70">
                  {l.dolor_otro || labelFor(dolorFormOptions, l.dolor)}
                </td>
                <td className="px-4 py-3 text-white/70">{l.resource_titulo}</td>
                <td className="px-4 py-3 text-white/45">{formatDate(l.created_at)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/35">
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab: Leads de Contacto (CTA)                                         */
/* ------------------------------------------------------------------ */

function LeadsCtaTab() {
  const [leads, setLeads] = useState<CtaLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [prioridadFilter, setPrioridadFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  useEffect(() => {
    supabase
      .from("cta_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("No se pudieron cargar los leads de contacto:", error);
        setLeads((data as CtaLead[]) ?? []);
        setLoading(false);
      });
  }, []);

  const toggleContactado = async (lead: CtaLead) => {
    const next = !lead.contactado;
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, contactado: next } : l)));
    const { error } = await supabase.from("cta_leads").update({ contactado: next }).eq("id", lead.id);
    if (error) {
      console.error("No se pudo actualizar 'contactado':", error);
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, contactado: lead.contactado } : l)));
    }
  };

  const sources = useMemo(() => [...new Set(leads.map((l) => l.source))], [leads]);
  const filtered = leads.filter(
    (l) =>
      (prioridadFilter === "" || l.prioridad_label === prioridadFilter) &&
      (sourceFilter === "" || l.source === sourceFilter)
  );

  const counts = {
    Alta: leads.filter((l) => l.prioridad_label === "Alta").length,
    Media: leads.filter((l) => l.prioridad_label === "Media").length,
    Baja: leads.filter((l) => l.prioridad_label === "Baja").length,
  };

  if (loading) return <p className="text-sm text-white/40">Cargando...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total de leads" value={leads.length} />
        <StatCard label="Prioridad Alta" value={counts.Alta} />
        <StatCard label="Prioridad Media" value={counts.Media} />
        <StatCard label="Prioridad Baja" value={counts.Baja} />
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={prioridadFilter}
          onChange={(e) => setPrioridadFilter(e.target.value)}
          className="border border-white/15 bg-black/40 px-3 py-2 text-[13px] text-white"
        >
          <option value="">Toda prioridad</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="border border-white/15 bg-black/40 px-3 py-2 text-[13px] text-white"
        >
          <option value="">Todo origen</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[920px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-white/10 text-white/45">
              <th className="px-4 py-3 font-semibold">Prioridad</th>
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Negocio</th>
              <th className="px-4 py-3 font-semibold">Dolor</th>
              <th className="px-4 py-3 font-semibold">Volumen</th>
              <th className="px-4 py-3 font-semibold">Urgencia</th>
              <th className="px-4 py-3 font-semibold">Origen</th>
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Contactado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-white/5">
                <td className="px-4 py-3">
                  <span
                    className={`inline-block border px-2 py-0.5 text-[11px] font-semibold ${PRIORITY_STYLES[l.prioridad_label]}`}
                  >
                    {l.prioridad_label}
                  </span>
                </td>
                <td className="px-4 py-3 text-white">{l.nombre}</td>
                <td className="px-4 py-3 text-white/70">{l.negocio}</td>
                <td className="px-4 py-3 text-white/70">{labelFor(ctaFormPainOptions, l.dolor)}</td>
                <td className="px-4 py-3 text-white/70">{labelFor(ctaFormVolumeOptions, l.volumen)}</td>
                <td className="px-4 py-3 text-white/70">{labelFor(ctaFormUrgencyOptions, l.urgencia)}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-white/45">{l.source}</td>
                <td className="px-4 py-3 text-white/45">{formatDate(l.created_at)}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={l.contactado}
                    onChange={() => toggleContactado(l)}
                    className="h-4 w-4 accent-[#10B981]"
                  />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-white/35">
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab: Analíticas                                                      */
/* ------------------------------------------------------------------ */

function AnaliticasTab() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("analytics_events")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error("No se pudieron cargar los eventos de analítica:", error);
        setEvents((data as AnalyticsEvent[]) ?? []);
        setLoading(false);
      });
  }, []);

  const funnel = useMemo(() => {
    const sources = [...new Set(events.map((e) => e.source))];
    return sources
      .map((source) => {
        const opens = events.filter((e) => e.source === source && e.event_type === "modal_open").length;
        const submits = events.filter((e) => e.source === source && e.event_type === "form_submit").length;
        const rate = opens > 0 ? Math.round((submits / opens) * 100) : 0;
        return { source, opens, submits, rate };
      })
      .sort((a, b) => b.opens - a.opens);
  }, [events]);

  const totalOpens = events.filter((e) => e.event_type === "modal_open").length;
  const totalSubmits = events.filter((e) => e.event_type === "form_submit").length;

  if (loading) return <p className="text-sm text-white/40">Cargando...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Formularios abiertos" value={totalOpens} />
        <StatCard label="Formularios enviados" value={totalSubmits} />
        <StatCard
          label="Conversión general"
          value={totalOpens > 0 ? `${Math.round((totalSubmits / totalOpens) * 100)}%` : "—"}
        />
      </div>

      <div>
        <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-white/60">
          Funnel por origen (source)
        </h3>
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[520px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-white/10 text-white/45">
                <th className="px-4 py-3 font-semibold">Origen</th>
                <th className="px-4 py-3 font-semibold">Aperturas</th>
                <th className="px-4 py-3 font-semibold">Envíos</th>
                <th className="px-4 py-3 font-semibold">Conversión</th>
              </tr>
            </thead>
            <tbody>
              {funnel.map((f) => (
                <tr key={f.source} className="border-b border-white/5">
                  <td className="px-4 py-3 font-mono text-[11px] text-white">{f.source}</td>
                  <td className="px-4 py-3 text-white/70">{f.opens}</td>
                  <td className="px-4 py-3 text-white/70">{f.submits}</td>
                  <td className="px-4 py-3 text-white/70">{f.rate}%</td>
                </tr>
              ))}
              {funnel.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-white/35">
                    Todavía no hay eventos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-dashed border-white/15 bg-white/[0.02] p-5">
        <p className="text-[13px] leading-relaxed text-white/50">
          Tráfico general (visitas, páginas más vistas) todavía no está conectado. Cuando tengas tu cuenta de
          Umami Cloud, pasame el <code className="text-white/70">data-website-id</code> y lo integro acá.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab: Gestión de Recursos                                             */
/* ------------------------------------------------------------------ */

const EMPTY_RESOURCE_FORM = {
  titulo: "",
  descripcion: "",
  tipo: "excel" as Resource["tipo"],
  dolor: "stock" as Resource["dolor"],
  url_acceso: "",
};

function GestionRecursosTab() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_RESOURCE_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("No se pudieron cargar los recursos:", error);
        setResources((data as Resource[]) ?? []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const toggleActivo = async (resource: Resource) => {
    const next = !resource.activo;
    setResources((prev) => prev.map((r) => (r.id === resource.id ? { ...r, activo: next } : r)));
    const { error } = await supabase.from("resources").update({ activo: next }).eq("id", resource.id);
    if (error) console.error("No se pudo actualizar el recurso:", error);
  };

  const deleteResource = async (resource: Resource) => {
    if (!window.confirm(`¿Borrar "${resource.titulo}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from("resources").delete().eq("id", resource.id);
    if (error) {
      console.error("No se pudo borrar el recurso:", error);
      return;
    }
    setResources((prev) => prev.filter((r) => r.id !== resource.id));
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("recursos").upload(path, file);
    if (error) {
      console.error("No se pudo subir el archivo:", error);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("recursos").getPublicUrl(path);
    setForm((prev) => ({ ...prev, url_acceso: data.publicUrl }));
    setUploading(false);
  };

  const isValid = form.titulo.trim() !== "" && form.descripcion.trim() !== "" && form.url_acceso.trim() !== "";

  const handleCreate = async () => {
    if (!isValid || saving) return;
    setSaving(true);
    const { error } = await supabase.from("resources").insert({
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      tipo: form.tipo,
      dolor: form.dolor,
      url_acceso: form.url_acceso.trim(),
      activo: true,
    });
    setSaving(false);
    if (error) {
      console.error("No se pudo crear el recurso:", error);
      return;
    }
    setForm(EMPTY_RESOURCE_FORM);
    load();
  };

  if (loading) return <p className="text-sm text-white/40">Cargando...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="border border-white/10 bg-white/[0.02] p-6">
        <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-white/60">
          Nuevo recurso
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
            className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
          />
          <select
            value={form.tipo}
            onChange={(e) => setForm((p) => ({ ...p, tipo: e.target.value as Resource["tipo"] }))}
            className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-[#10B981] focus:outline-none"
          >
            {typeFilterOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
            rows={2}
            className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none sm:col-span-2"
          />
          <select
            value={form.dolor}
            onChange={(e) => setForm((p) => ({ ...p, dolor: e.target.value as Resource["dolor"] }))}
            className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-[#10B981] focus:outline-none"
          >
            {painFilterOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="URL de acceso (o subí un archivo abajo)"
            value={form.url_acceso}
            onChange={(e) => setForm((p) => ({ ...p, url_acceso: e.target.value }))}
            className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
          />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[12px] text-white/45">
              Subir archivo (Excel / PDF) al bucket "recursos" — completa la URL de arriba automáticamente
            </label>
            <input
              type="file"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="text-[13px] text-white/70"
            />
            {uploading && <span className="ml-3 text-[12px] text-white/40">Subiendo...</span>}
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={!isValid || saving}
          className="mt-5 bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-[#090B0B] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Guardando..." : "Crear recurso"}
        </button>
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-white/10 text-white/45">
              <th className="px-4 py-3 font-semibold">Título</th>
              <th className="px-4 py-3 font-semibold">Tipo</th>
              <th className="px-4 py-3 font-semibold">Dolor</th>
              <th className="px-4 py-3 font-semibold">Activo</th>
              <th className="px-4 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-b border-white/5">
                <td className="px-4 py-3 text-white">{r.titulo}</td>
                <td className="px-4 py-3 text-white/70">{labelFor(typeFilterOptions, r.tipo)}</td>
                <td className="px-4 py-3 text-white/70">{labelFor(painFilterOptions, r.dolor)}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={r.activo}
                    onChange={() => toggleActivo(r)}
                    className="h-4 w-4 accent-[#10B981]"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteResource(r)}
                    className="border-none bg-transparent p-0 text-[12px] font-semibold text-red-400 hover:text-red-300"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/35">
                  Todavía no hay recursos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Tab = "cta-leads" | "recursos-leads" | "analiticas" | "gestion-recursos" | "gestion-portfolio";

const TABS: { id: Tab; label: string }[] = [
  { id: "cta-leads", label: "Leads de Contacto" },
  { id: "recursos-leads", label: "Leads de Recursos" },
  { id: "analiticas", label: "Analíticas" },
  { id: "gestion-recursos", label: "Gestión de Recursos" },
  { id: "gestion-portfolio", label: "Gestión de Portfolio" },
];

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("cta-leads");

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[#10B981]">NODEXA Admin</span>
          <h1 className="mt-1 text-[24px] font-bold tracking-tight text-white">Panel de administración</h1>
        </div>
        <button
          onClick={signOut}
          className="border border-white/15 bg-transparent px-4 py-2 text-[13px] font-semibold text-white/70 hover:border-white/30 hover:text-white"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`border px-4 py-2 text-[13px] font-semibold transition-colors ${
              tab === t.id
                ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981]"
                : "border-white/10 bg-transparent text-white/50 hover:border-white/25 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "cta-leads" && <LeadsCtaTab />}
        {tab === "recursos-leads" && <LeadsRecursosTab />}
        {tab === "analiticas" && <AnaliticasTab />}
        {tab === "gestion-recursos" && <GestionRecursosTab />}
        {tab === "gestion-portfolio" && <GestionPortfolioTab />}
      </div>
    </div>
  );
}
