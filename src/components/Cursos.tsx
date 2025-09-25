export default function Cursos() {
  return (
    <section
      id="Cursos-Certificaciones"
      className="bg-gray-900 text-white py-16 flex flex-col items-center"
    >
      <h2 className="text-5xl font-bold mb-8">Cursos y Certificaciones</h2>
      <div className="max-w-4xl w-full">
        <ul className="flex flex-col gap-6">
          <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
            <a
              href="https://codigofacilito.com/cursos/python-profesional"
              target="_blank"
              className="text-lg font-semibold flex items-center gap-4"
            >
              <img src="/public/icons8-python.svg" className="w-12 h-12" /> Curso
              Python Profesional
            </a>
          </li>
          <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
            <a
              href="https://codigofacilito.com/cursos/base-datos-profesional"
              target="_blank"
              className="text-lg font-semibold flex items-center gap-4"
            >
              <img src="/public/icons8-mysql.svg" className="w-12 h-12" /> Curso
              Profesional de Base de Datos
            </a>
          </li>
          <li className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
            <a
              href="https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core-v2/?couponCode=MT250923G1"
              target="_blank"
              className="text-lg font-semibold flex items-center gap-4"
            >
              <img src="/public/React-icon.png" className="w-12 h-12" /> Desarrollo de aplicaciones con react y aspnet core
              <img src="/public/NET_Core_Logo.png" className="w-12 h-12" /> 
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
