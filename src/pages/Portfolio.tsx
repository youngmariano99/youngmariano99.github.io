"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileDown,
  FileCode,
  Printer,
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
  Layers,
  Cpu,
  Sparkles,
} from "lucide-react";
import { LaptopFrame } from "../components/portfolio/CaseDeviceMockups";
import AtsResumePrintView from "../components/portfolio/AtsResumePrintView";
import { usePortfolioCvData } from "../lib/usePortfolioCvData";
import { getActiveSummary, downloadJsonResume } from "../lib/portfolioCvData";
import { downloadAtsPdf } from "../lib/atsPdfGenerator";

export default function Portfolio() {
  const { data } = usePortfolioCvData();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${data.contacto.nombre} | Portfolio Técnico-Funcional & ERP`;
  }, [data.contacto.nombre]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    downloadAtsPdf(data);
  };

  const handleDownloadJson = () => {
    downloadJsonResume(data);
  };

  const activeSummary = getActiveSummary(data.resumen);
  const activeCases = data.casosEstudio.filter((c) => c.activo);
  const activeEducation = data.educacion.filter((e) => e.visible);

  return (
    <>
      {/* =================================================================== */}
      {/* VISTA IMPRESA ATS (1 Columna A4 - Oculta en pantalla, visible al imprimir) */}
      {/* =================================================================== */}
      <div id="cv-print-area" className="hidden print:block w-full bg-white text-gray-950">
        <AtsResumePrintView data={data} isPreview={false} />
      </div>

      {/* =================================================================== */}
      {/* VISTA WEB PRINCIPAL (Oculta durante la impresión)                  */}
      {/* =================================================================== */}
      <div className="print:hidden min-h-screen bg-[#090B0B] text-[#F3F5F4] font-sans antialiased selection:bg-[#16D39A] selection:text-black">
        {/* Navbar Superior Especial para Reclutadores (Sin enlaces comerciales) */}
        <header className="border-b border-zinc-800/80 bg-[#090B0B]/90 sticky top-0 z-40 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo e Identidad */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 group"
                title="Ir al inicio de Nodexa"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded bg-white/[0.08] border border-white/10 group-hover:border-[#16D39A]/60 transition-colors">
                  <span className="text-[11px] font-bold text-white tracking-wider">NY</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
                    NODEX<span className="text-[#16D39A]">Λ</span>
                    <span className="text-zinc-500 font-mono text-[10px] hidden sm:inline">/ IT Profile</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Accesos Rápidos para Reclutadores */}
            <nav aria-label="Navegación del Portfolio" className="flex items-center gap-3 sm:gap-6">
              <div className="hidden md:flex items-center gap-5 text-xs font-mono text-zinc-400">
                <a href="#capacidades-heading" className="hover:text-[#16D39A] transition-colors">
                  Capacidades
                </a>
                <a href="#casos-heading" className="hover:text-[#16D39A] transition-colors">
                  Casos de Estudio
                </a>
                <a href="#metodologia-heading" className="hover:text-[#16D39A] transition-colors">
                  Metodología
                </a>
                <a href="#formacion-heading" className="hover:text-[#16D39A] transition-colors">
                  Formación
                </a>
              </div>

              {/* Botón Descargar CV (PDF Dinámico de 1 página A4) */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16D39A] text-black text-xs font-semibold hover:bg-[#13be8a] transition-all shadow-sm"
                title="Descargar archivo PDF dinámico actualizado (1 página A4)"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Descargar CV (PDF)</span>
              </button>

              {/* Botón Descargar CV en formato estándar JSON Resume */}
              <button
                type="button"
                onClick={handleDownloadJson}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-medium transition-all"
                title="Descargar versión estándar JSON Resume para ATS y software de reclutamiento"
              >
                <FileCode className="w-3.5 h-3.5 text-[#16D39A]" />
                <span className="hidden md:inline font-mono">CV .JSON</span>
              </button>

              {/* Botón Imprimir / Guardar ATS (A4) */}
              <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-medium transition-all"
                title="Imprimir o guardar en PDF con formato ATS 1 página A4"
              >
                <Printer className="w-3.5 h-3.5 text-[#16D39A]" />
                <span className="hidden sm:inline">Imprimir ATS</span>
              </button>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-16">
          {/* =================================================================== */}
          {/* BLOQUE 1: Header Ejecutivo (Lectura en 10 segundos)                */}
          {/* =================================================================== */}
          <section aria-labelledby="header-ejecutivo" className="space-y-6 border-b border-zinc-800/80 pb-12">
            {/* Badge de Disponibilidad */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16D39A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16D39A]" />
              </span>
              <span>{data.contacto.badgeDisponibilidad}</span>
            </div>

            <div className="space-y-3">
              <h1 id="header-ejecutivo" className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                {data.contacto.nombre}
              </h1>
              <h2 className="text-lg sm:text-xl font-medium text-[#16D39A] tracking-tight">
                {data.contacto.rolWeb}
              </h2>
            </div>

            <p className="text-base sm:text-[16.5px] text-zinc-300 leading-relaxed max-w-4xl">
              {activeSummary}
            </p>

            {/* Barra de Acciones Rápidas */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16D39A] text-black font-semibold text-sm hover:bg-[#13be8a] transition-all shadow-sm"
                title="Descargar archivo PDF dinámico actualizado (1 página A4)"
              >
                <FileDown className="w-4 h-4" />
                <span>Descargar CV (PDF Dinámico)</span>
              </button>

              <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-sm font-medium transition-all"
                title="Abre la vista de impresión configurada para Guardar como PDF en 1 página A4"
              >
                <Printer className="w-4 h-4 text-[#16D39A]" />
                <span>Imprimir / Guardar ATS (A4)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadJson}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-sm font-medium transition-all group"
                title="Descargar en formato oficial JSON Resume (Schema v1.0.0 estándar para software ATS, parsers y scrapers de IA)"
              >
                <FileCode className="w-4 h-4 text-[#16D39A] group-hover:scale-105 transition-transform" />
                <span className="font-mono text-xs">Descargar CV (.JSON ATS)</span>
              </button>

              <a
                href={data.contacto.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-sm font-medium transition-all"
              >
                <ExternalLink className="w-4 h-4 text-zinc-400" />
                <span>Ver Perfil en LinkedIn</span>
              </a>

              <a
                href={`mailto:${data.contacto.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-sm font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>Enviar Correo: {data.contacto.email}</span>
              </a>
            </div>
          </section>

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
              {data.matriz.map((col) => (
                <div
                  key={col.id}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#16D39A]">
                      {col.icon === "database" && <Database className="w-5 h-5" />}
                      {col.icon === "boxes" && <Boxes className="w-5 h-5" />}
                      {col.icon === "bot" && <Bot className="w-5 h-5" />}
                    </div>
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {col.titulo}
                    </h3>
                    <ul className="space-y-2.5 text-sm text-zinc-300">
                      {col.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#16D39A] mt-1 shrink-0 text-xs font-mono">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* BLOQUE 3: Casos de Estudio en Producción (Layout Compacto)          */}
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
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">
                {activeCases.length} Proyectos Activos
              </span>
            </div>

            <div className="space-y-10">
              {activeCases.map((project) => (
                <article
                  key={project.id}
                  aria-labelledby={`${project.id}-title`}
                  className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 sm:p-7 hover:border-zinc-700/80 transition-colors"
                >
                  {/* Encabezado del Proyecto */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-4 mb-6">
                    <div>
                      <h3 id={`${project.id}-title`} className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {project.titulo}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-0.5">
                        {project.subtitulo}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs font-semibold text-[#16D39A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16D39A]" />
                        {project.estado}
                      </span>
                    </div>
                  </div>

                  {/* Grid de 2 Columnas para Reducir Altura Muerta y Facilitar Escaneo */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Mockup de Laptop Compacto (Columna Izquierda en Desktop) */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#05070C] rounded-xl border border-zinc-800/80 p-3 sm:p-4 overflow-hidden">
                      <div className="w-full flex justify-center py-2">
                        <LaptopFrame
                          imageUrl={project.mockupUrl}
                          label={project.mockupLabel}
                          open={true}
                          size="lg"
                          staticView={true}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 mt-2">
                        {project.mockupLabel}
                      </span>
                    </div>

                    {/* Ficha Técnica en 4 Puntos (Columna Derecha en Desktop) */}
                    <div className="lg:col-span-7 space-y-4 text-sm">
                      {/* 1. Problema */}
                      <div className="space-y-1">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                          <span className="text-[#16D39A]">01.</span> El Problema Operativo
                        </h4>
                        <p className="text-zinc-300 leading-relaxed pl-5 text-[13.5px]">
                          {project.problema}
                        </p>
                      </div>

                      {/* 2. Arquitectura */}
                      <div className="space-y-1.5">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                          <span className="text-[#16D39A]">02.</span> Arquitectura y Solución Técnica
                        </h4>
                        <div className="pl-5 space-y-1.5 text-[13.5px]">
                          <p className="text-zinc-300 leading-relaxed">
                            {project.arquitectura.intro}
                          </p>
                          {project.arquitectura.items.length > 0 && (
                            <ul className="space-y-1 text-zinc-300 list-disc list-inside">
                              {project.arquitectura.items.map((item, idx) => (
                                <li key={idx}>
                                  <strong className="text-white">{item.label}:</strong> {item.text}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      {/* 3. Impacto */}
                      <div className="space-y-1">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                          <span className="text-[#16D39A]">03.</span> Impacto en el Negocio / Operación
                        </h4>
                        <p className="text-zinc-300 leading-relaxed pl-5 text-[13.5px]">
                          {project.impacto}
                        </p>
                      </div>

                      {/* 4. Stack */}
                      <div className="pt-2 border-t border-zinc-800/60 space-y-1.5">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-semibold">
                          <span className="text-[#16D39A]">04.</span> Stack &amp; Conceptos Aplicados
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pl-5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* BLOQUE 4: Metodología de Trabajo y Enfoque en Datos                 */}
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
              {data.metodologia.map((m) => (
                <div
                  key={m.id}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-7 space-y-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-[#16D39A]">
                    {m.icon === "layers" ? <Layers className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    {m.titulo}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {m.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* BLOQUE 5: Formación Académica y Footer de Contacto Rápido           */}
          {/* =================================================================== */}
          <section aria-labelledby="formacion-heading" className="space-y-8 border-t border-zinc-800/80 pt-12">
            <div className="space-y-6">
              <h2 id="formacion-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-[#16D39A] rounded-full inline-block" />
                Formación Académica
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeEducation.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-[#16D39A] text-xs font-mono font-medium">
                      <GraduationCap className="w-4 h-4" />
                      <span>{edu.institucion}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {edu.titulo}
                    </h3>
                    <p className="text-xs font-mono text-zinc-300 pt-1">
                      {edu.estado} • {edu.periodo}
                    </p>
                  </div>
                ))}
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
                    {data.contacto.ubicacion}
                  </p>
                  <p className="text-xs font-mono text-[#16D39A]">
                    Disponible Remoto o Presencial
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
                      href={`mailto:${data.contacto.email}`}
                      className="text-zinc-200 hover:text-[#16D39A] transition-colors font-mono text-xs sm:text-sm underline underline-offset-4"
                    >
                      {data.contacto.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(data.contacto.email, "email")}
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
                      href={`https://wa.me/${data.contacto.telefono.replace(/[^0-9]/g, "")}?text=Hola%20Mariano,%20estuve%20revisando%20tu%20portfolio%20técnico`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 hover:text-[#16D39A] transition-colors font-mono text-xs sm:text-sm underline underline-offset-4"
                    >
                      {data.contacto.telefono}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(data.contacto.telefono, "phone")}
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
                <span>{data.contacto.nombre} &copy; {new Date().getFullYear()} — Nodexa Technical Architecture</span>
                <div className="flex items-center gap-4">
                  <Link to="/" className="hover:text-zinc-300 transition-colors">
                    Sitio Principal
                  </Link>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="hover:text-[#16D39A] transition-colors"
                  >
                    Descargar CV (PDF)
                  </button>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="hover:text-[#16D39A] transition-colors"
                  >
                    Descargar CV (.JSON ATS)
                  </button>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={handlePrintPdf}
                    className="hover:text-[#16D39A] transition-colors"
                  >
                    Imprimir ATS (A4)
                  </button>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
}
