import axios from 'axios';

// Usa variable de entorno Vite si está definida; fallback a "/api"
const baseURL = import.meta?.env?.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helpers para manejar el token en la instancia centralizada
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export default api;