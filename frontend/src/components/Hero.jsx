import React from "react";
import SearchFilters from "./SearchFilters";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">SAILINGLOC</h1>
        <SearchFilters />
      </div>
    </section>
  );
};

export default Hero;
