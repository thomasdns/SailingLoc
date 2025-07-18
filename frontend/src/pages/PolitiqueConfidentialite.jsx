import React from "react";
import Header from "../components/header";

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    margin: 20,
    backgroundColor: "#f4f4f4",
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
    background: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.05)"
  },
  ul: { paddingLeft: 20 },
  footer: {
    textAlign: "center",
    marginTop: 40,
    color: "#777"
  }
};

const PolitiqueConfidentialite = () => (
  <div style={styles.body}>
    <Header />
    <main style={{ flex: 1 }}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Politique de confidentialité</h1>
        <p>Dernière mise à jour : 01/04/2025</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.h2}>1. Introduction</h2>
        <p>La présente politique de confidentialité a pour but d’expliquer comment SailingLoc collecte, utilise, protège et partage les données personnelles de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD).</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>2. Données collectées</h2>
        <p>Lors de l'utilisation de la plateforme SailingLoc, nous pouvons collecter les données suivantes :</p>
        <ul style={styles.ul}>
          <li>Nom, prénom</li>
          <li>Adresse e-mail</li>
          <li>Numéro de téléphone</li>
          <li>Adresse IP et données de navigation</li>
          <li>Données de géolocalisation (si autorisées)</li>
          <li>Informations de paiement (via Stripe ou PayPal)</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>3. Finalités de la collecte</h2>
        <p>Les données collectées ont pour objectif :</p>
        <ul style={styles.ul}>
          <li>La création et la gestion du compte utilisateur</li>
          <li>La mise en relation entre propriétaires et locataires</li>
          <li>Le traitement des paiements</li>
          <li>La gestion des réservations</li>
          <li>Le service client</li>
          <li>L’envoi de notifications ou emails (rappels, suggestions, sécurité)</li>
          <li>L’amélioration continue de nos services</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>4. Consentement</h2>
        <p>Le consentement est obtenu explicitement via :</p>
        <ul style={styles.ul}>
          <li>Case à cocher lors de la création de compte</li>
          <li>Bandeau cookie au premier accès au site</li>
          <li>Formulaires spécifiques pour la newsletter ou contact</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>5. Cookies</h2>
        <p>Le site utilise des cookies pour :</p>
        <ul style={styles.ul}>
          <li>Analyser la fréquentation (Google Analytics)</li>
          <li>Optimiser les performances du site</li>
          <li>Mémoriser vos préférences de navigation</li>
        </ul>
        <p>Vous pouvez configurer les cookies à tout moment via notre bandeau de gestion (outil : Axeptio, Cookiebot...)</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>6. Durée de conservation</h2>
        <p>Les données sont conservées pour une durée maximale de 3 ans après la dernière interaction. Les données liées aux paiements sont conservées selon les obligations fiscales et légales.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>7. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul style={styles.ul}>
          <li>Droit d’accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l’effacement ("droit à l’oubli")</li>
          <li>Droit à la portabilité</li>
          <li>Droit d’opposition et de retrait du consentement</li>
        </ul>
        <p>Pour exercer vos droits, envoyez un e-mail à : <a href="mailto:contact@sailingloc.fr">contact@sailingloc.fr</a>.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>8. Sécurité des données</h2>
        <p>SailingLoc utilise les technologies suivantes pour assurer la sécurité des données :</p>
        <ul style={styles.ul}>
          <li>Hachage des mots de passe via bcryptjs</li>
          <li>Token d’authentification sécurisés (JWT)</li>
          <li>Certificat SSL (HTTPS)</li>
          <li>Accès limité au personnel autorisé</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>9. Hébergement</h2>
        <p>Le site est hébergé sur <strong>Vercel</strong> ou <strong>AWS</strong>, infrastructures conformes aux exigences RGPD et offrant un haut niveau de sécurité physique et logicielle.</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>10. Modifications</h2>
        <p>Cette politique peut être modifiée à tout moment. Les utilisateurs seront informés des changements par notification sur le site ou par e-mail.</p>
      </section>
    </main>
  </div>
);

export default PolitiqueConfidentialite; 