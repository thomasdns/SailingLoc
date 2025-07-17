import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import StarRating from './StarRating';

export default function BoatCard({ boat }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={boat.image}
          alt={boat.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {boat.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{boat.name}</h3>
          <div className="flex items-center space-x-1 ml-2">
            <StarRating rating={boat.rating} size={16} />
            <span className="text-sm text-gray-600">({boat.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin size={16} />
            <span>{boat.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{boat.capacity} pers.</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {boat.price}€<span className="text-base font-normal text-gray-600">/jour</span>
          </div>
          <Link
            to={`/bateaux/${boat.id}`}
            className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm"
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  );
}