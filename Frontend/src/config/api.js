// Configuration de l'URL de l'API backend
// En développement, utilise le proxy Vite configuré dans vite.config.js
// En production, utilise VITE_API_URL ou l'URL par défaut
export const API_URL = import.meta.env.VITE_API_URL || '/api';

