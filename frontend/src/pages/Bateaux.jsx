import React from "react";
import Header from "../components/header";
import BoatCard from "../components/BoatCard";
import Footer from "../components/Footer";
import "./Bateaux.css";
import "../App.css";

const Bateaux = () => {
  // Données mockées
  const boats = [
    {
      id: 1,
      model: "Modèle1",
      location: "Ville",
      capacity: 15,
      price: 800,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      model: "Modèle1",
      location: "Ville",
      capacity: 15,
      price: 800,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      model: "Modèle1",
      location: "Ville",
      capacity: 15,
      price: 800,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      model: "Modèle1",
      location: "Ville",
      capacity: 15,
      price: 800,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="app">
      <Header />

      {/* Hero avec SearchFilter intégré */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            SAILINGLOC<span className="text-orange">.</span>
          </h1>
          <p className="hero-subtitle">
            Location de bateaux entre particuliers pour des expériences uniques
          </p>
        </div>
      </section>

      {/* Section Best Sellers */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">
            Découvrez nos <span className="text-orange">best-sellers</span> :
            les <span className="text-blue">bateaux</span> les plus prisés par
            nos clients !
          </h2>
          <div className="boats-grid">
            {boats.slice(0, 6).map((boat) => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bateaux;
