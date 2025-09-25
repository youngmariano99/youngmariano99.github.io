export default function HabilidadesPersonales() {
  return (
    <section
      id="Habilidades-personales"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center items-center min-h-screen"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl w-full text-center relative z-10 mt-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 relative inline-block">
          Habilidades Personales
          <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-yellow-400 rounded-full"></span>
        </h2>

        <div className="bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 text-base sm:text-lg leading-relaxed mb-8">
          <p className="text-lg">
            Me considero una persona{" "}
            <span className="text-yellow-400 font-semibold">organizada</span> y{" "}
            <span className="text-yellow-400 font-semibold">responsable</span>, capaz de trabajar en equipo, adaptarme a diferentes contextos y con muchas ganas de seguir aprendiendo y tener nuevas experiencias en el ámbito profesional.
          </p>
        </div>
        
        {/* Tarjetas de habilidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {[
            { title: "Trabajo en equipo", icon: "👥", desc: "Colaboración efectiva en grupos" },
            { title: "Adaptabilidad", icon: "🔄", desc: "Ajuste rápido a cambios" },
            { title: "Aprendizaje continuo", icon: "📚", desc: "Actualización constante" },
            { title: "Comunicación", icon: "💬", desc: "Expresión clara y efectiva" },
            { title: "Resolución de problemas", icon: "💡", desc: "Análisis y solución creativa" },
            { title: "Proactividad", icon: "⚡", desc: "Iniciativa y anticipación" }
          ].map((skill, index) => (
            <div 
              key={index}
              className="bg-gray-800/70 backdrop-blur-sm p-5 rounded-lg border border-gray-700 hover:border-yellow-400/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-3xl mb-3">{skill.icon}</div>
              <h3 className="font-semibold text-yellow-400 text-lg mb-2">{skill.title}</h3>
              <p className="text-gray-300 text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}