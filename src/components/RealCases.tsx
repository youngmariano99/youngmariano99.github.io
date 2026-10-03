"use client";

import { Link } from "react-router-dom";
import { LaptopFrame } from "./portfolio/CaseDeviceMockups";

export default function RealCases() {
  const cases = [
    {
      id: "lenneria",
      client: "La Leñería",
      image: "/Proyectos/Proyecto3LeñeraChingolitosParte1.png",
      tags: ["Control de stock", "Procesos operativos"],
      problem: "El control de stock se realizaba manualmente y era difícil saber qué productos estaban realmente disponibles.",
      solution: "Desarrollamos una herramienta centralizada para gestionar la información.",
      result: "Mayor control y menos dependencia de procesos manuales."
    },
    {
      id: "argoot",
      client: "Argoot",
      image: "/Proyectos/Proyecto1Argoot.png",
      tags: ["Trazabilidad", "Sincronización"],
      problem: "Capturaban datos por canales desconectados, y armar reportes era un trabajo manual lento y propenso a errores.",
      solution: "Construimos una infraestructura a medida que sincroniza la información en tiempo real.",
      result: "Trazabilidad operativa centralizada y reportes al instante."
    }
  ];

  return (
    <section id="casos" className="py-24 px-6 md:px-10 bg-[#090B0B]/40 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#F3F5F4] tracking-tight mb-4">
            Esto es lo que podemos construir.
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#A6AEAA] max-w-[600px] leading-relaxed">
            No te mostramos tecnología por mostrarla. Te mostramos problemas reales y cómo los resolvimos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((c) => (
            <div key={c.id} className="flex flex-col bg-[#111615] border border-white/5 rounded-xl overflow-hidden group">
              {/* Mockup area */}
              <div className="bg-[#0D1110]/40 relative flex items-center justify-center p-8 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#16D39A]/5 to-transparent opacity-50" />
                {c.image ? (
                   <div className="relative z-10 w-full max-w-[560px] flex items-center justify-center">
                     <LaptopFrame 
                       imageUrl={c.image} 
                       label={`${c.id}.nodexa.app`} 
                       open={true} 
                       size="lg" 
                     />
                   </div>
                ) : (
                   <div className="relative z-10 w-3/4 aspect-[16/10] bg-[#090B0B]/40 border border-white/10 rounded-lg shadow-2xl flex items-center justify-center text-[#A6AEAA] text-sm">
                     MOCKUP DEL SISTEMA
                   </div>
                )}
              </div>
              
              {/* Info area */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="text-[18px] font-bold text-[#F3F5F4]">{c.client}</span>
                  <div className="flex gap-2 flex-wrap">
                    {c.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[11px] font-medium text-[#A6AEAA]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-[12px] font-semibold text-[#A6AEAA] uppercase tracking-wider block mb-1">Problema</span>
                    <p className="text-[14px] text-[#F3F5F4] leading-relaxed">{c.problem}</p>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#16D39A] uppercase tracking-wider block mb-1">Solución</span>
                    <p className="text-[14px] text-[#F3F5F4] leading-relaxed">{c.solution}</p>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#F3F5F4] uppercase tracking-wider block mb-1">Resultado</span>
                    <p className="text-[14px] text-[#F3F5F4] leading-relaxed">{c.result}</p>
                  </div>
                </div>

                <Link 
                  to={`/casos-de-exito`} 
                  className="mt-auto inline-flex items-center text-[14px] font-semibold text-[#F3F5F4] hover:text-[#16D39A] transition-colors self-start"
                >
                  Ver Casos de Éxito <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
