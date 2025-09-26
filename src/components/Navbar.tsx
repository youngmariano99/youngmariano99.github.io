import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Sobre mí", href: "#sobre-mi" },
    { name: "Habilidades", href: "#habilidades" },
    { name: "Formación", href: "#formacion" },
    { name: "Contacto", href: "#contacto" }
  ];

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'proyectos', 'sobre-mi', 'habilidades', 'formacion', 'contacto'];
      const scrollY = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl text-gray-900 py-6 shadow-sm border-b border-gray-100 z-50">
      <div className="container mx-auto flex justify-between items-center px-8">
        <a 
          href="#inicio" 
          onClick={(e) => {
            e.preventDefault();
            handleClick('#inicio');
          }}
          className="text-xl font-light text-gray-900 hover:text-gray-600 transition-colors duration-300"
        >
          Mariano Young
        </a>

        {/* Botón hamburguesa minimalista */}
        <button
          className="lg:hidden text-gray-900 focus:outline-none p-2 hover:bg-gray-50 transition-colors duration-300"
          onClick={toggleMenu}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>

        {/* Menú en desktop minimalista */}
        <ul className="hidden lg:flex space-x-8">
          {menuItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={`block py-2 text-sm font-light tracking-wide transition-all duration-300 relative ${
                    isActive 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Menú desplegable en mobile minimalista */}
      {isOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-lg">
          <ul className="px-8 py-6 space-y-4">
            {menuItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                    className={`block py-3 text-sm font-light tracking-wide transition-all duration-300 ${
                      isActive 
                        ? 'text-gray-900' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}