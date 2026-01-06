@echo off
REM Script de configuration et lancement de l'application EasyTasks pour Windows
REM Ce script installe automatiquement toutes les dépendances

echo ==========================================
echo   Configuration de l'application EasyTasks
echo ==========================================
echo.

REM Vérifier si Node.js est installé
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Erreur: Node.js n'est pas installe
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js installe
node -v
echo npm installe
call npm -v
echo.

REM Vérifier si le dossier Backend existe
if not exist "Backend" (
    echo Erreur: Le dossier Backend n'existe pas
    echo Assurez-vous d'etre a la racine du projet EasyTasks
    pause
    exit /b 1
)

REM Vérifier si le dossier Frontend existe
if not exist "Frontend" (
    echo Erreur: Le dossier Frontend n'existe pas
    echo Assurez-vous d'etre a la racine du projet EasyTasks
    pause
    exit /b 1
)

echo ==========================================
echo   Installation des dependances
echo ==========================================
echo.

REM Installation des dépendances du Backend
echo Installation des dependances du Backend...
cd Backend

if exist "package.json" (
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo Dependances du Backend installees avec succes
    ) else (
        echo Erreur lors de l'installation des dependances du Backend
        pause
        exit /b 1
    )
) else (
    echo Erreur: package.json introuvable dans Backend
    pause
    exit /b 1
)

cd ..
echo.

REM Installation des dépendances du Frontend
echo Installation des dependances du Frontend...
cd Frontend

if exist "package.json" (
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo Dependances du Frontend installees avec succes
    ) else (
        echo Erreur lors de l'installation des dependances du Frontend
        pause
        exit /b 1
    )
) else (
    echo Erreur: package.json introuvable dans Frontend
    pause
    exit /b 1
)

cd ..
echo.

REM Vérifier si le fichier .env existe dans le backend
if not exist "Backend\.env" (
    echo ==========================================
    echo   Configuration de l'environnement
    echo ==========================================
    echo.
    echo Creation du fichier Backend\.env...
    (
        echo # Configuration MongoDB ^(Base de donnees universitaire^)
        echo MONGO_USERNAME=steve_mboda_nguenang
        echo MONGO_PASSWORD=52506774
        echo MONGO_HOST=193.48.125.44
        echo MONGO_PORT=27017
        echo MONGO_DB_NAME=steve_mboda_nguenang
        echo.
        echo # Secret JWT
        echo JWT_SECRET=eff71b418b20397bfa351f9f9f850d987b8e9e6994d8f8f305a2c30fcaec3e66a5fc1c2a3edcb589f7ff4157d26d3049580030d5ea57f6a1258922f1249b883c
        echo.
        echo # Configuration du serveur
        echo PORT=5000
        echo CLIENT_URL=http://localhost:3000
    ) > Backend\.env
    echo Fichier .env cree avec succes
    echo.
) else (
    echo Fichier .env deja existant
    echo.
)

echo ==========================================
echo   Lancement des serveurs
echo ==========================================
echo.

REM Démarrer le backend dans une nouvelle fenêtre
echo Demarrage du serveur Backend ^(port 5000^)...
start "EasyTasks Backend" cmd /k "cd Backend && npm start"

REM Attendre 4 secondes pour que le backend démarre
timeout /t 4 /nobreak >nul

echo Backend demarre
echo.

REM Démarrer le frontend dans une nouvelle fenêtre
echo Demarrage du serveur Frontend ^(port 3000^)...
start "EasyTasks Frontend" cmd /k "cd Frontend && npm run dev"

REM Attendre 4 secondes pour que le frontend démarre
timeout /t 4 /nobreak >nul

echo Frontend demarre
echo.

echo ==========================================
echo   Application demarree avec succes!
echo ==========================================
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:5000
echo API Test:  http://localhost:5000/api/test
echo.
echo Pour arreter l'application, fermez les fenetres Backend et Frontend
echo.
echo Les serveurs sont en cours d'execution...
echo.
pause
