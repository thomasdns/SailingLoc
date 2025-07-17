import React from 'react';
import { Ship, Shield, CreditCard, Users, MapPin, Clock } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Ship,
      title: 'Large choix de bateaux',
      description: 'Une sélection rigoureuse de bateaux entretenus et vérifiés pour votre sécurité et votre confort.'
    },
    {
      icon: Clock,
      title: 'Réservation facile et rapide',
      description: 'Réservez en quelques clics avec notre système de réservation en ligne simple et intuitif.'
    },
    {
      icon: Shield,
      title: 'Paiements sécurisés et service fiable',
      description: 'Transactions 100% sécurisées et équipe disponible 7j/7 pour vous accompagner.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            opacity: 0.3
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            À propos
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Une question ? Écrivez-nous, on vous répond en et si bien !
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-blue-900 text-white p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6">À PROPOS</h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Chez SailingLoc, nous croyons que la navigation doit être accessible, 
                  simple et sécurisée pour tous. Notre mission est de démocratiser l'accès 
                  aux plaisirs de la mer en proposant une plateforme moderne et fiable de 
                  location de bateaux.
                </p>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Depuis notre création, nous nous efforçons de connecter les passionnés de mer 
                  avec des propriétaires de bateaux soigneusement sélectionnés, garantissant 
                  ainsi des expériences nautiques exceptionnelles le long des côtes bretonnes.
                </p>
                <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors">
                  En savoir plus
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Voilier au coucher du soleil"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Text */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Notre <strong>mission</strong> rendre la navigation <strong>accessible</strong>, <strong>simple</strong> et <strong>sécurisée</strong> 
            pour tous les passionnés de mer.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos trois piliers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-600 transition-colors">
                  <pillar.icon className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à naviguer avec nous ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Découvrez notre sélection de bateaux et réservez votre prochaine aventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Voir les bateaux
            </button>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-medium hover:bg-orange-600 transition-colors">
              Nous contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}