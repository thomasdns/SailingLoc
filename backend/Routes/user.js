import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.put('/update', async (req, res) => {
  try {
    const { id, nom, prenom, email, telephone } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { nom, prenom, email, tel: telephone },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        tel: user.tel,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});

export default router; 