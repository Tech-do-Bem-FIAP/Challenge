import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Faq from "./pages/Faq/Faq";
import Who from "./pages/Who/Who";
import Login from "./pages/Login/Login";
import Colaborador from "./pages/Colaborador/Colaborador";
import Dentista from "./pages/Dentista/Dentista";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<Faq />} />
          <Route path="who" element={<Who />} />
          <Route path="login" element={<Login />} />

          {/* Protected dashboard routes */}
          <Route
            path="colaborador"
            element={
              <ProtectedRoute role="colaborador">
                <Colaborador />
              </ProtectedRoute>
            }
          />
          <Route
            path="dentista"
            element={
              <ProtectedRoute role="dentista">
                <Dentista />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
