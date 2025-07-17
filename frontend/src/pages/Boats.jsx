import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import BoatCard from '../components/BoatCard';
import { boats } from '../data/boats';

export default function Boats() {
  const [filteredBoats, setFilteredBoats] = useState(boats);
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    capacity: ''
  });
  const [viewMode, setViewMode] = useState('grid');

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    let filtered = boats;
    
    if (newFilters.type) {
      filtered = filtered.filter(boat => 
        boat.category.toLowerCase().includes(newFilters.type.toLowerCase())
      );
    }
    
    if (newFilters.priceRange) {
      const [min, max] = newFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(boat => 
        boat.price >= min && (max ? boat.price <= max : true)
      );
    }
    
    if (newFilters.capacity) {
      filtered = filtered.filter(boat => boat.capacity >= parseInt(newFilters.capacity));
    }
    
    setFilteredBoats(filtered);
  };

  const clearFilters = () => {
    setFilters({ type: '', priceRange: '', capacity: '' });
    setFilteredBoats(boats);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              Nos bateaux
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredBoats.length} bateau{filteredBoats.length > 1 ? 'x' : ''} trouvé{filteredBoats.length > 1 ? 's' : ''}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Filter size={20} />
                  <span>Filtres</span>
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Effacer
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de bateau
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les types</option>
                    <option value="voilier">Voilier</option>
                    <option value="yacht">Yacht</option>
                    <option value="catamaran">Catamaran</option>
                    <option value="moteur">Bateau à moteur</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix par jour
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les prix</option>
                    <option value="0-300">0€ - 300€</option>
                    <option value="300-600">300€ - 600€</option>
                    <option value="600-1000">600€ - 1000€</option>
                    <option value="1000">+ de 1000€</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de personnes
                  </label>
                  <select
                    value={filters.capacity}
                    onChange={(e) => handleFilterChange('capacity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Toutes capacités</option>
                    <option value="6">6+ personnes</option>
                    <option value="8">8+ personnes</option>
                    <option value="10">10+ personnes</option>
                    <option value="12">12+ personnes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Boats Grid */}
          <div className="lg:w-3/4">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredBoats.map((boat) => (
                <BoatCard key={boat.id} boat={boat} />
              ))}
            </div>
            
            {filteredBoats.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun bateau ne correspond à vos critères</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Effacer les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}