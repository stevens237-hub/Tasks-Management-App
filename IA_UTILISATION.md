# Utilisation de l'IA dans le Développement d'EasyTasks

**Projet :** EasyTasks - Task Management Application  
**IA utilisée :** Claude AI (Anthropic)

## Introduction

Ce document détaille mon utilisation de l'IA tout au long du développement d'EasyTasks. L'IA m'a servi de mentor technique, de pair-programmeur et d'outil de débogage, en privilégiant l'apprentissage plutôt que la génération automatique de code.

## 1. Conception et Architecture

### Structuration du projet

**Prompt :** *"Comment structurer mon application React/Node.js ?"*

**Apport de l'IA :**
- Architecture séparation Frontend/Backend
- Pattern MVC pour le backend
- Organisation claire des composants

**Résultat :** Structure professionnelle avec séparation des responsabilités.

### Choix technologiques

**Prompt :** *"Mongoose ou MongoDB native driver ?"*

**Analyse :** Comparaison détaillée → **Migration vers MongoDB native** pour compatibilité universitaire.

## 2. Débogage et Résolution de Problèmes

### Problème CORS (Erreur critique)

**Symptôme :**
```
Access to fetch blocked by CORS policy
```

**Prompt :** *"Mon frontend ne peut pas communiquer avec mon backend, erreur CORS. Voici mon server.js"*

**Solution fournie :**
```javascript
// CORS AVANT les routes (ordre crucial)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use("/api/tasks", taskRoutes);
```
**Leçon :** L'ordre des middlewares Express est crucial.


### Problème "Task not found"

**Prompt :** *"Je reçois 'Task not found' dans Postman"*

**Correction :**
```
❌ PUT /api/tasks/67591a8b3c4d5e6f7a8b9c0d
✅ PUT /api/tasks/update/67591a8b3c4d5e6f7a8b9c0d
```

### Authentification JWT

**Prompt :** *"Comment implémenter l'authentification JWT ?"*

**Production :**
- Explication du flux complet
- Middleware `protect` avec gestion d'erreurs
- Sécurisation des routes


### Erreur React "map is not a function"

**Prompt :** *"Uncaught TypeError: task?.links?.map is not a function"*

**Diagnostic :**
- `links` n'est pas un tableau
- Le backend envoie `assets`, pas `links`

**Solutions :**
```javascript
{Array.isArray(task?.assets) && task.assets.map(...)}
{(task?.assets || []).map(...)}
```

## 3. Optimisation et Bonnes Pratiques

### Révision de code

**Prompt :** *"Peux-tu revoir mon taskController ?"*

**Feedback :**
- Validation des entrées manquante
- Messages d'erreur plus descriptifs
- Constantes pour les enums
- Gestion des erreurs améliorée

### Scripts d'automatisation

**Prompt :** *"Comment automatiser le lancement ?"*

**Production :**
- Scripts `run.sh` et `run.bat`
- Installation auto des dépendances
- Création auto du `.env`
- Lancement simultané des serveurs


## 4. Méthodologie d'Interaction

### Principes appliqués

**1. Questions précises**
```
 "Mon code ne marche pas"
 "Erreur CORS. Voici mon server.js : [code]"
```

**2. Contexte complet**
- Fournir les fichiers de code
- Mentionner les erreurs exactes
- Expliquer les tentatives

**3. Demander des explications**
- "Pourquoi AuthContext plutôt que Redux ?"
- "Explique Mongoose vs native driver"

**4. Itérer**
- Questions de suivi
- Clarifications
- Approfondissement

### Exemples de prompts efficaces

**Compréhension :**
> "Explique la différence entre Mongoose et MongoDB native driver"

**Débogage :**
> "Voici mon code [code]. L'erreur est [erreur]. Que se passe-t-il ?"

**Architecture :**
> "Comment organiser mes routes Express ?"

**Bonnes pratiques :**
> "Meilleures pratiques pour sécuriser une API Node.js ?"

## 6. Bilan

### Apprentissages

1. **L'IA = outil d'apprentissage** - Toujours demander "pourquoi ?"
2. **Le contexte est crucial** - Plus d'infos = meilleures réponses
3. **Vérifier et comprendre** - Jamais copier sans comprendre
4. **Itérer** - Améliorer les réponses

## Conclusion

L'IA a accéléré le développement tout en permettant un véritable apprentissage. Elle m'a servi de **mentor technique**, **pair-programmeur**, **débogueur** et **documentaliste**.

La clé : utiliser l'IA comme **outil d'apprentissage interactif** plutôt que générateur de code. Chaque interaction m'a permis de comprendre le "pourquoi" derrière le "comment", développant ainsi de vraies compétences.


