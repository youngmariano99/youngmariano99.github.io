export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 shadow-md transition-all duration-500 z-50">
      <div className="container mx-auto flex justify-between items-center px-8">
        <a className="text-2xl font-bold" href="#">Portfolio</a>
        <button className="lg:hidden text-white text-3xl">&#9776;</button>
        <ul className="hidden lg:flex space-x-6">
          <li><a className="hover:text-yellow-500 transition-all" href="#sobre-mi">Sobre mí</a></li>
          <li><a className="hover:text-yellow-500 transition-all" href="#proyectos">Proyectos</a></li>
          <li><a className="hover:text-yellow-500 transition-all" href="#estudios">Estudios</a></li>
          <li><a className="hover:text-yellow-500 transition-all" href="#contacto">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
}
