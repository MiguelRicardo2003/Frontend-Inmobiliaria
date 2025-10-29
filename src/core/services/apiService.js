import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';

// Base URL desde variable de entorno o fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || (isProduction
  ? 'https://backend-inmobiliaria.vercel.app/service'
  : 'http://localhost:5000/service');

console.log('🔗 API Base URL:', API_BASE_URL); // Para debug

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Logout automático si el token expira (excepto en rutas de auth)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // No redirigir en rutas de autenticación
    const isAuthRoute = error.config?.url?.includes('/auth/login') || 
                       error.config?.url?.includes('/auth/register') ||
                       error.config?.url?.includes('/auth/forgot-password') ||
                       error.config?.url?.includes('/auth/verify-otp') ||
                       error.config?.url?.includes('/auth/reset-password');
    
    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
