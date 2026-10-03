"use client";

import { useLeadModal } from "../lib/LeadModalContext";
import { Link } from "react-router-dom";

export default function Solutions() {
  const { openLeadModal } = useLeadModal();

  const solutions = [
    {
      title: "Sistema a medida",
      subtitle: "NODEXA Custom",
      desc: "Cuando tu negocio necesita una herramienta diseñada específicamente para su forma de trabajar.",
      actionLabel: "Quiero NODEXA Custom →",
      link: "/nodexa-custom"
    },
    {
      title: "Herramientas modulares",
      subtitle: "NODEXA Modular",
      desc: "Soluciones más pequeñas para resolver problemas concretos sin comenzar con un sistema enorme.",
      actionLabel: "Quiero NODEXA Modular →",
      link: "/mini-modulos"
    },
    {
      title: "Asesoramiento",
      subtitle: "Consultoría",
      desc: "Si sabés que algo no funciona pero no sabés exactamente qué necesitás, empezamos por entender el problema.",
      actionLabel: "Quiero asesoramiento →",
      action: () => openLeadModal("soluciones_asesoramiento")
    }
  ];

  return (
    <section id="soluciones" className="py-24 px-6 md:px-10 bg-[#090B0B]/40 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#F3F5F4] tracking-tight mb-4">
            Una solución para cada necesidad.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
