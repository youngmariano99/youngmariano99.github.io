export default function Contacto() {
  return (
    <section
      id="contacto"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 flex flex-col items-center min-h-screen"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-400/3 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-4xl w-full text-center relative z-10 px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 relative inline-block">
          Contacto
          <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-red-400 rounded-full"></span>
        </h2>
        
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          ¿Tienes un proyecto en mente? Hablemos. Estoy siempre abierto a nuevas oportunidades y colaboraciones.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
          {/* Formulario */}
          <div className="flex-1">
            <form
              action="https://formspree.io/f/xgvojgke"
              method="POST"
              className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold mb-3 text-left text-red-400">
                    Tu email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="tu.email@ejemplo.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-semibold mb-3 text-left text-red-400">
                    Tu mensaje:
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Hola, me gustaría contactarte acerca de..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 placeholder-gray-400 resize-vertical"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    Enviar Mensaje
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="flex-1">
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 h-full">
              <h3 className="text-2xl font-bold mb-6 text-red-400">Otras formas de contactarme</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="bg-red-400/10 p-3 rounded-full">
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">marianoyoung@ejemplo.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="bg-red-400/10 p-3 rounded-full">
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.366 10.682c0 4.316-3.302 7.318-7.366 7.318s-7.366-3.002-7.366-7.318 3.302-7.318 7.366-7.318 7.366 3.002 7.366 7.318zm-7.366-5.682c-3.086 0-5.366 2.28-5.366 5.682s2.28 5.682 5.366 5.682 5.366-2.28 5.366-5.682-2.28-5.682-5.366-5.682zm0 9.5c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">LinkedIn</p>
                    <p className="text-gray-300">linkedin.com/in/marianoyoung</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="bg-red-400/10 p-3 rounded-full">
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">GitHub</p>
                    <p className="text-gray-300">github.com/marianoyoung</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-700/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="text-red-400 font-semibold">Nota:</span> Generalmente respondo en menos de 24 horas. 
                  ¡No dudes en contactarme para cualquier consulta!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}