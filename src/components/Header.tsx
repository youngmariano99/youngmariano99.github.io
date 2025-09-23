export default function Header() {
  return (
    <header className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="max-w-4xl mx-auto px-6 text-center">
        {/* Nombre y título */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Mariano Young
          </h1>
          <p className="text-xl text-gray-300">
            Desarrollador Backend | Estudiante en programación
          </p>
        </div>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-10">
          <img
            src="/fotoPerfil.png"
            alt="Foto de perfil"
            className="w-48 h-48 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
          />
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/youngmariano99"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors shadow-md"
          >
            <span className="font-semibold">Github</span>
          </a>
          <a
            href="https://www.linkedin.com/in/mariano-young-016a0b23b/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
          >
            <span className="font-semibold">LinkedIn</span>
          </a>
        </div>
      </section>
    </header>
  );
}