
export default function Footer() {

  const año = new Date();
  const añoActual = año.getFullYear();


  return (
    
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-700 text-center">
      <div id="copyright" className="text-lg"></div>
      <p>
        Este es un proyecto personal para aprender y experimentar con HTML,
        CSS y React.
      </p>
      <p className="mt-2 font-semibold">Desarrollado por Mariano Young</p>
      <p className="mt-2 font-semibold">{añoActual}</p>
    </footer>
  );
  
} 
