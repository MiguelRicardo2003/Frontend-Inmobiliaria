import apiClient from '../../../../core/services/apiService';

const propertyService = {
  // Obtener todas las propiedades
  async getProperties(params = {}) {
    try {
      const response = await apiClient.get('/propiedades', { params });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo propiedades:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener propiedades' 
      };
    }
  },

  // Obtener propiedad por ID
  async getPropertyById(id) {
    try {
      const response = await apiClient.get(`/propiedades/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo propiedad:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener propiedad' 
      };
    }
  },

  // Crear propiedad
  async createProperty(propertyData) {
    try {
      const response = await apiClient.post('/propiedades', propertyData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creando propiedad:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al crear propiedad' 
      };
    }
  },

  // Actualizar propiedad
  async updateProperty(id, propertyData) {
    try {
      const response = await apiClient.put(`/propiedades/${id}`, propertyData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error actualizando propiedad:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al actualizar propiedad' 
      };
    }
  },

  // Eliminar propiedad
  async deleteProperty(id) {
    try {
      const response = await apiClient.delete(`/propiedades/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error eliminando propiedad:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al eliminar propiedad' 
      };
    }
  },

  // Obtener tipos de propiedades
  async getPropertyTypes() {
    try {
      const response = await apiClient.get('/tipo_propiedades');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo tipos de propiedades:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener tipos de propiedades' 
      };
    }
  },

  // Obtener estados de propiedades
  async getPropertyStates() {
    try {
      const response = await apiClient.get('/estado_propiedades');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo estados de propiedades:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener estados de propiedades' 
      };
    }
  },

};

export default propertyService;
