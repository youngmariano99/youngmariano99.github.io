"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PatitasTimeline as PatitasTimelineType, PatitasConfig } from "../types";

export default function PatitasTimeline() {
  const [timeline, setTimeline] = useState<PatitasTimelineType[]>([]);
  const [config, setConfig] = useState<PatitasConfig | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("patitas_timeline")
      .select("*")
      .order("orden", { ascending: true })
      .then(({ data }) => {
        if (data) setTimeline(data as PatitasTimelineType[]);
      });

    supabase
      .from("patitas_config")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) {
          setConfig(data as PatitasConfig);
          if (data.launch_date) {
            const launch = new Date(data.launch_date);
            const now = new Date();
            const diffTime = launch.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysLeft(diffDays > 0 ? diffDays : 0);
          }
        }
      });
  }, []);

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto relative z-10 bg-white shadow-sm rounded-3xl border border-slate-100 my-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Hoja de Ruta y Lanzamiento</h2>
        {daysLeft !== null ? (
          <div className="inline-flex flex-col items-center justify-center p-6 bg-blue-50 border border-blue-100 rounded-2xl">
            <span className="text-5xl font-black text-blue-600 mb-2">{daysLeft}</span>
            <span className="text-sm font-medium text-[#A6AEAA] uppercase tracking-wider">
              Días para el despliegue oficial
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center justify-center px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-sm font-medium text-[#A6AEAA]">
              Trabajando duro para definir la fecha de lanzamiento. ¡Anotate para ser el primero en saber!
            </span>
          </div>
        )}
      </div>

      <div className="relative border-l-2 border-blue-100 ml-4 md:ml-1/2 space-y-12">
        {timeline.map((item) => (
          <div key={item.id} className="relative pl-8 md:pl-0">
            {/* Timeline dot */}
            <div
              className={`absolute left-[-9px] md:left-1/2 md:-ml-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                item.estado === "completado"
                  ? "bg-blue-600 border-blue-600"
                  : item.estado === "actual"
                  ? "bg-white border-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "bg-white border-slate-300"
              }`}
            />
            
            <div className={`md:w-1/2 ${item.orden % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
              <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                item.estado === "completado" ? "text-blue-600" : "text-[#A6AEAA]"
              }`}>
                {new Date(item.fecha).toLocaleDateString("es-AR", { month: "long", year: "numeric", timeZone: "UTC" })}
              </span>
              <h3 className="text-xl font-semibold mb-2">{item.titulo}</h3>
              <p className="text-[#A6AEAA] text-sm leading-relaxed">{item.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

