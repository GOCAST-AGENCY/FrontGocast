// Configuration de l'API
// En développement, utilise l'URL du .env ou localhost par défaut
// En production, utilise l'URL du .env ou l'URL de production

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default {
  baseURL: API_URL,
  apiURL: `${API_URL}/api`,
  uploadsURL: `${API_URL}/uploads`
};

