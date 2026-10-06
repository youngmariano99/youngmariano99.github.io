import { Search, Database, ShieldCheck, HeartHandshake, Lightbulb, Rocket, Target, Users } from "lucide-react";

export default function PatitasAbout() {
  return (
    <section className="py-24 px-6 relative z-10 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* Origen y Propósito */}
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-2">
            <Lightbulb size={24} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">¿Cómo nació la idea?</h2>
          <div className="prose prose-slate max-w-none text-slate-600 text-[17px] leading-relaxed space-y-4">
            <p>
              Todo empezó observando un problema repetitivo en nuestra comunidad: calles con mascotas perdidas, dueños que no saben dónde dejaron la libreta sanitaria de papel, y refugios (ONGs) colapsados haciendo un trabajo gigante pero sin herramientas tecnológicas que los respalden.
            </p>
            <p>
              A esto se le sumaba que los Municipios a veces organizan campañas de vacunación a ciegas, sin saber en qué barrios hay más urgencia, porque la información está dispersa en grupos de Facebook o de WhatsApp.
            </p>
            <p className="font-semibold text-slate-900">
              El Propósito: No queríamos hacer "una app más de perros perdidos". Queríamos construir un Ecosistema que una a los 4 pilares fundamentales (Dueños, Estado, Veterinarios y ONGs) para que la información circule rápido, seguro y salve vidas.
            </p>
          </div>
        </div>

        {/* Soluciones Actuales */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-2">
              <Target size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Lo que resuelve HOY (MVP)</h2>
            <p className="text-[17px] text-slate-600">
              Actualmente ya tenemos implementadas las bases tecnológicas funcionales del proyecto para empezar a cambiar las cosas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border bg-emerald-50 border-emerald-100">
              <Search className="w-6 h-6 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ciudadanos</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Libreta sanitaria digital 100% en el celular. Se acabaron los papeles perdidos. Además, un sistema de reportes geolocalizados de extravíos para alertar a la zona al instante.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-purple-50 border-purple-100">
              <Database className="w-6 h-6 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Municipios</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Un tablero de control que recolecta los reportes ciudadanos para saber exactamente dónde hay focos de problemas, permitiendo dirigir las campañas de castración o vacunación con datos reales.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-blue-50 border-blue-100">
              <ShieldCheck className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Veterinarios</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Firma electrónica de las libretas sanitarias digitales. Los datos tienen validez clínica, e incluye un motor de turnos básico para organizar a los pacientes que vienen de campañas.
              </p>
            </div>
          </div>
        </div>

        {/* El Futuro */}
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-2">
            <Rocket size={24} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Lo que se viene (A Futuro)</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
            <p className="text-[17px] text-slate-600">
              Nuestra hoja de ruta es muy ambiciosa. La arquitectura del sistema ya está preparada para escalar hacia:
            </p>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <HeartHandshake className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Red de Colaboración para ONGs</strong>
                  <span className="text-slate-600 text-sm">Herramientas específicas para que los rescatistas soliciten donaciones, hogares de tránsito y asistencia veterinaria de forma ordenada, evitando el caos de los grupos de redes sociales.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Algoritmo Inteligente de Adopción</strong>
                  <span className="text-slate-600 text-sm">El diferencial más grande: usar Inteligencia Artificial para emparejar el perfil de la mascota con el estilo de vida del adoptante, reduciendo drásticamente la tasa de devoluciones.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Por qué necesitamos su ayuda */}
        <div className="space-y-6 bg-emerald-600 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <Users size={32} className="text-emerald-200 mb-4" />
            <h2 className="text-3xl font-bold mb-4">¿Por qué necesitamos que te sumes hoy?</h2>
            <p className="text-emerald-50 text-[17px] leading-relaxed mb-6">
              Nosotros sabemos de tecnología, pero <strong>vos sos quien está todos los días en la trinchera</strong>. Si sos veterinario, rescatista o un vecino comprometido, conocés los dolores reales que enfrentan los animales. 
            </p>
            <p className="text-emerald-50 text-[17px] leading-relaxed mb-8">
              Llenar el formulario no es solo anotarse a una lista; es la puerta para que nos contactemos directamente con vos. Vas a poder dejarnos un mensaje, sugerirnos funciones, y asegurar que cuando la app se lance, resuelva exactamente lo que necesitás.
            </p>
            <a 
              href="#unirme" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/patitas-en-alerta/unirme';
              }}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-colors shadow-lg shadow-black/10"
            >
              Completar el Formulario
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
