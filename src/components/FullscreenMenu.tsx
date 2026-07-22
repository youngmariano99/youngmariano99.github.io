"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems } from "../data";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: PREMIUM_EASE } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: PREMIUM_EASE } },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PREMIUM_EASE } },
};

/*
 * Reemplaza la barra de navegación fija tradicional: en su lugar, un único
 * botón flotante minimalista (hamburguesa) que abre un menú a pantalla
 * completa, translúcido y profundo.
 */
export default function FullscreenMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: open ? 0 : 1, y: 0 }}
        transition={{ duration: 0.4, ease: PREMIUM_EASE }}
        style={{ pointerEvents: open ? "none" : "auto" }}
        className="fixed right-6 top-6 z-[80] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-black/40 backdrop-blur-md transition-colors hover:border-[#10B981]/60"
      >
        <span className="h-[1.5px] w-5 bg-white" />
        <span className="h-[1.5px] w-5 bg-white" />
        <span className="h-[1.5px] w-5 bg-white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-2xl leading-none text-white transition-colors hover:border-[#10B981]/60 hover:text-[#10B981]"
            >
              &times;
            </button>

            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center gap-7"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={linkVariants}
                  className="text-[clamp(2.25rem,7vw,5rem)] font-extrabold uppercase leading-none tracking-tight text-white no-underline transition-colors hover:text-[#10B981]"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
