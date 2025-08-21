import { Router } from 'express';
import User from '../models/User.js';
import Boat from '../models/Boat.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.put('/update', async (req, res) => {
  try {
    const { id, nom, prenom, email, telephone, password, siret, siren } = req.body;

    // Charger l'utilisateur pour connaître son rôle/statut pro
    const currentUser = await User.findById(id);
    if (!currentUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const updateFields = { nom, prenom, email, tel: telephone };
    
    // Ajouter SIRET et SIREN seulement pour un propriétaire professionnel
    // et uniquement si valeurs non vides (ne pas écraser si champs vides)
    const isProOwner = currentUser.role === 'proprietaire' && currentUser.isProfessionnel === true;
    if (isProOwner) {
      if (siret !== undefined && String(siret).trim() !== '') {
        updateFields.siret = siret;
      }
      if (siren !== undefined && String(siren).trim() !== '') {
        updateFields.siren = siren;
      }
    }
    
    if (password && password.trim() !== '') {
      // Hash du mot de passe si modifié
      const bcrypt = await import('bcryptjs');
      updateFields.password = await bcrypt.default.hash(password, 10);
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );
    
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    
    res.json({
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        tel: user.tel,
        role: user.role,
        siret: user.siret,
        siren: user.siren
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});

// Endpoint pour supprimer le compte utilisateur
router.delete('/delete-account', protect, async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis le token JWT
    if (!req.user || !req.user._id) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const userId = req.user._id;
    
    if (!userId) {
      return res.status(401).json({ message: "Token d'authentification invalide" });
    }

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Récupérer les bateaux appartenant à l'utilisateur (pour supprimer réservations et avis liés)
    const ownedBoats = await Boat.find({ proprietaire: userId }).select('_id');
    const ownedBoatIds = ownedBoats.map(b => b._id);

    // Supprimer toutes les réservations liées à l'utilisateur (en tant que locataire) OU à ses bateaux (en tant que propriétaire)
    await Booking.deleteMany({ 
      $or: [
        { userId: userId },
        { boatId: { $in: ownedBoatIds } }
      ]
    });
    console.log(`Réservations supprimées pour l'utilisateur ${userId} et ses bateaux`);

    // Supprimer toutes les reviews de l'utilisateur
    await Review.deleteMany({ 
      $or: [
        { userId: userId },
        { boatId: { $in: ownedBoatIds } }
      ]
    });
    console.log(`Reviews supprimées pour l'utilisateur ${userId} et ses bateaux`);

    // Supprimer tous les bateaux appartenant à l'utilisateur (après avoir supprimé les dépendances)
    await Boat.deleteMany({ proprietaire: userId });
    console.log(`Bateaux supprimés pour l'utilisateur ${userId}`);

    // Supprimer l'utilisateur lui-même
    await User.findByIdAndDelete(userId);
    console.log(`Utilisateur ${userId} supprimé avec succès`);

    res.json({ 
      message: "Compte supprimé avec succès",
      details: "Toutes vos données ont été définitivement supprimées"
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error);
    res.status(500).json({ 
      message: "Erreur lors de la suppression du compte",
      error: error.message 
    });
  }
});

export default router; 