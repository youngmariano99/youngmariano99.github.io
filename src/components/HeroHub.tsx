"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  heroDescription,
  heroEyebrow,
  heroFeatures,
  heroScrollCta,
  heroStats,
  heroTitleLines,
  type HeroFeature,
  type HeroStat,
} from "../data";
import { useLenis } from "../lib/SmoothScroll";

const ACCENT = "#27D79C";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" as const, delay },
});

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 20V12" />
      <path d="M12 20V4" />
      <path d="M20 20v-7" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.5 7.5l2.1 1.2M17.4 15.3l2.1 1.2M3 12h2.5M18.5 12H21M4.5 16.5l2.1-1.2M17.4 8.7l2.1-1.2M7.5 19.5l1.2-2.1M15.3 6.6l1.2-2.1" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16l6-6 4 4 6-7" />
      <path d="M15 7h5v5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 3v3.5M16 3v3.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20c.7-3.4 3.2-5.4 6.2-5.4s5.5 2 6.2 5.4" />
      <path d="M15.5 5.2c1.5.4 2.6 1.8 2.6 3.4 0 1.7-1.1 3-2.6 3.4M18.6 14.9c2.2.5 3.8 2.2 4.4 4.9" />
    </svg>
  );
}

const ICONS: Record<HeroFeature["icon"], () => JSX.Element> = {
  chart: ChartIcon,
  gear: GearIcon,
  trend: TrendIcon,
};

const STAT_ICONS: Record<HeroStat["icon"], () => JSX.Element> = {
  trend: TrendIcon,
  calendar: CalendarIcon,
  users: UsersIcon,
};

// Tres rondas intentando "flotar" las tarjetas con posiciones en % contra
// la laptop terminaron siempre en lo mismo: alguna se recortaba contra el
// viewport, o tapaba el dashboard, porque estaba adivinando coordenadas
// contra una foto que no puedo medir con precisión. Fix estructural en vez
// de otro ajuste a ojo: una fila real (flexbox), mismo ancho garantizado
// por CSS, ARRIBA de la imagen en el flujo normal del documento — así es
// geométricamente imposible que tape la laptop, sin adivinar nada.
// La asimetría queda en el desplazamiento vertical de reposo de cada
// tarjeta (translateY fijo, distinto por tarjeta) más la levitación.
const CARD_REST_OFFSET = [0, -14, 6]; // px — asimetría sutil, misma fila

// Levitación suave e infinita, desfasada por tarjeta — vive en un
// motion.div INTERNO separado del que maneja la entrada (fadeUp), para
// que el loop infinito no pelee con la transición de aparición única.
const FLOAT_TRANSITIONS = [
  { duration: 5, delay: 0 },
  { duration: 6, delay: 0.6 },
  { duration: 4.5, delay: 1.1 },
];

export default function HeroHub() {
  const lenisRef = useLenis();

  const scrollToJourney = () => {
    const target = document.getElementById("viaje");
    if (!target) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(target, { duration: 1.5 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-8 sm:px-10 sm:pt-10"
    >
      {/* Sin fondo propio: el Hero vive sobre el mismo NeuralCanvas (fondo
          fijo global) que el resto del sitio — misma nebulosa/estrellas,
          sin costura de color al pasar a la sección siguiente. */}

      {/* Header: transparente, en flujo normal (no absolute) — así nunca
          puede superponerse con el contenido centrado más abajo, sea cual
          sea la altura del viewport. Solo el isotipo — la navegación real
          del sitio sigue viviendo en el botón hamburguesa global. */}
      <div className="relative z-20">
        <div className="text-[15px] font-semibold tracking-[0.15em] text-white">
          NODEX<span style={{ color: ACCENT }}>Λ</span>
        </div>
        <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-white/45">
          Estructura · Datos · Resultados
        </div>
      </div>

      {/* flex-1 + items-center: centra el bloque de texto en el espacio
          que sobra debajo del header. El texto ya no comparte grid con la
          imagen — vive solo, la imagen es una capa de fondo detrás. */}
      <div className="relative z-20 flex flex-1 items-center py-10">
        {/* relative: es el contenedor de referencia tanto para el texto
            como para el wrapper absoluto de la laptop — así "top:50%" en
            la laptop se centra contra la MISMA caja que el texto, y su
            centro visual queda alineado con el centro del bloque de
            copy (título+descripción+pills), no con el viewport entero. */}
        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* Resplandor ambiental: puente de luz tenue entre el texto y la
              laptop — sin esto, el hueco entre ambos se percibe como un
              vacío negro plano en vez de una escena continua. Va primero
              en el DOM (más atrás en el orden de pintado). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[46%] top-1/2 hidden h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl lg:block"
          />

          {/* Escena de la laptop: UN solo wrapper — imagen + radial +
              tarjetas viven adentro y se posicionan/mueven siempre
              juntos, nunca como piezas sueltas contra el viewport.
              top:50% + translateY(-50%) la centra contra ESTE mismo
              contenedor (el que también envuelve al texto), así el
              centro visual de la laptop queda alineado con el centro
              del bloque de copy — nunca contra el borde inferior.
              Ancho: min() con TRES términos, no dos — el tercero,
              calc(100% - 750px), reserva el espacio real que ocupa la
              columna de texto (max-w-700 + aire). Antes el ancho era
              puramente "56vw con techo en 820px", sin relación con el
              texto: a 1920px sobraba lugar y se veía bien, pero a
              ~1366px el wrapper (820px) invadía literalmente el título,
              y ahí quedó tapado por la fila de tarjetas nueva (que al no
              tener el fundido de la imagen, no disimula la superposición
              como sí lo hacía la máscara). El tercer término achica el
              ancho solo donde hace falta — ojo: tiene que ser calc(100VW
              - Npx), no calc(100% - Npx). 100% acá es el contenedor de
              1400px (ya acotado), así que calc(100% - 750px) daba un
              tope fijo de 650px SIEMPRE que el contenedor llegara a su
              máximo (∼1480px de viewport en adelante) — de nuevo achicaba
              la laptop en pantallas grandes donde sobraba lugar de sobra.
              100vw es el viewport real, sin ese techo. */}
          <div
            className="pointer-events-none absolute hidden lg:block"
            style={{
              right: "-20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "min(56vw, 820px, calc(100vw - 830px))",
            }}
          >
            {/* profundidad: radial sutil, casi invisible, detrás de la laptop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(39,215,156,.05), transparent 70%)",
              }}
            />

            {/* Fila de métricas — flujo normal, ARRIBA de la imagen. Tres
                columnas de igual ancho garantizadas por flexbox (flex-1),
                nunca superpuestas a la laptop porque el <img> viene DESPUÉS
                en el documento. La asimetría es el translateY de reposo
                (CARD_REST_OFFSET), distinto por tarjeta, más la levitación
                infinita — no la posición, que ahora es una fila prolija. */}
            <div className="relative z-10 mb-5 flex gap-3">
              {heroStats.map((stat, i) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <motion.div
                    key={stat.label}
                    {...fadeUp(0.3 + i * 0.08)}
                    className="flex-1 overflow-hidden rounded-xl backdrop-blur-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,.1)",
                      background: "rgba(20,21,23,.72)",
                      transform: `translateY(${CARD_REST_OFFSET[i]}px)`,
                    }}
                  >
                    <motion.div
                      className="px-4 py-3"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: FLOAT_TRANSITIONS[i].duration,
                        delay: FLOAT_TRANSITIONS[i].delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-white/55">
                        <Icon />
                      </div>
                      <div className="mt-1 text-[19px] font-bold leading-none" style={{ color: ACCENT }}>
                        {stat.value}
                      </div>
                      <div className="mt-1.5 text-[10.5px] leading-snug text-white/55">
                        {stat.label}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/*
              mask-image (no una capa opaca encima): funde la imagen a
              transparencia REAL en sus bordes, así el NeuralCanvas de
              fondo se ve flotando a través de ella — nunca un recuadro.
              Dos gradientes combinados con mask-composite:intersect: uno
              horizontal (funde el borde izquierdo hacia el texto, ahora
              más ancho y gradual — arrancaba opaco recién al 46%, dejando
              un vacío negro entre el texto y donde la imagen se volvía
              visible) y uno vertical (funde el borde inferior). El lado
              derecho se mantiene 100% opaco: es la mitad dominante de la
              composición, no tiene sentido apagarla.
            */}
            <img
              src="/hero-bg2.png"
              alt=""
              aria-hidden="true"
              className="relative block h-auto w-full"
              style={
                {
                  objectFit: "contain",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 28%, black 100%), linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 28%, black 100%), linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                } as CSSProperties
              }
            />
          </div>

          {/* relative (sin z-index propio): un div "static" pintaría SIEMPRE
              detrás de cualquier descendiente position:absolute del mismo
              contenedor, sin importar el orden en el DOM — con relative
              pasa a competir por orden de DOM como el resto, y al ser el
              último queda arriba de la laptop y del fade. */}
          <div className="relative mx-auto flex max-w-[700px] flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            <motion.span
              {...fadeUp(0)}
              className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ACCENT }}
            >
              {heroEyebrow}
            </motion.span>

            <motion.h1
              {...fadeUp(0.08)}
              className="text-[38px] font-light leading-[1.1] tracking-tight text-white sm:text-[48px] lg:text-[60px] lg:leading-[1.12]"
            >
              {heroTitleLines.map((line, i) => (
                <span key={i} className="block">
                  {line.map((span, j) =>
                    span.highlight ? (
                      <span key={j} className="font-bold" style={{ color: ACCENT }}>
                        {span.text}
                      </span>
                    ) : (
                      <span key={j}>{span.text}</span>
                    )
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-6 max-w-[560px] text-[17px] leading-relaxed sm:text-[20px] lg:text-[22px]"
              style={{ color: "#B7B7B7" }}
            >
              {heroDescription}
            </motion.p>

            <motion.div
              {...fadeUp(0.24)}
              className="mt-10 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center lg:justify-start"
            >
              {heroFeatures.map((feature) => {
                const Icon = ICONS[feature.icon];
                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,.08)",
                      background: "rgba(255,255,255,.03)",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 flex-none items-center justify-center rounded-full"
                      style={{ background: "rgba(255,255,255,.06)", color: ACCENT }}
                    >
                      <Icon />
                    </span>
                    <div className="text-left">
                      <div className="text-[13px] font-semibold leading-tight text-white">
                        {feature.title}
                      </div>
                      <div className="text-[12px] leading-tight text-white/50">
                        {feature.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA: la zona que antes quedaba reservada vacía a propósito
                ahora tiene el botón principal, en flujo normal debajo de
                las pills. */}
            <motion.button
              type="button"
              onClick={scrollToJourney}
              {...fadeUp(0.32)}
              className="mt-10 inline-flex items-center gap-2.5 self-center rounded-full bg-emerald-500 px-6 py-3.5 font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-colors duration-300 hover:bg-emerald-400 lg:self-start"
            >
              <span>{heroScrollCta}</span>
              <span aria-hidden="true">→</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Indicador de scroll: reemplaza la línea vertical aislada (se veía
          como un segmento cortado, sin conexión real con nada) por una
          píldora clicable que dispara el mismo scroll suave hacia el
          Viaje — comunica la acción en vez de simularla con un adorno. */}
      <div className="relative z-20 flex justify-center pb-10 pt-2 sm:pb-14">
        <motion.button
          type="button"
          onClick={scrollToJourney}
          {...fadeUp(0.4)}
          className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/40 px-5 py-2.5 text-xs uppercase tracking-wider text-emerald-400 backdrop-blur transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <span>Averiguá cómo te podemos ayudar</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </motion.button>
      </div>
    </section>
  );
}
