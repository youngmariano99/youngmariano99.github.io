"use client";

import { useState } from "react";
import SmoothScrollProvider from "./lib/SmoothScroll";
import NeuralCanvas from "./components/NeuralCanvas";
import FullscreenMenu from "./components/FullscreenMenu";
import HeroHub from "./components/HeroHub";
import JourneyExperience from "./components/JourneyExperience";
import Authority from "./components/Authority";
import Contact from "./components/Contact";
import DiagnosticModal from "./components/DiagnosticModal";

export default function NodexaLanding() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen font-sans text-white antialiased">
        <NeuralCanvas />
        <FullscreenMenu />
        <main id="top">
          {/* Hero Hub -> viaje zig-zag con cámara (3 nodos de relato + 3 laptops de proyecto) -> cierre */}
          <HeroHub onOpenModal={() => setModalOpen(true)} />
          <JourneyExperience />
          <Authority />
          <Contact onOpenModal={() => setModalOpen(true)} />
        </main>
        <DiagnosticModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </SmoothScrollProvider>
  );
}
