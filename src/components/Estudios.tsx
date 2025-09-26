export default function Estudios() {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {[
          {
            logo: "/Enet.svg",
            title: "Tecnicatura en electromecánica",
            institution: "Escuela Técnica N°1 de Coronel Pringles",
            period: "2012 - 2018",
            status: "Completado"
          },
          {
            logo: "/utn.svg", 
            title: "Tecnicatura en programación",
            institution: "Universidad Tecnológica Nacional",
            period: "2024 - Actualidad",
            status: "En curso"
          },
          {
            logo: "/s21.svg",
            title: "Administración de empresas", 
            institution: "Universidad Siglo 21",
            period: "2022 - Actualidad",
            status: "En curso"
          }
        ].map((estudio, index) => (
          <div 
            key={index}
            className="bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={estudio.logo} 
                  alt={`Logo ${estudio.institution}`} 
                  className="w-16 h-16 object-contain"
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
                  className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-lg font-light hidden"
                >
                  {estudio.institution.split(' ').map(word => word[0]).join('')}
                </div>
              </div>
              
              {/* Información */}
              <div className="flex-1">
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  {estudio.title}
                </h3>
                <p className="text-lg text-gray-600 font-light mb-3">
                  {estudio.institution}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 font-light">
                    {estudio.period}
                  </span>
                  <span className={`text-sm font-light ${
                    estudio.status === 'En curso' 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                  }`}>
                    {estudio.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}