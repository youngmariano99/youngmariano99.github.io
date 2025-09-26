export default function Cursos() {
  const cursos = [
    {
      titulo: "Curso Python Profesional",
      plataforma: "Código Facilito",
      enlace: "https://codigofacilito.com/cursos/python-profesional",
      icono: "/icons8-python.svg",
      descripcion: "Programación avanzada en Python, patrones de diseño y mejores prácticas",
      duracion: "40 horas"
    },
    {
      titulo: "Curso Profesional de Base de Datos",
      plataforma: "Código Facilito", 
      enlace: "https://codigofacilito.com/cursos/base-datos-profesional",
      icono: "/icons8-mysql.svg",
      descripcion: "Diseño y administración de bases de datos relacionales",
      duracion: "35 horas"
    },
    {
      titulo: "Desarrollo de aplicaciones con React y ASP.NET Core",
      plataforma: "Udemy",
      enlace: "https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core-v2/",
      iconos: ["/React-icon.png", "/NET_Core_Logo.png"],
      descripcion: "Desarrollo fullstack con tecnologías modernas",
      duracion: "45 horas"
    }
  ];

  return (
    <section className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {cursos.map((curso, index) => (
          <a
            key={index}
            href={curso.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              {/* Iconos */}
              <div className="flex-shrink-0">
                {curso.iconos ? (
                  <div className="flex gap-3">
                    {curso.iconos.map((icono, i) => (
                      <div key={i} className="bg-gray-100 p-3 rounded">
                        <img 
                          src={icono} 
                          alt={`Icono ${curso.titulo}`}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 p-3 rounded">
                    <img 
                      src={curso.icono} 
                      alt={`Icono ${curso.titulo}`}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="flex-1">
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  {curso.titulo}
                </h3>
                <p className="text-lg text-gray-600 font-light mb-3">
                  {curso.descripcion}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 font-light">
                    {curso.plataforma}
                  </span>
                  <span className="text-sm text-gray-500 font-light">
                    {curso.duracion}
                  </span>
                </div>
              </div>

              {/* Indicador de enlace externo */}
              <div className="flex-shrink-0 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}