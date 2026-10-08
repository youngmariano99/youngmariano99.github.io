import { useState } from "react";
import { ChevronLeft, ChevronRight, Lightbulb, Search, Users, Database, ShieldCheck, Rocket, Target, Quote } from "lucide-react";

const SLIDES = [
  {
    id: "origen",
    title: "El origen",
    icon: <Lightbulb className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">¿Cómo nació la idea?</h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          Comenzamos observando un problema repetitivo: calles con mascotas perdidas, dueños sin sus libretas sanitarias, refugios colapsados sin herramientas y municipios gestionando turnos a ciegas.
        </p>
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-2xl mt-8">
          <p className="text-emerald-900 font-medium italic text-lg flex gap-3">
            <Quote className="shrink-0 text-emerald-600 opacity-50 mt-1" />
            Investigué la dimensión del problema, analicé soluciones, observé el contexto local y detecté la oportunidad de crear algo integral.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "datos",
    title: "Dimensión del problema",
    icon: <Search className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Una problemática profunda</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <p className="text-3xl font-black text-emerald-600 mb-1">8/10</p>
            <p className="text-slate-700 text-sm font-medium">hogares argentinos convive con mascotas.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <p className="text-3xl font-black text-emerald-600 mb-1">97%</p>
            <p className="text-slate-700 text-sm font-medium">de los dueños las considera familia.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <p className="text-3xl font-black text-emerald-600 mb-1">71%</p>
            <p className="text-slate-700 text-sm font-medium">de los perdidos se recuperan (mediana de 2 días).</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <p className="text-3xl font-black text-emerald-600 mb-1">+525M</p>
            <p className="text-slate-700 text-sm font-medium">de perros deambulan en el mundo.</p>
          </div>
        </div>
        <p className="text-slate-400 text-xs italic mt-2">Fuentes: Voices / Kantar, JAVMA, WOAH.</p>
      </div>
    ),
  },
  {
    id: "hallazgos",
    title: "Hallazgos locales",
    icon: <Target className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">Esfuerzos fragmentados</h3>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          La información y el esfuerzo se pierden al no estar conectados.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
            <strong className="text-emerald-700 block mb-1">Animales perdidos</strong>
            <span className="text-slate-600 text-sm">Dependen de la viralización orgánica, sin trazabilidad.</span>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
            <strong className="text-purple-700 block mb-1">Gestión pública</strong>
            <span className="text-slate-600 text-sm">Los turnos dependen de herramientas poco integradas.</span>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
            <strong className="text-rose-700 block mb-1">Rescate y ONGs</strong>
            <span className="text-slate-600 text-sm">Desgaste constante. 79% de estrés laboral en el rubro.</span>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
            <strong className="text-blue-700 block mb-1">Veterinarias</strong>
            <span className="text-slate-600 text-sm">Agendas descentralizadas e historial clínico no unificado.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "solucion",
    title: "El Ecosistema",
    icon: <Database className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-slate-900">La Solución Integral</h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          Cada actor encuentra una herramienta para actuar mejor.
        </p>
        <ul className="space-y-3">
          <li className="flex gap-4 p-3 bg-emerald-50 rounded-xl items-start">
            <Search className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">Ciudadanos</strong>
              <span className="text-sm text-slate-700">Libreta sanitaria digital y reportes geolocalizados.</span>
            </div>
          </li>
          <li className="flex gap-4 p-3 bg-purple-50 rounded-xl items-start">
            <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">Municipios y Veterinarios</strong>
              <span className="text-sm text-slate-700">Tablero de calor municipal y firma electrónica clínica.</span>
            </div>
          </li>
          <li className="flex gap-4 p-3 bg-rose-50 rounded-xl items-start">
            <Rocket className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">A Futuro</strong>
              <span className="text-sm text-slate-700">Algoritmo IA para emparejar perfiles (adopción). Red para ONGs.</span>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "cta",
    title: "Sumate",
    icon: <Users className="w-6 h-6" />,
    content: (
      <div className="flex flex-col items-center justify-center text-center space-y-6 h-full py-4">
        <Users className="w-16 h-16 text-emerald-600 mb-2" />
        <h3 className="text-3xl font-bold text-slate-900">Transformemos juntos</h3>
        <p className="text-lg text-slate-600 max-w-sm mx-auto">
          Sos quien está todos los días en la trinchera. Necesitamos tu experiencia para que el sistema resuelva lo que realmente necesitás.
        </p>
        <a 
          href="#unirme" 
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/patitas-en-alerta/unirme';
          }}
          className="mt-4 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
        >
          Completar el Formulario
        </a>
      </div>
    ),
  },
];

export default function PatitasProjectCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((p) => (p + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="py-20 px-4 md:px-6 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            ¿Qué es <span className="text-emerald-600">Patitas en Alerta</span>?
          </h2>
          <p className="text-lg text-slate-600">
            Conocé la historia, los datos y el ecosistema completo detrás de esta solución integral.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[480px]">
          
          {/* Menú Lateral (Tabs) */}
          <div className="md:w-1/3 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto snap-x hide-scrollbar">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrent(idx)}
                className={`snap-start shrink-0 flex items-center gap-3 p-3 md:p-4 rounded-xl text-left transition-all duration-300 ${
                  current === idx 
                    ? "bg-white shadow-sm border-emerald-100 border text-emerald-900" 
                    : "hover:bg-slate-100/50 text-slate-500 border border-transparent"
                }`}
              >
                <div className={`shrink-0 ${current === idx ? "text-emerald-600" : "opacity-60"}`}>
                  {slide.icon}
                </div>
                <span className={`font-semibold whitespace-nowrap md:whitespace-normal ${current === idx ? "text-slate-900" : ""}`}>
                  {slide.title}
                </span>
              </button>
            ))}
          </div>

          {/* Área de Contenido */}
          <div className="md:w-2/3 p-6 md:p-10 relative flex flex-col justify-center bg-white">
            <div 
              className="transition-all duration-500 ease-out animate-in fade-in slide-in-from-right-2"
              key={current} 
            >
              {SLIDES[current].content}
            </div>

            {/* Controles */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
