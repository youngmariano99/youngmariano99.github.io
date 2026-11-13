"use client";

import React, { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  FileText,
  User,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Check,
  RotateCcw,
  Printer,
  FileCode,
  Globe,
  Database,
  ExternalLink,
  Upload,
  Download,
  Copy,
  Bot,
  X,
  CircleAlert,
  FileUp,
  Info,
} from "lucide-react";
import {
  PortfolioCvData,
  DEFAULT_PORTFOLIO_CV_DATA,
  getActiveSummary,
  SummaryVariantKey,
  downloadJsonResume,
  downloadRawJson,
  validateAndCleanPortfolioCvData,
  AI_PORTFOLIO_CV_TEMPLATE,
  getAiMasterPrompt,
} from "../../lib/portfolioCvData";
import { usePortfolioCvData } from "../../lib/usePortfolioCvData";
import AtsResumePrintView from "../../components/portfolio/AtsResumePrintView";

export default function PortfolioCvTab() {
  const { data, updateData, resetData } = usePortfolioCvData();
  const [form, setForm] = useState<PortfolioCvData>(() => JSON.parse(JSON.stringify(data)));
  const [activeEditorTab, setActiveEditorTab] = useState<"perfil" | "experiencia" | "casos" | "habilidades" | "educacion">("perfil");
  const [previewMode, setPreviewMode] = useState<"cv" | "web">("cv");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});
  const [newStackInputs, setNewStackInputs] = useState<Record<string, string>>({});

  // Estados para el Modal / Gestor de Integración JSON & IA
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [jsonModalTab, setJsonModalTab] = useState<"import" | "export-current" | "template-ai">("import");
  const [jsonInputText, setJsonInputText] = useState("");
  const [importValidation, setImportValidation] = useState<{
    success: boolean;
    data?: PortfolioCvData;
    error?: string;
  } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [importApplied, setImportApplied] = useState(false);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleJsonInputChange = (val: string) => {
    setJsonInputText(val);
    setImportApplied(false);
    if (!val.trim()) {
      setImportValidation(null);
      return;
    }
    const result = validateAndCleanPortfolioCvData(val);
    setImportValidation(result);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        handleJsonInputChange(content);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleApplyImport = () => {
    if (!importValidation || !importValidation.success || !importValidation.data) {
      return;
    }
    setForm(JSON.parse(JSON.stringify(importValidation.data)));
    setImportApplied(true);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    setTimeout(() => {
      setIsJsonModalOpen(false);
      setImportApplied(false);
      setJsonInputText("");
      setImportValidation(null);
    }, 900);
  };

  // Sincronizar form si data externa cambia
  const handleSave = () => {
    updateData(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que querés restablecer todos los datos a la configuración inicial por defecto?")) {
      resetData();
      setForm(JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_CV_DATA)));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // --- Handlers Tab 1: Perfil & Resumen ---
  const handleVariantSelect = (variant: SummaryVariantKey) => {
    setForm((prev) => ({
      ...prev,
      resumen: {
        ...prev.resumen,
        activeVariant: variant,
      },
    }));
  };

  // --- Handlers Tab 2: Experiencia ---
  const handleToggleExp = (expId: string) => {
    setForm((prev) => ({
      ...prev,
      experiencias: prev.experiencias.map((e) =>
        e.id === expId ? { ...e, visible: !e.visible } : e
      ),
    }));
  };

  const handleToggleBullet = (expId: string, bulletId: string) => {
    setForm((prev) => ({
      ...prev,
      experiencias: prev.experiencias.map((e) =>
        e.id === expId
          ? {
              ...e,
              bullets: e.bullets.map((b) =>
                b.id === bulletId ? { ...b, visible: !b.visible } : b
              ),
            }
          : e
      ),
    }));
  };

  const handleMoveBullet = (expId: string, bulletIdx: number, direction: "up" | "down") => {
    setForm((prev) => ({
      ...prev,
      experiencias: prev.experiencias.map((e) => {
        if (e.id !== expId) return e;
        const newBullets = [...e.bullets];
        const targetIdx = direction === "up" ? bulletIdx - 1 : bulletIdx + 1;
        if (targetIdx < 0 || targetIdx >= newBullets.length) return e;
        const temp = newBullets[bulletIdx];
        newBullets[bulletIdx] = newBullets[targetIdx];
        newBullets[targetIdx] = temp;
        return { ...e, bullets: newBullets };
      }),
    }));
  };

  const handleDeleteBullet = (expId: string, bulletId: string) => {
    setForm((prev) => ({
      ...prev,
      experiencias: prev.experiencias.map((e) =>
        e.id === expId
          ? { ...e, bullets: e.bullets.filter((b) => b.id !== bulletId) }
          : e
      ),
    }));
  };

  const handleAddBullet = (expId: string) => {
    setForm((prev) => ({
      ...prev,
      experiencias: prev.experiencias.map((e) =>
        e.id === expId
          ? {
              ...e,
              bullets: [
                ...e.bullets,
                {
                  id: `bullet-${Date.now()}`,
                  subtitulo: "Nueva Tarea / Logro",
                  descripcion: "Detalle de la responsabilidad o logro...",
                  visible: true,
                },
              ],
            }
          : e
      ),
    }));
  };

  // --- Handlers Tab 3: Casos de Estudio ---
  const handleToggleCase = (caseId: string) => {
    setForm((prev) => ({
      ...prev,
      casosEstudio: prev.casosEstudio.map((c) =>
        c.id === caseId ? { ...c, activo: !c.activo } : c
      ),
    }));
  };

  const handleAddStackChip = (caseId: string) => {
    const val = (newStackInputs[caseId] || "").trim();
    if (!val) return;
    setForm((prev) => ({
      ...prev,
      casosEstudio: prev.casosEstudio.map((c) =>
        c.id === caseId ? { ...c, stack: [...c.stack, val] } : c
      ),
    }));
    setNewStackInputs((p) => ({ ...p, [caseId]: "" }));
  };

  const handleRemoveStackChip = (caseId: string, chipIndex: number) => {
    setForm((prev) => ({
      ...prev,
      casosEstudio: prev.casosEstudio.map((c) =>
        c.id === caseId
          ? { ...c, stack: c.stack.filter((_, idx) => idx !== chipIndex) }
          : c
      ),
    }));
  };

  // --- Handlers Tab 4: Habilidades ---
  const handleAddSkill = (catId: string) => {
    const val = (newSkillInputs[catId] || "").trim();
    if (!val) return;
    setForm((prev) => ({
      ...prev,
      habilidades: prev.habilidades.map((h) =>
        h.id === catId ? { ...h, habilidades: [...h.habilidades, val] } : h
      ),
    }));
    setNewSkillInputs((p) => ({ ...p, [catId]: "" }));
  };

  const handleRemoveSkill = (catId: string, skillIdx: number) => {
    setForm((prev) => ({
      ...prev,
      habilidades: prev.habilidades.map((h) =>
        h.id === catId
          ? { ...h, habilidades: h.habilidades.filter((_, idx) => idx !== skillIdx) }
          : h
      ),
    }));
  };

  return (
    <>
      {/* VISTA IMPRESA ATS (Oculta en pantalla, visible al imprimir desde el Admin) */}
      <div id="cv-print-area-admin" className="hidden print:block w-full bg-white text-gray-950">
        <AtsResumePrintView data={form} isPreview={false} />
      </div>

      <div className="print:hidden flex flex-col gap-6">
      {/* =================================================================== */}
      {/* BARRA SUPERIOR DE ACCIÓN Y ESTADO                                   */}
      {/* =================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-zinc-800 bg-zinc-900/60 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#16D39A]/10 border border-[#16D39A]/30 flex items-center justify-center text-[#16D39A]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Configurador Unificado de Portfolio &amp; CV ATS
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-[#16D39A] border border-zinc-700">
                Single Source of Truth
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Cualquier cambio aquí impacta en tiempo real tanto en la web <code className="text-zinc-300">/portfolio</code> como en el PDF descargable.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
            title="Restablece los datos a los valores oficiales por defecto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Defecto</span>
          </button>

          <button
            type="button"
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            title="Probar la generación e impresión del PDF ATS"
          >
            <Printer className="w-3.5 h-3.5 text-[#16D39A]" />
            <span>Imprimir PDF</span>
          </button>

          <div className="h-5 w-px bg-zinc-800 mx-1 hidden sm:block" />

          {/* Botones de Integración JSON & IA */}
          <button
            type="button"
            onClick={() => {
              setJsonModalTab("import");
              setIsJsonModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 hover:border-[#16D39A]/60 transition-all"
            title="Importar un archivo o texto JSON para actualizar todo el CV de una vez"
          >
            <Upload className="w-3.5 h-3.5 text-[#16D39A]" />
            <span>Importar JSON</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setJsonModalTab("export-current");
              setIsJsonModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 hover:border-[#16D39A]/60 transition-all"
            title="Exportar la estructura actual del CV para pasarle a una IA"
          >
            <Download className="w-3.5 h-3.5 text-[#16D39A]" />
            <span>Exportar Actual</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setJsonModalTab("template-ai");
              setIsJsonModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-[#16D39A] hover:text-black hover:bg-[#16D39A] bg-[#16D39A]/10 border border-[#16D39A]/40 transition-all"
            title="Ver la plantilla documentada y el prompt maestro para la IA"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Plantilla &amp; IA</span>
          </button>

          <div className="h-5 w-px bg-zinc-800 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-bold text-black bg-[#16D39A] hover:bg-[#13be8a] transition-all shadow-md"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Guardado con éxito!</span>
              </>
            ) : (
              <span>Guardar Cambios</span>
            )}
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* LAYOUT DE 2 COLUMNAS (IZQUIERDA: EDITOR | DERECHA: PREVIEW EN VIVO) */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ----------------------------------------------------------------- */}
        {/* COLUMNA IZQUIERDA: EDITOR POR TABS/ACORDEONES (7 COLS)           */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Navegación de Sub-Tabs del Editor */}
          <div className="flex flex-wrap gap-1.5 border-b border-zinc-800 pb-2">
            {[
              { id: "perfil", label: "1. Perfil & Resumen", icon: User },
              { id: "experiencia", label: "2. Experiencia CV (ATS)", icon: Briefcase },
              { id: "casos", label: "3. Casos de Estudio", icon: Globe },
              { id: "habilidades", label: "4. Habilidades", icon: Database },
              { id: "educacion", label: "5. Educación", icon: GraduationCap },
            ].map((tabItem) => {
              const Icon = tabItem.icon;
              return (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => setActiveEditorTab(tabItem.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeEditorTab === tabItem.id
                      ? "bg-[#16D39A] text-black"
                      : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tabItem.label}</span>
                </button>
              );
            })}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SUB-TAB 1: PERFIL & RESUMEN (PRESETS 1 CLIC)                  */}
          {/* ------------------------------------------------------------- */}
          {activeEditorTab === "perfil" && (
            <div className="border border-zinc-800 bg-zinc-900/40 p-5 rounded-xl space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Variante de Resumen Ejecutivo (Conmutador de 1 Clic)
                </h3>
                <p className="text-xs text-zinc-400 mb-3">
                  Seleccioná qué preset de perfil se activará en el CV ATS y en el encabezado de la web:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleVariantSelect("variante-a")}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      form.resumen.activeVariant === "variante-a"
                        ? "border-[#16D39A] bg-[#16D39A]/10 text-white"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-white">Plan A: ERP &amp; Datos</span>
                      {form.resumen.activeVariant === "variante-a" && (
                        <span className="w-2 h-2 rounded-full bg-[#16D39A]" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 leading-tight">
                      Enfoque en procesos, SQL, soporte técnico e incidentes.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVariantSelect("variante-b")}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      form.resumen.activeVariant === "variante-b"
                        ? "border-[#16D39A] bg-[#16D39A]/10 text-white"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-white">Plan B: PyME Local</span>
                      {form.resumen.activeVariant === "variante-b" && (
                        <span className="w-2 h-2 rounded-full bg-[#16D39A]" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 leading-tight">
                      Enfoque administrativo, stock, facturación y cajas.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVariantSelect("custom")}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      form.resumen.activeVariant === "custom"
                        ? "border-[#16D39A] bg-[#16D39A]/10 text-white"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-white">Personalizado</span>
                      {form.resumen.activeVariant === "custom" && (
                        <span className="w-2 h-2 rounded-full bg-[#16D39A]" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 leading-tight">
                      Texto libre editable por el usuario.
                    </span>
                  </button>
                </div>
              </div>

              {/* Textarea del Resumen Activo */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Texto del Resumen Activo (Se verá en el CV y en la Web)
                </label>
                <textarea
                  rows={4}
                  value={
                    form.resumen.activeVariant === "variante-a"
                      ? form.resumen.varianteA
                      : form.resumen.activeVariant === "variante-b"
                      ? form.resumen.varianteB
                      : form.resumen.custom
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      resumen: {
                        ...prev.resumen,
                        [prev.resumen.activeVariant === "variante-a"
                          ? "varianteA"
                          : prev.resumen.activeVariant === "variante-b"
                          ? "varianteB"
                          : "custom"]: val,
                      },
                    }));
                  }}
                  className="w-full bg-black/60 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 leading-relaxed focus:border-[#16D39A] focus:outline-none"
                />
              </div>

              {/* Inputs de Datos de Contacto */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Datos de Contacto (Encabezado)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-zinc-400 block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      value={form.contacto.nombre}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, nombre: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Rol Web</label>
                    <input
                      type="text"
                      value={form.contacto.rolWeb}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, rolWeb: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Email</label>
                    <input
                      type="email"
                      value={form.contacto.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, email: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="text"
                      value={form.contacto.telefono}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, telefono: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Ubicación</label>
                    <input
                      type="text"
                      value={form.contacto.ubicacion}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, ubicacion: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Web Portfolio</label>
                    <input
                      type="text"
                      value={form.contacto.web}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, web: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-zinc-400 block mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={form.contacto.linkedin}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, linkedin: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-zinc-400 block mb-1">Badge de Disponibilidad</label>
                    <input
                      type="text"
                      value={form.contacto.badgeDisponibilidad}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, contacto: { ...p.contacto, badgeDisponibilidad: e.target.value } }))
                      }
                      className="w-full bg-black/60 border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#16D39A] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* SUB-TAB 2: EXPERIENCIA CV (ATS)                               */}
          {/* ------------------------------------------------------------- */}
          {activeEditorTab === "experiencia" && (
            <div className="space-y-4">
              {form.experiencias.map((exp) => (
                <div
                  key={exp.id}
                  className="border border-zinc-800 bg-zinc-900/40 p-4 rounded-xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleExp(exp.id)}
                        className={`p-1 rounded text-xs flex items-center gap-1.5 font-medium ${
                          exp.visible
                            ? "bg-emerald-500/10 text-[#16D39A] border border-emerald-500/20"
                            : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                        }`}
                        title="Activar/desactivar en el CV"
                      >
                        {exp.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{exp.visible ? "Visible en CV" : "Oculto"}</span>
                      </button>
                      <h4 className="text-sm font-bold text-white">{exp.empresa}</h4>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">{exp.periodo}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-zinc-400 block mb-1">Empresa</label>
                      <input
                        type="text"
                        value={exp.empresa}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            experiencias: p.experiencias.map((item) =>
                              item.id === exp.id ? { ...item, empresa: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Rol / Cargo</label>
                      <input
                        type="text"
                        value={exp.rol}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            experiencias: p.experiencias.map((item) =>
                              item.id === exp.id ? { ...item, rol: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Ubicación</label>
                      <input
                        type="text"
                        value={exp.ubicacion}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            experiencias: p.experiencias.map((item) =>
                              item.id === exp.id ? { ...item, ubicacion: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Período</label>
                      <input
                        type="text"
                        value={exp.periodo}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            experiencias: p.experiencias.map((item) =>
                              item.id === exp.id ? { ...item, periodo: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Viñetas / Bullets */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-300">
                        Viñetas de Logros y Tareas ({exp.bullets.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddBullet(exp.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#16D39A] hover:underline"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Agregar Viñeta</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.bullets.map((b, bIdx) => (
                        <div
                          key={b.id}
                          className="bg-black/40 border border-zinc-800/80 rounded-lg p-2.5 flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-1">
                              <span className="text-[10px] font-mono text-zinc-500">#{bIdx + 1}</span>
                              <input
                                type="text"
                                placeholder="Subtítulo en negrita (ej: Control de Stock)"
                                value={b.subtitulo}
                                onChange={(e) =>
                                  setForm((p) => ({
                                    ...p,
                                    experiencias: p.experiencias.map((item) =>
                                      item.id === exp.id
                                        ? {
                                            ...item,
                                            bullets: item.bullets.map((bullet) =>
                                              bullet.id === b.id ? { ...bullet, subtitulo: e.target.value } : bullet
                                            ),
                                          }
                                        : item
                                    ),
                                  }))
                                }
                                className="flex-1 bg-black/60 border border-zinc-800 rounded px-2 py-1 text-xs text-white font-semibold focus:border-[#16D39A] focus:outline-none"
                              />
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleBullet(exp.id, b.id)}
                                className={`p-1 rounded text-xs ${
                                  b.visible ? "text-[#16D39A]" : "text-zinc-600"
                                }`}
                                title="Mostrar / ocultar viñeta"
                              >
                                {b.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                type="button"
                                disabled={bIdx === 0}
                                onClick={() => handleMoveBullet(exp.id, bIdx, "up")}
                                className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-20"
                                title="Mover arriba"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={bIdx === exp.bullets.length - 1}
                                onClick={() => handleMoveBullet(exp.id, bIdx, "down")}
                                className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-20"
                                title="Mover abajo"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteBullet(exp.id, b.id)}
                                className="p-1 rounded text-red-400 hover:text-red-300"
                                title="Eliminar viñeta"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <textarea
                            rows={2}
                            placeholder="Descripción de la tarea y resultado..."
                            value={b.descripcion}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                experiencias: p.experiencias.map((item) =>
                                  item.id === exp.id
                                    ? {
                                        ...item,
                                        bullets: item.bullets.map((bullet) =>
                                          bullet.id === b.id ? { ...bullet, descripcion: e.target.value } : bullet
                                        ),
                                      }
                                    : item
                                ),
                              }))
                            }
                            className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 focus:border-[#16D39A] focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* SUB-TAB 3: CASOS DE ESTUDIO WEB                              */}
          {/* ------------------------------------------------------------- */}
          {activeEditorTab === "casos" && (
            <div className="space-y-4">
              {form.casosEstudio.map((c) => (
                <div
                  key={c.id}
                  className="border border-zinc-800 bg-zinc-900/40 p-4 rounded-xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleCase(c.id)}
                        className={`p-1 rounded text-xs flex items-center gap-1.5 font-medium ${
                          c.activo
                            ? "bg-emerald-500/10 text-[#16D39A] border border-emerald-500/20"
                            : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                        }`}
                      >
                        {c.activo ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{c.activo ? "Activo en Web" : "Oculto"}</span>
                      </button>
                      <h4 className="text-sm font-bold text-white">{c.titulo}</h4>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">{c.estado}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="text-zinc-400 block mb-1">Título</label>
                      <input
                        type="text"
                        value={c.titulo}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            casosEstudio: p.casosEstudio.map((item) =>
                              item.id === c.id ? { ...item, titulo: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-zinc-400 block mb-1">Subtítulo</label>
                      <input
                        type="text"
                        value={c.subtitulo}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            casosEstudio: p.casosEstudio.map((item) =>
                              item.id === c.id ? { ...item, subtitulo: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Etiqueta de Estado</label>
                      <input
                        type="text"
                        value={c.estado}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            casosEstudio: p.casosEstudio.map((item) =>
                              item.id === c.id ? { ...item, estado: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Mockup URL / Etiqueta</label>
                      <input
                        type="text"
                        value={c.mockupLabel}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            casosEstudio: p.casosEstudio.map((item) =>
                              item.id === c.id ? { ...item, mockupLabel: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* 3 Bloques Fijos */}
                  <div className="space-y-3 pt-2 border-t border-zinc-800/60 text-xs">
                    <div>
                      <label className="text-zinc-300 font-semibold block mb-1">
                        01. El Problema Operativo
                      </label>
                      <textarea
                        rows={2}
                        value={c.problema}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            casosEstudio: p.casosEstudio.map((item) =>
                              item.id === c.id ? { ...item, problema: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded p-2 text-zinc-300 focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-300 font-semibold block mb-1">
                        02. Arquitectura y Solución Técnica (Intro)
                      </label>
                      <textarea
                        rows={2}
                        value={c.arquitectura.intro}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            casosEstudio: p.casosEstudio.map((item) =>
                              item.id === c.id
                                ? { ...item, arquitectura: { ...item.arquitectura, intro: e.target.value } }
                                : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded p-2 text-zinc-300 focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-300 font-semibold block mb-1">
                        03. Impacto en el Negocio / Operación
                      </label>
                      <textarea
                        rows={2}
                        value={c.impacto}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            casosEstudio: p.casosEstudio.map((item) =>
                              item.id === c.id ? { ...item, impacto: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded p-2 text-zinc-300 focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>

                    {/* Chips del Stack */}
                    <div>
                      <label className="text-zinc-300 font-semibold block mb-1">
                        04. Stack &amp; Conceptos Aplicados
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {c.stack.map((stk, sIdx) => (
                          <span
                            key={sIdx}
                            className="font-mono text-[11px] bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-200 flex items-center gap-1"
                          >
                            <span>{stk}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveStackChip(c.id, sIdx)}
                              className="text-zinc-500 hover:text-red-400"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Agregar tecnología al stack (ej. Docker, Redis)..."
                          value={newStackInputs[c.id] || ""}
                          onChange={(e) =>
                            setNewStackInputs((p) => ({ ...p, [c.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddStackChip(c.id);
                            }
                          }}
                          className="flex-1 bg-black/60 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:border-[#16D39A] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddStackChip(c.id)}
                          className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white rounded"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* SUB-TAB 4: HABILIDADES & MATRIZ                                */}
          {/* ------------------------------------------------------------- */}
          {activeEditorTab === "habilidades" && (
            <div className="space-y-4">
              <div className="border border-zinc-800 bg-zinc-900/40 p-4 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-white mb-2">
                  Categorías de Habilidades (CV ATS &amp; Roadmap)
                </h3>
                <p className="text-xs text-zinc-400">
                  Agregá habilidades en 2 clics a medida que completás proyectos o certificaciones (ej. <code className="text-[#16D39A]">n8n</code>, <code className="text-[#16D39A]">Power BI</code>):
                </p>

                <div className="space-y-4 pt-2">
                  {form.habilidades.map((cat) => (
                    <div key={cat.id} className="bg-black/40 border border-zinc-800 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{cat.nombre}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              habilidades: p.habilidades.map((item) =>
                                item.id === cat.id ? { ...item, visible: !item.visible } : item
                              ),
                            }))
                          }
                          className={`text-xs px-2 py-0.5 rounded ${
                            cat.visible ? "text-[#16D39A] bg-emerald-500/10" : "text-zinc-500 bg-zinc-800"
                          }`}
                        >
                          {cat.visible ? "Visible" : "Oculto"}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {cat.habilidades.map((sk, skIdx) => (
                          <span
                            key={skIdx}
                            className="text-xs bg-zinc-800/80 border border-zinc-700 px-2.5 py-0.5 rounded text-zinc-200 flex items-center gap-1.5"
                          >
                            <span>{sk}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(cat.id, skIdx)}
                              className="text-zinc-500 hover:text-red-400"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Nueva habilidad (ej. n8n, Power BI)..."
                          value={newSkillInputs[cat.id] || ""}
                          onChange={(e) =>
                            setNewSkillInputs((p) => ({ ...p, [cat.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSkill(cat.id);
                            }
                          }}
                          className="flex-1 bg-black/60 border border-zinc-800 rounded px-2.5 py-1 text-xs text-white focus:border-[#16D39A] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSkill(cat.id)}
                          className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white rounded"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* SUB-TAB 5: EDUCACIÓN                                          */}
          {/* ------------------------------------------------------------- */}
          {activeEditorTab === "educacion" && (
            <div className="space-y-4">
              {form.educacion.map((edu) => (
                <div
                  key={edu.id}
                  className="border border-zinc-800 bg-zinc-900/40 p-4 rounded-xl space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-xs font-bold text-white">{edu.institucion}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          educacion: p.educacion.map((item) =>
                            item.id === edu.id ? { ...item, visible: !item.visible } : item
                          ),
                        }))
                      }
                      className={`text-xs px-2 py-0.5 rounded ${
                        edu.visible ? "text-[#16D39A] bg-emerald-500/10" : "text-zinc-500 bg-zinc-800"
                      }`}
                    >
                      {edu.visible ? "Visible en CV & Web" : "Oculto"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-zinc-400 block mb-1">Título de Grado / Técnico</label>
                      <input
                        type="text"
                        value={edu.titulo}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            educacion: p.educacion.map((item) =>
                              item.id === edu.id ? { ...item, titulo: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Institución</label>
                      <input
                        type="text"
                        value={edu.institucion}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            educacion: p.educacion.map((item) =>
                              item.id === edu.id ? { ...item, institucion: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Estado de Avance</label>
                      <input
                        type="text"
                        value={edu.estado}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            educacion: p.educacion.map((item) =>
                              item.id === edu.id ? { ...item, estado: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Años / Período</label>
                      <input
                        type="text"
                        value={edu.periodo}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            educacion: p.educacion.map((item) =>
                              item.id === edu.id ? { ...item, periodo: e.target.value } : item
                            ),
                          }))
                        }
                        className="w-full bg-black/60 border border-zinc-800 rounded px-2.5 py-1.5 text-white focus:border-[#16D39A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* COLUMNA DERECHA: VISTA PREVIA EN VIVO CON CONMUTADOR (5 COLS)     */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-5 flex flex-col gap-3 sticky top-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16D39A]" />
              Vista Previa en Vivo
            </span>

            {/* Switch de Modo de Vista Previa */}
            <div className="flex items-center bg-black/60 border border-zinc-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setPreviewMode("cv")}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  previewMode === "cv"
                    ? "bg-[#16D39A] text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Hoja A4 CV ATS
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("web")}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  previewMode === "web"
                    ? "bg-[#16D39A] text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Web /portfolio
              </button>
            </div>
          </div>

          {/* Contenedor de Vista Previa */}
          <div className="border border-zinc-800 bg-[#090B0B] rounded-xl overflow-hidden max-h-[82vh] overflow-y-auto p-3">
            {previewMode === "cv" ? (
              <div className="flex justify-center bg-zinc-950 p-2 rounded">
                <div className="w-full transform origin-top scale-[0.98] transition-transform">
                  <AtsResumePrintView data={form} isPreview={true} />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs text-zinc-300 p-2">
                {/* Header Preview */}
                <div className="border-b border-zinc-800 pb-3 space-y-1.5">
                  <span className="font-mono text-[10px] text-[#16D39A] block">
                    {form.contacto.badgeDisponibilidad}
                  </span>
                  <h3 className="text-base font-bold text-white">{form.contacto.nombre}</h3>
                  <p className="text-[#16D39A] text-xs font-medium">{form.contacto.rolWeb}</p>
                  <p className="text-zinc-400 text-[11px] leading-relaxed pt-1">
                    {getActiveSummary(form.resumen)}
                  </p>
                </div>

                {/* Casos Preview */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block">
                    Proyectos Activos ({form.casosEstudio.filter((c) => c.activo).length})
                  </span>
                  {form.casosEstudio
                    .filter((c) => c.activo)
                    .map((c) => (
                      <div key={c.id} className="bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-lg space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white text-xs">{c.titulo}</span>
                          <span className="text-[9px] font-mono text-[#16D39A]">{c.estado}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400">{c.subtitulo}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {c.stack.slice(0, 4).map((s, idx) => (
                            <span key={idx} className="font-mono text-[9px] bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* =================================================================== */}
    {/* MODAL / PANEL DE ASISTENTE JSON & IA                                */}
    {/* =================================================================== */}
    {isJsonModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
        <div className="w-full max-w-4xl max-h-[90vh] bg-[#0c0e12] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200">
          {/* Header Modal */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-4 sm:px-6 bg-zinc-950/70">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#16D39A]/10 border border-[#16D39A]/30 flex items-center justify-center text-[#16D39A]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Centro de Integración JSON &amp; Asistente IA
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-[#16D39A] border border-zinc-700">
                    v1.0 ATS
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Importá cambios masivos o exportá plantillas y prompts para que una IA optimice tu perfil.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsJsonModalOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pestañas del Modal */}
          <div className="flex items-center border-b border-zinc-800 bg-zinc-950/40 px-4 sm:px-6 gap-2 pt-2">
            <button
              type="button"
              onClick={() => setJsonModalTab("import")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                jsonModalTab === "import"
                  ? "border-[#16D39A] text-[#16D39A] bg-[#16D39A]/5"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>1. Importar JSON al CV</span>
            </button>

            <button
              type="button"
              onClick={() => setJsonModalTab("export-current")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                jsonModalTab === "export-current"
                  ? "border-[#16D39A] text-[#16D39A] bg-[#16D39A]/5"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Download className="w-4 h-4" />
              <span>2. Exportar Estructura Actual</span>
            </button>

            <button
              type="button"
              onClick={() => setJsonModalTab("template-ai")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                jsonModalTab === "template-ai"
                  ? "border-[#16D39A] text-[#16D39A] bg-[#16D39A]/5"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>3. Plantilla &amp; Prompt para IA</span>
            </button>
          </div>

          {/* Cuerpo del Modal */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-140px)]">
            {/* ============================================================= */}
            {/* TAB 1: IMPORTAR JSON                                          */}
            {/* ============================================================= */}
            {jsonModalTab === "import" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileUp className="w-4 h-4 text-[#16D39A]" />
                      Cargar archivo .json desde tu equipo
                    </span>
                    <p className="text-[11px] text-zinc-400">
                      Seleccioná un archivo JSON guardado o generado por ChatGPT, Claude o DeepSeek.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer border border-zinc-700 transition-colors shrink-0">
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-3.5 h-3.5 text-[#16D39A]" />
                    <span>Seleccionar Archivo</span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300">
                      O pegar el código JSON en texto plano:
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const text = await navigator.clipboard.readText();
                            handleJsonInputChange(text);
                          } catch {
                            alert("No se pudo acceder al portapapeles. Pegá el contenido manualmente con Ctrl+V.");
                          }
                        }}
                        className="text-[11px] text-[#16D39A] hover:underline flex items-center gap-1 font-mono"
                      >
                        <Copy className="w-3 h-3" />
                        Pegar portapapeles
                      </button>
                      {jsonInputText && (
                        <button
                          type="button"
                          onClick={() => handleJsonInputChange("")}
                          className="text-[11px] text-zinc-500 hover:text-zinc-300"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>
                  </div>
                  <textarea
                    rows={10}
                    value={jsonInputText}
                    onChange={(e) => handleJsonInputChange(e.target.value)}
                    placeholder='Pegá aquí tu JSON completo (ej. { "contacto": { ... }, "experiencias": [ ... ] })...'
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3.5 font-mono text-xs text-zinc-300 focus:outline-none focus:border-[#16D39A] resize-y"
                  />
                </div>

                {/* Estado de Validación */}
                {importValidation && (
                  <div>
                    {importValidation.success && importValidation.data ? (
                      <div className="p-3.5 rounded-xl bg-[#16D39A]/10 border border-[#16D39A]/30 flex items-start gap-2.5 text-xs text-[#16D39A]">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          <span className="font-bold">Estructura JSON válida y lista para importar.</span>
                          <p className="text-[11px] text-zinc-300">
                            Detectado: <strong>{importValidation.data.experiencias?.length || 0}</strong> experiencias laborales,{" "}
                            <strong>{importValidation.data.habilidades?.length || 0}</strong> categorías de habilidades y{" "}
                            <strong>{importValidation.data.casosEstudio?.length || 0}</strong> casos de estudio.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/80 flex items-start gap-2.5 text-xs text-red-300">
                        <CircleAlert className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                        <div>
                          <span className="font-bold">Error de formato:</span>
                          <p className="text-[11px] text-red-200 mt-0.5">{importValidation.error}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    * Al cargar, los datos reemplazarán el editor actual. Deberás presionar "Guardar Cambios" para confirmar.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsJsonModalOpen(false)}
                      className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={!importValidation?.success}
                      onClick={handleApplyImport}
                      className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
                        importValidation?.success
                          ? "bg-[#16D39A] hover:bg-[#13be8a] text-black cursor-pointer"
                          : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                      }`}
                    >
                      {importApplied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>¡Cargado al Editor!</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Cargar este JSON al Editor</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* TAB 2: EXPORTAR ESTRUCTURA ACTUAL                             */}
            {/* ============================================================= */}
            {jsonModalTab === "export-current" && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#16D39A]" />
                    Estructura real activa del CV
                  </span>
                  <p className="text-xs text-zinc-400">
                    Este es el estado exacto de tu perfil tal cual está configurado en este momento. Podés copiarlo o descargarlo para pasárselo a una IA y pedirle ajustes puntuales (por ejemplo: <em>"Adaptá este CV para una postulación a Consultor Funcional ERP Odoo"</em>).
                  </p>
                </div>

                {/* Barra de Acciones de Exportación */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText(JSON.stringify(form, null, 2), "json-actual")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-semibold transition-colors"
                    >
                      {copyFeedback === "json-actual" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#16D39A]" />
                          <span className="text-[#16D39A]">¡JSON Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar JSON</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => downloadRawJson(form, "cv-mariano-young-actual.json")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-semibold transition-colors"
                      title="Descargar archivo .json listo"
                    >
                      <Download className="w-3.5 h-3.5 text-[#16D39A]" />
                      <span>Descargar .json</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyText(getAiMasterPrompt(form), "prompt-actual")}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#16D39A] hover:bg-[#13be8a] text-black text-xs font-bold transition-all shadow-sm"
                    title="Copia las instrucciones de redacción + tu CV actual ya insertado"
                  >
                    {copyFeedback === "prompt-actual" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Prompt + CV Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-3.5 h-3.5" />
                        <span>Copiar Prompt Completo con este CV para IA</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 max-h-96 overflow-auto selection:bg-[#16D39A] selection:text-black">
                    {JSON.stringify(form, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* TAB 3: PLANTILLA & PROMPT PARA IA                             */}
            {/* ============================================================= */}
            {jsonModalTab === "template-ai" && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#16D39A]" />
                    Plantilla Oficial y Guía para Modelos de Lenguaje (IA)
                  </span>
                  <p className="text-xs text-zinc-400">
                    Copiá este prompt maestro y pegalo directamente en ChatGPT, Claude, Gemini o DeepSeek. Le explica a la IA cada campo del sistema y le exige devolver únicamente el JSON válido para que no invente estructuras incompatibles.
                  </p>
                </div>

                {/* Tarjetas de Reglas Clave */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
                    <span className="font-mono text-[10px] text-[#16D39A] uppercase font-bold block">
                      Viñetas Laborales
                    </span>
                    <p className="text-[11px] text-zinc-300">
                      Cada viñeta debe tener <code className="text-white">subtitulo</code> (se imprime en negrita) y <code className="text-white">descripcion</code> técnica cuantificable.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
                    <span className="font-mono text-[10px] text-[#16D39A] uppercase font-bold block">
                      Límite A4 ATS
                    </span>
                    <p className="text-[11px] text-zinc-300">
                      Para que no desborde a una 2da página, la IA debe limitarse a 2-3 empresas y 3-4 viñetas por empresa.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
                    <span className="font-mono text-[10px] text-[#16D39A] uppercase font-bold block">
                      Variantes de Resumen
                    </span>
                    <p className="text-[11px] text-zinc-300">
                      Permite a la IA redactar 3 enfoques (<code className="text-white">varianteA</code>, <code className="text-white">varianteB</code>, <code className="text-white">custom</code>) conmutables en 1 clic.
                    </p>
                  </div>
                </div>

                {/* Acciones de la Plantilla */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => downloadRawJson(AI_PORTFOLIO_CV_TEMPLATE, "plantilla-cv-nodexa.json")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#16D39A]" />
                    <span>Descargar Plantilla JSON en Blanco</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyText(getAiMasterPrompt(AI_PORTFOLIO_CV_TEMPLATE), "prompt-plantilla")}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#16D39A] hover:bg-[#13be8a] text-black text-xs font-bold transition-all shadow-sm"
                  >
                    {copyFeedback === "prompt-plantilla" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Prompt Maestro Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Prompt Maestro + Plantilla para IA</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 max-h-96 overflow-auto selection:bg-[#16D39A] selection:text-black">
                    {getAiMasterPrompt(AI_PORTFOLIO_CV_TEMPLATE)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
