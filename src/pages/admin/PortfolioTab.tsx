"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { PortfolioProject, PortfolioStep } from "../../types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const STEP_LABELS = ["Cliente", "El problema", "Cómo trabajamos", "La solución", "Revisar y guardar"];
const TOTAL_STEPS = STEP_LABELS.length;

const EMPTY_STEP: PortfolioStep = { titulo: "", descripcion: "" };
const EMPTY_FORM = {
  cliente_nombre: "",
  rubro: "",
  slug: "",
  slugTouched: false,
  imagen_portada_url: "",
  problema: "",
  solucion: "",
  insignia: false,
};

export default function GestionPortfolioTab() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  const [wizardStep, setWizardStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pasos, setPasos] = useState<PortfolioStep[]>([{ ...EMPTY_STEP }]);
  const [galeria, setGaleria] = useState<string[]>([]);
  const [uploadingPortada, setUploadingPortada] = useState(false);
  const [uploadingGaleria, setUploadingGaleria] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    supabase
      .from("portfolio_projects")
      .select("*")
      .order("orden", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("No se pudieron cargar los casos:", error);
        setProjects((data as PortfolioProject[]) ?? []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const resetWizard = () => {
    setWizardStep(0);
    setForm(EMPTY_FORM);
    setPasos([{ ...EMPTY_STEP }]);
    setGaleria([]);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);
    if (error) {
      console.error("No se pudo subir el archivo:", error);
      return null;
    }
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  const handlePortadaUpload = async (file: File) => {
    setUploadingPortada(true);
    const url = await uploadFile(file);
    if (url) setForm((prev) => ({ ...prev, imagen_portada_url: url }));
    setUploadingPortada(false);
  };

  const handleGaleriaUpload = async (files: FileList) => {
    setUploadingGaleria(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }
    setGaleria((prev) => [...prev, ...urls]);
    setUploadingGaleria(false);
  };

  const step0Valid = form.cliente_nombre.trim() !== "" && form.rubro.trim() !== "" && form.slug.trim() !== "";
  const step1Valid = form.problema.trim() !== "";
  const step2Valid = pasos.every((p) => p.titulo.trim() !== "" && p.descripcion.trim() !== "");
  const step3Valid = form.solucion.trim() !== "";

  const canAdvance = [step0Valid, step1Valid, step2Valid, step3Valid, true][wizardStep];

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    const { error } = await supabase.from("portfolio_projects").insert({
      slug: form.slug.trim(),
      cliente_nombre: form.cliente_nombre.trim(),
      rubro: form.rubro.trim(),
      imagen_portada_url: form.imagen_portada_url || null,
      problema: form.problema.trim(),
      solucion: form.solucion.trim(),
      pasos: pasos.filter((p) => p.titulo.trim() !== ""),
      galeria_urls: galeria,
      insignia: form.insignia,
      activo: true,
    });
    setSaving(false);
    if (error) {
      console.error("No se pudo guardar el caso:", error);
      return;
    }
    resetWizard();
    load();
  };

  const toggleField = async (project: PortfolioProject, field: "activo" | "insignia") => {
    const next = !project[field];
    setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, [field]: next } : p)));
    const { error } = await supabase.from("portfolio_projects").update({ [field]: next }).eq("id", project.id);
    if (error) console.error(`No se pudo actualizar ${field}:`, error);
  };

  const deleteProject = async (project: PortfolioProject) => {
    if (!window.confirm(`¿Borrar el caso "${project.cliente_nombre}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", project.id);
    if (error) {
      console.error("No se pudo borrar el caso:", error);
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== project.id));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* ---------------- Wizard de carga ---------------- */}
      <div className="border border-white/10 bg-white/[0.02] p-6">
        <h3 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-white/60">Nuevo caso</h3>
        <div className="mb-6 flex gap-1.5">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1 rounded-full ${i <= wizardStep ? "bg-[#10B981]" : "bg-white/10"}`} />
              <span className={`mt-1.5 block text-[10.5px] ${i === wizardStep ? "text-white/70" : "text-white/30"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {wizardStep === 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nombre del cliente"
              value={form.cliente_nombre}
              onChange={(e) => {
                const value = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  cliente_nombre: value,
                  slug: prev.slugTouched ? prev.slug : slugify(value),
                }));
              }}
              className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Rubro (ej. Marketplace de servicios)"
              value={form.rubro}
              onChange={(e) => setForm((prev) => ({ ...prev, rubro: e.target.value }))}
              className="border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
            />
            <input
              type="text"
              placeholder="slug-para-la-url"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value), slugTouched: true }))}
              className="border border-white/15 bg-black/40 px-4 py-3 font-mono text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
            />
            <div>
              <label className="mb-1.5 block text-[12px] text-white/45">Imagen de portada</label>
              <input
                type="file"
                accept="image/*"
                disabled={uploadingPortada}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePortadaUpload(file);
                }}
                className="text-[13px] text-white/70"
              />
              {uploadingPortada && <span className="ml-2 text-[12px] text-white/40">Subiendo...</span>}
              {form.imagen_portada_url && !uploadingPortada && (
                <span className="ml-2 text-[12px] text-[#10B981]">✓ Cargada</span>
              )}
            </div>
          </div>
        )}

        {wizardStep === 1 && (
          <textarea
            placeholder="¿Cuál era el problema del cliente antes de trabajar con Nodexa?"
            value={form.problema}
            onChange={(e) => setForm((prev) => ({ ...prev, problema: e.target.value }))}
            rows={5}
            className="w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
          />
        )}

        {wizardStep === 2 && (
          <div className="flex flex-col gap-4">
            {pasos.map((paso, i) => (
              <div key={i} className="border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-white/40">Paso {i + 1}</span>
                  {pasos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setPasos((prev) => prev.filter((_, idx) => idx !== i))}
                      className="border-none bg-transparent p-0 text-[11px] font-semibold text-red-400 hover:text-red-300"
                    >
                      Quitar
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Título del paso (ej. Relevamiento en el local)"
                  value={paso.titulo}
                  onChange={(e) =>
                    setPasos((prev) => prev.map((p, idx) => (idx === i ? { ...p, titulo: e.target.value } : p)))
                  }
                  className="mb-2 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                />
                <textarea
                  placeholder="Descripción del paso"
                  value={paso.descripcion}
                  onChange={(e) =>
                    setPasos((prev) => prev.map((p, idx) => (idx === i ? { ...p, descripcion: e.target.value } : p)))
                  }
                  rows={2}
                  className="w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setPasos((prev) => [...prev, { ...EMPTY_STEP }])}
              className="border border-dashed border-white/20 bg-transparent px-4 py-2.5 text-[13px] font-semibold text-white/50 hover:border-white/40 hover:text-white"
            >
              + Agregar paso
            </button>
          </div>
        )}

        {wizardStep === 3 && (
          <div className="flex flex-col gap-4">
            <textarea
              placeholder="¿Cómo se resolvió? ¿Qué construimos?"
              value={form.solucion}
              onChange={(e) => setForm((prev) => ({ ...prev, solucion: e.target.value }))}
              rows={5}
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
            />
            <div>
              <label className="mb-1.5 block text-[12px] text-white/45">
                Galería adicional (opcional, podés elegir varias imágenes)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploadingGaleria}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) handleGaleriaUpload(e.target.files);
                }}
                className="text-[13px] text-white/70"
              />
              {uploadingGaleria && <span className="ml-2 text-[12px] text-white/40">Subiendo...</span>}
              {galeria.length > 0 && (
                <span className="ml-2 text-[12px] text-[#10B981]">✓ {galeria.length} imagen(es)</span>
              )}
            </div>
          </div>
        )}

        {wizardStep === 4 && (
          <div className="flex flex-col gap-4">
            <div className="border border-white/10 bg-black/20 p-4 text-[13px] text-white/70">
              <p>
                <b className="text-white">{form.cliente_nombre}</b> · {form.rubro}
              </p>
              <p className="mt-1 text-white/50">/casos-de-exito/{form.slug}</p>
              <p className="mt-2">{pasos.filter((p) => p.titulo).length} paso(s) de proceso cargados.</p>
            </div>
            <label className="flex items-center gap-2.5 text-[13.5px] text-white/80">
              <input
                type="checkbox"
                checked={form.insignia}
                onChange={(e) => setForm((prev) => ({ ...prev, insignia: e.target.checked }))}
                className="h-4 w-4 accent-[#10B981]"
              />
              Marcar como caso insignia (estrella grande/dorada en la constelación)
            </label>
            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-1 bg-[#10B981] px-5 py-3 text-sm font-semibold text-[#090B0B] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Guardando..." : "Guardar caso"}
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setWizardStep((s) => Math.max(0, s - 1))}
            disabled={wizardStep === 0}
            className="border-none bg-transparent p-0 text-[13px] font-semibold text-white/45 hover:text-white disabled:opacity-0"
          >
            ← Volver
          </button>
          {wizardStep < TOTAL_STEPS - 1 && (
            <button
              type="button"
              onClick={() => setWizardStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
              disabled={!canAdvance}
              className="bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-[#090B0B] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente →
            </button>
          )}
        </div>
      </div>

      {/* ---------------- Lista de casos ---------------- */}
      {loading ? (
        <p className="text-sm text-white/40">Cargando...</p>
      ) : (
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-white/10 text-white/45">
                <th className="px-4 py-3 font-semibold">Cliente</th>
                <th className="px-4 py-3 font-semibold">Rubro</th>
                <th className="px-4 py-3 font-semibold">Insignia</th>
                <th className="px-4 py-3 font-semibold">Activo</th>
                <th className="px-4 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-white/5">
                  <td className="px-4 py-3 text-white">{p.cliente_nombre}</td>
                  <td className="px-4 py-3 text-white/70">{p.rubro}</td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={p.insignia}
                      onChange={() => toggleField(p, "insignia")}
                      className="h-4 w-4 accent-[#e3b866]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={p.activo}
                      onChange={() => toggleField(p, "activo")}
                      className="h-4 w-4 accent-[#10B981]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteProject(p)}
                      className="border-none bg-transparent p-0 text-[12px] font-semibold text-red-400 hover:text-red-300"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/35">
                    Todavía no hay casos cargados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
