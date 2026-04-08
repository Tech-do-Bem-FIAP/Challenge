import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/index.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Faq from "./pages/Faq/Faq";
import Who from "./pages/Who/Who";
import Login from "./pages/Login/Login";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route path="who" element={<Who />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
