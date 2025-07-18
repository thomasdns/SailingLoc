import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MonCompte() {
  const navigate = useNavigate();
  const prenom = typeof window !== 'undefined' ? localStorage.getItem('userPrenom') : '';
  const role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : '';

  const handleLogout = () => {
    localStorage.removeItem('userPrenom');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Mon compte</h2>
        <p className="mb-8 text-lg">Bienvenue{prenom ? `, ${prenom}` : ''} !</p>
        <ul className="mb-8 text-left list-disc list-inside text-gray-700">
          {role === 'proprietaire' ? (
            <>
              <li>Ajouter un bateau</li>
              <li>Modifier un bateau</li>
              <li>Supprimer un bateau</li>
            </>
          ) : role === 'client' ? (
            <li>Réserver un bateau</li>
          ) : null}
        </ul>
        <button
          onClick={handleLogout}
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
} 