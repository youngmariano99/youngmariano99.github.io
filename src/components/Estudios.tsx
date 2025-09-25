export default function Estudios() {
  return (
    <section
      id="estudios"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 flex flex-col items-center min-h-screen"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl w-full text-center relative z-10 px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 relative inline-block">
          Estudios
          <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-blue-400 rounded-full"></span>
        </h2>
        
        <div className="flex flex-col gap-6 max-w-4xl w-full">
          {[
            {
              logo: "/public/Enet.svg",
              title: "Tecnicatura en electromecánica",
              institution: "Escuela Técnica N°1 de Coronel Pringles",
              period: "2015 - 2020",
              color: "blue"
            },
            {
              logo: "/public/utn.svg", 
              title: "Tecnicatura en programación",
              institution: "Universidad Tecnológica Nacional",
              period: "2021 - Actualidad",
              color: "orange"
            },
            {
              logo: "/public/s21.svg",
              title: "Administración de empresas", 
              institution: "Universidad Siglo 21",
              period: "2023 - Actualidad",
              color: "green"
            }
          ].map((estudio, index) => (
            <div 
              key={index}
              className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Logo */}
                <div className="flex-shrink-0 bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                  <img 
                    src={estudio.logo} 
                    alt={`Logo ${estudio.institution}`} 
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div 
                    className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center text-xl font-bold hidden"
                  >
                    {estudio.institution.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>
                
                {/* Información */}
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold text-blue-400 mb-1">
                    {estudio.title}
                  </h3>
                  <p className="text-lg text-gray-200 mb-2">
                    {estudio.institution}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-sm font-medium bg-blue-400/10 px-2 py-1 rounded">
                      {estudio.period}
                    </span>
                  </div>
                </div>
                
                {/* Indicador de estado */}
                <div className={`flex-shrink-0 ${
                  estudio.period.includes('Actualidad') 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-gray-400/20 text-gray-400'
                } px-3 py-1 rounded-full text-sm font-medium`}>
                  {estudio.period.includes('Actualidad') ? 'En curso' : 'Completado'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Información adicional */}
        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 text-lg">
            Mi formación académica combina <span className="text-blue-400 font-semibold">técnica</span>, 
            <span className="text-orange-400 font-semibold"> programación</span> y 
            <span className="text-green-400 font-semibold"> gestión empresarial</span>, 
            proporcionándome una visión integral para abordar proyectos complejos.
          </p>
        </div>
      </div>
    </section>
  );
}