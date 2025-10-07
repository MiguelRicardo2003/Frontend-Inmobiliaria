import apiClient from './apiService.js';

const authService = {
  // Login
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { accessToken, usuario } = response.data;
      
      // Guardar token y usuario
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return { success: true, data: { accessToken, usuario } };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  // Register
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }
};

export default authService;
