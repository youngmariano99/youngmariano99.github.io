"use client";

import { Link } from "react-router-dom";

export default function AboutFounder() {
  return (
    <section id="autoridad" className="py-24 px-6 md:px-10 bg-[#0D1110]/40 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        <div className="w-full lg:w-1/2 aspect-square max-w-[500px] overflow-hidden rounded-xl border border-white/5 bg-[#111615]">
          <img
            src="/mariano-portrait.png"
            alt="Mariano - Fundador de Nodexa"
            className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#F3F5F4] tracking-tight mb-8">
            Detrás de Nodexa hay una persona que primero escucha.
          </h2>
          
          <div className="space-y-6 text-[15px] md:text-[16px] text-[#F3F5F4] leading-relaxed">
            <p>
              Soy Mariano, fundador de Nodexa.
            </p>
            <p>
              Mi trabajo no es venderte tecnología complicada. Es entender cómo funciona tu negocio, detectar qué te está haciendo perder tiempo o información y ayudarte a encontrar una solución que realmente tenga sentido.
            </p>
            
            <ul className="mt-8 space-y-3 text-[#A6AEAA]">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
                Técnico UTN
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
                Desarrollo de sistemas
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
                Automatización
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
                Soluciones a medida
              </li>
            </ul>

            {/* Patitas en Alerta Cross-Promo CTA */}
            <div className="mt-8 p-5 rounded-xl bg-blue-600/10 border border-blue-600/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[50px] rounded-full group-hover:bg-blue-600/30 transition-colors" />
              <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-[16px] mb-1">Mi proyecto social: Patitas en Alerta</h4>
                  <p className="text-[#A6AEAA] text-[13px] leading-relaxed max-w-[32ch]">
                    Una plataforma gratuita para conectar ONGs, veterinarios y ciudadanos, impulsada por tecnología Nodexa.
                  </p>
                </div>
                <Link to="/patitas-en-alerta" className="shrink-0 w-full sm:w-auto text-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  Conocé la iniciativa →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
