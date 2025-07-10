import React from "react";
import boatLogo from "../assets/boatNameTextColorLogo_color.png";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo">
            <img src={boatLogo} alt="SailingLoc" className="logo-image" />
          </div>
          <nav className="nav">
            <a href="#accueil" className="nav-link">
              Accueil
            </a>
            <a href="#bateau" className="nav-link">
              Bateau
            </a>
            <a href="#apropos" className="nav-link">
              À propos
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
          <button className="login-btn">CONNEXION</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
