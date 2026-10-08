import re

def patch_admin():
    path = "src/pages/admin/AdminDashboard.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update CtaLead interface
    # interface CtaLead { ... }
    # Let's just regex replace the interface
    new_interface = """interface CtaLead {
  id: string;
  nombre: string;
  negocio: string;
  rubro?: string;
  rubro_otro?: string;
  dolor: string;
  volumen: string;
  urgencia: string;
  prioridad_score: number;
  prioridad_label: "Alta" | "Media" | "Baja";
  source: string;
  whatsapp_message: string;
  contactado: boolean;
  email?: string;
  telefono?: string;
  created_at: string;
  modalidad_venta?: string;
  tipo_procesos?: string;
  pack_sugerido?: string;
}"""
    content = re.sub(r'interface CtaLead \{[^\}]+\}', new_interface, content)

    # 2. Update table headers
    # <th className="px-4 py-3 font-semibold">Volumen</th>
    # <th className="px-4 py-3 font-semibold">Urgencia</th>
    content = content.replace('<th className="px-4 py-3 font-semibold">Volumen</th>', '<th className="px-4 py-3 font-semibold">Pack Sugerido</th>')
    content = content.replace('<th className="px-4 py-3 font-semibold">Urgencia</th>', '<th className="px-4 py-3 font-semibold">Venta / Procesos</th>')

    # 3. Update table cells
    # <td className="px-4 py-3 text-white/70">{l.volumen}</td>
    # <td className="px-4 py-3 text-white/70">{l.urgencia}</td>
    content = content.replace('<td className="px-4 py-3 text-white/70">{l.volumen}</td>', '<td className="px-4 py-3 text-[#16D39A] font-semibold text-xs">{l.pack_sugerido || "N/A"}</td>')
    
    urgencia_cell = """<td className="px-4 py-3 text-white/70">
                  <div className="text-[11px] leading-tight">
                    <span className="block text-white/50">Venta:</span> {l.modalidad_venta || "N/A"}<br/>
                    <span className="block mt-1 text-white/50">Procesos:</span> {l.tipo_procesos || "N/A"}
                  </div>
                </td>"""
    content = content.replace('<td className="px-4 py-3 text-white/70">{l.urgencia}</td>', urgencia_cell)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    patch_admin()
