export default function HabilidadesPersonales() {
  return (
    <section className="max-w-6xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-20" data-aos="fade-up">
        <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
          <span className="text-sm text-gray-500 font-light tracking-widest uppercase">
            Habilidades
          </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-none tracking-tight" data-aos="fade-up" data-aos-delay="400">
          Habilidades Personales
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12" data-aos="fade-up" data-aos-delay="600"></div>
      </div>

      {/* Descripción */}
      <div className="text-center mb-16" data-aos="fade-up" data-aos-delay="800">
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
          Me considero una persona <span className="font-medium text-gray-900">organizada</span> y{" "}
          <span className="font-medium text-gray-900">responsable</span>, capaz de trabajar en equipo, 
          adaptarme a diferentes contextos y con muchas ganas de seguir aprendiendo.
        </p>
      </div>
      
      {/* Tarjetas de habilidades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Trabajo en equipo", desc: "Colaboración efectiva en grupos" },
          { title: "Adaptabilidad", desc: "Ajuste rápido a cambios" },
          { title: "Aprendizaje continuo", desc: "Actualización constante" },
          { title: "Comunicación", desc: "Expresión clara y efectiva" },
          { title: "Resolución de problemas", desc: "Análisis y solución creativa" },
          { title: "Proactividad", desc: "Iniciativa y anticipación" }
        ].map((skill, index) => (
          <div 
            key={index}
            className="bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={200 + (index * 100)}
          >
            {/* <div className="text-4xl mb-4">{skill.icon}</div> */}
            <h3 className="text-xl font-light text-gray-900 mb-3">{skill.title}</h3>
            <p className="text-gray-600 font-light">{skill.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}