"use client";

import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#090B0B]/40 border-t border-white/5 pt-16 pb-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <span className="text-[12px] font-bold tracking-tight text-[#0B1120]">MY</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-[#F3F5F4]">Nodexa</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-[13px] text-[#A6AEAA]">
            <span>&copy; {currentYear} Nodexa. Todos los derechos reservados.</span>
            <Link to="/privacidad" className="hover:text-[#16D39A] transition-colors">
              Aviso de Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-[#16D39A] transition-colors">
              Términos de Servicio
            </Link>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
              Conexión segura SSL
            </span>
          </div>
        </div>
      </div>

      {/* Marca de agua (Watermark) */}
      <div aria-hidden="true" className="pointer-events-none select-none mt-12 text-center w-full overflow-hidden flex justify-center">
        <span
          className="block whitespace-nowrap font-black uppercase leading-[0.8] tracking-tighter text-[#F3F5F4]/[0.02]"
          style={{ fontSize: "clamp(60px, 15vw, 240px)" }}
        >
          NODEXA
        </span>
      </div>
    </footer>
  );
}
