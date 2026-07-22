"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "../data";
import { NodexaMark } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md transition-[padding] duration-200"
      style={{ backgroundColor: `rgba(5,8,15,${scrolled ? 0.85 : 0.6})` }}
    >
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 transition-[padding] duration-200 md:px-10 ${
          scrolled ? "py-3.5" : "py-5"
        }`}
      >
        <a href="#top" className="flex items-center gap-3 text-white no-underline">
          <NodexaMark />
          <span className="text-[19px] font-semibold tracking-tight text-white">
            Nodexa
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap border-b-2 border-transparent pb-1 text-[13px] font-medium uppercase tracking-wider text-white/60 no-underline transition-colors hover:border-[#10B981] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden whitespace-nowrap border border-white/25 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white no-underline transition-colors hover:border-[#10B981] hover:bg-[#10B981] hover:text-[#05080F] lg:inline-block"
        >
          Contactar
        </a>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border-none bg-transparent lg:hidden"
        >
          <span
            className="h-[1.5px] w-6 bg-white transition-transform duration-200"
            style={{
              transform: mobileOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="h-[1.5px] w-6 bg-white transition-opacity duration-200"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="h-[1.5px] w-6 bg-white transition-transform duration-200"
            style={{
              transform: mobileOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col overflow-hidden border-t border-white/10 bg-[#05080F]/95 px-6 pb-6 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-3.5 text-[15px] font-medium text-white/70 no-underline"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-5 border border-white/25 px-6 py-3 text-center text-[13px] font-semibold uppercase tracking-wide text-white no-underline"
            >
              Contactar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
