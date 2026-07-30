"use client";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SmoothScrollProvider, { useLenis } from "./lib/SmoothScroll";
import NeuralCanvas from "./components/NeuralCanvas";
import FullscreenMenu from "./components/FullscreenMenu";
import Home from "./pages/Home";
import MiniModulos from "./pages/MiniModulos";
import NodexaCustom from "./pages/NodexaCustom";

// Sin esto, navegar a otra página deja el scroll donde estaba (podés
// terminar en /mini-modulos scrolleado 4000px, en medio de la nada) — el
// scroll nativo y el de Lenis son dos sistemas distintos, hay que resetear
// los dos. Vive adentro de SmoothScrollProvider para tener acceso a
// useLenis, y adentro de BrowserRouter para reaccionar a cada navegación.
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef?.current?.scrollTo(0, { immediate: true });
  }, [pathname, lenisRef]);

  return null;
}

// Shell de la app: todo lo que es GLOBAL y persiste entre páginas vive acá
// (fondo de estrellas, menú, smooth scroll) — las páginas en sí (Home,
// MiniModulos) solo aportan su propio <main>, nunca repiten estos fijos.
export default function NodexaLanding() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <div className="relative min-h-screen font-sans text-white antialiased">
          <NeuralCanvas />
          <FullscreenMenu />
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mini-modulos" element={<MiniModulos />} />
            <Route path="/nodexa-custom" element={<NodexaCustom />} />
          </Routes>
        </div>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}
