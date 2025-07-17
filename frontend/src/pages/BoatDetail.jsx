import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Calendar, Star, Check } from 'lucide-react';
import StarRating from '../components/StarRating';
import { boats, testimonials } from '../data/boats';

export default function BoatDetail() {
  const { id } = useParams();
  const boat = boats.find(b => b.id === parseInt(id));
  
  const [reviewForm, setReviewForm] = useState({
    prenom: '',
    email: '',
    message: '',
    rating: 5
  });

  if (!boat) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bateau non trouvé</h2>
          <Link to="/bateaux" className="text-blue-600 hover:text-blue-700">
            Retourner à la liste des bateaux
          </Link>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm);
    alert('Merci pour votre avis !');
    setReviewForm({ prenom: '', email: '', message: '', rating: 5 });
  };

  const handleInputChange = (field, value) => {
    setReviewForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/bateaux"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Retour aux bateaux</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{boat.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <StarRating rating={boat.rating} />
              <span className="text-sm text-gray-600">({boat.reviews} avis)</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MapPin size={16} />
              <span>{boat.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <div className="relative">
              <img
                src={boat.image}
                alt={boat.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md font-medium">
                {boat.category}
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 mb-6">{boat.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Caractéristiques</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-blue-600" />
                      <span>Capacité : {boat.capacity} personnes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-blue-600" />
                      <span>Localisation : {boat.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span>Disponible toute l'année</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Équipements</h3>
                  <div className="space-y-2">
                    {boat.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Check size={16} className="text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis clients</h2>
              <div className="space-y-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center mb-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <StarRating rating={testimonial.rating} size={14} />
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Laisser un avis</h2>
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={reviewForm.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note
                  </label>
                  <StarRating
                    rating={reviewForm.rating}
                    size={24}
                    interactive={true}
                    onRatingChange={(rating) => handleInputChange('rating', rating)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={reviewForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Partagez votre expérience..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Envoyer l'avis
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {boat.price}€
                  <span className="text-lg font-normal text-gray-600">/jour</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <StarRating rating={boat.rating} />
                  <span className="text-sm text-gray-600">({boat.reviews} avis)</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-md font-medium hover:bg-orange-700 transition-colors mb-4">
                Réserver maintenant
              </button>
              
              <div className="text-center text-sm text-gray-500">
                <p>Annulation gratuite jusqu'à 48h avant</p>
                <p>Paiement sécurisé</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Besoin d'aide ?</h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  Notre équipe est là pour vous accompagner
                </p>
                <div className="space-y-2">
                  <p><strong>Téléphone :</strong> +33 2 99 40 78 90</p>
                  <p><strong>Email :</strong> contact@sailingloc.com</p>
                  <p><strong>Horaires :</strong> Lun-Sam 9h-18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}