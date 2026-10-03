"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import type { PortfolioProject } from "../types";
import { LaptopFrame } from "./portfolio/CaseDeviceMockups";

export default function HeroLaptopCarousel() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("portfolio_projects")
      .select("*")
      .eq("activo", true)
      .not("imagen_portada_url", "is", null)
      .order("orden", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error("Error al cargar proyectos para el hero:", error);
        if (data && data.length > 0) {
          setProjects(data as PortfolioProject[]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (projects.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // Cambia cada 5 segundos
    
    return () => clearInterval(interval);
  }, [projects]);

  if (projects.length === 0) {
    // Estado de carga o fallback (podríamos poner un esqueleto, o simplemente nada)
    return (
      <div className="relative w-full max-w-[480px] aspect-[16/10] bg-[#111615] rounded-xl border border-white/5 animate-pulse" />
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full max-w-[560px] flex items-center justify-center">
      {/* Resplandor sutil (no intrusivo) */}
      <div className="absolute inset-0 bg-[#16D39A]/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full">
        <LaptopFrame 
          imageUrl={currentProject.imagen_portada_url!} 
          label={`${currentProject.slug}.nodexa.app`} 
          open={true} 
          size="lg" 
        />
      </div>
    </div>
  );
}
