import { useEffect, useState } from "react";
import Header from "./Header";
import ProyectosDinamicos from "../features/proyectos/componentes/ProyectosDinamicos";
import SobreMi from "./SobreMi";
import HabilidadesPersonales from "./HabilidadesPersonales";
import Estudios from "./Estudios";
import Cursos from "./Cursos";
import Contacto from "./Contacto.tsx";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("inicio");

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
    <div className="scroll-smooth">
      {/* Sección Inicio */}
      <section id="inicio" className="min-h-screen">
        <Header />
      </section>

      {/* Sección Proyectos */}
      <section id="proyectos" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <ProyectosDinamicos />
        </div>
      </section>

      {/* Sección Sobre Mí */}
      <section id="sobre-mi" className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <SobreMi />
        </div>
      </section>

      {/* Sección Habilidades */}
      <section id="habilidades" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <HabilidadesPersonales />
        </div>
      </section>

      {/* Sección Formación */}
      <section id="formacion" className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="mb-8">
                <span className="text-sm text-gray-500 font-light tracking-widest uppercase">
                  Formación
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-none tracking-tight">
                Mi Formación
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Estudios */}
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-12">Estudios Formales</h3>
                <Estudios />
              </div>
              
              {/* Cursos */}
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-12">Cursos y Certificaciones</h3>
                <Cursos />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-8">
          <Contacto />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;