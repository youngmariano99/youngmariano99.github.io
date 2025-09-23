export default function Estudios() {
  return (
    <section
      id="estudios"
      className="bg-gray-900 text-white py-16 flex flex-col items-center"
    >
      <h2 className="text-5xl font-bold mb-8">Estudios</h2>
      <div className="flex flex-col gap-8 max-w-4xl w-full">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <img src="/public/Enet.svg" className="w-12 h-12" />
          <p className="text-lg">
            Tecnicatura en electromecánica | Escuela Técnica N°1 de Coronel
            Pringles
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <img src="/public/utn.svg" className="w-12 h-12" />
          <p className="text-lg">
            Tecnicatura en programación | Universidad Tecnológica Nacional.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <img src="/public/s21.svg" className="w-12 h-12" />
          <p className="text-lg">
            Administración de empresas | Universidad Siglo 21.
          </p>
        </div>
      </div>
    </section>
  );
}
