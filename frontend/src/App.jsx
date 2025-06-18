import React, { useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <Login onBack={() => setCurrentPage("home")} />;
      default:
        return (
          <div className="home-container">
            <div className="home-content">
              <h1>Bienvenue sur SailingLoc</h1>
              <p className="home-subtitle">
                Votre application de localisation maritime
              </p>

              <div className="home-buttons">
                <button
                  className="home-button primary"
                  onClick={() => setCurrentPage("login")}
                >
                  Se connecter
                </button>
                <button className="home-button secondary">
                  En savoir plus
                </button>
              </div>

              <div className="home-features">
                <div className="feature">
                  <h3>🚢 Navigation</h3>
                  <p>Suivez vos bateaux en temps réel</p>
                </div>
                <div className="feature">
                  <h3>📍 Localisation</h3>
                  <p>Géolocalisation précise de votre flotte</p>
                </div>
                <div className="feature">
                  <h3>📊 Analytics</h3>
                  <p>Analyses détaillées de vos trajets</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
