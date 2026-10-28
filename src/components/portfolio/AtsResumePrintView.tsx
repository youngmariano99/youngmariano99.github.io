"use client";

import React from "react";
import { PortfolioCvData, getActiveSummary } from "../../lib/portfolioCvData";

interface Props {
  data: PortfolioCvData;
  /** Si es true, se renderiza como preview dentro de un contenedor (ej. en el Admin) sin requerir print */
  isPreview?: boolean;
}

export default function AtsResumePrintView({ data, isPreview = false }: Props) {
  const summaryText = getActiveSummary(data.resumen);
  const activeExperiences = data.experiencias.filter((exp) => exp.visible);
  const activeEducation = data.educacion.filter((edu) => edu.visible);
  const activeSkills = data.habilidades.filter((sk) => sk.visible);

  // Formato simplificado y limpio del linkedin para el encabezado (ej. linkedin.com/in/mariano-young)
  const displayLinkedin = data.contacto.linkedin
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  const displayWeb = data.contacto.web
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  return (
    <div
      className={`bg-white text-gray-900 font-sans antialiased ${
        isPreview
          ? "w-full max-w-[210mm] min-h-[297mm] mx-auto p-[10mm_14mm] shadow-2xl border border-gray-300 text-[9.5pt] leading-[1.32]"
          : "hidden print:block w-full text-[9.5pt] leading-[1.32] print:p-0 print:m-0"
      }`}
      style={{
        fontFamily: "'Inter', Arial, Helvetica, sans-serif",
      }}
    >
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 14mm 10mm 14mm;
          }
          html, body {
            background-color: #ffffff !important;
            color: #111827 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Ocultar cualquier elemento del sitio general durante la impresión */
          body > #root > div > *:not(.print-container-target) {
            display: none !important;
          }
        }
      `}</style>

      <div className="w-full flex flex-col space-y-3">
        {/* ================================================================= */}
        {/* 1. ENCABEZADO                                                     */}
        {/* ================================================================= */}
        <header className="border-b border-gray-300 pb-2.5 text-center">
          <h1 className="text-[20pt] font-bold text-gray-950 tracking-tight leading-none mb-1.5 uppercase">
            {data.contacto.nombre}
          </h1>
          <p className="text-[9pt] text-gray-700 font-normal tracking-tight leading-snug">
            <span>{data.contacto.email}</span>
            <span className="mx-1.5 text-gray-400 font-light">|</span>
            <span>{data.contacto.telefono}</span>
            <span className="mx-1.5 text-gray-400 font-light">|</span>
            <span>{data.contacto.ubicacion}</span>
            <span className="mx-1.5 text-gray-400 font-light">|</span>
            <span>{displayWeb}</span>
            <span className="mx-1.5 text-gray-400 font-light">|</span>
            <span>{displayLinkedin}</span>
          </p>
        </header>

        {/* ================================================================= */}
        {/* 2. RESUMEN EJECUTIVO                                              */}
        {/* ================================================================= */}
        <section aria-label="Resumen Ejecutivo" className="border-b border-gray-200 pb-2.5">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-1.5">
            Resumen Ejecutivo
          </h2>
          <p className="text-[9pt] text-gray-800 leading-snug text-justify font-normal">
            {summaryText}
          </p>
        </section>

        {/* ================================================================= */}
        {/* 3. EXPERIENCIA PROFESIONAL (Título Único)                         */}
        {/* ================================================================= */}
        <section aria-label="Experiencia Profesional" className="border-b border-gray-200 pb-2.5">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-2">
            Experiencia Profesional
          </h2>

          <div className="space-y-3">
            {activeExperiences.map((exp) => {
              const activeBullets = exp.bullets.filter((b) => b.visible);
              return (
                <div key={exp.id} className="space-y-1">
                  {/* Encabezado del Puesto */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10pt] font-bold text-gray-950">{exp.empresa}</span>
                      <span className="mx-1.5 text-gray-400">|</span>
                      <span className="text-[9.5pt] font-semibold text-gray-800 italic">{exp.rol}</span>
                    </div>
                    <div className="text-[8.5pt] font-medium text-gray-600 text-right shrink-0">
                      <span>{exp.ubicacion}</span>
                      <span className="mx-1.5 text-gray-400">•</span>
                      <span className="font-semibold text-gray-900">{exp.periodo}</span>
                    </div>
                  </div>

                  {/* Viñetas */}
                  <ul className="list-disc pl-4 space-y-1 text-[8.5pt] text-gray-800 leading-snug">
                    {activeBullets.map((bullet) => (
                      <li key={bullet.id} className="pl-0.5">
                        <strong className="font-semibold text-gray-950">{bullet.subtitulo}:</strong>{" "}
                        <span className="text-gray-800">{bullet.descripcion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. EDUCACIÓN                                                      */}
        {/* ================================================================= */}
        <section aria-label="Educación" className="border-b border-gray-200 pb-2">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-1.5">
            Educación
          </h2>

          <div className="space-y-1.5">
            {activeEducation.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between text-[9pt]">
                <div>
                  <span className="font-bold text-gray-950">{edu.institucion}</span>
                  <span className="mx-1.5 text-gray-400">|</span>
                  <span className="font-medium text-gray-800 italic">{edu.titulo}</span>
                  <span className="mx-1.5 text-gray-400">•</span>
                  <span className="text-gray-600 font-normal">({edu.estado})</span>
                </div>
                <div className="text-[8.5pt] font-semibold text-gray-800 text-right shrink-0">
                  {edu.periodo}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. HABILIDADES TÉCNICAS Y OPERATIVAS                             */}
        {/* ================================================================= */}
        <section aria-label="Habilidades Técnicas y Operativas" className="pb-1">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-800 pb-0.5 mb-1.5">
            Habilidades Técnicas y Operativas
          </h2>

          <div className="space-y-1 text-[9pt]">
            {activeSkills.map((cat) => (
              <div key={cat.id} className="flex items-baseline gap-1.5">
                <span className="font-bold text-gray-950 shrink-0 w-52">• {cat.nombre}:</span>
                <span className="text-gray-800 leading-snug">{cat.habilidades.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
