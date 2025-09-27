import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { useLenis } from "./hooks/useLenis";
import AdminDashboard from "./features/usuarios/components/Paneldashboard";
import LoginPanelDashboard from "./features/usuarios/components/LoginPanelDashboard";

function App() {
  useLenis();

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element = {<LoginPanelDashboard />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;