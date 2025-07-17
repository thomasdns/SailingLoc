import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Bateaux from "./pages/Bateaux";
import CGU_CGV from "./pages/CGU_CGV";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bateaux" element={<Bateaux />} />
        <Route path="/cgu-cgv" element={<CGU_CGV />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
