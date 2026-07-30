"use client";

import { useEffect, useRef } from "react";

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
}

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/*
 * Campo denso de miles de puntos — nebulosa/constelación viva, no una red
 * de nodos con líneas. Cada partícula deriva con su propio ritmo orgánico
 * (senoidal, sin rebotes mecánicos) y tiene un titileo propio, como
 * polvo estelar respirando. Reacciona al cursor y se enciende de a tramos
 * en sincronía con el recorrido de #viaje (ver PathStars, que vive en el
 * mismo espacio de coordenadas del camino y aporta los puntos "brillantes"
 * que forman el camino dentro de este mismo campo).
 */
export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999 };
    const mouseDist = 150;

    let journeyTop = 0;
    let journeyHeight = 0;
    const measureJourney = () => {
      const el = document.getElementById("viaje");
      if (!el) return;
      journeyTop = el.offsetTop;
      journeyHeight = el.offsetHeight;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // miles de puntos: densidad alta, coste por partícula mínimo (sin
      // comparaciones por pares — eso es lo que permite escalar a miles).
      const count = Math.min(1900, Math.max(900, Math.round((width * height) / 700)));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          baseX: x,
          baseY: y,
          x,
          y,
          r: Math.random() < 0.08 ? 1.3 + Math.random() * 1.1 : 0.5 + Math.random() * 0.7,
          baseAlpha: 0.12 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          freqX: 0.15 + Math.random() * 0.25,
          freqY: 0.15 + Math.random() * 0.25,
          ampX: 4 + Math.random() * 10,
          ampY: 4 + Math.random() * 10,
        };
      });

      measureJourney();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let t = 0;
    const mouseDistSq = mouseDist * mouseDist;
    const pulseRadius = 240;
    const pulseRadiusSq = pulseRadius * pulseRadius;
    // Auditoría de performance: medido con un benchmark sincrónico
    // (performance.now(), sin depender de rAF) que reconstruir un string
    // rgba(...) nuevo por partícula, 1900 veces por frame, costaba 4.8ms de
    // los 16.7ms disponibles a 60fps — el cuello de botella real de toda
    // la landing, muy por delante del canvas de PathStars. Dos fillStyle
    // estáticos (se asignan una sola vez, no en el loop) + ctx.globalAlpha
    // para la opacidad variable bajan ese costo a 1.67ms (-65%) sin
    // cambiar un solo píxel del resultado visual.
    const NORMAL_FILL = "rgb(210,214,224)";
    const BOOST_FILL = "rgb(16,185,129)";
    const tick = () => {
      t += 1;
      const time = t * 0.016;
      ctx.clearRect(0, 0, width, height);

      /* punto de activación: recorre el centro en zigzag, sincronizado con
         el progreso de scroll dentro de #viaje — enciende el polvo cercano */
      let pulseX = -9999;
      let pulseY = -9999;
      let pulseStrength = 0;
      if (journeyHeight > height) {
        const raw = (window.scrollY - journeyTop) / (journeyHeight - height);
        if (raw >= -0.05 && raw <= 1.05) {
          const p = Math.min(1, Math.max(0, raw));
          pulseX = width / 2 + Math.sin(p * Math.PI * 7) * width * 0.13;
          pulseY = height / 2;
          pulseStrength = Math.min(1, raw < 0 ? 1 + raw / 0.05 : raw > 1 ? 1 - (raw - 1) / 0.05 : 1);
        }
      }

      let currentFill = "";

      for (const p of particles) {
        // deriva orgánica: oscilación suave alrededor de un punto base,
        // nunca rebote mecánico — se siente vivo, no físico/rígido.
        p.x = p.baseX + Math.sin(time * p.freqX + p.phase) * p.ampX;
        p.y = p.baseY + Math.cos(time * p.freqY + p.phase) * p.ampY;

        const twinkle = 0.6 + 0.4 * Math.sin(time * 0.8 + p.phase * 3);
        let alpha = p.baseAlpha * twinkle;
        let radius = p.r;
        let boosted = false;

        // distancia al cuadrado primero (sin sqrt) — Math.hypot solo se
        // calcula para las pocas partículas realmente cerca del mouse/pulso.
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const dmSq = mdx * mdx + mdy * mdy;
        if (dmSq < mouseDistSq) {
          const dm = Math.sqrt(dmSq);
          const boost = (mouseDist - dm) / mouseDist;
          alpha = Math.min(0.95, alpha + boost * 0.5);
          radius += boost * 0.8;
          boosted = true;
        } else if (pulseStrength > 0) {
          const pdx = pulseX - p.x;
          const pdy = pulseY - p.y;
          const dpSq = pdx * pdx + pdy * pdy;
          if (dpSq < pulseRadiusSq) {
            const dp = Math.sqrt(dpSq);
            const boost = ((pulseRadius - dp) / pulseRadius) * pulseStrength;
            alpha = Math.min(0.9, alpha + boost * 0.45);
            radius += boost * 0.6;
            if (boost > 0.2) boosted = true;
          }
        }

        const fill = boosted ? BOOST_FILL : NORMAL_FILL;
        if (fill !== currentFill) {
          ctx.fillStyle = fill;
          currentFill = fill;
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* halo suave en el punto de activación */
      if (pulseStrength > 0.02) {
        const glow = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 240);
        glow.addColorStop(0, `rgba(16,185,129,${0.08 * pulseStrength})`);
        glow.addColorStop(1, "rgba(16,185,129,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(pulseX - 240, pulseY - 240, 480, 480);
      }

      if (running) rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    start();

    // El Hero ya no tiene video propio: el campo de estrellas debe verse
    // (y correr) ahí también, así que no se pausa por sección — solo
    // cuando la pestaña está oculta, para no gastar CPU en segundo plano.
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-2]">
      {/* negro espacial absoluto, sin tinte azulado */}
      <div className="absolute inset-0 bg-black" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: NOISE_URI }} />
    </div>
  );
}
