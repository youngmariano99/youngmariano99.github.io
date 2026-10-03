"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { LaptopFrame, PhoneFrame } from "./portfolio/CaseDeviceMockups";
import type { PatitasImage } from "../types";
import { AnimatePresence, motion } from "framer-motion";

export default function PatitasHeroCarousel() {
  const [images, setImages] = useState<PatitasImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    supabase
      .from("patitas_images")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setImages(data as PatitasImage[]);
        }
      });
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="relative w-full max-w-[800px] h-[400px] bg-[#111615] rounded-xl border border-white/5 animate-pulse" />
    );
  }

  const current = images[currentIndex];

  return (
    <div className="relative w-full flex flex-col md:flex-row items-end justify-center gap-8">
      {/* Resplandor sutil */}
      <div className="absolute inset-0 bg-[#16D39A]/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Laptop */}
      <div className="relative z-10 w-full max-w-[560px]">
        <LaptopFrame 
          imageUrl={current.desktop_url} 
          label="patitas.nodexa.app" 
          open={true} 
          size="lg" 
        />
      </div>

      {/* Phone (Superpuesto en mobile, al lado en desktop) */}
      <div className="relative z-20 w-[140px] md:w-[190px] -mt-20 md:mt-0 md:-ml-24 shadow-2xl">
        <PhoneFrame 
          imageUrl={current.mobile_url} 
          label="App" 
          open={true} 
          size="lg" 
        />
      </div>
    </div>
  );
}
