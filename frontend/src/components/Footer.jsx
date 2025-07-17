import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.match(/^\S+@\S+\.\S+$/)) {
      setNewsletterStatus("Veuillez entrer un email valide.");
      return;
    }
    // Ici, tu pourrais faire un appel API pour enregistrer l'email
    setNewsletterStatus("Merci pour votre inscription à la newsletter !");
    setNewsletterEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">MODE DE PAIEMENT :</h3>
            <div className="payment-icon">💳</div>
            <h3 className="footer-title">NOUS RETROUVER :</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill-rule="evenodd" fill="#FEFEFE" d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.579v-7.745H8.076V9.237h2.607V7.01c0-2.584 1.577-3.99 3.882-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.595-1.496 1.47v1.927h2.989l-.39 3.018h-2.6V20h5.097c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0"></path></svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 30 30" height="20"><g fill="#FFF"><path d="M14.77 7.18a7.59 7.59 0 1 0 0 15.18 7.59 7.59 0 0 0 0-15.18zm0 12.52a4.93 4.93 0 1 1 0-9.86 4.93 4.93 0 0 1 0 9.86z"></path><circle r="1.77" cy="6.9" cx="22.66"></circle><path d="M28.78 5.1A7.56 7.56 0 0 0 24.46.78a10.85 10.85 0 0 0-3.59-.69C19.29.02 18.79 0 14.78 0s-4.52 0-6.09.09A10.85 10.85 0 0 0 5.1.78 7.56 7.56 0 0 0 .78 5.1a10.85 10.85 0 0 0-.69 3.59C.02 10.27 0 10.77 0 14.78s0 4.52.09 6.09a10.85 10.85 0 0 0 .69 3.59 7.56 7.56 0 0 0 4.32 4.32 10.85 10.85 0 0 0 3.59.74c1.58.07 2.08.09 6.09.09s4.52 0 6.09-.09a10.85 10.85 0 0 0 3.59-.69 7.56 7.56 0 0 0 4.32-4.32 10.85 10.85 0 0 0 .69-3.59c.07-1.58.09-2.08.09-6.09s0-4.52-.09-6.09a10.85 10.85 0 0 0-.69-3.64zm-2 15.65a8.18 8.18 0 0 1-.51 2.77 4.9 4.9 0 0 1-2.81 2.81 8.18 8.18 0 0 1-2.74.51c-1.56.07-2 .09-6 .09s-4.41 0-6-.09a8.18 8.18 0 0 1-2.74-.51 4.89 4.89 0 0 1-2.82-2.81 8.18 8.18 0 0 1-.51-2.74c-.07-1.56-.09-2-.09-6s0-4.41.09-6a8.18 8.18 0 0 1 .51-2.77A4.89 4.89 0 0 1 5.98 3.2a8.18 8.18 0 0 1 2.74-.51c1.56-.07 2-.09 6-.09s4.41 0 6 .09a8.18 8.18 0 0 1 2.74.51 4.9 4.9 0 0 1 2.81 2.81 8.18 8.18 0 0 1 .51 2.74c.07 1.56.09 2 .09 6s0 4.43-.07 6h-.02z"></path></g></svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 18">
                  <path fill="#FFF" d="M23.453 2.705c.501 1.885.517 5.795.517 5.795s0 3.925-.502 5.795c-.273 1.036-1.23 1.886-2.263 2.164-1.868.495-9.205.464-9.205.464s-7.337.046-9.205-.464C1.777 16.181.775 15.331.5 14.295 0 12.41.046 8.5.046 8.5S0 4.59.5 2.705C.775 1.669 1.762.819 2.795.54 4.663.046 12 .077 12 .077s7.473 0 9.342.495a3 3 0 0 1 2.111 2.133zM9.706 12.24l5.97-3.74-5.97-3.74v7.48z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">INFORMATIONS</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about" className="footer-link">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/bateaux" className="footer-link">
                  Nos bateaux
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cgu-cgv" className="footer-link">
                  CGU/CGV
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="footer-link">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">INSCRIVEZ-VOUS À NOTRE NEWSLETTER</h3>
            <p className="newsletter-text">
              Recevez nos offres, actus et bons plans directement dans votre
              boîte mail.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Votre email"
                className="newsletter-input"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                required
              />
              <button className="newsletter-btn" type="submit">→</button>
            </form>
            {newsletterStatus && (
              <div style={{ color: newsletterStatus.startsWith("Merci") ? "green" : "red", marginTop: 8, fontSize: 14 }}>
                {newsletterStatus}
              </div>
            )}
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
