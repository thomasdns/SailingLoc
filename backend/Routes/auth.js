import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, authorize } from "../middleware/auth.js";
import { validateCaptcha } from "../middleware/captcha.js";

const router = Router();

// Register
router.post("/register", validateCaptcha, async (req, res) => {
  try {
    // Extract data from request body
    const { email, password, nom, prenom, tel, role, isProfessionnel, siret, siren } = req.body;
    
    // Validation du mot de passe fort
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      });
    }

    // Validation du numéro de téléphone
    if (typeof tel !== "string" || !/^[0-9]{10}$/.test(tel)) {
      return res.status(400).json({
        message:
          "Le champ téléphone doit contenir exactement 10 chiffres (0-9), sans espaces ni caractères spéciaux.",
      });
    }
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // Validation du rôle
    const validRoles = ['admin', 'client', 'proprietaire'];
    const userRole = role || 'client'; // Rôle par défaut
    if (!validRoles.includes(userRole)) {
      return res.status(400).json({ message: 'Rôle invalide. Rôles autorisés: admin, client, proprietaire' });
    }

    // Validation SIRET et SIREN pour les propriétaires professionnels
    if (userRole === 'proprietaire' && isProfessionnel) {
      if (!siret || !siren) {
        return res.status(400).json({ 
          message: 'SIRET et SIREN sont obligatoires pour les propriétaires professionnels' 
        });
      }
      
      // Validation format SIRET (14 chiffres)
      if (!/^\d{14}$/.test(siret)) {
        return res.status(400).json({ 
          message: 'Le SIRET doit contenir exactement 14 chiffres' 
        });
      }
      
      // Validation format SIREN (9 chiffres)
      if (!/^\d{9}$/.test(siren)) {
        return res.status(400).json({ 
          message: 'Le SIREN doit contenir exactement 9 chiffres' 
        });
      }
    }

    // Check if user already exists with this email
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Un utilisateur existe déjà avec cet email." });
    }
    // Create new user
    user = new User({
      email,
      password,
      nom,
      prenom,
      tel,
      role: userRole,
      isProfessionnel: isProfessionnel || false,
      ...(userRole === 'proprietaire' && isProfessionnel && { siret, siren })
    });
    await user.save();
    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
        ? String(process.env.JWT_SECRET)
        : "your-secret-key",
      {
        expiresIn: process.env.JWT_EXPIRE
          ? String(process.env.JWT_EXPIRE)
          : "24h",
      }
    );
         res.status(201).json({
       token,
       user: {
         id: user._id,
         email: user.email,
         nom: user.nom,
         prenom: user.prenom,
         tel: user.tel,
         role: user.role,
         isProfessionnel: user.isProfessionnel,
         status: user.status, // Ajouter le statut
         ...(user.siret && { siret: user.siret }),
         ...(user.siren && { siren: user.siren })
       },
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
});

// Login
router.post("/login", validateCaptcha, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
        ? String(process.env.JWT_SECRET)
        : "your-secret-key",
      {
        expiresIn: process.env.JWT_EXPIRE
          ? String(process.env.JWT_EXPIRE)
          : "24h",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        tel: user.tel,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Dashboard Admin - Route protégée
router.get("/dashboard", protect, authorize('admin'), async (req, res) => {
  try {
    // Récupérer les statistiques
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalProprietaires = await User.countDocuments({ role: 'proprietaire' });

    // Récupérer les utilisateurs avec pagination et recherche
    const { page = 1, limit = 10, search = '', role = '', status = '' } = req.query;
    
    // Debug: afficher les paramètres reçus
    console.log('🔍 Backend - Paramètres reçus:', { page, limit, search, role, status });
    
    // Debug: vérifier le modèle User
    console.log('🔍 Backend - Modèle User:', User ? 'Chargé' : 'Non chargé');
    console.log('🔍 Backend - Schéma User:', User?.schema ? 'Défini' : 'Non défini');
    
    // Construire le filtre de recherche
    let filter = {};
    
    if (search) {
      filter.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { prenom: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      filter.role = role;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Debug: afficher le filtre construit
    console.log('🔍 Backend - Filtre construit:', filter);
    
    // Compter le total d'utilisateurs avec les filtres
    const totalFilteredUsers = await User.countDocuments(filter);
    console.log('🔍 Backend - Total d\'utilisateurs avec filtres:', totalFilteredUsers);
    
    // Récupérer les utilisateurs paginés
    const allUsers = await User.find(filter)
      .select('nom prenom email role isProfessionnel siret siren createdAt tel status')
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    
    console.log('🔍 Backend - Utilisateurs trouvés:', allUsers.length);
    if (allUsers.length > 0) {
      console.log('🔍 Backend - Premier utilisateur:', {
        nom: allUsers[0].nom,
        prenom: allUsers[0].prenom,
        status: allUsers[0].status
      });
    }

    res.json({
      stats: {
        totalUsers,
        totalAdmins,
        totalClients,
        totalProprietaires
      },
      allUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalFilteredUsers / parseInt(limit)),
        totalUsers: totalFilteredUsers,
        usersPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des données du dashboard." });
  }
});

// Supprimer un utilisateur - Route protégée
router.delete("/users/:userId", protect, authorize('admin'), async (req, res) => {
  try {
    const { userId } = req.params;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Empêcher la suppression de l'admin connecté
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Vous ne pouvez pas supprimer votre propre compte." });
    }

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(userId);

    res.json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur." });
  }
});

// Modifier un utilisateur - Route protégée
router.put("/users/:userId", protect, authorize('admin'), async (req, res) => {
  try {
    const { userId } = req.params;
    const { nom, prenom, email, tel, role, isProfessionnel, siret, siren } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Validation des données
    if (!nom || !prenom || !email) {
      return res.status(400).json({ message: "Nom, prénom et email sont requis." });
    }

    // Validation du numéro de téléphone
    if (tel && (typeof tel !== "string" || !/^[0-9]{10}$/.test(tel))) {
      return res.status(400).json({
        message: "Le champ téléphone doit contenir exactement 10 chiffres (0-9), sans espaces ni caractères spéciaux.",
      });
    }

    // Validation SIRET et SIREN pour les propriétaires professionnels
    if (role === 'proprietaire' && isProfessionnel) {
      if (!siret || !siren) {
        return res.status(400).json({ 
          message: 'SIRET et SIREN sont obligatoires pour les propriétaires professionnels' 
        });
      }
      
      // Validation format SIRET (14 chiffres)
      if (!/^\d{14}$/.test(siret)) {
        return res.status(400).json({ 
          message: 'Le SIRET doit contenir exactement 14 chiffres' 
        });
      }
      
      // Validation format SIREN (9 chiffres)
      if (!/^\d{9}$/.test(siren)) {
        return res.status(400).json({ 
          message: 'Le SIREN doit contenir exactement 9 chiffres' 
        });
      }
    }

    // Vérifier si l'email existe déjà (sauf pour l'utilisateur actuel)
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Un utilisateur existe déjà avec cet email." });
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        nom,
        prenom,
        email: email.toLowerCase(),
        tel,
        role: role || user.role,
        isProfessionnel: isProfessionnel || user.isProfessionnel,
        ...(isProfessionnel && siret && siren && { siret, siren })
      },
      { new: true, runValidators: true }
    );

         res.json({
       message: "Utilisateur modifié avec succès.",
       user: {
         id: updatedUser._id,
         nom: updatedUser.nom,
         prenom: updatedUser.prenom,
         email: updatedUser.email,
         tel: updatedUser.tel,
         role: updatedUser.role,
         isProfessionnel: updatedUser.isProfessionnel,
         status: updatedUser.status, // Ajouter le statut
         ...(updatedUser.siret && { siret: updatedUser.siret }),
         ...(updatedUser.siren && { siren: updatedUser.siren })
       }
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la modification de l'utilisateur." });
  }
});

export default router;
