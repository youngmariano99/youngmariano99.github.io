import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ParallaxBackground from './ParallaxBackground';
import TypedText from './TypedText';
import { NavLink } from "react-router";

export default function Header() {
  const [mensajeBienvenida, setMensajeBienvenida] = useState("");

  useEffect(() => {
    // Inicializar AOS solo una vez
    if (!(window as any).AOS_INITIALIZED) {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: 'mobile'
      });
      (window as any).AOS_INITIALIZED = true;
    }

    const horaActual = new Date();
    const horas = horaActual.getHours();

    if (horas >= 6 && horas < 13) {
      setMensajeBienvenida("Buenos días");
    } else if (horas >= 13 && horas <= 20) {
      setMensajeBienvenida("Buenas tardes");
    } else {
      setMensajeBienvenida("Buenas noches");
    }
  }, []);

  const scrollToProyectos = () => {
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="min-h-screen flex items-center justify-center bg-white px-6 pt-20 relative overflow-hidden">
      {/* Elementos decorativos con parallax */}
      <ParallaxBackground />

      <section className="max-w-5xl mx-auto text-center relative z-10">
        {/* Saludo minimalista */}
        <div className="mb-12" data-aos="fade-up" data-aos-delay="200">
          <span className="text-lg text-gray-500 font-light tracking-wide">
            {mensajeBienvenida}, soy
          </span>
        </div>

        {/* Nombre con tipografía elegante */}
        <div className="mb-20" data-aos="fade-up" data-aos-delay="400">
          <NavLink to="/" className="text-7xl md:text-9xl font-light text-gray-900 mb-8 leading-none tracking-tight">
            Mariano Young
          </NavLink>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            <TypedText 
              strings={[
                "Desarrollador Backend especializado en crear soluciones eficientes y escalables",
                "Apasionado por la programación y el aprendizaje continuo",
                "Enfocado en crear aplicaciones robustas y performantes"
              ]}
              className="font-medium text-gray-900"
              delay={1000}
            />
          </p>
        </div>

        {/* Foto de perfil elegante */}
        <div className="flex justify-center mb-20" data-aos="zoom-in" data-aos-delay="600">
          <div className="relative group">
            <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
              <img
                src="/fotoPerfil.png"
                alt="Mariano Young"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>
          </div>
        </div>

        {/* CTA elegante */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20" data-aos="fade-up" data-aos-delay="800">
          <button
            onClick={scrollToProyectos}
            className="group relative px-12 py-4 bg-gray-900 text-white rounded-none font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">Ver mis proyectos</span>
            <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition duration-300"></div>
          </button>
          
          <div className="flex gap-6">
            <a
              href="https://github.com/youngmariano99"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <span className="font-medium text-sm tracking-wide">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mariano-young-016a0b23b/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <span className="font-medium text-sm tracking-wide">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator minimalista */}
        <div className="flex flex-col items-center gap-3" data-aos="fade-up" data-aos-delay="1000">
          <span className="text-xs text-gray-400 font-light tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gray-300"></div>
        </div>
      </section>
    </header>
  );
}