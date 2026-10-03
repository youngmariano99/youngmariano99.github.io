"use client";

export default function TrustBar() {
  const pillars = [
    "Sistemas a medida",
    "Automatización",
    "Procesos",
    "Información",
    "Soporte"
  ];

  return (
    <section className="border-y border-white/5 bg-[#0D1110]/40 py-8 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-[13px] font-semibold text-[#A6AEAA] uppercase tracking-wider text-center md:text-left shrink-0">
          Pilares de <br className="hidden md:block" /> nuestra operativa
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
              <span className="text-[#F3F5F4] text-[14px] font-medium">{pillar}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
