import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, Search, MapPin, Calendar, Clock, Ship } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import BoatCard from '../components/BoatCard';
import StarRating from '../components/StarRating';
import { boats, destinations, testimonials } from '../data/boats';

export default function Home() {
  const handleSearch = (filters) => {
    console.log('Searching with filters:', filters);
  };

  const bestSellerBoats = boats.slice(0, 6);
  // const userPrenom = localStorage.getItem('userPrenom'); // Suppression de l'affichage du prénom

  return (
    <div className="min-h-screen">
      {/* Hero Section - Plus fidèle à la maquette */}
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
              Découvrez les plus beaux bateaux de Bretagne pour vos aventures en mer
            </p>
            
            {/* Barre de recherche intégrée comme dans la maquette */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-5xl mx-auto shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                    <option value="">Destination</option>
                    <option value="saint-malo">Saint-Malo</option>
                    <option value="les-glenan">Les Glénan</option>
                    <option value="crozon">Crozon</option>
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

                {/* Champ durée supprimé */}

                <div className="relative">
                  <Ship className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                    <option value="">Type bateau</option>
                    <option value="voilier">Voilier</option>
                    <option value="yacht">Yacht</option>
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

      {/* Best Sellers - Layout plus fidèle */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Découvrez nos <span className="text-blue-600">best-sellers</span> : les bateaux les plus prisés par nos navigateurs !
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {bestSellerBoats.map((boat) => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/bateaux"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              <span>Voir plus</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Style maquette */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils ont testé l'expérience. Découvrez ce que nos <span className="text-blue-600">clients</span> disent de leur expérience en mer.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <StarRating rating={testimonial.rating} size={18} />
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.comment}"</p>
              </div>
            ))}
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

      {/* CTA Section - Style maquette */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Propriétaire d'un bateau ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Faites le naviguer plutôt sans vous et générez des revenus complémentaires en le mettant en location.
          </p>
          <button className="inline-flex items-center space-x-3 bg-orange-500 text-white px-10 py-4 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg text-lg">
            <UserPlus size={24} />
            <span>S'inscrire</span>
          </button>
        </div>
      </section>
    </div>
  );
}