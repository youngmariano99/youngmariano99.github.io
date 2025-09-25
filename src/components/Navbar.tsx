import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <NavLink to="/" className="text-2xl font-bold">Portfolio</NavLink>

        {/* Botón hamburguesa */}
        <button
          className="lg:hidden text-white text-3xl focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Menú en desktop */}
        <ul className="hidden lg:flex space-x-6">
          <li><a className="hover:text-yellow-500 transition-all" href="#sobre-mi">Sobre mí</a></li>
          <li><a className="hover:text-yellow-500 transition-all" href="#proyectos">Proyectos</a></li>
          <li><a className="hover:text-yellow-500 transition-all" href="#estudios">Estudios</a></li>
          <li><a className="hover:text-yellow-500 transition-all" href="#contacto">Contacto</a></li>
        </ul>
      </div>

      {/* Menú desplegable en mobile */}
      {isOpen && (
        <ul className="lg:hidden bg-gray-800 px-6 py-4 space-y-4">
          <li><a className="block hover:text-yellow-500 transition-all" href="#sobre-mi">Sobre mí</a></li>
          <li><a className="block hover:text-yellow-500 transition-all" href="#proyectos">Proyectos</a></li>
          <li><a className="block hover:text-yellow-500 transition-all" href="#estudios">Estudios</a></li>
          <li><NavLink to="/contacto" className="block hover:text-yellow-500 transition-all" >Contacto</NavLink></li>
        </ul>
      )}
    </nav>
  );
}
