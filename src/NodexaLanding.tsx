"use client";

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import SmoothScrollProvider, { useLenis } from "./lib/SmoothScroll";
import { LeadModalProvider } from "./lib/LeadModalContext";
import NeuralCanvas from "./components/NeuralCanvas";
import FullscreenMenu from "./components/FullscreenMenu";
import { RequireAuth } from "./components/admin/RequireAuth";
import Home from "./pages/Home";
import MiniModulos from "./pages/MiniModulos";
import NodexaCustom from "./pages/NodexaCustom";
import Recursos from "./pages/Recursos";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

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

// Shell del sitio PÚBLICO: fondo de estrellas, menú, smooth scroll, modal
// de leads — todo lo que comparten Home/MiniModulos/NodexaCustom/Recursos.
// /admin vive completamente afuera de esto (ver AdminLayout): es una
// herramienta interna, no tiene sentido que cargue el menú público ni el
// smooth scroll de la landing.
function PublicLayout() {
  return (
    <SmoothScrollProvider>
      <LeadModalProvider>
        <div className="relative min-h-screen font-sans text-white antialiased">
          <NeuralCanvas />
          <FullscreenMenu />
          <ScrollToTopOnNavigate />
          <Outlet />
        </div>
      </LeadModalProvider>
    </SmoothScrollProvider>
  );
}

export default function NodexaLanding() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mini-modulos" element={<MiniModulos />} />
          <Route path="/nodexa-custom" element={<NodexaCustom />} />
          <Route path="/recursos" element={<Recursos />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route
            index
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
