import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Charger les données utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Fonction pour enregistrer un nouvel utilisateur
  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }

      toast.success(data.message || 'Inscription réussie! Vous pouvez maintenant vous connecter.');
      return { success: true, data };
    } catch (error) {
      toast.error(error.message || 'Erreur lors de l\'inscription');
      return { success: false, error: error.message };
    }
  };

  // Fonction pour connecter un utilisateur
  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion');
      }

      // Sauvegarder le token et les informations utilisateur
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      toast.success(data.message || 'Connexion réussie!');
      return { success: true, data };
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la connexion');
      return { success: false, error: error.message };
    }
  };

  // Fonction pour déconnecter un utilisateur
  const logout = async () => {
    try {
      // Si un token existe, appeler l'API de déconnexion
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Nettoyer le localStorage et l'état
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setToken(null);
      setUser(null);
      toast.success('Déconnexion réussie');
    }
  };

  // Fonction pour obtenir le token (utile pour les requêtes authentifiées)
  const getToken = () => {
    return token || localStorage.getItem('token');
  };

  // Fonction pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    return !!user && !!token;
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    getToken,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

