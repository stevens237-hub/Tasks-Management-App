# EasyTasks - Application de Gestion de Tâches

## Équipe
- Steve MBODA NGUENANG

## Description

EasyTasks est une application full-stack complète de gestion de tâches développée dans le cadre du cours INFO734 Full Stack Development. L'application offre une interface moderne et intuitive pour gérer des tâches avec des fonctionnalités incluant des vues de tableau Kanban et en liste, la catégorisation des tâches, le suivi des activités.

**Fonctionnalités principales:**
- Opérations CRUD complètes pour les tâches
- Vues multiples des tâches (Liste et Tableau Kanban)
- Priorisation des tâches (Haute, Moyenne, Normale, Basse)
- Étapes des tâches (À faire, En cours, Terminé)
- Suppression douce avec gestion de la corbeille
- Suivi des activités et commentaires
- Gestion des sous-tâches
- Authentification basée sur JWT
- Interface utilisateur moderne et responsive avec Tailwind CSS

## Stack Technique

### Frontend
- **React 19** - Bibliothèque UI
- **Redux Toolkit** - Gestion d'état
- **React Router DOM v7** - Routage côté client
- **Tailwind CSS v4** - Stylisation
- **React Hook Form** - Gestion des formulaires
- **Vite** - Outil de build et serveur de développement
- **React Icons** - Bibliothèque d'icônes
- **Recharts** - Visualisation de données
- **Sonner** - Notifications toast

### Backend
- **Node.js** - Environnement d'exécution
- **Express.js v5** - Framework web
- **MongoDB** - Base de données (driver natif)
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe
- **CORS** - Partage de ressources cross-origin
- **Express Validator** - Validation des entrées

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** v18+ 
- **npm** v9+ (installé avec Node.js)
- **MongoDB** v6+ (base de données universitaire fournie)
- **Git** (pour le contrôle de version)
- **Postman** (optionnel, pour tester l'API)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/stevens237-hub/Tasks-Management-App.git
```

### 2. Configuration du Backend

```bash
# Naviguer vers le dossier backend
cd Backend

# Installer les dépendances
npm install
```

**Créer le fichier `.env` à la racine du dossier Backend:**

```env
# Configuration MongoDB (Base de données universitaire)
MONGO_USERNAME=steve_mboda_nguenang
MONGO_PASSWORD=52506774
MONGO_HOST=193.48.125.44
MONGO_PORT=27017
MONGO_DB_NAME=steve_mboda_nguenang

# Secret JWT (Générez votre propre clé sécurisée)
JWT_SECRET=eff71b418b20397bfa351f9f9f850d987b8e9e6994d8f8f305a2c30fcaec3e66a5fc1c2a3edcb589f7ff4157d26d3049580030d5ea57f6a1258922f1249b883c

```

**Démarrer le serveur backend:**

```bash
# Mode développement (avec redémarrage automatique)
npm run dev

# Mode production
npm start
```
### 3. Configuration du Frontend

Ouvrir un nouveau terminal et exécuter:

```bash
# Naviguer vers le dossier frontend (depuis la racine du projet)
cd Frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```
