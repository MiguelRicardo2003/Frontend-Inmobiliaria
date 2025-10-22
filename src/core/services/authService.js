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

  // Registar
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      // Verificar si la respuesta es exitosa
      if (response.data.success) {
        return { 
          success: true, 
          data: response.data,
          message: response.data.message || 'Usuario registrado correctamente'
        };
      }
      
      return { 
        success: false, 
        message: response.data.message || 'Error al registrar usuario'
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.msg ||
                          'Error al registrar usuario';
      throw new Error(errorMessage);
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  // Obtener Usuarios
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  },

  // Verificar si el usuario esta autenticado
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }
};

export default authService;
