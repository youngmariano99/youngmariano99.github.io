"use client";

import HeroHub from "../components/HeroHub";
import JourneyExperience from "../components/JourneyExperience";
import ServicesSection from "../components/ServicesSection";
import Authority from "../components/Authority";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main id="top">
      {/* Hero Hub (nodo cero) -> viaje zig-zag con cámara (3 nodos de relato + 3 laptops de proyecto) -> cierre */}
      <HeroHub />
      <JourneyExperience />
      <ServicesSection />
      <Authority />
      <Contact />
    </main>
  );
}
