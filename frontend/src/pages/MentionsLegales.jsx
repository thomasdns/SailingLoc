import React from "react";
import Header from "../components/header";
// import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Mentions légales</h2>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">1. Éditeur du site</h3>
            <p className="text-gray-700 mb-2">Le site SailingLoc est édité par :</p>
            <ul className="list-disc pl-6 text-gray-700 mb-2">
              <li>SailingLoc SAS</li>
              <li>Société par actions simplifiée au capital de [à compléter] €</li>
              <li>RCS La Rochelle B 923 456 789</li>
              <li>Siège social : 12 Rue du Port, 17000 La Rochelle, France</li>
              <li>Email : <a href="mailto:sailinglocequipe@gmail.com" className="text-orange-500 underline">sailinglocequipe@gmail.com</a></li>
              <li>Directeur de la publication : [Nom du responsable légal ou fondateur]</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">2. Hébergement</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-2">
              <li>Le site est hébergé par :</li>
              <li>[Vercel Inc.] ou [Amazon Web Services (AWS)]</li>
              <li>Adresse : [à compléter selon le prestataire]</li>
              <li>Le prestataire assure un niveau de sécurité conforme aux exigences du RGPD.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">3. Conception et développement</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-2">
              <li>Le site a été conçu et développé par :</li>
              <li>L’équipe interne SailingLoc</li>
              <li>ou [Nom de l’agence ou freelance, si applicable]</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">4. Propriété intellectuelle</h3>
            <p className="text-gray-700">L’ensemble des éléments du site (textes, images, graphismes, logo, vidéos, base de données, etc.) est protégé par le Code de la propriété intellectuelle.<br />
            Toute reproduction, représentation, modification ou extraction, totale ou partielle, sans autorisation écrite de SailingLoc est interdite.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">5. Responsabilité</h3>
            <p className="text-gray-700">SailingLoc met tout en œuvre pour assurer l’exactitude des informations diffusées, mais ne saurait être tenue responsable des erreurs ou omissions.<br />
            SailingLoc décline toute responsabilité quant à l’utilisation du site ou aux dommages directs ou indirects pouvant en résulter.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">6. Données personnelles</h3>
            <p className="text-gray-700">Pour consulter notre politique de confidentialité, veuillez vous rendre sur la page dédiée :<br />
              <Link to="/politique-confidentialite" className="text-orange-500 underline">👉 Politique de confidentialité</Link>
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">7. Cookies</h3>
            <p className="text-gray-700">Lors de votre navigation, des cookies peuvent être déposés sur votre terminal. Vous pouvez à tout moment gérer vos préférences via notre bandeau dédié.<br />
            Pour plus d’informations, consultez notre <Link to="/politique-confidentialite" className="text-orange-500 underline">politique de confidentialité</Link>.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-700">8. Contact</h3>
            <p className="text-gray-700">Pour toute question ou signalement, vous pouvez nous écrire à :<br />
              <a href="mailto:sailinglocequipe@gmail.com" className="text-orange-500 underline">📧 sailinglocequipe@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
} 