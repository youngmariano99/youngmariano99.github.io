import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { useLenis } from "./hooks/useLenis";

function App() {
  useLenis();

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Eliminamos todas las otras rutas */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;