"use client";

import { useLeadModal } from "../lib/LeadModalContext";

export default function FinalCTA() {
  const { openLeadModal } = useLeadModal();
  
  return (
    <section className="py-24 md:py-32 px-6 bg-[#090B0B] border-t border-white/5 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#16D39A]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

      <div className="max-w-[800px] mx-auto text-center relative z-10 flex flex-col items-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[13px] font-semibold text-[#16D39A] mb-8">
          HABLEMOS SIN COMPROMISO
        </span>
        
        <h2 className="text-[40px] md:text-[64px] font-bold text-[#F3F5F4] tracking-tight leading-[1.1] mb-6">
          ¿No sabés qué módulos necesita tu negocio?
        </h2>
        
        <p className="text-[18px] md:text-[20px] text-[#A6AEAA] leading-relaxed mb-10 max-w-[600px]">
          Contame cómo es tu día a día, qué te quita más tiempo o te hace perder ventas, y te armo una propuesta de Pack a medida.
        </p>
        
        <button
          onClick={() => openLeadModal("final_cta")}
          className="inline-flex items-center justify-center h-[56px] px-8 rounded-lg bg-[#16D39A] text-[#090B0B] text-[16px] font-bold hover:bg-[#12b382] transition-colors"
        >
          Solicitar mi propuesta a medida
        </button>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 text-[#A6AEAA] text-[14px]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[#16D39A]">✓</div>
            Sin contratos forzosos
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[#16D39A]">✓</div>
            Pagás solo lo que usás
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[#16D39A]">✓</div>
            Implementación guiada
          </div>
        </div>
      </div>
    </section>
  );
}
