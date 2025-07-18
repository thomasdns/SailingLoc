import React, { useState } from 'react';
import { Trash2, Pencil, Plus } from 'lucide-react';

// Exemple de bateaux fictifs (à remplacer par un fetch API plus tard)
const fakeBoats = [
  { id: 1, name: 'Océanis 38.1', location: 'La Rochelle', type: 'Voilier' },
  { id: 2, name: 'Cap Camarat 7.5', location: 'Marseille', type: 'Bateau à moteur' },
  { id: 3, name: 'Lagoon 42', location: 'Nice', type: 'Catamaran' }
];

export default function GestionBateaux() {
  const [boats, setBoats] = useState(fakeBoats);

  const handleDelete = (id) => {
    setBoats(boats.filter(b => b.id !== id));
  };

  const handleEdit = (id) => {
    alert('Fonctionnalité de modification à venir pour le bateau ID ' + id);
  };

  const handleAdd = () => {
    alert('Fonctionnalité d\'ajout de bateau à venir !');
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
    </div>
  );
} 