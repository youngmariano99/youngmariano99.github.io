"use client";

import Lenis from "@studio-freight/lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

const LenisContext = createContext<MutableRefObject<Lenis | null> | null>(null);

/*
 * Devuelve un ref a la instancia de Lenis. El scroll nativo (scrollIntoView,
 * window.scrollTo) NO sincroniza con Lenis — cualquier scroll programático
 * debe pasar por lenisRef.current.scrollTo(...) para animarse correctamente.
 */
export function useLenis() {
  return useContext(LenisContext);
}

// Smooth scroll global: Lenis anima el scroll nativo de la ventana, por lo que
// useScroll de Framer Motion sigue funcionando sin configuración extra.
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
