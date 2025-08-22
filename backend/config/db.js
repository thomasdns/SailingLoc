// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const connectDB = async () => {
  try {
    // Vérifier que l'URI est définie
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Supprimer cette ligne : console.log("Connexion MongoDB réussie");
    return mongoose.connection;
  } catch (error) {
    console.error("Échec connexion MongoDB :", error.message);
    
    // En mode test, ne pas faire process.exit(1)
    if (process.env.NODE_ENV === 'test') {
      throw error; // Laisser Jest gérer l'erreur
    } else {
      process.exit(1);
    }
  }
};

export default connectDB;
