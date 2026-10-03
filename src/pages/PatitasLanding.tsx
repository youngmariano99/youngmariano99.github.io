"use client";

import { useState, useEffect } from "react";
import PatitasHeroCarousel from "../components/PatitasHeroCarousel";
import PatitasTimeline from "../components/PatitasTimeline";
import PatitasFormModal from "../components/PatitasFormModal";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { MessageSquare, MapPin, Search, Calendar, HeartHandshake, ShieldCheck, Phone } from "lucide-react";

export default function PatitasLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState("ciudadano");
  const [wpNumber, setWpNumber] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("patitas_config").select("whatsapp_number").eq("id", 1).single().then(({ data }) => {
      if (data?.whatsapp_number) setWpNumber(data.whatsapp_number);
    });
  }, []);

  const openForm = (role: string) => {
    setModalRole(role);
    setModalOpen(true);
  };

  const handleWhatsapp = () => {
    if (wpNumber) {
      window.open(`https://wa.me/${wpNumber}?text=Hola,%20quiero%20saber%20m%C3%A1s%20sobre%20Patitas%20en%20Alerta`, "_blank");
    }
  };

  return (
    <main id="top" className="bg-[#F8FAFC] text-slate-900 min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 pb-24">
      {/* 1. Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 px-6 flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto z-10">
        <div className="flex-1 w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10">
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <img src="/logopatitas.png" alt="Patitas en Alerta Logo" className="h-16 w-auto object-contain" />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[13px] font-semibold text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Un proyecto impulsado por Nodexa
            </span>
          </div>
          <h1 className="font-display text-[42px] leading-[1.05] tracking-tight font-bold md:text-[64px] lg:text-[72px] text-slate-900">
            Tecnología para conectar a la <br className="hidden lg:block" />
            <span className="text-blue-600">comunidad animal.</span>
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-slate-600 max-w-[48ch]">
            La primera plataforma digital gratuita diseñada para unir a ciudadanos, ONGs, veterinarios y municipios en Coronel Pringles y la región.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => openForm("ciudadano")}
              className="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-blue-600 text-white text-[15px] font-bold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-105"
            >
              Unite a la Lista de Espera →
            </button>
            <a
              href="#actores"
              className="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-white border border-slate-200 text-slate-700 text-[15px] font-bold shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              Quiero colaborar
            </a>
            {wpNumber && (
              <button
                onClick={handleWhatsapp}
                className="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-6 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#128C7E] text-[15px] font-bold transition-all hover:bg-[#25D366]/20"
              >
                <Phone size={18} className="mr-2" />
                Contactar al equipo
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end z-10 relative">
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-blue-100/50 rounded-full blur-[100px] -z-10" />
          <PatitasHeroCarousel />
        </div>
      </section>

      {/* 2. Contexto */}
      <section className="py-24 px-6 bg-white border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Un problema fragmentado</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Nuestra región enfrenta problemáticas graves de bienestar animal que requieren una solución unificada.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
              <Search className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Mascotas Perdidas</h3>
              <p className="text-slate-600 text-sm">Cientos de alertas dispersas en redes sociales sin un mapa centralizado que permita una respuesta rápida.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
              <ShieldCheck className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Historiales Médicos</h3>
              <p className="text-slate-600 text-sm">Libretas sanitarias de papel que se pierden, dejando a los veterinarios sin información crucial.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
              <HeartHandshake className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-slate-900">ONGs Colapsadas</h3>
              <p className="text-slate-600 text-sm">Rescatistas organizando adopciones de manera manual sin herramientas digitales eficientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Timeline */}
      <PatitasTimeline />

      {/* 4. Actores (Juntos hacemos la diferencia - Estilo Lovable UI) */}
      <section id="actores" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              <HeartHandshake size={16} /> Red de Colaboradores
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Juntos hacemos <br className="hidden md:block"/> la diferencia</h2>
            <p className="text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Patitas en Alerta es posible gracias a personas, organizaciones y empresas que creen en un mismo objetivo: un mundo más seguro para todos los animales. Los aliados aparecerán en el Muro de la Comunidad.
            </p>
          </div>
          {/* We can put a representative image here if we want, or leave it clean */}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <span className="font-bold text-xl">&lt;/&gt;</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Desarrolladores <br/> y Diseñadores</h3>
            <p className="text-slate-600 text-sm flex-1 mb-6">Sumá tu talento para pensar la arquitectura, herramientas o nuevas funcionalidades.</p>
            <button onClick={() => openForm("dev")} className="w-full py-2.5 rounded-full bg-blue-600 text-white font-semibold transition-colors hover:bg-blue-700">
              Quiero colaborar →
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <HeartHandshake size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">ONGs y <br/> Veterinarios</h3>
            <p className="text-slate-600 text-sm flex-1 mb-6">Contanos tu dolor diario para adaptar la app y sumá tu clínica al ecosistema local.</p>
            <button onClick={() => openForm("veterinario")} className="w-full py-2.5 rounded-full bg-white border border-green-600 text-green-600 font-semibold transition-colors hover:bg-green-50">
              Quiero ser aliado →
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Municipios y <br/> Comercios</h3>
            <p className="text-slate-600 text-sm flex-1 mb-6">Llevá el sistema a tu localidad o registrá tu negocio pet-friendly en el mapa.</p>
            <button onClick={() => openForm("municipio")} className="w-full py-2.5 rounded-full bg-white border border-purple-600 text-purple-600 font-semibold transition-colors hover:bg-purple-50">
              Quiero sumar →
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Ciudadanos</h3>
            <p className="text-slate-600 text-sm flex-1 mb-6">Enterate antes que nadie del lanzamiento oficial para registrar a tus mascotas.</p>
            <button onClick={() => openForm("ciudadano")} className="w-full py-2.5 rounded-full bg-white border border-orange-500 text-orange-600 font-semibold transition-colors hover:bg-orange-50">
              Lista de espera →
            </button>
          </div>
        </div>

        {/* Banner Inferior */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-blue-400">
              <HeartHandshake size={48} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Cada aporte cuenta</h4>
              <p className="text-slate-600 text-sm">Tu colaboración nos acerca a una plataforma más completa, accesible y útil para toda la comunidad.</p>
            </div>
          </div>
          <button onClick={() => openForm("ciudadano")} className="shrink-0 px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
            Sumate a la red →
          </button>
        </div>
      </section>

      {/* 5. Cierre Cross-Promo */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center relative z-10 border-t border-slate-200 mt-20">
        <h3 className="text-2xl font-bold mb-4 text-slate-900">Construido con tecnología Nodexa</h3>
        <p className="text-slate-600 mb-8">
          Patitas en Alerta es un proyecto pro-bono desarrollado con la infraestructura y los estándares de calidad de Nodexa. Si buscás este nivel de ingeniería para tu empresa, podemos ayudarte.
        </p>
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
          Conocé nuestras soluciones comerciales →
        </Link>
      </section>

      <PatitasFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultRole={modalRole} />
    </main>
  );
}
