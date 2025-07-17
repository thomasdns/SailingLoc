import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Header from "../components/header";

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    margin: 20,
    backgroundColor: "#f8f8f8",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    textAlign: "center",
    marginBottom: 24
  },
  h1: { color: "#003366" },
  h2: { color: "#003366" },
  section: {
    background: "white",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.05)"
  },
  a: { color: "#0099cc" },
  footer: {
    textAlign: "center",
    marginTop: 40,
    color: "#333"
  }
};

const CGU_CGV = () => (
  <div style={styles.body}>
    <Header />
    <main style={{ flex: 1 }}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Conditions Générales d’Utilisation (CGU) et de Vente (CGV)</h1>
        <p>Dernière mise à jour : 01/04/2025</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.h2}>1. Présentation de la plateforme</h2>
        <p><strong>SailingLoc</strong> est une plateforme de mise en relation entre propriétaires de bateaux et particuliers souhaitant louer un voilier ou bateau à moteur en Europe. La société est basée à La Rochelle, sous le statut SAS (RCS La Rochelle B 923 456 789).</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>2. Acceptation des CGU/CGV</h2>
        <p>En accédant ou en utilisant le site SailingLoc, tout utilisateur reconnaît avoir lu, compris et accepté les présentes CGU/CGV sans réserve.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>3. Obligations des parties</h2>
        <ul>
          <li><strong>Propriétaires :</strong> doivent fournir des informations exactes sur leur bateau (entretien, assurance, équipements).</li>
          <li><strong>Locataires :</strong> s’engagent à utiliser les bateaux de manière responsable et à respecter les conditions de location.</li>
          <li><strong>SailingLoc :</strong> s’assure de la conformité juridique des contrats et du respect du RGPD.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>4. Réservation et Paiement</h2>
        <p>Les réservations sont effectuées directement via la plateforme, avec paiement sécurisé via Stripe ou PayPal. Des frais de service peuvent s’appliquer.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>5. Droit de rétractation et annulation</h2>
        <p>Les conditions d’annulation sont définies dans chaque annonce. SailingLoc permet l’annulation selon les délais spécifiés par le propriétaire.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>6. Données personnelles</h2>
        <p>
          Les données collectées (nom, email, numéro, localisation, etc.) sont utilisées dans le cadre de la mise en relation et sont traitées conformément au RGPD. Consultez notre {" "}
          <Link to="/politique-confidentialite" style={styles.a}>politique de confidentialité</Link>.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>7. Responsabilité</h2>
        <p>SailingLoc décline toute responsabilité en cas de litige entre les utilisateurs. Toutefois, une équipe de modération peut intervenir en cas de signalement.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>8. Modification des CGU/CGV</h2>
        <p>SailingLoc se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront notifiés lors de la mise à jour.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>9. Contact</h2>
        <p>Pour toute question, vous pouvez contacter l’équipe via <a href="mailto:contact@sailingloc.fr" style={styles.a}>contact@sailingloc.fr</a>.</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default CGU_CGV; 