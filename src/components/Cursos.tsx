export default function Cursos() {
  const cursos = [
    {
      titulo: "Curso Python Profesional",
      plataforma: "Código Facilito",
      enlace: "https://codigofacilito.com/cursos/python-profesional",
      icono: "/public/icons8-python.svg",
      color: "yellow",
      descripcion: "Programación avanzada en Python, patrones de diseño y mejores prácticas",
      duracion: "40 horas"
    },
    {
      titulo: "Curso Profesional de Base de Datos",
      plataforma: "Código Facilito", 
      enlace: "https://codigofacilito.com/cursos/base-datos-profesional",
      icono: "/public/icons8-mysql.svg",
      color: "blue",
      descripcion: "Diseño y administración de bases de datos relacionales",
      duracion: "35 horas"
    },
    {
      titulo: "Desarrollo de aplicaciones con React y ASP.NET Core",
      plataforma: "Udemy",
      enlace: "https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core-v2/",
      iconos: ["/public/React-icon.png", "/public/NET_Core_Logo.png"],
      color: "purple",
      descripcion: "Desarrollo fullstack con tecnologías modernas",
      duracion: "45 horas"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: "text-yellow-400 border-yellow-400/20 hover:border-yellow-400/40",
      blue: "text-blue-400 border-blue-400/20 hover:border-blue-400/40", 
      purple: "text-purple-400 border-purple-400/20 hover:border-purple-400/40"
    };
    return colors[color as keyof typeof colors] || colors.yellow;
  };

  return (
    <section
      id="Cursos-Certificaciones"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 flex flex-col items-center min-h-screen"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl w-full text-center relative z-10 px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 relative inline-block">
          Cursos y Certificaciones
          <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-green-400 rounded-full"></span>
        </h2>

        <div className="grid gap-6 max-w-4xl w-full">
          {cursos.map((curso, index) => (
            <a
              key={index}
              href={curso.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700 hover:transform hover:scale-[1.02] transition-all duration-300 ${getColorClasses(curso.color)}`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Iconos */}
                <div className="flex-shrink-0 flex items-center gap-3">
                  {curso.iconos ? (
                    <div className="flex gap-2">
                      {curso.iconos.map((icono, i) => (
                        <div key={i} className="bg-gray-700/50 p-2 rounded-lg border border-gray-600">
                          <img 
                            src={icono} 
                            alt={`Icono ${curso.titulo}`}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-700/50 p-2 rounded-lg border border-gray-600">
                      <img 
                        src={curso.icono} 
                        alt={`Icono ${curso.titulo}`}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold mb-1">
                    {curso.titulo}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    {curso.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                      {curso.plataforma}
                    </span>
                    <span className="text-gray-400 text-sm bg-gray-400/10 px-3 py-1 rounded-full">
                      {curso.duracion}
                    </span>
                  </div>
                </div>

                {/* Indicador de enlace externo */}
                <div className="flex-shrink-0 text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 text-lg">
            Formación continua en <span className="text-green-400 font-semibold">tecnologías modernas</span> y 
            <span className="text-green-400 font-semibold"> mejores prácticas</span> de desarrollo para mantenerme 
            actualizado en el ámbito tecnológico.
          </p>
        </div>
      </div>
    </section>
  );
}