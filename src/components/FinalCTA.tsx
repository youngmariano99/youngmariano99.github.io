"use client";

import { useLeadModal } from "../lib/LeadModalContext";

export default function FinalCTA() {
  const { openLeadModal } = useLeadModal();

  return (
    <section className="py-32 px-6 md:px-10 bg-[#090B0B]/40 border-t border-white/5 text-center flex justify-center">
      <div className="max-w-[800px] flex flex-col items-center">
        <h2 className="text-[32px] md:text-[46px] font-bold text-[#F3F5F4] tracking-tight mb-6">
          ¿Tenés un problema en tu negocio que te gustaría resolver?
        </h2>
        
        <p className="text-[16px] md:text-[18px] text-[#A6AEAA] max-w-[600px] leading-relaxed mb-10">
          Contanos qué está pasando. No necesitás saber qué tecnología necesitás. Primero entendemos el problema y después vemos juntos si podemos ayudarte.
        </p>

        <button
          onClick={() => openLeadModal("final_cta")}
          className="inline-flex items-center justify-center h-[52px] px-10 rounded-[4px] bg-[#16D39A] text-[#090B0B] text-[16px] font-semibold transition-all hover:bg-[#12b382] focus:ring-2 focus:ring-[#16D39A] focus:ring-offset-2 focus:ring-offset-[#090B0B] mb-4"
        >
          Contame qué necesitás →
        </button>

        <span className="text-[13px] text-[#A6AEAA]">
          Primera conversación sin compromiso.
        </span>
      </div>
    </section>
  );
}
