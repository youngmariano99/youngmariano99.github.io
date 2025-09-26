import TecnologiasDinamicas from "../features/tecnologias/componentes/TecnologiasDinamicas";

export default function SobreMi() {
  return (
    <section className="max-w-6xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-20" data-aos="fade-up" data-aos-duration="600">
        <div className="mb-8" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">
          <span className="text-sm text-gray-500 font-light tracking-widest uppercase">
            Sobre Mí
          </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-none tracking-tight" data-aos="fade-up" data-aos-delay="200" data-aos-duration="600">
          Mi Historia
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="500"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Columna izquierda */}
        <div className="space-y-12">
          <div className="bg-white p-12 shadow-sm border border-gray-100" data-aos="fade-right" data-aos-delay="400" data-aos-duration="500">
            <h3 className="text-2xl font-light text-gray-900 mb-6">Sobre mí</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Tengo 25 años y soy de Argentina. Actualmente estudio programación, 
              me gustan los deportes y aprender cosas nuevas.
            </p>
          </div>

          <div className="bg-white p-12 shadow-sm border border-gray-100" data-aos="fade-right" data-aos-delay="500" data-aos-duration="500">
            <h3 className="text-2xl font-light text-gray-900 mb-6">En programación...</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Me gusta ir experimentando y aprender nuevos lenguajes, con
              preferencia por el backend y los datos.
            </p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="bg-white p-12 shadow-sm border border-gray-100" data-aos="fade-left" data-aos-delay="600" data-aos-duration="500">
          <h3 className="text-2xl font-light text-gray-900 mb-8">Mis Habilidades Técnicas</h3>
          <div className="text-center">
            <TecnologiasDinamicas />
          </div>
        </div>
      </div>
    </section>
  );
}
