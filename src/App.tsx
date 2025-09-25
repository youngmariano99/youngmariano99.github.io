import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SobreMi from "./components/SobreMi";
import Estudios from "./components/Estudios";
import Cursos from "./components/Cursos";
import HabilidadesPersonales from "./components/HabilidadesPersonales";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import ProyectosDinamicos from "./features/proyectos/componentes/ProyectosDinamicos";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <main>
          <Routes>
            
            <Route
              path="/"
              element={
                <>
                  
                  <Header />
                  <SobreMi />
                  <ProyectosDinamicos />
                  <Estudios />
                  <Cursos />
                  <HabilidadesPersonales />
                </>
              }
            />

            <Route path="/contacto" element = { <Contacto />} />
          </Routes>
          
         
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}


export default App;
