# SailingLoc

SailingLoc est une plateforme web de location de bateaux entre particuliers. Elle permet aux utilisateurs de proposer leurs bateaux à la location, de rechercher des embarcations selon différents critères, et de réserver directement en ligne.


## Fonctionnalités principales

- Création et gestion de comptes utilisateurs (locataires & propriétaires)
- Ajout, modification et suppression d'annonces de bateaux
- Recherche filtrée par lieu, dates, type de bateau
- Réservation en ligne avec calendrier de disponibilité
- Tableau de bord pour chaque utilisateur 
- Sécurité des données et authentification JWT


## Architecture

Le projet repose sur l’architecture **MERN** :
- **MongoDB** : base de données
- **Express.js** : framework back-end Node.js
- **React** : bibliothèque front-end
- **Node.js** : environnement d’exécution JavaScript

Structure MVC respectée pour le front-end et le back-end.


## Stack technique

### Front-end
- React (avec Vite)
- Tailwind

### Back-end
- Node.js
- Express.js
- MongoDB
- JWT & Bcryptjs (sécurité)
- Dotenv (variables d'environnement)


### Outils
- Git & GitHub (gestion de version)
- Trello (gestion de projet)
- VSCode
- Postman (tests API)


## Installation et lancement

### 1. Cloner le dépôt
créer un dossier local
se déplacer dans ce dossier
cloner le repo : git clone https://github.com/nom-utilisateur/sailingloc.git

### Créer le fichier de configuration de base de données
cd /backend
créer un fichier .env
PORT=port
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret


### Installer les dépendances
Installez les dépendances du projet en vous rendant dans les dossiers backend et frontend : il est nécessaire d’exécuter l’installation des modules Node.js (via la commande npm install) dans chacun de ces répertoires.

### Lancer les serveurs
Lancez ensuite les serveurs front-end et back-end depuis leurs dossiers respectifs pour démarrer l’application via la commande npm run dev.