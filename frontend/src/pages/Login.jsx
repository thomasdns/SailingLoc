import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Tentative de connexion avec:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Connexion réussie!");
    } catch {
      alert("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="login-container">
        <div className="login-card">
          <div style={{ position: "absolute", top: 20, left: 20 }}>
            <Link
              to="/"
              style={{
                color: "#0099cc",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Accueil
            </Link>
          </div>
          <h1>Connexion</h1>
          <p className="subtitle">Connectez-vous à votre compte</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Votre mot de passe"
                  required
                  className="form-input password-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? "Ø" : "O"}
                </button>
              </div>
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
          <div className="form-footer">
            <p className="signup-link">
              Pas encore de compte ? <Link to="/register">S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
