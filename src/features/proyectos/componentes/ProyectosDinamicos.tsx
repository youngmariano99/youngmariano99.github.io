import { useState, useEffect } from 'react';
import Proyectos from "../models/proyectos.models.ts";

const ProyectosSection = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [filteredProyectos, setFilteredProyectos] = useState(Proyectos);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className="w-full px-6 py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con animación */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Portfolio
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explorá mi colección de proyectos donde la creatividad se encuentra con la funcionalidad
          </p>
        </div>

        {/* Filtros interactivos */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-6 py-3 rounded-full border transition-all duration-300 ${
              activeFilter === 'todos' 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-gray-400 border-gray-600 hover:border-white hover:text-white'
            }`}
          >
            Todos
          </button>
          {allTechnologies.map((tech, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(tech)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                activeFilter === tech 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-gray-400 border-gray-600 hover:border-white hover:text-white'
            }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Grid de proyectos con animación escalonada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProyectos.map((proyecto, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-gray-900 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Imagen con overlay */}
              <div className="relative overflow-hidden h-80">
                <img
                  src={proyecto.imagen}
                  alt={proyecto.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                
                {/* Información overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-2">{proyecto.nombre}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{proyecto.descripcion}</p>
                  
                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.lenguajes.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-white bg-opacity-20 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {proyecto.lenguajes.length > 3 && (
                      <span className="bg-white bg-opacity-20 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                        +{proyecto.lenguajes.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botón de acción */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={proyecto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2"
                  >
                    Ver Proyecto
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contenido adicional al hacer hover */}
              <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Proyecto destacado</span>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contador de proyectos */}
        <div className="text-center mt-16 border-t border-gray-800 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{Proyectos.length}</div>
              <div className="text-gray-400 text-sm">Proyectos Totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{allTechnologies.length}</div>
              <div className="text-gray-400 text-sm">Tecnologías</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400 text-sm">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Disponible</div>
            </div>
          </div>
        </div>

        {/* CTA final mejorado */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 border border-gray-800">
            <h3 className="text-3xl font-bold mb-4">¿Listo para comenzar tu próximo proyecto?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Trabajemos juntos para crear algo extraordinario. Contáctame y hablemos sobre tus ideas.
            </p>
            <a 
              href="#contacto" 
              className="inline-flex items-center bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Iniciar Conversación
              <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProyectosSection;