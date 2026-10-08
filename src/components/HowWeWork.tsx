"use client";

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      title: "Te escuchamos",
      desc: "Entendemos la urgencia de tu rubro y dónde están las fugas de tiempo y dinero."
    },
    {
      num: "02",
      title: "Elegimos el Core",
      desc: "Instalamos la base de Nodexa para tu mostrador: ventas ultra rápidas y stock real."
    },
    {
      num: "03",
      title: "Armamos tu Pack",
      desc: "Sumamos solo los módulos que tu nicho exige: comandas, fiados o tienda web."
    },
    {
      num: "04",
      title: "Crecemos con vos",
      desc: "Si tu negocio se expande, sumás herramientas. Libertad total, sin ataduras."
    }
  ];

  return (
    <section id="proceso" className="py-24 px-6 md:px-10 bg-[#0D1110]/40 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#F3F5F4] tracking-tight mb-4">
            Dejamos de lado los sistemas enlatados.
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#A6AEAA] max-w-[600px] leading-relaxed">
            No te obligamos a pagar por funciones que no usás. Así construimos tu Nodexa:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Línea conectora Desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-white/10" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center lg:items-start text-center lg:text-left z-10 p-6 lg:p-0">
              <div className="w-14 h-14 rounded-full bg-[#111615] border border-white/10 flex items-center justify-center mb-6 text-[#16D39A] font-mono text-[16px] font-semibold">
                {step.num}
              </div>
              <h3 className="text-[18px] font-bold text-[#F3F5F4] mb-3">{step.title}</h3>
              <p className="text-[14px] text-[#A6AEAA] leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
