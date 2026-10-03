"use client";

import { useLeadModal } from "../lib/LeadModalContext";
import HeroLaptopCarousel from "./HeroLaptopCarousel";

export default function HeroDirect() {
  const { openLeadModal } = useLeadModal();

  const handleScrollToSolutions = () => {
    const target = document.querySelector("#soluciones");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 md:px-10 overflow-hidden flex flex-col lg:flex-row items-center gap-12 max-w-[1440px] mx-auto min-h-[90vh]">
      
      {/* Columna Izquierda: Copy */}
      <div className="flex-1 flex flex-col items-start z-10 w-full">
        <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#16D39A] mb-4">
          SOLUCIONES DIGITALES PARA NEGOCIOS
        </span>
        
        <h1 className="text-[42px] leading-[1.1] md:text-[56px] lg:text-[64px] font-bold text-[#F3F5F4] tracking-tight mb-6 max-w-[800px]">
          Tecnología que <span className="text-[#16D39A]">simplifica</span> tu negocio.
        </h1>
        
        <p className="text-[16px] md:text-[18px] text-[#A6AEAA] leading-[1.6] max-w-[600px] mb-10">
          Desarrollamos sistemas y herramientas a medida para ayudarte a ordenar procesos, automatizar tareas y tener el control de tu negocio.
        </p>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => openLeadModal("hero_primary")}
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-[4px] bg-[#16D39A] text-[#090B0B] text-[16px] font-semibold transition-all hover:bg-[#12b382] focus:ring-2 focus:ring-[#16D39A] focus:ring-offset-2 focus:ring-offset-[#090B0B]"
          >
            Contame qué necesitás →
          </button>
          
          <button
            onClick={handleScrollToSolutions}
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-[4px] bg-transparent border border-[#F3F5F4]/20 text-[#F3F5F4] text-[16px] font-semibold transition-all hover:bg-white/5 hover:border-white/40"
          >
            Ver soluciones
          </button>
        </div>
        
        <p className="mt-6 text-[13px] text-[#A6AEAA]">
          No necesitás saber qué sistema necesitás. Nosotros te ayudamos a descubrirlo.
        </p>
      </div>

      {/* Columna Derecha: Componente Dinámico de Casos Reales */}
      <div className="flex-1 w-full flex justify-center lg:justify-end z-10">
        <HeroLaptopCarousel />
      </div>
    </section>
  );
}
