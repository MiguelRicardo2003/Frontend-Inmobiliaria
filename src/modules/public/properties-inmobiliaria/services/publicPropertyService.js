import apiClient from '../../../../core/services/apiService.js';

const publicPropertyService = {
  // Obtener todas las propiedades públicas (sin autenticación)
  async getAllPublicProperties(params = {}) {
    const response = await apiClient.get('/propiedades', { params });
    return response.data;
  },

  // Obtener una propiedad pública por ID
  async getPublicPropertyById(id) {
    const response = await apiClient.get(`/propiedades/${id}`);
    return response.data;
  },

  // Obtener tipos de propiedad
  async getPropertyTypes() {
    const response = await apiClient.get('/tipos-propiedad');
    return response.data;
  },

  // Obtener estados de propiedad
  async getPropertyStates() {
    const response = await apiClient.get('/estados-propiedad');
    return response.data;
  }
};

export default publicPropertyService;
