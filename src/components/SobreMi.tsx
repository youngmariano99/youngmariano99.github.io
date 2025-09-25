import TecnologiasDinamicas from "../features/tecnologias/componentes/TecnologiasDinamicas";

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="bg-gray-900 text-white py-20 flex justify-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-8 h-auto">
        
        <div className="flex flex-col space-y-16 justify-center h-full">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center h-[350px]">
            <h2 className="text-4xl font-bold mb-3">Sobre mí</h2>
            <p className="text-lg">
              Tengo 25 años y soy de Argentina.
              Actualmente estudio programación, me gustan los deportes y
              aprender cosas nuevas.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center h-[350px]">
            <h2 className="text-4xl font-bold">En programación...</h2>
            <p className="text-lg">
              Me gusta ir experimentando y aprender nuevos lenguajes, con
              preferencia por el backend y los datos.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center min-h-[300px]">
          <h2 className="text-4xl font-bold mb-3">Mis Habilidades</h2>
          <div className="text-center text-xl">
            <TecnologiasDinamicas />
          </div>
        </div>

        
      </div>
    </section>
  );
}
