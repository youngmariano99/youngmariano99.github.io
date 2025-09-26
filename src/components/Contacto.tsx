export default function Contacto() {
  return (
    <section className="max-w-6xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-20" data-aos="fade-up">
        <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
          <span className="text-sm text-gray-500 font-light tracking-widest uppercase">
            Contacto
          </span>
        </div>
        <h2 className="text-6xl md:text-8xl font-light text-white mb-8 leading-none tracking-tight" data-aos="fade-up" data-aos-delay="400">
          Hablemos
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12" data-aos="fade-up" data-aos-delay="600"></div>
        <p className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="800">
          ¿Tienes un proyecto en mente? Estoy siempre abierto a nuevas oportunidades y colaboraciones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Formulario */}
        <div data-aos="fade-right" data-aos-delay="1000">
          <form
            action="https://formspree.io/f/xgvojgke"
            method="POST"
            className="bg-white p-12 shadow-sm border border-gray-100"
          >
            <div className="space-y-8">
              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-3">
                  Tu email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="tu.email@ejemplo.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300 placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-3">
                  Tu mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Hola, me gustaría contactarte acerca de..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300 placeholder-gray-400 resize-vertical"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-8 py-4 font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>

        {/* Información de contacto */}
        <div className="space-y-8" data-aos="fade-left" data-aos-delay="1200">
          <div>
            <h3 className="text-2xl font-light text-white mb-8">Otras formas de contactarme</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-light text-white">Email</p>
                  <p className="text-gray-300 font-light">youngmariano99@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.366 10.682c0 4.316-3.302 7.318-7.366 7.318s-7.366-3.002-7.366-7.318 3.302-7.318 7.366-7.318 7.366 3.002 7.366 7.318zm-7.366-5.682c-3.086 0-5.366 2.28-5.366 5.682s2.28 5.682 5.366 5.682 5.366-2.28 5.366-5.682-2.28-5.682-5.366-5.682zm0 9.5c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-light text-white">LinkedIn</p>
                  <p className="text-gray-300 font-light">linkedin.com/in/marianoyoung</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-light text-white">GitHub</p>
                  <p className="text-gray-300 font-light">github.com/marianoyoung</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-gray-300 font-light">
                <span className="text-white font-medium">Nota:</span> Generalmente respondo en menos de 24 horas. 
                ¡No dudes en contactarme para cualquier consulta!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}