"use client";

import { useLeadModal } from "../lib/LeadModalContext";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function Solutions() {
  const { openLeadModal } = useLeadModal();

  const solutions = [
    {
      title: "Control del Mostrador",
      subtitle: "LA BASE DE TU NEGOCIO",
      desc: "El punto de partida indispensable. Ventas ultra rápidas, control de stock preciso, gestión de proveedores y métricas en tiempo real. Pagás solo por esto, y sumás funciones cuando las necesites.",
      actionLabel: "Conocer el Core →",
      action: () => openLeadModal("core")
    },
    {
      title: 'Packs "Llave en mano"',
      subtitle: "OPTIMIZADO PARA TU NICHO",
      desc: "¿Gastronomía? Pack con comandas. ¿Kiosco? Módulo de fiados. ¿Indumentaria? Matriz de talles y color. Ya sabemos qué herramientas exactas necesita tu rubro para funcionar sin trabas.",
      actionLabel: "Ver Módulos →",
      link: "/mini-modulos"
    },
    {
      title: "Tu Catálogo Web",
      subtitle: "VENTA DIGITAL INTEGRADA",
      desc: "Transformá tu stock en una vidriera digital que recibe pedidos por WhatsApp 24/7. Sincronizado en tiempo real con tu caja: si lo vendés en el local, desaparece automáticamente de la web.",
      actionLabel: "Explorar Catálogo →",
      action: () => openLeadModal("catalogo")
    }
  ];

  return (
    <section id="soluciones" className="py-24 px-6 md:px-10 bg-[#090B0B]/40 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#16D39A]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#F3F5F4] tracking-tight mb-4">
            Un sistema. Infinitas combinaciones.
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#A6AEAA] max-w-[600px] leading-relaxed mb-12">
            Armá la herramienta perfecta para tu negocio, o elegí uno de nuestros Packs optimizados por rubro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {solutions.map((sol, i) => (
            <div key={i} className="flex flex-col bg-[#111615] border border-white/5 rounded-xl p-8 hover:border-[#16D39A]/20 transition-colors">
              <span className="text-[12px] font-bold tracking-wider text-[#16D39A] uppercase mb-2">
                {sol.subtitle}
              </span>
              <h3 className="text-[22px] font-bold text-[#F3F5F4] mb-4">{sol.title}</h3>
              <p className="text-[14px] text-[#A6AEAA] leading-relaxed mb-8 flex-1">
                {sol.desc}
              </p>
              {sol.action ? (
                <button 
                  onClick={sol.action}
                  className="text-[14px] font-semibold text-[#F3F5F4] hover:text-[#16D39A] transition-colors self-start inline-flex items-center"
                >
                  {sol.actionLabel}
                </button>
              ) : (
                <Link
                  to={sol.link || "#"}
                  className="text-[14px] font-semibold text-[#F3F5F4] hover:text-[#16D39A] transition-colors self-start inline-flex items-center"
                >
                  {sol.actionLabel}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Benefits List */}
        <div className="bg-[#111615] border border-white/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl">
            <h3 className="text-[24px] font-bold text-[#F3F5F4] mb-6">Software Justo. Sin letra chica.</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#16D39A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F3F5F4] block text-sm">Solo pagás lo que usás</strong>
                  <span className="text-[#A6AEAA] text-sm">Si no usás el módulo de recetas, no lo pagás. Simple.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#16D39A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F3F5F4] block text-sm">Ahorro por volumen</strong>
                  <span className="text-[#A6AEAA] text-sm">Al armar tu Pack a medida, los módulos complementarios tienen bonificaciones.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#16D39A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F3F5F4] block text-sm">Libertad total</strong>
                  <span className="text-[#A6AEAA] text-sm">Sin contratos forzosos. Podés dar de baja un módulo o el sistema entero cuando quieras.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="shrink-0 bg-[#090B0B] border border-white/5 rounded-xl p-6 text-center">
             <h4 className="text-white font-bold mb-2">¿Implementación?</h4>
             <p className="text-[#A6AEAA] text-sm max-w-[200px] mx-auto mb-4">No te tiramos el sistema por la cabeza. Te ofrecemos setups guiados donde te ayudamos a arrancar.</p>
             <button onClick={() => openLeadModal("asesoramiento")} className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                Hablar con un asesor
             </button>
          </div>
        </div>

      </div>
    </section>
  );
}
