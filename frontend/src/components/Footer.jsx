import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">MODE DE PAIEMENT :</h3>
            <div className="payment-icon">💳</div>
            <h3 className="footer-title">NOUS RETROUVER :</h3>
            <div className="social-links">
              {["f", "📧", "📷", "💼"].map((icon, idx) => (
                <a key={idx} href="#" className="social-link">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">INFORMATIONS</h3>
            <ul className="footer-links">
              {[
                "À propos",
                "Nos bateaux",
                "Contact",
                "Devenir Partenaire",
                "CGU/CGV",
                "Politique de confidentialité",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">INSCRIVEZ-VOUS À NOTRE NEWSLETTER</h3>
            <p className="newsletter-text">
              Recevez nos offres, actus et bons plans directement dans votre
              boîte mail.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Votre email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">→</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 SailingLoc - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
