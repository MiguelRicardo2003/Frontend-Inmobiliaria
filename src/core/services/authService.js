import axios from 'axios';
import {
  saveTokenToCookies,
  saveRefreshTokenToCookies,
  removeTokenFromCookies,
  removeRefreshTokenFromCookies,
  clearAllAuthTokens,
  isTokenValid,
  isTokenExpiringSoon,
  getTokenTimeUntilExpiry,
  getTokenFromCookies,
  getRefreshTokenFromCookies,
} from '../store/auth/authUtils';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  PROFILE: '/auth/profile',
  UPDATE_PROFILE: '/auth/profile/update',
  CHANGE_PASSWORD: '/auth/change-password',
};

const APP_CONFIG = {
  TOKEN_REFRESH_THRESHOLD: 5 * 60, // 5 minutos
};

class AuthService {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
    this.setupInterceptors();
  }

  async login(credentials) {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.LOGIN, credentials);
      if (response.data.token) {
        this.storeTokens(response.data);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await axios.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Error en logout del servidor:', error);
    } finally {
      this.clearTokens();
    }
  }

  async refreshToken() {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = getRefreshTokenFromCookies();
      if (!refreshToken) throw new Error('No hay refresh token disponible');

      const response = await axios.post(AUTH_ENDPOINTS.REFRESH, { refreshToken });
      if (response.data.token) {
        this.storeTokens(response.data);
        this.processQueue(null, response.data.token);
        return response.data;
      } else {
        throw new Error('No se recibió token en la respuesta');
      }
    } catch (error) {
      this.processQueue(error, null);
      this.clearTokens();
      throw this.handleError(error);
    } finally {
      this.isRefreshing = false;
    }
  }

  async forgotPassword(email) {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyEmail(token) {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProfile() {
    try {
      const response = await axios.get(AUTH_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await axios.put(AUTH_ENDPOINTS.UPDATE_PROFILE, profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  storeTokens({ token, refreshToken }) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      saveTokenToCookies(token);
    }

    if (refreshToken) {
      saveRefreshTokenToCookies(refreshToken);
    }
  }

  clearTokens() {
    removeTokenFromCookies();
    removeRefreshTokenFromCookies();
    delete axios.defaults.headers.common['Authorization'];
  }

  isAuthenticated() {
    const token = getTokenFromCookies();
    return token && isTokenValid(token);
  }

  getTokenTimeRemaining() {
    const token = getTokenFromCookies();
    return getTokenTimeUntilExpiry(token);
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      error ? reject(error) : resolve(token);
    });
    this.failedQueue = [];
  }

  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400: return new Error(data.message || 'Datos inválidos.');
        case 401:
          this.clearTokens();
          return new Error('Sesión expirada. Inicia sesión nuevamente.');
        case 403: return new Error('No tienes permisos.');
        case 404: return new Error('Recurso no encontrado.');
        case 422: return new Error(typeof data.errors === 'object' ? JSON.stringify(data.errors) : data.message);
        case 429: return new Error('Demasiadas peticiones. Inténtalo más tarde.');
        case 500: return new Error('Error interno del servidor.');
        case 502:
        case 503:
        case 504:
          return new Error('Servicio temporalmente no disponible.');
        default:
          return new Error(data.message || 'Error inesperado.');
      }
    } else if (error.request) {
      return new Error('No se pudo conectar con el servidor.');
    } else {
      return new Error('Error al procesar la petición.');
    }
  }

  setupInterceptors() {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._authRetry) {
          originalRequest._authRetry = true;
          try {
            const { token } = await this.refreshToken();
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (refreshError) {
            this.clearTokens();
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async healthCheck() {
    try {
      const response = await axios.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

const authService = new AuthService();
export default authService;
