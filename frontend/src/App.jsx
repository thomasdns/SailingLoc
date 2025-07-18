import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Boats from './pages/Boats';
import About from './pages/About';
import Contact from './pages/Contact';
import BoatDetail from './pages/BoatDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Favoris from './pages/Favoris';
import GestionBateaux from './pages/GestionBateaux';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import Profil from './pages/Profil';
import CGU_CGV from './pages/CGU_CGV';
import MentionsLegales from './pages/MentionsLegales';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bateaux" element={<Boats />} />
            <Route path="/bateaux/:id" element={<BoatDetail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/gestion-bateaux" element={<GestionBateaux />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/cgu-cgv" element={<CGU_CGV />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;