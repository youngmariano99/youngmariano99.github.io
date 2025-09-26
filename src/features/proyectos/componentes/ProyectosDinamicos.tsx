import { useState, useEffect } from 'react';
import Proyectos from "../models/proyectos.models.ts";
import ImageModal from "../../../components/ImageModal";

const ProyectosSection = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [filteredProyectos, setFilteredProyectos] = useState(Proyectos);
  const [isVisible, setIsVisible] = useState(false);
  const [modalImage, setModalImage] = useState<{src: string, alt: string, name: string} | null>(null);

  // Obtener todas las tecnologías únicas para los filtros
  const allTechnologies = [...new Set(Proyectos.flatMap(proyecto => proyecto.lenguajes))];

  // Efecto para animación de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filtrar proyectos
  useEffect(() => {
    if (activeFilter === 'todos') {
      setFilteredProyectos(Proyectos);
    } else {
      setFilteredProyectos(Proyectos.filter(proyecto => 
        proyecto.lenguajes.includes(activeFilter)
      ));
    }
  }, [activeFilter]);

  // Funciones para manejar el modal
  const openModal = (src: string, alt: string, name: string) => {
    setModalImage({ src, alt, name });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <section className="w-full px-8 py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado minimalista */}
        <div className="text-center mb-24" data-aos="fade-up" data-aos-duration="600">
          <div className="mb-8" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">
            <span className="text-sm text-gray-500 font-light tracking-widest uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-none tracking-tight" data-aos="fade-up" data-aos-delay="200" data-aos-duration="600">
            Mis Proyectos
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="500"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light" data-aos="fade-up" data-aos-delay="400" data-aos-duration="600">
            Una selección de proyectos donde la creatividad se encuentra con la funcionalidad
          </p>
        </div>

        {/* Filtros minimalistas */}
        <div className="flex flex-wrap justify-center gap-2 mb-20" data-aos="fade-up" data-aos-delay="500" data-aos-duration="500">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-6 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
              activeFilter === 'todos' 
                ? 'text-gray-900 border-b border-gray-900' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Todos
          </button>
          {allTechnologies.map((tech, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(tech)}
              className={`px-6 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
                activeFilter === tech 
                  ? 'text-gray-900 border-b border-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Grid de proyectos tipo masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {filteredProyectos.map((proyecto, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white transition-all duration-500 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={100 + (index * 50)}
              data-aos-duration="500"
            >
              {/* Imagen principal */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={proyecto.imagen}
                  alt={proyecto.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => openModal(proyecto.imagen, proyecto.nombre, proyecto.nombre)}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                
                {/* Overlay de información */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => openModal(proyecto.imagen, proyecto.nombre, proyecto.nombre)}
                      className="bg-white text-gray-900 px-6 py-3 font-light tracking-wide hover:bg-gray-100 transition-colors duration-300"
                    >
                      Ver Imagen
                    </button>
                    <a
                      href={proyecto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-900 text-white px-6 py-3 font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
                    >
                      Ver Proyecto
                    </a>
                  </div>
                </div>
              </div>

              {/* Contenido del proyecto */}
              <div className="p-8">
                <h3 className="text-xl font-light text-gray-900 mb-3">{proyecto.nombre}</h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                  {proyecto.descripcion}
                </p>
                
                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2">
                  {proyecto.lenguajes.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-500 font-light tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                  {proyecto.lenguajes.length > 4 && (
                    <span className="text-xs text-gray-400 font-light">
                      +{proyecto.lenguajes.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas minimalistas */}
        <div className="text-center mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">{Proyectos.length}</div>
              <div className="text-gray-500 text-sm font-light tracking-wide">Proyectos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">{allTechnologies.length}</div>
              <div className="text-gray-500 text-sm font-light tracking-wide">Tecnologías</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">100%</div>
              <div className="text-gray-500 text-sm font-light tracking-wide">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">24/7</div>
              <div className="text-gray-500 text-sm font-light tracking-wide">Disponible</div>
            </div>
          </div>
        </div>

        {/* CTA final minimalista */}
        <div className="text-center">
          <div className="bg-gray-900 text-white p-16">
            <h3 className="text-3xl md:text-4xl font-light mb-6">¿Listo para comenzar tu próximo proyecto?</h3>
            <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Trabajemos juntos para crear algo extraordinario. Contáctame y hablemos sobre tus ideas.
            </p>
            <a 
              href="#contacto" 
              className="inline-block bg-white text-gray-900 px-12 py-4 font-light tracking-wide hover:bg-gray-100 transition-colors duration-300"
            >
              Iniciar Conversación
            </a>
          </div>
            </div>
          </div>

          {/* Modal de imagen */}
          {modalImage && (
            <ImageModal
              isOpen={!!modalImage}
              onClose={closeModal}
              imageSrc={modalImage.src}
              imageAlt={modalImage.alt}
              projectName={modalImage.name}
            />
          )}
        </section>
      );
    };

export default ProyectosSection;