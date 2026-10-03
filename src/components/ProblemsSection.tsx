"use client";

import { useLeadModal } from "../lib/LeadModalContext";
import { Package, Workflow, Database, Link as LinkIcon, MonitorDot, HelpCircle } from "lucide-react";

export default function ProblemsSection() {
  const { openLeadModal } = useLeadModal();

  const problems = [
    {
      id: "stock",
      icon: Package,
      title: "Problemas con el stock",
      copy: "No sabés exactamente qué tenés, la información está desactualizada o dependés de planillas."
    },
    {
      id: "procesos_manual",
      icon: Workflow,
      title: "Demasiadas tareas manuales",
      copy: "Tu equipo pierde horas haciendo tareas repetitivas que podrían automatizarse."
    },
    {
      id: "informacion",
      icon: Database,
      title: "Información desordenada",
      copy: "Tenés datos, pero están repartidos entre Excel, WhatsApp, sistemas y anotaciones."
    },
    {
      id: "integracion",
      icon: LinkIcon,
      title: "Tus herramientas no se conectan",
      copy: "Terminás cargando la misma información varias veces en distintos lugares."
    },
    {
      id: "digitalizacion",
      icon: MonitorDot,
      title: "Necesitás una herramienta digital",
      copy: "Sabés que necesitás mejorar, pero no sabés exactamente qué solución implementar."
    },
    {
      id: "otro",
      icon: HelpCircle,
      title: "Otro problema",
      copy: "Contanos qué está pasando y lo analizamos juntos de forma honesta."
    }
  ];

  return (
    <section id="problemas" className="py-24 px-6 md:px-10 bg-[#090B0B]/40">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#F3F5F4] tracking-tight mb-4">
            ¿Qué está frenando hoy a tu negocio?
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#A6AEAA] max-w-[600px] leading-relaxed">
            Muchas veces el problema no es trabajar más. Es tener que hacer demasiadas cosas manualmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div 
                key={prob.id}
                className="flex flex-col bg-[#111615] border border-white/5 rounded-xl p-8 hover:border-[#16D39A]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0D1110]/40 border border-white/10 flex items-center justify-center mb-6 text-[#16D39A]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-semibold text-[#F3F5F4] mb-3">
                  {prob.title}
                </h3>
                <p className="text-[14px] text-[#A6AEAA] leading-relaxed mb-8 flex-1">
                  {prob.copy}
                </p>
                <button
                  onClick={() => openLeadModal(`problem_${prob.id}`)}
                  className="inline-flex items-center text-[14px] font-semibold text-[#16D39A] hover:text-[#12b382] transition-colors mt-auto self-start"
                >
                  Quiero resolver esto <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
