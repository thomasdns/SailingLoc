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
import MonCompte from './pages/MonCompte';
import Favoris from './pages/Favoris';

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
            <Route path="/mon-compte" element={<MonCompte />} />
            <Route path="/favoris" element={<Favoris />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;