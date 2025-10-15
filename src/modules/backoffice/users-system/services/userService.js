import apiClient from '@/core/services/apiService';

const userService = {
  // Obtener todos los usuarios
  async getUsers() {
    try {
      const response = await apiClient.get('/usuarios');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener usuarios' 
      };
    }
  },

  // Obtener usuario por ID
  async getUserById(id) {
    try {
      const response = await apiClient.get(`/usuarios/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener usuario' 
      };
    }
  },

  // Crear usuario
  async createUser(userData) {
    try {
      const response = await apiClient.post('/usuarios', userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creando usuario:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al crear usuario' 
      };
    }
  },

  // Actualizar usuario
  async updateUser(id, userData) {
    try {
      const response = await apiClient.put(`/usuarios/${id}`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al actualizar usuario' 
      };
    }
  },

  // Eliminar usuario
  async deleteUser(id) {
    try {
      const response = await apiClient.delete(`/usuarios/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Error al eliminar usuario' 
      };
    }
  },

  // Obtener roles disponibles
  async getRoles() {
    try {
      const response = await apiClient.get('/roles');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo roles:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener roles' 
      };
    }
  }
};

export default userService;
