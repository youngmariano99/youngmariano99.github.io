import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SobreMi from "./components/SobreMi";
import Estudios from "./components/Estudios";
import Cursos from "./components/Cursos";
import HabilidadesPersonales from "./components/HabilidadesPersonales";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import ProyectosDinamicos from "./features/proyectos/componentes/ProyectosDinamicos";

function App() {
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <SobreMi />
        <ProyectosDinamicos />
        <Estudios />
        <Cursos />
        <HabilidadesPersonales />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

export default App;
