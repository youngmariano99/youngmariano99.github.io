"use client";

import { Link } from "react-router-dom";

// Botón fijo de retorno — simétrico al hamburger de FullscreenMenu (fixed
// top-6, mismo lenguaje visual) pero en la esquina opuesta, así conviven
// sin pisarse en ninguna de las dos páginas que lo usan.
export function BackToHome() {
  return (
    <Link
      to="/"
      className="fixed left-6 top-6 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-[13px] font-semibold text-white/70 no-underline backdrop-blur-md transition-colors hover:border-[#10B981]/60 hover:text-white"
    >
      <span aria-hidden="true">←</span>
      Volver al inicio
    </Link>
  );
}
