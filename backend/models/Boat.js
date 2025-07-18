import mongoose from 'mongoose';

const boatSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  type: {
    type: String,
    required: true,
    enum: ['voilier', 'bateau à moteur'],
  },
  longueur: { type: Number },
  prix_jour: { type: Number, required: true },
  capacite: { type: Number },
  image: { type: String, required: true },
  localisation: { type: String },
}, { timestamps: true });

export default mongoose.model('Boat', boatSchema); 