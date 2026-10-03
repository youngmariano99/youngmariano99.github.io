import { MapPin, Search, Calendar, ShieldCheck, HeartHandshake, Database } from "lucide-react";

export default function PatitasAbout() {
  const features = [
    {
      title: "Ciudadanos y Dueños",
      description: "Llevá la libreta sanitaria digital siempre en tu celular y reportá mascotas perdidas con geolocalización instantánea.",
      icon: <Search className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "Municipios",
      description: "Tablero de datos en tiempo real para organizar operativos de castración y vacunación, basado en reportes reales de los vecinos.",
      icon: <Database className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "Veterinarios",
      description: "Agenda propia para turnos y firma electrónica de las libretas sanitarias, dando autoridad clínica a los datos.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-100",
    },
    {
      title: "ONGs y Rescatistas",
      description: "Herramientas integradas para visibilizar mascotas en adopción y solicitar ayuda puntual a la comunidad.",
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      color: "bg-rose-50 border-rose-100",
    },
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            ¿Qué es <span className="text-blue-600">Patitas en Alerta</span>?
          </h2>
          <p className="text-[17px] leading-relaxed text-slate-600">
            Es la primera plataforma integral diseñada para unir a todos los actores del bienestar animal en un solo lugar. 
            No es solo una app para encontrar perros perdidos; es un ecosistema donde la información fluye para simplificarle 
            la vida a todos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border ${feature.color} transition-transform hover:-translate-y-1 duration-300`}>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
