export default function Contacto() {
  return (
    <section
      id="contacto"
      className="bg-gray-900 text-white py-16 flex flex-col items-center"
    >
      <h2 className="text-5xl font-bold mb-8">Contacto</h2>
      <form
        action="https://formspree.io/f/xgvojgke"
        method="POST"
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <label htmlFor="email" className="text-xl font-semibold mb-2">
          Tu email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Ingrese su email"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-yellow-500 focus:ring-2 focus:ring-yellow-500"
        />

        <label htmlFor="message" className="text-xl font-semibold mt-4 mb-2">
          Tu mensaje:
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Escriba su mensaje aquí"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-yellow-500 focus:ring-2 focus:ring-yellow-500"
        ></textarea>

        <button
          type="submit"
          className="mt-6 bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-all w-full"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
