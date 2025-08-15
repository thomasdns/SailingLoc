import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, Search, MapPin, Calendar, Clock, Ship, MessageSquare, Star } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import BoatCard from '../components/BoatCard';
import StarRating from '../components/StarRating';

export default function Home() {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [topReviews, setTopReviews] = useState([]);

  // Récupérer les bateaux et les avis depuis l'API
  useEffect(() => {
    fetchBoats();
    fetchTopReviews();
  }, []);

  const fetchBoats = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/boats');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des bateaux');
      }

      const data = await response.json();
      setBoats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    console.log('Searching with filters:', filters);
  };

  const fetchTopReviews = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/reviews/top?limit=3');
      if (response.ok) {
        const data = await response.json();
        setTopReviews(data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      // En cas d'erreur, on peut afficher des avis fictifs pour la démo
      setTopReviews([
        {
          _id: 'demo1',
          rating: 5,
          comment: "Expérience exceptionnelle ! Le bateau était parfait et le service impeccable. Je recommande vivement pour vos escapades en mer.",
          userId: { nom: 'Martin', prenom: 'Sophie' },
          boatId: { nom: 'Voilier Élégance', type: 'voilier', localisation: 'Saint-Malo' },
          createdAt: new Date()
        },
        {
          _id: 'demo2',
          rating: 5,
          comment: "Un voyage de rêve ! L'équipage était aux petits soins et nous avons découvert des endroits magnifiques. À refaire absolument !",
          userId: { nom: 'Dubois', prenom: 'Pierre' },
          boatId: { nom: 'Catamaran Horizon', type: 'catamaran', localisation: 'Les Glénan' },
          createdAt: new Date()
        },
        {
          _id: 'demo3',
          rating: 5,
          comment: "Service client au top et bateau en parfait état. Nous avons passé une semaine inoubliable sur la Méditerranée. Merci SailingLoc !",
          userId: { nom: 'Leroy', prenom: 'Marie' },
          boatId: { nom: 'Yacht Prestige', type: 'yacht', localisation: 'Marseille' },
          createdAt: new Date()
        }
      ]);
    }
  };

  const bestSellerBoats = boats.slice(0, 6);
  const isLoggedIn = Boolean(localStorage.getItem('userId'));

  const destinations = [
    {
      id: 1,
      name: "Saint-Malo",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "La cité corsaire et ses îles sauvages"
    },
    {
      id: 2,
      name: "Les Glénan",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Archipel breton aux eaux turquoise"
    },
    {
      id: 3,
      name: "Marseille",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Calanques et îles du Frioul"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            opacity: 0.4
          }}
        ></div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wider">SAILINGLOC</h1>
            <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              Découvrez les plus beaux bateaux pour vos aventures en mer
            </p>
            
            {/* Barre de recherche */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-5xl mx-auto shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                    <option value="">Destination</option>
                    <option value="saint-malo">Saint-Malo</option>
                    <option value="les-glenan">Les Glénan</option>
                    <option value="crozon">Crozon</option>
                    <option value="la-rochelle">La Rochelle</option>
                    <option value="marseille">Marseille</option>
                    <option value="cannes">Cannes</option>
                    <option value="ajaccio">Ajaccio</option>
                    <option value="barcelone">Barcelone</option>
                    <option value="palma">Palma de Majorque</option>
                    <option value="athenes">Athènes</option>
                    <option value="venise">Venise</option>
                    <option value="amsterdam">Amsterdam</option>
                    <option value="split">Split</option>
                  </select>
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    placeholder="Date de début"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    placeholder="Date de fin"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>

                <div className="relative">
                  <Ship className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                    <option value="">Type bateau</option>
                    <option value="voilier">Voilier</option>
                    <option value="bateau à moteur">Bateau à moteur</option>
                    <option value="catamaran">Catamaran</option>
                  </select>
                </div>

                <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Search size={20} />
                  <span>Rechercher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos bateaux vedettes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection de bateaux les plus populaires pour vos escapades en mer
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des bateaux...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <Ship className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Erreur de chargement</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : bestSellerBoats.length === 0 ? (
            <div className="text-center py-12">
              <Ship className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Aucun bateau disponible</h3>
              <p className="text-gray-500">Revenez bientôt pour découvrir nos bateaux !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestSellerBoats.map((boat) => (
                <BoatCard key={boat._id} boat={boat} />
              ))}
            </div>
          )}

          {boats.length > 6 && (
            <div className="text-center mt-12">
              <Link
                to="/bateaux"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                <span>Voir tous les bateaux</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Avis 5 étoiles */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos <span className="text-blue-600">navigateurs</span> satisfaits
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les expériences exceptionnelles de nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topReviews.map((review) => (
              <div key={review._id} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* En-tête avec note */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {review.userId?.nom?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.userId?.nom} {review.userId?.prenom}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {review.boatId?.nom || 'Bateau'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Excellent</p>
                  </div>
                </div>

                {/* Commentaire */}
                <div className="mb-6">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                    <blockquote className="text-gray-700 leading-relaxed italic text-lg">
                      "{review.comment}"
                    </blockquote>
                  </div>
                </div>

                {/* Date et bateau */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span>
                    {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  {review.boatId?.type && (
                    <span className="capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {review.boatId.type}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Lien vers tous les avis */}
          <div className="text-center mt-12">
            <Link
              to="/bateaux"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-lg hover:underline"
            >
              <span>Voir tous les avis</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations - Style maquette */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cap sur les <span className="text-blue-600">destinations</span> les plus prisées par nos navigateurs !
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div key={destination.id} className="relative group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-lg opacity-90">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à vivre l'aventure ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez SailingLoc et commencez à explorer les mers du monde
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  <UserPlus size={20} />
                  <span>S'inscrire</span>
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <span>Se connecter</span>
                </Link>
              </>
            ) : (
              <Link
                to="/bateaux"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                <Search size={20} />
                <span>Rechercher un bateau</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}