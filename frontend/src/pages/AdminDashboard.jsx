import React, { useState, useEffect } from 'react';
import { Users, Anchor, BarChart3, Settings, LogOut, Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [viewingBoat, setViewingBoat] = useState(null);
  const [showBoatReviewsModal, setShowBoatReviewsModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [editFormData, setEditFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    role: 'client'
  });
  const [addFormData, setAddFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    password: '',
    role: 'client'
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBoats: 0,
    totalBookings: 0,
    totalReviews: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token d\'authentification manquant');
        window.location.href = '/connexion';
        return;
      }

      const response = await fetch('http://localhost:3001/api/auth/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Accès non autorisé');
          window.location.href = '/connexion';
          return;
        }
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      
      // Récupérer les vraies données des bateaux
      let boatsData = [];
      try {
        const boatsResponse = await fetch('http://localhost:3001/api/boats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (boatsResponse.ok) {
          const boatsResult = await boatsResponse.json();
          boatsData = boatsResult || []; // L'API retourne directement le tableau
          console.log(`Récupération de ${boatsData.length} bateaux depuis la base de données`);
        } else {
          console.log('Erreur API bateaux:', boatsResponse.status, boatsResponse.statusText);
        }
      } catch (error) {
        console.log('API des bateaux non disponible:', error.message);
      }

      // Récupérer les vraies données des réservations
      let bookingsData = [];
      try {
        const bookingsResponse = await fetch('http://localhost:3001/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (bookingsResponse.ok) {
          const bookingsResult = await bookingsResponse.json();
          bookingsData = bookingsResult.bookings || [];
          console.log(`Récupération de ${bookingsData.length} réservations depuis la base de données`);
        } else {
          console.log('Erreur API réservations:', bookingsResponse.status, bookingsResponse.statusText);
        }
      } catch (error) {
        console.log('API des réservations non disponible:', error.message);
      }

      // Récupérer les avis pour chaque bateau
      let totalReviews = 0;
      let boatsWithReviews = [];
      
      for (const boat of boatsData) {
        try {
          const reviewsResponse = await fetch(`http://localhost:3001/api/reviews/boat/${boat._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (reviewsResponse.ok) {
            const reviewsResult = await reviewsResponse.json();
            const reviews = reviewsResult.data || [];
            totalReviews += reviews.length;
            
            boatsWithReviews.push({
              ...boat,
              reviews: reviews,
              reviewCount: reviews.length
            });
          } else {
            boatsWithReviews.push({
              ...boat,
              reviews: [],
              reviewCount: 0
            });
          }
        } catch (error) {
          console.log(`Erreur lors de la récupération des avis pour ${boat.nom}:`, error.message);
          boatsWithReviews.push({
            ...boat,
            reviews: [],
            reviewCount: 0
          });
        }
      }

      // Récupérer tous les avis pour l'onglet Avis
      let allReviews = [];
      try {
        const allReviewsResponse = await fetch('http://localhost:3001/api/reviews', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (allReviewsResponse.ok) {
          const allReviewsResult = await allReviewsResponse.json();
          allReviews = allReviewsResult.data || [];
          console.log(`Récupération de ${allReviews.length} avis depuis la base de données`);
        } else {
          console.log('Erreur API avis:', allReviewsResponse.status, allReviewsResponse.statusText);
        }
      } catch (error) {
        console.log('API des avis non disponible:', error.message);
      }

      // Calculer les vraies statistiques
      const totalBoats = boatsData.length;
      const totalBookings = bookingsData.length;

      // Afficher des messages informatifs si les données ne sont pas disponibles
      if (boatsData.length === 0) {
        console.log('Aucun bateau trouvé dans la base de données');
      } else {
        console.log('Bateaux récupérés:', boatsData.map(b => ({ nom: b.nom, type: b.type, prix: b.prix_jour })));
      }
      if (bookingsData.length === 0) {
        console.log('Aucune réservation trouvée dans la base de données');
      }
      
      setStats({
        totalUsers: data.stats.totalUsers,
        totalBoats: totalBoats,
        totalBookings: totalBookings,
        totalReviews: totalReviews
      });

      setUsers(data.recentUsers.map(user => ({
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        status: user.status || 'actif',
        tel: user.tel || ''
      })));

      // Utiliser les vraies données des bateaux avec leurs avis
      setBoats(boatsWithReviews.map(boat => ({
        id: boat._id,
        nom: boat.nom,
        type: boat.type,
        longueur: boat.longueur,
        capacite: boat.capacite,
        prix: boat.prix_jour,
        localisation: boat.localisation,
        status: boat.disponible ? 'disponible' : 'indisponible',
        image: boat.image,
        createdAt: boat.createdAt,
        reviews: boat.reviews,
        reviewCount: boat.reviewCount
      })));

      // Mettre à jour l'état des avis
      setReviews(allReviews.map(review => ({
        id: review._id,
        userId: review.userId,
        boatId: review.boatId,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt
      })));
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userNom');
    localStorage.removeItem('userPrenom');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userTel');
    window.location.href = '/connexion';
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token d\'authentification manquant');
          window.location.href = '/connexion';
          return;
        }

        const response = await fetch(`http://localhost:3001/api/auth/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la suppression');
        }

        // Supprimer l'utilisateur de la liste locale
        setUsers(users.filter(user => user.id !== userId));
        toast.success('Utilisateur supprimé avec succès');
        
        // Recharger les données du dashboard pour mettre à jour les statistiques
        fetchDashboardData();
      } catch (error) {
        toast.error(error.message || 'Erreur lors de la suppression de l\'utilisateur');
        console.error(error);
      }
    }
  };

  const handleViewUser = (user) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  const handleViewBoat = (boat) => {
    setViewingBoat(boat);
    setShowBoatReviewsModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      tel: user.tel || '',
      role: user.role
    });
    setShowEditModal(true);
  };

  const handleAddUser = () => {
    setAddFormData({
      nom: '',
      prenom: '',
      email: '',
      tel: '',
      password: '',
      role: 'client'
    });
    setShowAddModal(true);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token d\'authentification manquant');
        window.location.href = '/connexion';
        return;
      }

      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addFormData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }

      const data = await response.json();
      
      // Ajouter le nouvel utilisateur à la liste locale
      const newUser = {
        id: data.user.id,
        nom: data.user.nom,
        prenom: data.user.prenom,
        email: data.user.email,
        tel: data.user.tel,
        role: data.user.role,
        status: 'active'
      };
      
      setUsers([newUser, ...users]);
      toast.success('Utilisateur créé avec succès');
      setShowAddModal(false);
      
      // Recharger les données du dashboard pour mettre à jour les statistiques
      fetchDashboardData();
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la création de l\'utilisateur');
      console.error(error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token d\'authentification manquant');
        window.location.href = '/connexion';
        return;
      }

      const response = await fetch(`http://localhost:3001/api/auth/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la modification');
      }

      const data = await response.json();
      
      // Mettre à jour l'utilisateur dans la liste locale
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...data.user }
          : user
      ));

      toast.success('Utilisateur modifié avec succès');
      setShowEditModal(false);
      setEditingUser(null);
      
      // Recharger les données du dashboard pour mettre à jour les statistiques
      fetchDashboardData();
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la modification de l\'utilisateur');
      console.error(error);
    }
  };

  const handleDeleteBoat = (boatId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bateau ?')) {
      setBoats(boats.filter(boat => boat.id !== boatId));
      toast.success('Bateau supprimé avec succès');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token d\'authentification manquant');
          return;
        }

        const response = await fetch(`http://localhost:3001/api/reviews/${reviewId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la suppression');
        }

        // Supprimer l'avis de la liste locale
        setReviews(reviews.filter(review => review.id !== reviewId));
        toast.success('Avis supprimé avec succès');
        
        // Recharger les données du dashboard pour mettre à jour les statistiques
        fetchDashboardData();
      } catch (error) {
        toast.error(error.message || 'Erreur lors de la suppression de l\'avis');
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <ToastContainer />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Admin</h1>
              <p className="text-gray-600">Gestion de la plateforme SailingLoc</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchDashboardData}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Rafraîchir les données"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Actualiser
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Anchor className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bateaux</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBoats}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Réservations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avis</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Utilisateurs
              </button>
              <button
                onClick={() => setActiveTab('boats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'boats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bateaux
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Avis
              </button>
              
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Utilisateurs récents</h4>
                    <div className="space-y-2">
                      {users.slice(0, 3).map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {user.prenom} {user.nom} ({user.role})
                          </span>
                          <span className="text-xs text-gray-400">{user.email}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Bateaux disponibles</h4>
                    <div className="space-y-2">
                      {boats.slice(0, 3).map(boat => (
                        <div key={boat.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{boat.nom}</span>
                          <span className="text-xs text-gray-400">{boat.prix}€/jour - {boat.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-lg font-semibold text-gray-900">Gestion des utilisateurs</h3>
                   <button 
                     onClick={handleAddUser}
                     className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                   >
                     <Plus className="h-4 w-4 mr-2" />
                     Ajouter un utilisateur
                   </button>
                 </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.prenom} {user.nom}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' :
                              user.role === 'proprietaire' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'actif' ? 'bg-green-100 text-green-800' :
                              user.status === 'inactif' ? 'bg-red-100 text-red-800' :
                              user.status === 'suspendu' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                             <div className="flex space-x-2">
                               <button 
                                 onClick={() => handleViewUser(user)}
                                 className="text-blue-600 hover:text-blue-900"
                                 title="Voir les détails"
                               >
                                 <Eye className="h-4 w-4" />
                               </button>
                               <button 
                                 onClick={() => handleEditUser(user)}
                                 className="text-indigo-600 hover:text-indigo-900"
                                 title="Modifier"
                               >
                                 <Edit className="h-4 w-4" />
                               </button>
                               <button 
                                 onClick={() => handleDeleteUser(user.id)}
                                 className="text-red-600 hover:text-red-900"
                                 title="Supprimer"
                               >
                                 <Trash2 className="h-4 w-4" />
                               </button>
                             </div>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Boats Tab */}
            {activeTab === 'boats' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gestion des bateaux</h3>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un bateau
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bateau
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Longueur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Capacité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avis
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {boats.map(boat => (
                        <tr key={boat.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{boat.nom}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 capitalize">{boat.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{boat.longueur}m</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{boat.capacite} pers.</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {boat.reviewCount || 0} avis
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              boat.status === 'disponible' ? 'bg-green-100 text-green-800' :
                              boat.status === 'loué' ? 'bg-blue-100 text-blue-800' :
                              boat.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                              boat.status === 'réservé' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {boat.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleViewBoat(boat)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Voir les avis"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteBoat(boat.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Gestion des avis</h3>
                  <div className="text-sm text-gray-500">
                    Total : {reviews.length} avis
                  </div>
                </div>
                
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Aucun avis disponible</h4>
                    <p className="text-gray-500">Aucun utilisateur n'a encore laissé d'avis sur les bateaux.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Utilisateur
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bateau
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Note
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Commentaire
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reviews.map(review => (
                          <tr key={review.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {review.userId?.prenom} {review.userId?.nom}
                              </div>
                              <div className="text-xs text-gray-500">
                                {review.userId?.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {boats.find(boat => boat.id === review.boatId?._id || boat.id === review.boatId)?.nom || 'Bateau supprimé'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {boats.find(boat => boat.id === review.boatId?._id || boat.id === review.boatId)?.type || ''}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-lg ${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                  ({review.rating}/5)
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="max-w-xs">
                                <p className="text-sm text-gray-900 truncate" title={review.comment}>
                                  "{review.comment}"
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Supprimer l'avis"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
          </div>
                 </div>
       </div>

               {/* Modal d'édition utilisateur */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Modifier l'utilisateur
                </h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingUser(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={editFormData.prenom}
                    onChange={(e) => setEditFormData({...editFormData, prenom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={editFormData.nom}
                    onChange={(e) => setEditFormData({...editFormData, nom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={editFormData.tel}
                    onChange={(e) => setEditFormData({...editFormData, tel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0123456789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle
                  </label>
                  <select
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="client">Client</option>
                    <option value="proprietaire">Propriétaire</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingUser(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Modifier
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

                 {/* Modal de visualisation utilisateur */}
         {showViewModal && viewingUser && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
               <div className="flex justify-between items-center p-6 border-b">
                 <h3 className="text-lg font-semibold text-gray-900">
                   Détails de l'utilisateur
                 </h3>
                 <button
                   onClick={() => {
                     setShowViewModal(false);
                     setViewingUser(null);
                   }}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="h-6 w-6" />
                 </button>
               </div>
               
               <div className="p-6 space-y-4">
                 <div className="flex items-center space-x-4 mb-6">
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                     <span className="text-2xl font-bold text-blue-600">
                       {viewingUser.prenom.charAt(0)}{viewingUser.nom.charAt(0)}
                     </span>
                   </div>
                   <div>
                     <h4 className="text-xl font-semibold text-gray-900">
                       {viewingUser.prenom} {viewingUser.nom}
                     </h4>
                     <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                       viewingUser.role === 'admin' ? 'bg-red-100 text-red-800' :
                       viewingUser.role === 'proprietaire' ? 'bg-blue-100 text-blue-800' :
                       'bg-green-100 text-green-800'
                     }`}>
                       {viewingUser.role}
                     </span>
                   </div>
                 </div>

                 <div className="space-y-4">
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="text-sm font-medium text-gray-600">Prénom</span>
                     <span className="text-sm text-gray-900">{viewingUser.prenom}</span>
                   </div>
                   
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="text-sm font-medium text-gray-600">Nom</span>
                     <span className="text-sm text-gray-900">{viewingUser.nom}</span>
                   </div>
                   
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="text-sm font-medium text-gray-600">Email</span>
                     <span className="text-sm text-gray-900">{viewingUser.email}</span>
                   </div>
                   
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="text-sm font-medium text-gray-600">Téléphone</span>
                     <span className="text-sm text-gray-900">{viewingUser.tel || 'Non renseigné'}</span>
                   </div>
                   
                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
                     <span className="text-sm font-medium text-gray-600">Statut</span>
                     <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                       {viewingUser.status || 'Actif'}
                     </span>
                   </div>
                 </div>

                 <div className="flex space-x-3 pt-6">
                   <button
                     onClick={() => {
                       setShowViewModal(false);
                       setViewingUser(null);
                       handleEditUser(viewingUser);
                     }}
                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                   >
                     Modifier
                   </button>
                   <button
                     onClick={() => {
                       setShowViewModal(false);
                       setViewingUser(null);
                     }}
                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                   >
                     Fermer
                   </button>
                 </div>
               </div>
             </div>
           </div>
         )}

         {/* Modal d'ajout utilisateur */}
         {showAddModal && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
               <div className="flex justify-between items-center p-6 border-b">
                 <h3 className="text-lg font-semibold text-gray-900">
                   Ajouter un utilisateur
                 </h3>
                 <button
                   onClick={() => {
                     setShowAddModal(false);
                   }}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="h-6 w-6" />
                 </button>
               </div>
               
               <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Prénom *
                   </label>
                   <input
                     type="text"
                     value={addFormData.prenom}
                     onChange={(e) => setAddFormData({...addFormData, prenom: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Nom *
                   </label>
                   <input
                     type="text"
                     value={addFormData.nom}
                     onChange={(e) => setAddFormData({...addFormData, nom: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Email *
                   </label>
                   <input
                     type="email"
                     value={addFormData.email}
                     onChange={(e) => setAddFormData({...addFormData, email: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Mot de passe *
                   </label>
                   <input
                     type="password"
                     value={addFormData.password}
                     onChange={(e) => setAddFormData({...addFormData, password: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                     minLength="6"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Téléphone *
                   </label>
                   <input
                     type="tel"
                     value={addFormData.tel}
                     onChange={(e) => setAddFormData({...addFormData, tel: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="0123456789"
                     pattern="[0-9]{10}"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Rôle *
                   </label>
                   <select
                     value={addFormData.role}
                     onChange={(e) => setAddFormData({...addFormData, role: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                   >
                     <option value="client">Client</option>
                     <option value="proprietaire">Propriétaire</option>
                     <option value="admin">Admin</option>
                   </select>
                 </div>
                 
                 <div className="flex space-x-3 pt-4">
                   <button
                     type="button"
                     onClick={() => {
                       setShowAddModal(false);
                     }}
                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                   >
                     Annuler
                   </button>
                   <button
                     type="submit"
                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                   >
                     Créer
                   </button>
                 </div>
               </form>
             </div>
           </div>
         )}

         {/* Modal d'affichage des avis d'un bateau */}
         {showBoatReviewsModal && viewingBoat && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
               <div className="flex justify-between items-center p-6 border-b">
                 <h3 className="text-lg font-semibold text-gray-900">
                   Avis du bateau : {viewingBoat.nom}
                 </h3>
                 <button
                   onClick={() => {
                     setShowBoatReviewsModal(false);
                     setViewingBoat(null);
                   }}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="h-6 w-6" />
                 </button>
               </div>
               
               <div className="p-6 overflow-y-auto max-h-[60vh]">
                 {viewingBoat.reviews && viewingBoat.reviews.length > 0 ? (
                   <div className="space-y-4">
                     {viewingBoat.reviews.map((review, index) => (
                       <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                         <div className="flex items-center justify-between mb-3">
                           <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                               <span className="text-sm font-semibold text-blue-600">
                                 {review.userId?.nom?.charAt(0) || review.userId?.prenom?.charAt(0) || 'U'}
                               </span>
                             </div>
                             <div>
                               <h4 className="font-medium text-gray-900">
                                 {review.userId?.prenom} {review.userId?.nom}
                               </h4>
                               <p className="text-sm text-gray-500">
                                 {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                                   day: 'numeric',
                                   month: 'long',
                                   year: 'numeric'
                                 })}
                               </p>
                             </div>
                           </div>
                           <div className="flex items-center space-x-1">
                             {[...Array(5)].map((_, i) => (
                               <span
                                 key={i}
                                 className={`text-lg ${
                                   i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                 }`}
                               >
                                 ★
                               </span>
                             ))}
                           </div>
                         </div>
                         <div className="bg-white rounded-lg p-3 border border-gray-100">
                           <p className="text-gray-700 italic">"{review.comment}"</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-12">
                     <div className="text-gray-400 mb-4">
                       <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                       </svg>
                     </div>
                     <h4 className="text-lg font-medium text-gray-900 mb-2">Aucun avis disponible</h4>
                     <p className="text-gray-500">Ce bateau n'a pas encore reçu d'avis.</p>
                   </div>
                 )}
               </div>

               <div className="flex justify-end p-6 border-t border-gray-200">
                 <button
                   onClick={() => {
                     setShowBoatReviewsModal(false);
                     setViewingBoat(null);
                   }}
                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                 >
                   Fermer
                 </button>
               </div>
             </div>
           </div>
         )}
     </div>
   );
 }
