import React, { useState, useEffect } from 'react';
import { Pencil, X, Upload, MapPin, Ship, Users, Euro, Ruler } from 'lucide-react';

export default function EditBoat({ isOpen, onClose, onBoatUpdated, boatData }) {
  const [formData, setFormData] = useState({
    nom: '',
    type: 'voilier',
    longueur: '',
    prix_jour: '',
    capacite: '',
    image: '',
    localisation: '',
    description: '',
    equipements: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const equipmentOptions = [
    'Climatisation',
    'Wifi',
    'Cuisine équipée',
    'Salle de bain',
    'Pont solarium',
    'GPS',
    'Radio VHF',
    'Gilets de sauvetage',
    'Équipement de pêche',
    'Panneaux solaires'
  ];

  // Initialiser le formulaire avec les données du bateau quand le composant s'ouvre
  useEffect(() => {
    if (boatData && isOpen) {
      setFormData({
        nom: boatData.nom || '',
        type: boatData.type || 'voilier',
        longueur: boatData.longueur || '',
        prix_jour: boatData.prix_jour || '',
        capacite: boatData.capacite || '',
        image: boatData.image || '',
        localisation: boatData.localisation || '',
        description: boatData.description || '',
        equipements: boatData.equipements || []
      });
    }
  }, [boatData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          equipements: [...prev.equipements, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          equipements: prev.equipements.filter(eq => eq !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.nom || !formData.type || !formData.longueur || !formData.prix_jour || !formData.capacite || !formData.image || !formData.localisation) {
        throw new Error('Tous les champs obligatoires doivent être remplis');
      }

      if (!/^-?\d{1,3}\.\d+,-?\d{1,3}\.\d+$/.test(formData.localisation)) {
        throw new Error('La localisation doit être au format "longitude,latitude" (ex: 43.51246,5.124885)');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté');
      }

      const response = await fetch(`http://localhost:3001/api/boats/${boatData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nom: formData.nom,
          type: formData.type,
          longueur: Number(formData.longueur),
          prix_jour: Number(formData.prix_jour),
          capacite: Number(formData.capacite),
          image: formData.image,
          localisation: formData.localisation,
          description: formData.description,
          equipements: formData.equipements
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la modification du bateau');
      }

      setSuccess('Bateau modifié avec succès !');
      
      if (onBoatUpdated) {
        onBoatUpdated(data);
      }

      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Pencil className="h-6 w-6 text-blue-600" />
            Modifier le bateau
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du bateau *</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Le Grand Bleu"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="voilier">Voilier</option>
                <option value="bateau à moteur">Bateau à moteur</option>
                <option value="catamaran">Catamaran</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Longueur (m) *
              </label>
              <input
                type="number"
                name="longueur"
                value={formData.longueur}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12.5"
                min="2"
                max="100"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Prix/jour (€) *
              </label>
              <input
                type="number"
                name="prix_jour"
                value={formData.prix_jour}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="150"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Capacité *
              </label>
              <input
                type="number"
                name="capacite"
                value={formData.capacite}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8"
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Image *
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Localisation *
              </label>
              <input
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="43.51246,5.124885"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Format: longitude,latitude</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description détaillée du bateau..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Équipements disponibles</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {equipmentOptions.map((equipment) => (
                <label key={equipment} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={equipment}
                    checked={formData.equipements.includes(equipment)}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{equipment}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Modification en cours...
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" />
                  Modifier le bateau
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
