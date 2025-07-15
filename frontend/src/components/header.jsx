import React from "react";
import boatLogo from "../assets/boatNameTextColorLogo_color.png";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo">
            <img src={boatLogo} alt="SailingLoc" className="logo-image" />
          </div>
          <nav className="nav">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
            <Link to="/bateaux" className="nav-link">
              Bateau
            </Link>
            <Link to="/about" className="nav-link">
              À propos
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>
          <button className="login-btn">CONNEXION</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
