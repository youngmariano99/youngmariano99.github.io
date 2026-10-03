"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "¿Tengo que saber de tecnología?",
      a: "No. Nuestro trabajo es que el sistema sea simple de usar. Nos encargamos de la complejidad técnica para que vos solo te enfoques en operar tu negocio."
    },
    {
      q: "¿Cuánto cuesta un sistema?",
      a: "Depende del problema y del alcance. Tenemos planes mensuales accesibles para comercios (Starter) y presupuestos a medida para PyMEs con operaciones más complejas."
    },
    {
      q: "¿Puedo empezar con algo pequeño?",
      a: "Sí. Nodexa Core está pensado justamente para eso: podés empezar ordenando solo el stock y las ventas, e ir sumando módulos (como catálogo web o cuentas corrientes) cuando tu negocio lo necesite."
    },
    {
      q: "¿Trabajan con comercios pequeños?",
      a: "Sí, siempre y cuando el problema que tengas se pueda resolver mejor con una herramienta digital. Si recién estás empezando y un cuaderno te sirve, te lo vamos a decir de frente."
    },
    {
      q: "¿Tengo que cambiar mi forma de trabajar?",
      a: "No necesariamente. La idea de un sistema a medida o bien configurado es que se adapte a tu operativa, no al revés. Obviamente, el orden requiere ciertos hábitos nuevos, pero el flujo principal lo diseñamos para vos."
    },
    {
      q: "¿Cuánto demora?",
      a: "Para la línea modular (Starter), la configuración demora entre 24 y 48 horas. Para desarrollos a medida (Custom), depende del alcance del proyecto tras la auditoría inicial."
    },
    {
      q: "¿La primera consulta tiene costo?",
      a: "No, la primera charla es 100% gratuita y sin compromiso. Es para escucharte, entender qué problema tenés y decirte honestamente si podemos ayudarte o no."
    },
    {
      q: "¿Después de desarrollar el sistema sigo teniendo soporte?",
      a: "Sí. En el modelo modular el soporte está incluido en el abono mensual. En proyectos a medida (Custom), trabajamos con un abono de mantenimiento para garantizar soporte y mejoras continuas."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 md:px-10 bg-[#090B0B]/40 border-t border-white/5">
      <div className="max-w-[800px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#F3F5F4] tracking-tight mb-4">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`bg-[#111615] border ${isOpen ? "border-[#16D39A]/30" : "border-white/5"} rounded-xl overflow-hidden transition-colors`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-[16px] font-medium text-[#F3F5F4]">{faq.q}</span>
                  <ChevronDown 
                    className={`shrink-0 text-[#A6AEAA] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#16D39A]" : ""}`} 
                    size={20} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-[14px] text-[#A6AEAA] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
