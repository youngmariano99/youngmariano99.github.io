import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SobreMi from "./components/SobreMi";
import Proyectos from "./components/Proyectos";
import Estudios from "./components/Estudios";
import Cursos from "./components/Cursos";
import HabilidadesPersonales from "./components/HabilidadesPersonales";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <SobreMi />
        <Proyectos />
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
