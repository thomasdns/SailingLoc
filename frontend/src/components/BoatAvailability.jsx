import React, { useState, useEffect } from 'react';
import { Calendar, Plus, X, Check, AlertTriangle, Pencil } from 'lucide-react';

const BoatAvailability = ({ boatId, existingPeriods = [], onAvailabilityChange, isEditing = false }) => {
  const [availabilityPeriods, setAvailabilityPeriods] = useState(existingPeriods);
  const [newPeriod, setNewPeriod] = useState({
    startDate: '',
    endDate: '',
    price: '',
    notes: ''
  });
  const [isAddingPeriod, setIsAddingPeriod] = useState(false);
  const [editingPeriodId, setEditingPeriodId] = useState(null);
  const [editingPeriod, setEditingPeriod] = useState({});
  const [error, setError] = useState('');

  // Mettre à jour les périodes quand les props changent
  useEffect(() => {
    setAvailabilityPeriods(existingPeriods);
  }, [existingPeriods]);

  // Charger les disponibilités existantes seulement si pas de props
  useEffect(() => {
    if (boatId && existingPeriods.length === 0) {
      loadAvailability();
    }
  }, [boatId, existingPeriods.length]);

  const loadAvailability = async () => {
    try {
      console.log('🔄 Chargement des disponibilités pour le bateau:', boatId);
      
      const response = await fetch(`http://localhost:3001/api/boats/${boatId}/availability`);
      
      console.log('📡 Réponse du serveur:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Disponibilités chargées:', data);
        setAvailabilityPeriods(data);
      } else {
        console.error('❌ Erreur lors du chargement des disponibilités:', response.status, response.statusText);
        
        if (response.status === 404) {
          console.error('Bateau non trouvé');
        } else if (response.status === 500) {
          console.error('Erreur serveur');
        }
        
        // Essayer de récupérer le message d'erreur
        try {
          const errorData = await response.json();
          console.error('Détails de l\'erreur:', errorData);
        } catch (e) {
          console.error('Impossible de lire le message d\'erreur');
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des disponibilités:', error);
    }
  };

  const handleAddPeriod = () => {
    console.log('🔄 Ajout d\'une nouvelle période:', newPeriod);
    
    if (!newPeriod.startDate || !newPeriod.endDate) {
      setError('Veuillez remplir toutes les dates');
      return;
    }

    if (new Date(newPeriod.startDate) >= new Date(newPeriod.endDate)) {
      setError('La date de fin doit être après la date de début');
      return;
    }

    if (!newPeriod.price || newPeriod.price <= 0) {
      setError('Veuillez entrer un prix valide');
      return;
    }

    console.log('✅ Validation des données réussie');

    // Vérifier s'il y a déjà une disponibilité (une seule autorisée)
    if (availabilityPeriods.length > 0) {
      setError('Une disponibilité existe déjà. Vous pouvez la modifier ou la supprimer.');
      return;
    }

    // Ajouter la nouvelle période
    const periodToAdd = {
      ...newPeriod,
      id: Date.now(), // ID temporaire
      boatId: boatId
    };

    console.log('📅 Période à ajouter:', periodToAdd);
    console.log('📋 Périodes existantes avant ajout:', availabilityPeriods);

    setAvailabilityPeriods([periodToAdd]);
    
    // Réinitialiser le formulaire
    setNewPeriod({
      startDate: '',
      endDate: '',
      price: '',
      notes: ''
    });
    setIsAddingPeriod(false);
    setError('');

    // Notifier le composant parent
    if (onAvailabilityChange) {
      console.log('📤 Notification au composant parent avec la nouvelle disponibilité');
      onAvailabilityChange([periodToAdd]);
    }
  };

  const handleDeletePeriod = async (periodId) => {
    try {
      if (boatId) {
        const response = await fetch(`http://localhost:3001/api/boats/${boatId}/availability/${periodId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const updatedPeriods = availabilityPeriods.filter(period => period.id !== periodId && period._id !== periodId);
          setAvailabilityPeriods(updatedPeriods);
          
          // Notifier le composant parent
          if (onAvailabilityChange) {
            onAvailabilityChange(updatedPeriods);
          }
        }
      } else {
        // Si pas de boatId (bateau pas encore créé), supprimer localement
        const updatedPeriods = availabilityPeriods.filter(period => period.id !== periodId && period._id !== periodId);
        setAvailabilityPeriods(updatedPeriods);
        
        if (onAvailabilityChange) {
          onAvailabilityChange(updatedPeriods);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError('Erreur lors de la suppression de la période');
    }
  };

  const handleClearAvailability = () => {
    // Permettre de supprimer la disponibilité existante
    setAvailabilityPeriods([]);
    setError('');
    
    // Notifier le composant parent
    if (onAvailabilityChange) {
      onAvailabilityChange([]);
    }
  };

  const handleEditPeriod = (period) => {
    setEditingPeriodId(period.id || period._id);
    setEditingPeriod({
      startDate: period.startDate.split('T')[0],
      endDate: period.endDate.split('T')[0],
      price: period.price,
      notes: period.notes || ''
    });
  };

  const handleSaveEdit = () => {
    if (!editingPeriod.startDate || !editingPeriod.endDate || !editingPeriod.price) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (new Date(editingPeriod.startDate) >= new Date(editingPeriod.endDate)) {
      setError('La date de fin doit être après la date de début');
      return;
    }

    // Vérifier les conflits avec les autres périodes
    const hasConflict = availabilityPeriods.some(period => {
      if (period.id === editingPeriodId || period._id === editingPeriodId) return false;
      
      const newStart = new Date(editingPeriod.startDate);
      const newEnd = new Date(editingPeriod.endDate);
      const existingStart = new Date(period.startDate);
      const existingEnd = new Date(period.endDate);

      return (newStart < existingEnd && newEnd > existingStart);
    });

    if (hasConflict) {
      setError('Cette période chevauche une période existante');
      return;
    }

    // Mettre à jour la période
    const updatedPeriods = availabilityPeriods.map(period => {
      if (period.id === editingPeriodId || period._id === editingPeriodId) {
        return {
          ...period,
          startDate: editingPeriod.startDate,
          endDate: editingPeriod.endDate,
          price: parseFloat(editingPeriod.price),
          notes: editingPeriod.notes
        };
      }
      return period;
    });

    setAvailabilityPeriods(updatedPeriods);
    setEditingPeriodId(null);
    setEditingPeriod({});
    setError('');

    // Notifier le composant parent
    if (onAvailabilityChange) {
      onAvailabilityChange(updatedPeriods);
    }
  };

  const handleCancelEdit = () => {
    setEditingPeriodId(null);
    setEditingPeriod({});
    setError('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
          Gestion de la disponibilité
        </h3>
        
        {!isAddingPeriod && availabilityPeriods.length === 0 && (
          <button
            onClick={() => setIsAddingPeriod(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter une disponibilité</span>
          </button>
        )}
      </div>

      {/* Formulaire d'ajout de période */}
      {isAddingPeriod && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">Nouvelle période de disponibilité</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de début *
              </label>
              <input
                type="date"
                value={newPeriod.startDate}
                onChange={(e) => setNewPeriod({...newPeriod, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin *
              </label>
              <input
                type="date"
                value={newPeriod.endDate}
                onChange={(e) => setNewPeriod({...newPeriod, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={newPeriod.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix par jour (€) *
              </label>
              <input
                type="number"
                value={newPeriod.price}
                onChange={(e) => setNewPeriod({...newPeriod, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <input
                type="text"
                value={newPeriod.notes}
                onChange={(e) => setNewPeriod({...newPeriod, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Conditions spéciales..."
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleAddPeriod}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Check className="h-4 w-4" />
              <span>Confirmer</span>
            </button>
            
            <button
              onClick={() => {
                setIsAddingPeriod(false);
                setError('');
                setNewPeriod({
                  startDate: '',
                  endDate: '',
                  price: '',
                  notes: ''
                });
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Annuler</span>
            </button>
          </div>
        </div>
      )}

      {/* Affichage de la disponibilité existante */}
      {availabilityPeriods.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">Disponibilité actuelle</h4>
          
          <div className="space-y-3">
            {availabilityPeriods.map((period, index) => (
              <div key={period.id || period._id || index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                {editingPeriodId === (period.id || period._id) ? (
                  // Mode édition
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                      <input
                        type="date"
                        value={editingPeriod.startDate}
                        onChange={(e) => setEditingPeriod({...editingPeriod, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                      <input
                        type="date"
                        value={editingPeriod.endDate}
                        onChange={(e) => setEditingPeriod({...editingPeriod, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prix par jour (€)</label>
                      <input
                        type="number"
                        value={editingPeriod.price}
                        onChange={(e) => setEditingPeriod({...editingPeriod, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <input
                        type="text"
                        value={editingPeriod.notes}
                        onChange={(e) => setEditingPeriod({...editingPeriod, notes: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  // Mode affichage
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Période</span>
                      <p className="text-gray-900">
                        {formatDate(period.startDate)} - {formatDate(period.endDate)}
                      </p>
                      <span className="text-xs text-gray-500">
                        {calculateDuration(period.startDate, period.endDate)} jours
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500">Prix par jour</span>
                      <p className="text-lg font-semibold text-green-600">{period.price} €</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500">Prix total</span>
                      <p className="text-lg font-semibold text-blue-600">
                        {period.price * calculateDuration(period.startDate, period.endDate)} €
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPeriod(period)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={handleClearAvailability}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                        title="Supprimer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Boutons d'édition */}
                {editingPeriodId === (period.id || period._id) && (
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>Sauvegarder</span>
                    </button>
                    
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Annuler</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message si aucune disponibilité */}
      {availabilityPeriods.length === 0 && !isAddingPeriod && (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>Aucune disponibilité définie</p>
          <p className="text-sm">Ajoutez une disponibilité pour permettre la réservation</p>
        </div>
      )}

      {/* Informations sur la gestion des disponibilités */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Gestion automatique des réservations</p>
            <p>Les clients ne pourront réserver que pendant les périodes de disponibilité définies. 
            Les dates déjà réservées seront automatiquement exclues des périodes disponibles.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatAvailability;
