import React, { useState } from 'react';
import { Plus, X, Upload, MapPin, Ship, Users, Euro, Ruler, Settings, Calendar } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import BoatAvailability from './BoatAvailability';

export default function AddBoat({ isOpen, onClose, onBoatAdded }) {
  const [formData, setFormData] = useState({
    nom: '',
    type: 'voilier',
    longueur: '',
    prix_jour: '',
    capacite: '',
    image: '',
    destination: '',
    description: '',
    equipements: []
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [customEquipment, setCustomEquipment] = useState('');
  const [showAvailability, setShowAvailability] = useState(false);
  const [availabilityPeriods, setAvailabilityPeriods] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Vérifier l'état de connexion
  const isAuthenticated = !!localStorage.getItem('token');

  // Log de l'état des disponibilités
  console.log('🔍 AddBoat: État des disponibilités:', availabilityPeriods);

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

  const handleAddCustomEquipment = () => {
    if (customEquipment.trim() && !formData.equipements.includes(customEquipment.trim())) {
      setFormData(prev => ({
        ...prev,
        equipements: [...prev.equipements, customEquipment.trim()]
      }));
      setCustomEquipment('');
    }
  };

  const handleRemoveEquipment = (equipmentToRemove) => {
    setFormData(prev => ({
      ...prev,
      equipements: prev.equipements.filter(eq => eq !== equipmentToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomEquipment();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        // Ne plus stocker l'image en Base64, on la stockera sur Firebase Storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvailabilityChange = (periods) => {
    console.log('📥 AddBoat: Mise à jour des disponibilités reçue:', periods);
    setAvailabilityPeriods(periods);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let imageUrl = '';

      // Upload de l'image si sélectionnée
      if (selectedImage) {
        const imageRef = ref(storage, `boats/${Date.now()}_${selectedImage.name}`);
        const snapshot = await uploadBytes(imageRef, selectedImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Préparer les données du bateau
      const boatData = {
        nom: formData.nom,
        type: formData.type,
        longueur: parseFloat(formData.longueur),
        prix_jour: parseFloat(formData.prix_jour),
        capacite: parseInt(formData.capacite),
        image: imageUrl,
        destination: formData.destination,
        description: formData.description,
        equipements: formData.equipements,
        // Inclure une seule disponibilité si elle existe
        availability: availabilityPeriods.length > 0 ? {
          startDate: availabilityPeriods[0].startDate,
          endDate: availabilityPeriods[0].endDate,
          price: parseFloat(availabilityPeriods[0].price),
          notes: availabilityPeriods[0].notes || ''
        } : null
      };

      // Créer le bateau
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour ajouter un bateau');
      }

      const response = await fetch('http://localhost:3001/api/boats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(boatData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error('Vous devez être connecté pour ajouter un bateau');
        } else if (response.status === 403) {
          throw new Error('Vous n\'avez pas les permissions pour ajouter un bateau');
        } else {
          throw new Error(errorData.message || 'Erreur lors de la création du bateau');
        }
      }

      const newBoat = await response.json();

      // Les disponibilités sont maintenant incluses directement dans la création du bateau
      console.log('✅ Bateau créé avec succès:', newBoat);
      console.log('📋 Disponibilités incluses:', newBoat.availabilities);

      setSuccess('Bateau et disponibilités ajoutés avec succès !');

      setFormData({
        nom: '',
        type: 'voilier',
        longueur: '',
        prix_jour: '',
        capacite: '',
        image: '',
        destination: '',
        description: '',
        equipements: []
      });
      setSelectedImage(null);
      setImagePreview(null);
      
      // Ne réinitialiser les disponibilités que si elles ont été sauvegardées
      if (availabilityPeriods.length > 0) {
        setAvailabilityPeriods([]);
        setShowAvailability(false);
      }

      if (onBoatAdded) {
        onBoatAdded(newBoat);
      }

      // Fermer le modal après un délai
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Vérifier si l'utilisateur est connecté
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connexion requise</h3>
          <p className="text-gray-600 mb-4">
            Vous devez être connecté pour ajouter un bateau.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Plus className="h-6 w-6 text-blue-600 mr-2" />
              Ajouter un nouveau bateau
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du bateau *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom du bateau"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de bateau *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="voilier">Voilier</option>
                  <option value="yacht">Yacht</option>
                  <option value="catamaran">Catamaran</option>
                  <option value="moteur">Bateau à moteur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longueur (mètres) *
                </label>
                <input
                  type="number"
                  name="longueur"
                  value={formData.longueur}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Longueur en mètres"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacité (personnes) *
                </label>
                <input
                  type="number"
                  name="capacite"
                  value={formData.capacite}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre de personnes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix par jour (€) *
                </label>
                <input
                  type="number"
                  name="prix_jour"
                  value={formData.prix_jour}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Prix en euros"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Port d'attache"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description détaillée du bateau..."
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image du bateau
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Choisir une image</span>
                </label>
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Équipements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Équipements disponibles
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
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
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customEquipment}
                  onChange={(e) => setCustomEquipment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ajouter un équipement personnalisé"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomEquipment}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
              
              {formData.equipements.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.equipements.map((equipment) => (
                    <span
                      key={equipment}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {equipment}
                      <button
                        type="button"
                        onClick={() => handleRemoveEquipment(equipment)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Gestion des disponibilités */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  Gestion des disponibilités
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAvailability(!showAvailability)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  {showAvailability ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{showAvailability ? 'Masquer' : 'Gérer les disponibilités'}</span>
                </button>
              </div>
              
              {showAvailability && (
                <BoatAvailability
                  boatId={null} // Pas encore créé
                  onAvailabilityChange={handleAvailabilityChange}
                />
              )}
            </div>

            {/* Messages d'erreur et de succès */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">{success}</p>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Ajout en cours...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Ajouter le bateau</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
