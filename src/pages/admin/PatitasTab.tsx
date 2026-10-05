"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { PatitasLead, PatitasTimeline, PatitasImage, PatitasConfig } from "../../types";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

export default function PatitasTab() {
  const [activeSubTab, setActiveSubTab] = useState<"leads" | "timeline" | "images" | "config">("leads");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 border-b border-white/5 pb-2 overflow-x-auto">
        <button onClick={() => setActiveSubTab("leads")} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${activeSubTab === "leads" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}>Leads de Lista de Espera</button>
        <button onClick={() => setActiveSubTab("timeline")} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${activeSubTab === "timeline" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}>Timeline (Línea de tiempo)</button>
        <button onClick={() => setActiveSubTab("images")} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${activeSubTab === "images" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}>Imágenes del Hero</button>
        <button onClick={() => setActiveSubTab("config")} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${activeSubTab === "config" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}>Configuración General</button>
      </div>

      <div className="bg-[#090B0B] border border-white/5 rounded-xl p-6">
        {activeSubTab === "leads" && <PatitasLeadsList />}
        {activeSubTab === "timeline" && <PatitasTimelineAdmin />}
        {activeSubTab === "images" && <PatitasImagesAdmin />}
        {activeSubTab === "config" && <PatitasConfigAdmin />}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Sub-componentes
// -------------------------------------------------------------

function PatitasLeadsList() {
  const [leads, setLeads] = useState<PatitasLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("patitas_leads").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setLeads(data as PatitasLead[]);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-white/50 text-sm">Cargando leads...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-3 px-4 font-medium text-white/50">Fecha</th>
            <th className="py-3 px-4 font-medium text-white/50">Nombre</th>
            <th className="py-3 px-4 font-medium text-white/50">Rol</th>
            <th className="py-3 px-4 font-medium text-white/50">Contacto</th>
            <th className="py-3 px-4 font-medium text-white/50">Respuesta Específica</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors align-top">
              <td className="py-3 px-4 text-white/80 whitespace-nowrap">{new Date(l.created_at).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-white font-medium">{l.nombre}</td>
              <td className="py-3 px-4 text-[#16D39A] uppercase text-xs">{l.rol}</td>
              <td className="py-3 px-4 text-white/60 text-xs">
                {l.contacto_email && <div>✉️ {l.contacto_email}</div>}
                {l.contacto_whatsapp && <div>📱 {l.contacto_whatsapp}</div>}
                {l.contacto_redes && <div>🔗 {l.contacto_redes}</div>}
              </td>
              <td className="py-3 px-4 text-white/60 max-w-xs truncate" title={l.pregunta_especifica || ""}>
                {l.pregunta_especifica || "-"}
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr><td colSpan={5} className="py-6 text-center text-white/40">No hay leads todavía.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function PatitasConfigAdmin() {
  const [config, setConfig] = useState<PatitasConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("patitas_config").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setConfig(data as PatitasConfig);
    });
  }, []);

  const save = async () => {
    if (!config) return;
    setSaving(true);
    await supabase.from("patitas_config").update({
      whatsapp_number: config.whatsapp_number,
      launch_date: config.launch_date,
    }).eq("id", 1);
    setSaving(false);
  };

  if (!config) return <p className="text-white/50 text-sm">Cargando...</p>;

  return (
    <div className="max-w-sm space-y-4">
      <div>
        <label className="block text-xs font-semibold text-white/50 mb-1">Número de WhatsApp (con código país, sin +)</label>
        <input
          type="text"
          value={config.whatsapp_number || ""}
          onChange={(e) => setConfig({ ...config, whatsapp_number: e.target.value })}
          className="w-full bg-[#111615] border border-white/10 rounded-md p-2 text-white text-sm"
          placeholder="5491112345678"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-white/50 mb-1">Fecha de Lanzamiento (Dejar vacío para "indeterminado")</label>
        <input
          type="date"
          value={config.launch_date ? config.launch_date.split("T")[0] : ""}
          onChange={(e) => setConfig({ ...config, launch_date: e.target.value || null })}
          className="w-full bg-[#111615] border border-white/10 rounded-md p-2 text-white text-sm"
        />
      </div>
      <button onClick={save} disabled={saving} className="bg-[#16D39A] text-black px-4 py-2 rounded-md font-bold text-sm hover:bg-[#12b382]">
        {saving ? "Guardando..." : "Guardar Configuración"}
      </button>
    </div>
  );
}

function PatitasTimelineAdmin() {
  const [items, setItems] = useState<PatitasTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState<Partial<PatitasTimeline>>({ titulo: "", descripcion: "", fecha: "", estado: "pendiente", orden: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("patitas_timeline").select("*").order("orden", { ascending: true });
    if (data) setItems(data as PatitasTimeline[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const save = async () => {
    setSaving(true);
    if (editingId) {
      await supabase.from("patitas_timeline").update(form).eq("id", editingId);
    } else {
      await supabase.from("patitas_timeline").insert([form]);
    }
    setForm({ titulo: "", descripcion: "", fecha: "", estado: "pendiente", orden: 0 });
    setEditingId(null);
    await fetchItems();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (confirm("¿Eliminar hito?")) {
      await supabase.from("patitas_timeline").delete().eq("id", id);
      fetchItems();
    }
  };

  if (loading) return <p className="text-white/50 text-sm">Cargando timeline...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-4 max-w-xl">
        <h4 className="font-bold text-white mb-2">{editingId ? "Editar Hito" : "Nuevo Hito"}</h4>
        <input type="text" placeholder="Título" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} className="w-full bg-[#111615] border border-white/10 rounded p-2 text-white text-sm" />
        <textarea placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} className="w-full bg-[#111615] border border-white/10 rounded p-2 text-white text-sm h-20" />
        <div className="flex gap-4">
          <input type="date" value={form.fecha ? form.fecha.split("T")[0] : ""} onChange={e => setForm({...form, fecha: e.target.value})} className="bg-[#111615] border border-white/10 rounded p-2 text-white text-sm flex-1" />
          <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value as any})} className="bg-[#111615] border border-white/10 rounded p-2 text-white text-sm flex-1">
            <option value="pendiente">Pendiente</option>
            <option value="actual">Actual</option>
            <option value="completado">Completado</option>
          </select>
          <input type="number" placeholder="Orden" value={form.orden} onChange={e => setForm({...form, orden: Number(e.target.value)})} className="bg-[#111615] border border-white/10 rounded p-2 text-white text-sm w-20" />
        </div>
        <div className="flex gap-2">
          <button onClick={save} disabled={saving || !form.titulo || !form.fecha} className="bg-[#16D39A] text-black px-4 py-2 rounded font-bold text-sm hover:bg-[#12b382] disabled:opacity-50">Guardar</button>
          {editingId && <button onClick={() => { setEditingId(null); setForm({ titulo: "", descripcion: "", fecha: "", estado: "pendiente", orden: 0 }); }} className="bg-white/10 text-white px-4 py-2 rounded text-sm hover:bg-white/20">Cancelar</button>}
        </div>
      </div>

      <div className="grid gap-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.estado === 'completado' ? 'bg-[#16D39A]/20 text-[#16D39A]' : item.estado === 'actual' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/50'}`}>{item.estado}</span>
                <span className="text-white/50 text-xs">Orden: {item.orden} | {new Date(item.fecha).toLocaleDateString("es-AR", { timeZone: "UTC" })}</span>
              </div>
              <p className="font-bold text-white text-sm">{item.titulo}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(item.id); setForm(item); }} className="p-2 text-white/50 hover:text-white bg-white/5 rounded"><Edit2 size={16} /></button>
              <button onClick={() => remove(item.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatitasImagesAdmin() {
  const [items, setItems] = useState<PatitasImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);
  
  const [form, setForm] = useState<Partial<PatitasImage>>({ desktop_url: "", mobile_url: "", orden: 0, activo: true });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("patitas_images").select("*").order("orden", { ascending: true });
    if (data) setItems(data as PatitasImage[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const uploadFile = async (file: File): Promise<string | null> => {
    const sanitizeFilename = (name: string) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `patitas/${Date.now()}-${sanitizeFilename(file.name)}`;
    const { error } = await supabase.storage.from("recursos").upload(path, file);
    if (error) {
      console.error("No se pudo subir la imagen:", error);
      alert(`Error al subir: ${error.message}`);
      return null;
    }
    const { data } = supabase.storage.from("recursos").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleUploadDesktop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingDesktop(true);
    const url = await uploadFile(file);
    if (url) setForm((prev) => ({ ...prev, desktop_url: url }));
    setUploadingDesktop(false);
  };

  const handleUploadMobile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMobile(true);
    const url = await uploadFile(file);
    if (url) setForm((prev) => ({ ...prev, mobile_url: url }));
    setUploadingMobile(false);
  };

  const save = async () => {
    setSaving(true);
    if (editingId) {
      await supabase.from("patitas_images").update(form).eq("id", editingId);
    } else {
      await supabase.from("patitas_images").insert([form]);
    }
    setForm({ desktop_url: "", mobile_url: "", orden: 0, activo: true });
    setEditingId(null);
    await fetchItems();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (confirm("¿Eliminar imagen?")) {
      await supabase.from("patitas_images").delete().eq("id", id);
      fetchItems();
    }
  };

  if (loading) return <p className="text-white/50 text-sm">Cargando imágenes...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-4 max-w-xl">
        <h4 className="font-bold text-white mb-2">{editingId ? "Editar Imagen" : "Nueva Imagen"}</h4>
        
        {/* Desktop Image */}
        <div className="space-y-2">
          <label className="text-[13px] text-white/70 font-semibold">URL o Archivo para Desktop (Laptop)</label>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="URL Desktop" value={form.desktop_url} onChange={e => setForm({...form, desktop_url: e.target.value})} className="flex-1 bg-[#111615] border border-white/10 rounded p-2 text-white text-sm" />
            <div className="relative overflow-hidden inline-block shrink-0">
              <button disabled={uploadingDesktop} className="bg-white/10 hover:bg-white/20 text-white text-[13px] px-3 py-2 rounded cursor-pointer disabled:opacity-50">
                {uploadingDesktop ? "Subiendo..." : "Subir foto"}
              </button>
              <input type="file" accept="image/*" onChange={handleUploadDesktop} disabled={uploadingDesktop} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
          {form.desktop_url && <img src={form.desktop_url} alt="Desktop Preview" className="h-16 rounded object-cover mt-2" />}
        </div>

        {/* Mobile Image */}
        <div className="space-y-2">
          <label className="text-[13px] text-white/70 font-semibold">URL o Archivo para Mobile (Celular)</label>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="URL Mobile" value={form.mobile_url} onChange={e => setForm({...form, mobile_url: e.target.value})} className="flex-1 bg-[#111615] border border-white/10 rounded p-2 text-white text-sm" />
            <div className="relative overflow-hidden inline-block shrink-0">
              <button disabled={uploadingMobile} className="bg-white/10 hover:bg-white/20 text-white text-[13px] px-3 py-2 rounded cursor-pointer disabled:opacity-50">
                {uploadingMobile ? "Subiendo..." : "Subir foto"}
              </button>
              <input type="file" accept="image/*" onChange={handleUploadMobile} disabled={uploadingMobile} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
          {form.mobile_url && <img src={form.mobile_url} alt="Mobile Preview" className="h-16 rounded object-cover mt-2" />}
        </div>

        <div className="flex gap-4 items-center pt-2">
          <input type="number" placeholder="Orden" value={form.orden} onChange={e => setForm({...form, orden: Number(e.target.value)})} className="bg-[#111615] border border-white/10 rounded p-2 text-white text-sm w-20" />
          <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
            <input type="checkbox" checked={form.activo} onChange={e => setForm({...form, activo: e.target.checked})} className="w-4 h-4 accent-[#16D39A]" />
            Activo
          </label>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={save} disabled={saving || !form.desktop_url || !form.mobile_url || uploadingDesktop || uploadingMobile} className="bg-[#16D39A] text-black px-4 py-2 rounded font-bold text-sm hover:bg-[#12b382] disabled:opacity-50">Guardar</button>
          {editingId && <button onClick={() => { setEditingId(null); setForm({ desktop_url: "", mobile_url: "", orden: 0, activo: true }); }} className="bg-white/10 text-white px-4 py-2 rounded text-sm hover:bg-white/20">Cancelar</button>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className={`p-4 bg-white/5 border rounded-lg flex flex-col gap-3 ${item.activo ? 'border-white/10' : 'border-red-500/30 opacity-50'}`}>
            <div className="aspect-video bg-[#111615] rounded overflow-hidden relative">
              <img src={item.desktop_url} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-[10px] px-2 py-1 rounded text-white">Orden: {item.orden}</div>
            </div>
            <div className="flex gap-2 justify-end mt-auto">
              <button onClick={() => { setEditingId(item.id); setForm(item); }} className="p-2 text-white/50 hover:text-white bg-white/5 rounded"><Edit2 size={16} /></button>
              <button onClick={() => remove(item.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
