"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileDown,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Database,
  Boxes,
  Bot,
  Copy,
  Check,
  GraduationCap,
  ArrowLeft,
  Briefcase,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { LaptopFrame } from "../components/portfolio/CaseDeviceMockups";

export default function Portfolio() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mariano Young | Portfolio Técnico-Funcional & ERP";
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090B0B] text-[#F3F5F4] font-sans antialiased selection:bg-[#16D39A] selection:text-black">
      {/* Barra superior utilitaria y sobria */}
      <nav aria-label="Navegación secundaria" className="border-b border-zinc-800/80 bg-[#090B0B]/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#16D39A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Nodexa</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
              Ficha Técnica IT
            </span>
            <a
              href="/cv-mariano-young.pdf"
              download="CV-Mariano-Young.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white px-3 py-1.5 rounded border border-zinc-700 transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-[#16D39A]" />
              <span>CV (PDF)</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* =================================================================== */}
        {/* BLOQUE 1: Header Ejecutivo (Lectura en 10 segundos)                */}
        {/* =================================================================== */}
        <header className="space-y-6 border-b border-zinc-800/80 pb-12">
          {/* Badge de Disponibilidad */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D39A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D39A]" />
            </span>
            <span>DISPONIBLE PARA OPORTUNIDADES LABORALES | REMOTO & PRESENCIAL (BS. AS.)</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Mariano Young
            </h1>
            <h2 className="text-lg sm:text-xl font-medium text-[#16D39A] tracking-tight">
              Técnico en Programación (UTN) &amp; Estudiante Avanzado de Lic. en Administración
            </h2>
          </div>

          <p className="text-base sm:text-[17px] text-zinc-300 leading-relaxed max-w-4xl">
            Perfil híbrido técnico-administrativo enfocado en el &quot;detrás de escena&quot; de las organizaciones:
            lógica de negocio, bases de datos relacionales, sistemas de gestión (ERP) y optimización de procesos operativos.
            Combino la formación en desarrollo de software con la visión de costos, circuitos comerciales y control
            interno para construir e implementar herramientas que ahorran tiempo, ordenan la operación y transforman datos
            sueltos en información para tomar decisiones.
          </p>

          {/* Barra de Acciones Rápidas */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/cv-mariano-young.pdf"
              download="CV-Mariano-Young.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16D39A] text-black font-semibold text-sm hover:bg-[#13be8a] transition-all shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar CV (PDF)</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mariano-young"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-sm font-medium transition-all"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              <span>Ver Perfil en LinkedIn</span>
            </a>

            <a
              href="mailto:youngmariano99@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-sm font-medium transition-all"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Enviar Correo: youngmariano99@gmail.com</span>
            </a>
          </div>
        </header>

        {/* =================================================================== */}
        {/* BLOQUE 2: Matriz de Capacidades (Tech + Negocio)                   */}
        {/* =================================================================== */}
        <section aria-labelledby="capacidades-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="capacidades-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-[#16D39A] rounded-full inline-block" />
              Matriz de Capacidades (Tech + Negocio)
            </h2>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">Especialidad Híbrida</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Columna 1 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#16D39A]">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Datos &amp; Lógica de Sistemas
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Modelado de bases de datos relacionales (PostgreSQL / SQL).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Consultas de diagnóstico y reportes (<code className="font-mono text-xs bg-zinc-800 px-1 py-0.5 rounded text-zinc-200">JOINs</code>, <code className="font-mono text-xs bg-zinc-800 px-1 py-0.5 rounded text-zinc-200">GROUP BY</code>, agregaciones, vistas).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Estructura de datos pensada para trazabilidad histórica y análisis comercial.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Testeo y consumo de APIs REST (JSON, Postman).</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#16D39A]">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Gestión, Procesos &amp; Visión ERP
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Relevamiento funcional de circuitos operativos (Compras ➔ Stock ➔ Ventas ➔ Caja).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Lógica contable de partida doble (Debe/Haber) y control de cuentas corrientes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Operatoria administrativa de PyMEs (facturación ARCA, remitos, conciliaciones y costos por receta/insumos).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Traducción de problemas cotidianos de usuarios no técnicos a requerimientos de sistema.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Columna 3 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#16D39A]">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Automatización &amp; IA Aplicada
                </h3>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Integración de servicios de Inteligencia Artificial (API Vision / LLMs) para acelerar la carga operativa de datos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Desarrollo ágil asistido por IA enfocado en resolver cuellos de botella reales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>Estructuración de tableros de control e indicadores clave (KPIs) en Excel y herramientas de BI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                    <span>En aprendizaje continuo: Orquestación de flujos automatizados (<code className="font-mono text-xs bg-zinc-800 px-1 py-0.5 rounded text-zinc-200">n8n</code>) y analítica predictiva aplicada a negocios.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* BLOQUE 3: Casos de Estudio en Producción (El corazón de la página) */}
        {/* =================================================================== */}
        <section aria-labelledby="casos-heading" className="space-y-10">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div>
              <h2 id="casos-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-[#16D39A] rounded-full inline-block" />
                Casos de Estudio en Producción
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Fichas técnicas con problemas operativos reales, arquitectura detrás de escena e impacto cuantificable.
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">3 Proyectos Reales</span>
          </div>

          <div className="space-y-12">
            {/* ------------------------------------------------------------- */}
            {/* Caso 1: Nodexa Core (Implementación real: "May Delicias")    */}
            {/* ------------------------------------------------------------- */}
            <article
              aria-labelledby="caso-1-title"
              className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-8 hover:border-zinc-700/80 transition-colors"
            >
              {/* Header del Caso */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-5">
                <div>
                  <h3 id="caso-1-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Nodexa Core (Implementación real: &quot;May Delicias&quot;)
                  </h3>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Sistema Modular de Gestión Comercial, Stock por Recetas y Caja
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs font-semibold text-[#16D39A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
                    En Producción | Caso Real Gastronómico
                  </span>
                </div>
              </div>

              {/* Mockup de Computadora (Reutilizado) */}
              <div className="bg-[#05070C] rounded-xl border border-zinc-800/80 p-4 sm:p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full flex justify-center">
                  <LaptopFrame
                    imageUrl="/Proyectos/nodexa-core-maydelicias.jpg"
                    label="maydelicias.nodexa.app"
                    open={true}
                    size="lg"
                    staticView={true}
                  />
                </div>
              </div>

              {/* Anatomía Técnica en 4 Puntos */}
              <div className="grid grid-cols-1 gap-6 text-sm">
                {/* 1. Problema */}
                <div className="space-y-1.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">01.</span> El Problema Operativo
                  </h4>
                  <p className="text-zinc-300 leading-relaxed pl-5">
                    Los comercios gastronómicos y minoristas locales suelen operar con pedidos desordenados por WhatsApp
                    y anotaciones en cuadernos de papel. Esto genera demoras en horas pico, desconocimiento del costo
                    real por variación de precios de insumos y falta de datos históricos para predecir cuánta mercadería
                    comprar para el fin de semana.
                  </p>
                </div>

                {/* 2. Arquitectura */}
                <div className="space-y-2.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">02.</span> Arquitectura y Solución Técnica
                  </h4>
                  <div className="pl-5 space-y-2">
                    <p className="text-zinc-300 leading-relaxed">
                      Desarrollé un sistema web modular sobre una base de datos relacional en PostgreSQL.
                    </p>
                    <ul className="space-y-2 text-zinc-300 list-disc list-inside">
                      <li>
                        <strong className="text-white">Captación sin fricción:</strong> Catálogo digital que estructura el
                        pedido del cliente y lo envía pre-formateado a un tablero Kanban de comandas en cocina/mostrador.
                      </li>
                      <li>
                        <strong className="text-white">Control de Stock y Recetas:</strong> Descuento transaccional de
                        insumos y materias primas a partir de las recetas de cada producto vendido.
                      </li>
                      <li>
                        <strong className="text-white">Registro Contable y Carga con IA:</strong> Estructura de caja
                        inspirada en principios de partida doble para evitar descuadres, sumado a una integración con API
                        de IA para agilizar el alta de productos a partir de fotografías.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. Impacto */}
                <div className="space-y-1.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">03.</span> Impacto en el Negocio
                  </h4>
                  <p className="text-zinc-300 leading-relaxed pl-5">
                    Eliminación del papel en la toma de pedidos, centralización del control de caja e inventario en
                    tiempo real y generación de una base de datos limpia que permite analizar qué productos dejan mayor
                    margen y en qué días se concentra la demanda.
                  </p>
                </div>

                {/* 4. Stack */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">04.</span> Stack &amp; Conceptos Aplicados
                  </h4>
                  <div className="flex flex-wrap gap-2 pl-5">
                    {[
                      "PostgreSQL",
                      "SQL Relacional",
                      "Lógica de Partida Doble",
                      "Explosión de Insumos/Recetas",
                      "API REST + IA",
                      "Next.js / TypeScript",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* Caso 2: Patitas en Alerta                                     */}
            {/* ------------------------------------------------------------- */}
            <article
              aria-labelledby="caso-2-title"
              className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-8 hover:border-zinc-700/80 transition-colors"
            >
              {/* Header del Caso */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-5">
                <div>
                  <h3 id="caso-2-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Patitas en Alerta
                  </h3>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Plataforma Integral de Gestión de Turnos, Trazabilidad y Estadísticas para Zoonosis y Comunidad
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 font-mono text-xs font-semibold text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Proyecto Integral | Gestión Pública y Comunitaria
                  </span>
                </div>
              </div>

              {/* Mockup de Computadora (Reutilizado) */}
              <div className="bg-[#05070C] rounded-xl border border-zinc-800/80 p-4 sm:p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full flex justify-center">
                  <LaptopFrame
                    imageUrl="/patitas-preview.png"
                    label="patitas.nodexa.app"
                    open={true}
                    size="lg"
                    staticView={true}
                  />
                </div>
              </div>

              {/* Anatomía Técnica en 4 Puntos */}
              <div className="grid grid-cols-1 gap-6 text-sm">
                {/* 1. Problema */}
                <div className="space-y-1.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">01.</span> El Problema Operativo
                  </h4>
                  <p className="text-zinc-300 leading-relaxed pl-5">
                    La gestión de animales perdidos en ciudades chicas depende de publicaciones sueltas en redes
                    sociales sin trazabilidad, mientras que los turnos municipales de castración y las libretas sanitarias
                    se manejan en papel, saturando de tareas administrativas a veterinarios, municipios y ONGs.
                  </p>
                </div>

                {/* 2. Arquitectura */}
                <div className="space-y-2.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">02.</span> Arquitectura y Solución Técnica
                  </h4>
                  <div className="pl-5 space-y-2">
                    <p className="text-zinc-300 leading-relaxed">
                      Diseñé una plataforma centralizada que conecta a los distintos actores (Municipio/Zoonosis,
                      Veterinarias, ONGs y Vecinos) sobre un mismo modelo de datos:
                    </p>
                    <ul className="space-y-2 text-zinc-300 list-disc list-inside">
                      <li>
                        <strong className="text-white">Tablero de Datos y Mapa de Calor:</strong> Captura estructurada de
                        reportes geolocalizados que transforma reclamos aislados en estadísticas visuales y mapas de
                        calor para que el área de Zoonosis tome decisiones basadas en datos.
                      </li>
                      <li>
                        <strong className="text-white">Turnero Digital y Libreta Sanitaria:</strong> Sistema de reserva y
                        administración de turnos para campañas de castración e historial clínico digital unificado.
                      </li>
                      <li>
                        <strong className="text-white">Algoritmo de Compatibilidad:</strong> Cruce lógico por puntaje
                        entre las condiciones del adoptante y las necesidades del animal para promover adopciones
                        responsables.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. Impacto */}
                <div className="space-y-1.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">03.</span> Impacto en el Negocio / Operación
                  </h4>
                  <p className="text-zinc-300 leading-relaxed pl-5">
                    Estandarización de procesos que antes se hacían por teléfono o en planillas sueltas, reducción del
                    desgaste administrativo de las ONGs y creación de una base estadística preparada para escalar hacia
                    análisis predictivo.
                  </p>
                </div>

                {/* 4. Stack */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">04.</span> Stack &amp; Conceptos Aplicados
                  </h4>
                  <div className="flex flex-wrap gap-2 pl-5">
                    {[
                      "Modelado de Datos SQL",
                      "Dashboard & Mapas de Calor",
                      "Gestión de Turnos",
                      "Lógica Algorítmica",
                      "Relevamiento Funcional",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* Caso 3: Experiencia Previa en Equipo (Appy Studios)           */}
            {/* ------------------------------------------------------------- */}
            <article
              aria-labelledby="caso-3-title"
              className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-8 hover:border-zinc-700/80 transition-colors"
            >
              {/* Header del Caso */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-5">
                <div>
                  <h3 id="caso-3-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Experiencia Previa en Equipo (Appy Studios) &amp; Sistemas Comerciales
                  </h3>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Sistemas POS, Control de Stock Minorista y Marketplace de Servicios
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 font-mono text-xs font-semibold text-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    6 Meses en Equipo Freelance | Comercio Local
                  </span>
                </div>
              </div>

              {/* Mockup de Computadora (Reutilizado) */}
              <div className="bg-[#05070C] rounded-xl border border-zinc-800/80 p-4 sm:p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full flex justify-center">
                  <LaptopFrame
                    imageUrl="/Proyectos/Proyecto3LeñeraChingolitosParte2.png"
                    label="pos.lenera.local"
                    open={true}
                    size="lg"
                    staticView={true}
                  />
                </div>
              </div>

              {/* Anatomía Técnica en 4 Puntos */}
              <div className="grid grid-cols-1 gap-6 text-sm">
                {/* 1. Problema */}
                <div className="space-y-1.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">01.</span> El Problema Operativo
                  </h4>
                  <p className="text-zinc-300 leading-relaxed pl-5">
                    Comercios tradicionales de distintos rubros (leñera, pinturería, juguetería/librería) y prestadores
                    de servicios locales necesitaban digitalizar sus catálogos, agilizar el cobro en mostrador y
                    sincronizar su stock sin depender de sistemas corporativos complejos de usar.
                  </p>
                </div>

                {/* 2. Arquitectura */}
                <div className="space-y-2.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">02.</span> Arquitectura y Solución Técnica
                  </h4>
                  <div className="pl-5 space-y-2">
                    <p className="text-zinc-300 leading-relaxed">
                      Trabajando en equipo con dos colegas desarrolladores, participamos en el relevamiento con los
                      dueños de cada comercio, el diseño de las bases de datos y la implementación de:
                    </p>
                    <ul className="space-y-2 text-zinc-300 list-disc list-inside">
                      <li>
                        <strong className="text-white">Sistema POS y Stock (Leñera):</strong> Control de entradas/salidas
                        de mercadería, registro de ventas en mostrador y cierre de caja diario.
                      </li>
                      <li>
                        <strong className="text-white">Catálogos Web Transaccionales (Juguetería y Pinturería):</strong>{" "}
                        Organización de cientos de artículos por categorías con pedidos directos a WhatsApp.
                      </li>
                      <li>
                        <strong className="text-white">Argoot (Marketplace de Servicios):</strong> Plataforma para
                        conectar oferta y demanda de servicios locales.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. Impacto */}
                <div className="space-y-1.5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">03.</span> Impacto en el Negocio
                  </h4>
                  <p className="text-zinc-300 leading-relaxed pl-5">
                    Experiencia real de trato con clientes comerciales, entendimiento de las limitaciones tecnológicas
                    del usuario de mostrador (diseño de interfaces de pocos clics) y soporte post-implementación.
                  </p>
                </div>

                {/* 4. Stack */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                    <span className="text-[#16D39A]">04.</span> Stack &amp; Conceptos Aplicados
                  </h4>
                  <div className="flex flex-wrap gap-2 pl-5">
                    {[
                      "Sistemas POS",
                      "Control de Inventario",
                      "Relevamiento con Clientes",
                      "Soporte Operativo",
                      "Trabajo en Equipo",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* =================================================================== */}
        {/* BLOQUE 4: Mi Metodología de Trabajo (2 Tarjetas)                   */}
        {/* =================================================================== */}
        <section aria-labelledby="metodologia-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="metodologia-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-[#16D39A] rounded-full inline-block" />
              Metodología de Trabajo y Enfoque en Datos
            </h2>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">Criterio Práctico</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tarjeta 1 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-7 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#16D39A]">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                1. Primero entender el problema, después tocar el sistema
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Mi regla principal —tanto al analizar un proceso administrativo como al desarrollar software— es no
                quedarme con el primer síntoma superficial. Antes de proponer una herramienta, audito cómo entra la
                información, qué fricciones tiene el usuario que carga los datos y qué necesita ver la gerencia o el
                dueño al final del día para tomar mejores decisiones.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-7 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#16D39A]">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                2. Los datos como motor de decisiones (Presente y Futuro)
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                No veo a las bases de datos solo como un archivo para guardar comprobantes pasados, sino como una
                herramienta activa para anticiparse (por ejemplo, cruzar el historial de ventas con variables externas o
                estacionales para saber cuándo abastecerse o cuándo lanzar una acción comercial). Me encuentro en
                constante capacitación práctica en SQL, herramientas de automatización (
                <code className="font-mono text-xs bg-zinc-800 px-1 py-0.5 rounded text-zinc-200">n8n</code>) y Business
                Intelligence para aportar ese valor analítico desde el primer día.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* BLOQUE 5: Formación Académica y Footer de Contacto Rápido           */}
        {/* =================================================================== */}
        <section aria-labelledby="formacion-heading" className="space-y-8 border-t border-zinc-800/80 pt-12">
          {/* Formación Académica */}
          <div className="space-y-6">
            <h2 id="formacion-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-[#16D39A] rounded-full inline-block" />
              Formación Académica
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 text-[#16D39A] text-xs font-mono font-medium">
                  <GraduationCap className="w-4 h-4" />
                  <span>Grado Universitario</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Licenciatura en Administración de Empresas
                </h3>
                <p className="text-xs text-zinc-400">
                  Universidad Siglo 21
                </p>
                <p className="text-xs font-mono text-[#16D39A] pt-1">
                  Cursando último año — Restan 5 materias
                </p>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 text-[#16D39A] text-xs font-mono font-medium">
                  <GraduationCap className="w-4 h-4" />
                  <span>Pregrado Técnico</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Tecnicatura Universitaria en Programación
                </h3>
                <p className="text-xs text-zinc-400">
                  Universidad Tecnológica Nacional (UTN)
                </p>
                <p className="text-xs font-mono text-zinc-400 pt-1">
                  Graduado 2026
                </p>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono font-medium">
                  <GraduationCap className="w-4 h-4" />
                  <span>Educación Técnica</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Técnico Electromecánico
                </h3>
                <p className="text-xs text-zinc-400">
                  Escuela de Educación Secundaria Técnica N°1
                </p>
                <p className="text-xs font-mono text-zinc-400 pt-1">
                  Graduado 2018
                </p>
              </div>
            </div>
          </div>

          {/* Footer de Contacto Directo */}
          <footer className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Datos de Contacto Directo
                </h3>
                <p className="text-xs text-zinc-400">
                  Texto plano copiable indexable para evaluación inmediata por reclutadores y líderes técnicos.
                </p>
              </div>
              <span className="font-mono text-xs text-zinc-400">
                Respuesta ágil
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
              {/* Ubicación */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#16D39A]" />
                  <span>Ubicación</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                  Coronel Pringles, Provincia de Buenos Aires, Argentina
                </p>
                <p className="text-xs font-mono text-[#16D39A]">
                  Disponible 100% Remoto o Presencial/Híbrido en la región
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase">
                  <Mail className="w-3.5 h-3.5 text-[#16D39A]" />
                  <span>Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:youngmariano99@gmail.com"
                    className="text-zinc-200 hover:text-[#16D39A] transition-colors font-mono text-xs sm:text-sm underline underline-offset-4"
                  >
                    youngmariano99@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("youngmariano99@gmail.com", "email")}
                    aria-label="Copiar email"
                    className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Copiar email"
                  >
                    {copiedItem === "email" ? (
                      <Check className="w-3.5 h-3.5 text-[#16D39A]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">Bandeja monitoreada diariamente</p>
              </div>

              {/* WhatsApp */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase">
                  <Phone className="w-3.5 h-3.5 text-[#16D39A]" />
                  <span>Teléfono / WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/5492923511691?text=Hola%20Mariano,%20estuve%20revisando%20tu%20portfolio%20técnico"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 hover:text-[#16D39A] transition-colors font-mono text-xs sm:text-sm underline underline-offset-4"
                  >
                    +54 9 2923 511691
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("+5492923511691", "phone")}
                    aria-label="Copiar teléfono"
                    className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Copiar teléfono"
                  >
                    {copiedItem === "phone" ? (
                      <Check className="w-3.5 h-3.5 text-[#16D39A]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">Contacto directo inmediato</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2 font-mono">
              <span>Mariano Young &copy; {new Date().getFullYear()} — Nodexa Technical Architecture</span>
              <div className="flex items-center gap-4">
                <Link to="/" className="hover:text-zinc-300 transition-colors">
                  Sitio Principal
                </Link>
                <span>&bull;</span>
                <a
                  href="/cv-mariano-young.pdf"
                  download="CV-Mariano-Young.pdf"
                  className="hover:text-[#16D39A] transition-colors"
                >
                  Descargar CV (PDF)
                </a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
