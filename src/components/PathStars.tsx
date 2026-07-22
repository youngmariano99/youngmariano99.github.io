"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { sampleSmoothPath, type Pt } from "../lib/journeyPath";

interface Star {
  x: number;
  y: number;
  u: number; // progreso 0..1 a lo largo del recorrido
  r: number;
  phase: number;
}

/*
 * El recorrido no es una línea dibujada: es una selección de puntos, entre
 * los miles del campo de fondo, que brillan más — como una constelación
 * propia dentro del cielo. Vive dentro del mismo lienzo que recibe el zoom
 * de la cámara (mismo espacio, mismas coordenadas que NeuralCanvas emula).
 */
export default function PathStars({
  points,
  toPx,
  draw,
  width,
  height,
}: {
  points: Pt[];
  toPx: (p: Pt) => Pt;
  draw: MotionValue<number>;
  width: number;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    if (width === 0 || height === 0) return;
    const samples = sampleSmoothPath(points, toPx, 40);
    // uno de cada ~3 muestras + jitter leve = espaciado orgánico, no mecánico
    const stars: Star[] = [];
    for (let i = 0; i < samples.length; i += 3) {
      const s = samples[i];
      stars.push({
        x: s.x + (Math.random() - 0.5) * 5,
        y: s.y + (Math.random() - 0.5) * 5,
        u: s.u,
        r: 0.9 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  }, [points, toPx, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let rafId = 0;
    let t = 0;
    const REVEAL_SOFTNESS = 0.035;

    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);
      const progress = draw.get();

      for (const star of starsRef.current) {
        if (star.u > progress + REVEAL_SOFTNESS) continue;

        const edge = (progress - star.u) / REVEAL_SOFTNESS;
        const reveal = Math.min(1, Math.max(0, edge));
        const twinkle = 0.7 + 0.3 * Math.sin(t * 0.03 + star.phase);
        const alpha = reveal * twinkle;
        if (alpha <= 0.02) continue;

        ctx.beginPath();
        ctx.fillStyle = `rgba(16,185,129,${alpha})`;
        ctx.shadowColor = "rgba(16,185,129,0.9)";
        ctx.shadowBlur = 5 + reveal * 3;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [draw, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
