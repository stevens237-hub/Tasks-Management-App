#!/bin/bash

# Script de configuration et lancement de l'application EasyTasks
# Ce script installe automatiquement toutes les dépendances

echo "=========================================="
echo "  Configuration de l'application EasyTasks"
echo "=========================================="
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null
then
    echo "❌ Erreur: Node.js n'est pas installé"
    echo "Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Vérifier si le dossier Backend existe
if [ ! -d "Backend" ]; then
    echo "❌ Erreur: Le dossier Backend n'existe pas"
    echo "Assurez-vous d'être à la racine du projet EasyTasks"
    exit 1
fi

# Vérifier si le dossier Frontend existe
if [ ! -d "Frontend" ]; then
    echo "❌ Erreur: Le dossier Frontend n'existe pas"
    echo "Assurez-vous d'être à la racine du projet EasyTasks"
    exit 1
fi

echo "=========================================="
echo "  Installation des dépendances"
echo "=========================================="
echo ""

# Installation des dépendances du Backend
echo "📦 Installation des dépendances du Backend..."
cd Backend

if [ -f "package.json" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Dépendances du Backend installées avec succès"
    else
        echo "❌ Erreur lors de l'installation des dépendances du Backend"
        exit 1
    fi
else
    echo "❌ Erreur: package.json introuvable dans Backend"
    exit 1
fi

cd ..
echo ""

# Installation des dépendances du Frontend
echo "📦 Installation des dépendances du Frontend..."
cd Frontend

if [ -f "package.json" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Dépendances du Frontend installées avec succès"
    else
        echo "❌ Erreur lors de l'installation des dépendances du Frontend"
        exit 1
    fi
else
    echo "❌ Erreur: package.json introuvable dans Frontend"
    exit 1
fi

cd ..
echo ""

# Vérifier si le fichier .env existe dans le backend
if [ ! -f "Backend/.env" ]; then
    echo "=========================================="
    echo "  Configuration de l'environnement"
    echo "=========================================="
    echo ""
    echo "📝 Création du fichier Backend/.env..."
    cat > Backend/.env << 'EOF'
# Configuration MongoDB (Base de données universitaire)
MONGO_USERNAME=steve_mboda_nguenang
MONGO_PASSWORD=52506774
MONGO_HOST=193.48.125.44
MONGO_PORT=27017
MONGO_DB_NAME=steve_mboda_nguenang

# Secret JWT
JWT_SECRET=eff71b418b20397bfa351f9f9f850d987b8e9e6994d8f8f305a2c30fcaec3e66a5fc1c2a3edcb589f7ff4157d26d3049580030d5ea57f6a1258922f1249b883c

# Configuration du serveur
PORT=5000
CLIENT_URL=http://localhost:3000
EOF
    echo "✅ Fichier .env créé avec succès"
    echo ""
else
    echo "✅ Fichier .env déjà existant"
    echo ""
fi

echo "=========================================="
echo "  Lancement des serveurs"
echo "=========================================="
echo ""

# Fonction pour nettoyer les processus en arrière-plan à l'arrêt du script
cleanup() {
    echo ""
    echo "=========================================="
    echo "  Arrêt des serveurs..."
    echo "=========================================="
    kill $(jobs -p) 2>/dev/null
    echo "✅ Serveurs arrêtés"
    exit 0
}

# Capturer Ctrl+C pour arrêter proprement les serveurs
trap cleanup SIGINT SIGTERM

# Démarrer le backend en arrière-plan
echo "🚀 Démarrage du serveur Backend (port 5000)..."
cd Backend
npm start &
BACKEND_PID=$!
cd ..

# Attendre que le backend démarre (3 secondes)
sleep 3

# Vérifier si le backend est toujours en cours d'exécution
if ! ps -p $BACKEND_PID > /dev/null; then
    echo "❌ Erreur: Le backend n'a pas pu démarrer"
    echo "Vérifiez les logs ci-dessus pour plus de détails"
    exit 1
fi

echo "✅ Backend démarré (PID: $BACKEND_PID)"
echo ""

# Démarrer le frontend en arrière-plan
echo "🚀 Démarrage du serveur Frontend (port 3000)..."
cd Frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Attendre que le frontend démarre (4 secondes)
sleep 4

# Vérifier si le frontend est toujours en cours d'exécution
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo "❌ Erreur: Le frontend n'a pas pu démarrer"
    echo "Arrêt du backend..."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "✅ Frontend démarré (PID: $FRONTEND_PID)"
echo ""

echo "=========================================="
echo "  Application démarrée avec succès!"
echo "=========================================="
echo ""
echo "📱 Frontend:  http://localhost:3000"
echo "🔌 Backend:   http://localhost:5000"
echo "🧪 API Test:  http://localhost:5000/api/test"
echo ""
echo "📋 Pour arrêter l'application, appuyez sur Ctrl+C"
echo ""
echo "⏳ Les serveurs sont en cours d'exécution..."
echo ""

# Attendre que l'utilisateur arrête le script
wait
