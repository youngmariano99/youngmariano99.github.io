import { useState } from "react";
import Proyectos from "../models/proyectos.models.ts";



const ProyectosSection = () => {
  const [mostrarProyectos, setMostrarProyectos] = useState(false);

  return (
    <section className="w-full px-6 py-10 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Botón */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setMostrarProyectos(!mostrarProyectos)}
            className="bg-blue-500 hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            {mostrarProyectos ? 'Ocultar proyectos' : 'Mostrar proyectos'}
          </button>
        </div>

        {/* Proyectos */}
        {mostrarProyectos && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Proyectos.map((proyecto, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={proyecto.imagen}
                  alt={proyecto.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{proyecto.nombre}</h3>
                  <p className="text-sm mb-4">{proyecto.descripcion}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.lenguajes.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proyecto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline text-sm"
                  >
                    Ver Proyecto
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProyectosSection;