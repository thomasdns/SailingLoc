import React, { useState } from 'react';
import { Trash2, Pencil, Plus, X, Image as ImageIcon } from 'lucide-react';

// Exemple de bateaux fictifs (à remplacer par un fetch API plus tard)
const fakeBoats = [
  { id: 1, name: 'Océanis 38.1', location: 'La Rochelle', type: 'Voilier', price: 200, photos: [], description: '', capacity: 8, availableAllYear: true, equipments: ['Climatisation', 'Wifi'] },
  { id: 2, name: 'Cap Camarat 7.5', location: 'Marseille', type: 'Bateau à moteur', price: 180, photos: [], description: '', capacity: 6, availableAllYear: false, equipments: ['Cuisine équipée'] },
  { id: 3, name: 'Lagoon 42', location: 'Nice', type: 'Catamaran', price: 350, photos: [], description: '', capacity: 10, availableAllYear: true, equipments: ['Salle de bain', 'Pont solarium'] }
];

export default function GestionBateaux() {
  const [boats, setBoats] = useState(fakeBoats);
  const [showModal, setShowModal] = useState(false);
  const [newBoat, setNewBoat] = useState({ name: '', type: '', location: '', price: '', photos: [], description: '', capacity: '', availableAllYear: false, equipments: [] });
  const [error, setError] = useState('');
  const [previewImages, setPreviewImages] = useState([]);

  const equipmentOptions = [
    'Climatisation',
    'Wifi',
    'Cuisine équipée',
    'Salle de bain',
    'Pont solarium'
  ];

  const handleDelete = (id) => {
    setBoats(boats.filter(b => b.id !== id));
  };

  const handleEdit = (id) => {
    alert('Fonctionnalité de modification à venir pour le bateau ID ' + id);
  };

  const handleAdd = () => {
    setShowModal(true);
    setNewBoat({ name: '', type: '', location: '', price: '', photos: [], description: '', capacity: '', availableAllYear: false, equipments: [] });
    setPreviewImages([]);
    setError('');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError('');
    setPreviewImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'availableAllYear') {
      setNewBoat({ ...newBoat, availableAllYear: checked });
    } else if (type === 'checkbox' && name === 'equipments') {
      if (checked) {
        setNewBoat({ ...newBoat, equipments: [...newBoat.equipments, value] });
      } else {
        setNewBoat({ ...newBoat, equipments: newBoat.equipments.filter(eq => eq !== value) });
      }
    } else {
      setNewBoat({ ...newBoat, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(images => {
      setPreviewImages(images);
      setNewBoat({ ...newBoat, photos: images });
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newBoat.name || !newBoat.type || !newBoat.location || !newBoat.price || !newBoat.description || !newBoat.capacity) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    setBoats([
      ...boats,
      { id: Date.now(), ...newBoat, price: Number(newBoat.price), capacity: Number(newBoat.capacity) }
    ]);
    setShowModal(false);
    setPreviewImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">Gestion de mes bateaux</h2>
          <button
            onClick={handleAdd}
            className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Ajouter un bateau</span>
          </button>
        </div>
        {boats.length === 0 ? (
          <p className="text-gray-600 text-center">Aucun bateau pour le moment.</p>
        ) : (
          <ul className="space-y-6">
            {boats.map(boat => (
              <li key={boat.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <div className="font-bold text-lg text-gray-900">{boat.name}</div>
                  <div className="text-gray-600 text-sm">{boat.type} — {boat.location}</div>
                  <div className="text-gray-700 text-sm mt-1">Prix : <span className="font-semibold">{boat.price} € / jour</span></div>
                  {boat.description && <div className="text-gray-700 text-sm mt-1"><span className="font-semibold">Description :</span> {boat.description}</div>}
                  <div className="text-gray-700 text-sm mt-1">Capacité : <span className="font-semibold">{boat.capacity} personnes</span></div>
                  <div className="text-gray-700 text-sm mt-1">Disponible toute l'année : <span className="font-semibold">{boat.availableAllYear ? 'Oui' : 'Non'}</span></div>
                  {boat.equipments && boat.equipments.length > 0 && (
                    <div className="text-gray-700 text-sm mt-1">
                      <span className="font-semibold">Équipements :</span> {boat.equipments.join(', ')}
                    </div>
                  )}
                  {boat.photos && boat.photos.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                      {boat.photos.map((img, idx) => (
                        <img key={idx} src={img} alt="Bateau" className="w-16 h-16 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(boat.id)}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700"
                    title="Modifier"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(boat.id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700"
                    title="Supprimer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal d'ajout de bateau */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-red-600 bg-white rounded-full shadow-lg p-1 z-50 border border-gray-200"
              onClick={handleModalClose}
              aria-label="Fermer"
            >
              <X className="h-8 w-8" />
            </button>
            <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Ajouter un bateau</h3>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Colonne 1 : infos principales */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Nom du bateau</label>
                    <input
                      type="text"
                      name="name"
                      value={newBoat.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200"
                      placeholder="Nom du bateau"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Type</label>
                    <select
                      name="type"
                      value={newBoat.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Voilier">Voilier</option>
                      <option value="Bateau à moteur">Bateau à moteur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Localisation</label>
                    <input
                      type="text"
                      name="location"
                      value={newBoat.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200"
                      placeholder="Ville ou port"
                    />
                  </div>
                </div>
                {/* Colonne 2 : détails */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Prix (€ / jour)</label>
                    <input
                      type="number"
                      name="price"
                      value={newBoat.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200"
                      placeholder="Prix par jour"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Capacité (personnes)</label>
                    <input
                      type="number"
                      name="capacity"
                      value={newBoat.capacity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200"
                      placeholder="Ex: 12"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
                {/* Colonne 3 : options et médias */}
                <div className="space-y-5">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="availableAllYear"
                      checked={newBoat.availableAllYear}
                      onChange={handleInputChange}
                      id="availableAllYear"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="availableAllYear" className="text-gray-900 font-medium">Disponible toute l'année</label>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Équipements</label>
                    <div className="flex flex-wrap gap-4">
                      {equipmentOptions.map((eq) => (
                        <label key={eq} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="equipments"
                            value={eq}
                            checked={newBoat.equipments.includes(eq)}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">{eq}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Description en bas, sur toute la largeur */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newBoat.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-200 text-base"
                  placeholder="Ex: Magnifique yacht de 16 mètres offrant un confort exceptionnel pour vos sorties en mer. Équipé de toutes les commodités modernes."
                  rows={6}
                />
              </div>
              {/* Photos en bas, sur toute la largeur */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Photos</label>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center cursor-pointer bg-blue-50 px-4 py-2 rounded-lg border-2 border-dashed border-blue-300 hover:bg-blue-100">
                    <ImageIcon className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="text-blue-700 font-medium">Ajouter des photos</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {previewImages.length > 0 && (
                    <div className="flex space-x-2">
                      {previewImages.map((img, idx) => (
                        <img key={idx} src={img} alt="Aperçu" className="w-12 h-12 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full font-bold text-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 