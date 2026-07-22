# Nodexa — Landing Page (React + Tailwind + Framer Motion)

## Instalación

```bash
npm install framer-motion
```

Tailwind CSS debe estar ya configurado en el proyecto (v3+). No se agregaron
colores custom en `tailwind.config`: todos los tokens de marca se usan como
clases arbitrarias (`bg-[#0A192F]`, `text-[#10B981]`, etc.) para que estos
archivos funcionen sin tocar la config del proyecto. Si preferís nombrarlos,
podés extender el theme:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      sapphire: "#0A192F",
      emerald: "#10B981",
      graphite: "#1F2937",
      slate: "#4B5563",
      hairline: "#E5E7EB",
    },
  },
}
```

## Fuente

El diseño usa exclusivamente **Inter** (mandato del design system). En
Next.js:

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
```

Aplicá `inter.className` al `<body>`, o cargá la fuente vía `<link>` como en
el HTML original si no usás Next.js.

## Estructura

```
NodexaLanding.tsx        → componente raíz, ensambla la página
data.ts                  → todo el copy y contenido (sin modificar del original)
types.ts                 → interfaces TypeScript
lib/motion.ts             → variantes de Framer Motion compartidas
components/
  Header.tsx              → nav sticky + menú mobile
  Hero.tsx                → sección hero, grilla asimétrica
  Problem.tsx             → "El Problema", 2 columnas + persona cards
  Method.tsx              → "Nuestro Método", diagrama animado + timeline
  Solutions.tsx           → "Soluciones", grilla de 3 tarjetas
  Ecosystem.tsx           → "Ecosistema", canvas de nodos interactivo
  Authority.tsx           → "Fundador", retrato + bio
  Contact.tsx             → CTA final + footer
  DiagnosticModal.tsx     → modal de diagnóstico rápido → WhatsApp
  icons.tsx               → isotipo e íconos de servicio en SVG
```

Uso:

```tsx
import NodexaLanding from "./nodexa-landing/NodexaLanding";

export default function Page() {
  return <NodexaLanding />;
}
```

## Pendientes antes de producción

- **Número de WhatsApp**: reemplazar `WHATSAPP_NUMBER` en `data.ts` (está en
  `000000000000` como placeholder, igual que en el HTML original).
- **Retrato de Mariano**: `Authority.tsx` tiene un placeholder con
  instrucciones inline para reemplazarlo por la imagen real.
- El modal actual replica el comportamiento del HTML original (selección de
  1 de 3 opciones → WhatsApp). El documento de planificación menciona un
  formulario de 3 campos (Nombre / Rubro / Cuello de Botella); no lo
  implementé porque no estaba en el código fuente que pediste migrar
  respetando el copy exacto — si lo querés, lo armo como siguiente paso.

## Notas de diseño

- Un solo acento de color (`#10B981`) en toda la página — nada de
  degradados ni sombras pesadas.
- El motivo de "nodos conectados" (marca Nodexa) es el hilo visual: aparece
  en el diagrama de Método y en el canvas de Ecosistema, no como decoración
  suelta.
- Numeración 01/02/03 solo en "Método", porque ahí sí es una secuencia real.
- Todas las animaciones usan `easeOut`/`easeInOut`, `whileInView` +
  `viewport={{ once: true }}`, y `staggerChildren` en grillas de tarjetas.
  Cero springs, cero rebotes, cero rotaciones fuera del diagrama ambiental
  de Método.
