import { API_URL } from '../config/api';

/**
 * Fonction utilitaire pour faire des requêtes API authentifiées
 * @param {string} endpoint - L'endpoint de l'API (ex: '/auth/login')
 * @param {object} options - Les options de la requête fetch
 * @param {string} token - Le token d'authentification (optionnel)
 * @returns {Promise<Response>}
 */
export const apiRequest = async (endpoint, options = {}, token = null) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Ajouter le token d'authentification si fourni
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: { message: error.message || 'Erreur de connexion' },
    };
  }
};

