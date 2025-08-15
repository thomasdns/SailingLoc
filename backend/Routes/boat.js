import express from 'express';
import Boat from '../models/Boat.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Middleware pour vérifier le Content-Type application/json
function requireJsonContent(req, res, next) {
  if (!req.is('application/json')) {
    return res.status(415).json({ message: 'Content-Type doit être application/json.' });
  }
  next();
}

// GET /api/boats - Récupérer tous les bateaux
router.get('/', async (req, res) => {
  try {
    const boats = await Boat.find();
    res.json(boats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// POST /api/boats - Ajouter un nouveau bateau (propriétaire ou admin uniquement)
router.post('/', requireJsonContent, protect, authorize('proprietaire', 'admin'), async (req, res) => {
  try {
    const { nom, type, longueur, prix_jour, capacite, image, localisation } = req.body;

    // --- VALIDATIONS / CONTRAINTES ---
    // Vérification stricte des types
    if (typeof nom !== 'string') {
      return res.status(400).json({ message: 'Le champ nom doit être une chaîne de caractères.' });
    }
    if (typeof type !== 'string') {
      return res.status(400).json({ message: 'Le champ type doit être une chaîne de caractères.' });
    }
    if (typeof longueur !== 'number' || isNaN(longueur)) {
      return res.status(400).json({ message: 'Le champ longueur doit être un nombre.' });
    }
    if (typeof prix_jour !== 'number' || isNaN(prix_jour)) {
      return res.status(400).json({ message: 'Le champ prix_jour doit être un nombre.' });
    }
    if (typeof capacite !== 'number' || isNaN(capacite) || !Number.isInteger(capacite)) {
      return res.status(400).json({ message: 'Le champ capacite doit être un entier.' });
    }
    if (typeof image !== 'string') {
      return res.status(400).json({ message: 'Le champ image doit être une chaîne de caractères.' });
    }
    if (typeof localisation !== 'string') {
      return res.status(400).json({ message: 'Le champ localisation doit être une chaîne de caractères.' });
    }
    // Trim automatique des champs texte
    const nomTrim = typeof nom === 'string' ? nom.trim() : '';
    const typeTrim = typeof type === 'string' ? type.trim() : '';
    const imageTrim = typeof image === 'string' ? image.trim() : '';
    const localisationTrim = typeof localisation === 'string' ? localisation.trim() : '';

    // nom : longueur min/max, pas de caractères spéciaux, première lettre en majuscule
    const nomFormat = nomTrim.charAt(0).toUpperCase() + nomTrim.slice(1);
    if (nomFormat.length < 2 || nomFormat.length > 100) {
      return res.status(400).json({ message: "Le nom du bateau doit contenir entre 2 et 100 caractères." });
    }
    if (!/^[a-zA-Z0-9 \-']+$/.test(nomFormat)) {
      return res.status(400).json({ message: "Le nom du bateau contient des caractères non autorisés (lettres, chiffres, espaces, tirets, apostrophes uniquement)." });
    }
    // type : insensible à la casse, doit être dans l'énum du modèle
    const typeLower = typeTrim.toLowerCase();
    const typesAutorises = ['voilier', 'bateau à moteur'];
    if (!typesAutorises.includes(typeLower)) {
      return res.status(400).json({ message: `Le type doit être l'un des suivants : ${typesAutorises.join(', ')}` });
    }
    // longueur : nombre > 0, min 2, max 100
    if (typeof longueur !== 'number' || longueur <= 0 || longueur < 2 || longueur > 100) {
      return res.status(400).json({ message: "La longueur du bateau doit être un nombre positif entre 2 et 100 mètres." });
    }
    // prix_jour : nombre > 0
    if (typeof prix_jour !== 'number' || prix_jour <= 0) {
      return res.status(400).json({ message: "Le prix par jour doit être un nombre supérieur à 0." });
    }
    // capacite : entier > 0
    if (!Number.isInteger(capacite) || capacite <= 0) {
      return res.status(400).json({ message: "La capacité doit être un entier positif supérieur à 0." });
    }
    // Cohérence capacité/longueur (ex: capacité <= longueur*2)
    if (capacite > longueur * 2) {
      return res.status(400).json({ message: `La capacité (${capacite}) est trop élevée pour la longueur du bateau (${longueur}m). Maximum autorisé : ${longueur*2}` });
    }
    // image : chemin absolu (/, C:/, file:///), extension jpg/png/jpeg/gif/webp
    if (
      typeof imageTrim !== 'string' ||
      !(imageTrim.startsWith('/') || imageTrim.startsWith('C:/') || imageTrim.startsWith('file:///')) ||
      !/\.(jpg|jpeg|png|gif|webp)$/i.test(imageTrim)
    ) {
      return res.status(400).json({ message: "L'image doit être un chemin absolu valide et avoir une extension .jpg, .jpeg, .png, .gif ou .webp." });
    }
    // localisation : format 'longitude,latitude'
    if (
      typeof localisationTrim !== 'string' ||
      !/^-?\d{1,3}\.\d+,-?\d{1,3}\.\d+$/.test(localisationTrim)
    ) {
      return res.status(400).json({ message: "La localisation doit être au format 'longitude,latitude' (ex: 43.51246,5.124885)." });
    }
    // Vérifier si un bateau avec ce nom ET cette localisation existe déjà
    const existingBoat = await Boat.findOne({ nom: nomFormat, localisation: localisationTrim });
    if (existingBoat) {
      return res.status(409).json({ message: "Un bateau avec ce nom et cette localisation existe déjà." });
    }
    // --- FIN VALIDATIONS ---
    const nouveauBateau = new Boat({ nom: nomFormat, type: typeLower, longueur, prix_jour, capacite, image: imageTrim, localisation: localisationTrim });
    const bateauCree = await nouveauBateau.save();
    res.status(201).json({
      id: bateauCree._id,
      nom: bateauCree.nom,
      type: bateauCree.type,
      longueur: bateauCree.longueur,
      prix_jour: bateauCree.prix_jour,
      capacite: bateauCree.capacite,
      image: bateauCree.image,
      localisation: bateauCree.localisation
    });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout du bateau", error });
  }
});

// PUT /api/boats/:id - Modifier un bateau existant (propriétaire ou admin uniquement)
router.put('/:id', requireJsonContent, protect, authorize('proprietaire', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Récupérer le bateau existant
    const bateau = await Boat.findById(id);
    if (!bateau) {
      return res.status(404).json({ message: "Bateau non trouvé" });
    }

    // Vérification stricte des types pour les champs modifiés
    if (updateData.nom && typeof updateData.nom !== 'string') {
      return res.status(400).json({ message: 'Le champ nom doit être une chaîne de caractères.' });
    }
    if (updateData.type && typeof updateData.type !== 'string') {
      return res.status(400).json({ message: 'Le champ type doit être une chaîne de caractères.' });
    }
    if (updateData.longueur && (typeof updateData.longueur !== 'number' || isNaN(updateData.longueur))) {
      return res.status(400).json({ message: 'Le champ longueur doit être un nombre.' });
    }
    if (updateData.prix_jour && (typeof updateData.prix_jour !== 'number' || isNaN(updateData.prix_jour))) {
      return res.status(400).json({ message: 'Le champ prix_jour doit être un nombre.' });
    }
    if (updateData.capacite && (typeof updateData.capacite !== 'number' || isNaN(updateData.capacite) || !Number.isInteger(updateData.capacite))) {
      return res.status(400).json({ message: 'Le champ capacite doit être un entier.' });
    }
    if (updateData.image && typeof updateData.image !== 'string') {
      return res.status(400).json({ message: 'Le champ image doit être une chaîne de caractères.' });
    }
    if (updateData.localisation && typeof updateData.localisation !== 'string') {
      return res.status(400).json({ message: 'Le champ localisation doit être une chaîne de caractères.' });
    }
    // Trim automatique des champs texte
    const nomTrim = typeof updateData.nom === 'string' ? updateData.nom.trim() : '';
    const typeTrim = typeof updateData.type === 'string' ? updateData.type.trim() : '';
    const imageTrim = typeof updateData.image === 'string' ? updateData.image.trim() : '';
    const localisationTrim = typeof updateData.localisation === 'string' ? updateData.localisation.trim() : '';

    // nom : longueur min/max, pas de caractères spéciaux, première lettre en majuscule
    if (updateData.nom) {
      const nomFormat = nomTrim.charAt(0).toUpperCase() + nomTrim.slice(1);
      if (nomFormat.length < 2 || nomFormat.length > 100) {
        return res.status(400).json({ message: "Le nom du bateau doit contenir entre 2 et 100 caractères." });
      }
      if (!/^[a-zA-Z0-9 \-']+$/.test(nomFormat)) {
        return res.status(400).json({ message: "Le nom du bateau contient des caractères non autorisés (lettres, chiffres, espaces, tirets, apostrophes uniquement)." });
      }
    }
    if (updateData.type) {
      const typeLower = typeTrim.toLowerCase();
      const typesAutorises = ['voilier', 'bateau à moteur'];
      if (!typesAutorises.includes(typeLower)) {
        return res.status(400).json({ message: `Le type doit être l'un des suivants : ${typesAutorises.join(', ')}` });
      }
      updateData.type = typeLower;
      // On ne valide plus ici la liste, Mongoose gère l'énum
    }
    // longueur : nombre > 0, min 2, max 100
    if (updateData.longueur !== undefined) {
      if (typeof updateData.longueur !== 'number' || updateData.longueur <= 0 || updateData.longueur < 2 || updateData.longueur > 100) {
        return res.status(400).json({ message: "La longueur du bateau doit être un nombre positif entre 2 et 100 mètres." });
      }
    }
    // prix_jour : nombre > 0
    if (updateData.prix_jour !== undefined) {
      if (typeof updateData.prix_jour !== 'number' || updateData.prix_jour <= 0) {
        return res.status(400).json({ message: "Le prix par jour doit être un nombre supérieur à 0." });
      }
    }
    // capacite : entier > 0
    if (updateData.capacite !== undefined) {
      if (!Number.isInteger(updateData.capacite) || updateData.capacite <= 0) {
        return res.status(400).json({ message: "La capacité doit être un entier positif supérieur à 0." });
      }
    }
    // Cohérence capacité/longueur (ex: capacité <= longueur*2)
    const longueurFinale = updateData.longueur !== undefined ? updateData.longueur : bateau.longueur;
    const capaciteFinale = updateData.capacite !== undefined ? updateData.capacite : bateau.capacite;
    if (capaciteFinale > longueurFinale * 2) {
      return res.status(400).json({ message: `La capacité (${capaciteFinale}) est trop élevée pour la longueur du bateau (${longueurFinale}m). Maximum autorisé : ${longueurFinale*2}` });
    }
    // image : chemin absolu (/, C:/, file:///), extension jpg/png/jpeg/gif/webp
    if (updateData.image) {
      if (
        typeof imageTrim !== 'string' ||
        !(imageTrim.startsWith('/') || imageTrim.startsWith('C:/') || imageTrim.startsWith('file:///')) ||
        !/\.(jpg|jpeg|png|gif|webp)$/i.test(imageTrim)
      ) {
        return res.status(400).json({ message: "L'image doit être un chemin absolu valide et avoir une extension .jpg, .jpeg, .png, .gif ou .webp." });
      }
    }
    // localisation : format 'longitude,latitude'
    if (updateData.localisation) {
      if (
        typeof localisationTrim !== 'string' ||
        !/^-?\d{1,3}\.\d+,-?\d{1,3}\.\d+$/.test(localisationTrim)
      ) {
        return res.status(400).json({ message: "La localisation doit être au format 'longitude,latitude' (ex: 43.51246,5.124885)." });
      }
    }
    // Vérifier si un bateau avec ce nom ET cette localisation existe déjà (si modifiés)
    if (updateData.nom && updateData.localisation) {
      const nomFormat = nomTrim.charAt(0).toUpperCase() + nomTrim.slice(1);
      const existingBoat = await Boat.findOne({ nom: nomFormat, localisation: localisationTrim });
      if (existingBoat && existingBoat._id.toString() !== id) {
        return res.status(409).json({ message: "Un bateau avec ce nom et cette localisation existe déjà." });
      }
    }
    // --- FIN VALIDATIONS ---
    const bateauModifie = await Boat.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!bateauModifie) {
      return res.status(404).json({ message: "Bateau non trouvé" });
    }
    res.json(bateauModifie);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la modification du bateau", error });
  }
});

// DELETE /api/boats/:id - Supprimer un bateau (propriétaire ou admin uniquement)
router.delete('/:id', protect, authorize('proprietaire', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const bateauSupprime = await Boat.findByIdAndDelete(id);
    if (!bateauSupprime) {
      return res.status(404).json({ message: "Bateau non trouvé" });
    }
    res.json({ message: "Bateau supprimé avec succès"});
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la suppression du bateau", error });
  }
});

export default router; 