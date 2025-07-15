import React from "react";
import Header from "../components/header";
import SearchFilters from "../components/SearchFilters";
import BoatCard from "../components/BoatCard";
import ReviewCard from "../components/ReviewCard";
import DestinationCard from "../components/DestinationCard";
import Footer from "../components/Footer";
import "./Home.css";
import "../App.css";

const Home = () => {
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

  const reviews = [
    {
      id: 1,
      name: "Jean",
      title: "Une expérience exceptionnelle !",
      comment:
        "Le bateau était en parfait état, très bien entretenu, et l'équipe de réservation professionnelle. Une expérience inoubliable sur l'eau !",
      stars: 5,
    },
    {
      id: 2,
      name: "Marie",
      title: "Service impeccable !",
      comment:
        "Navigation parfaite, équipe disponible et bateaux de qualité. Je recommande vivement pour des vacances réussies.",
      stars: 5,
    },
    {
      id: 3,
      name: "Pierre",
      title: "Parfait pour la famille !",
      comment:
        "Bateau spacieux et sécurisé, idéal pour naviguer en famille. L'équipe nous a parfaitement conseillés.",
      stars: 5,
    },
  ];

  const destinations = [
    { id: "saint-malo", name: "SAINT-MALO" },
    { id: "les-glenan", name: "LES GLÉNAN" },
    { id: "crozon", name: "CROZON" },
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

          {/* SearchFilters intégré */}
          <SearchFilters />
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
            {boats.slice(0, 3).map((boat) => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>
          <div className="text-center">
            <button className="btn btn-outline">Voir plus</button>
          </div>
        </div>
      </section>

      {/* Section Reviews */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">
            Ils ont choisi l'excellence. Découvrez ce que nos{" "}
            <span className="text-blue">clients</span> disent de leur{" "}
            <span className="text-blue">expérience</span> en mer.
          </h2>
          <div className="reviews-grid">
            {reviews.slice(0, 4).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Destinations */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">
            Cap sur les <span className="text-blue">destinations</span> les plus
            prisées par nos <span className="text-orange">navigateurs</span> !
          </h2>
          <div className="destinations-grid">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Propriétaire */}
      <section className="section section-gray owner-section">
        <div className="container">
          <h2 className="section-title">
            Propriétaire d'un <span className="text-blue">bateau</span> ?
          </h2>
          <p className="owner-description">
            Faites-le naviguer même sans vous et générez des revenus en le
            mettant en location.
          </p>
          <button className="btn btn-amber">👤 S'INSCRIRE</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
