import apiClient from './apiService.js';

const propertyService = {
  // Propiedades Trello
  async getAllTrelloProperties(params = {}) {
    const response = await apiClient.get('/propiedades/trello/all', { params });
    return response.data;
  },

  async getTrelloPropertyById(id) {
    const response = await apiClient.get(`/propiedades/trello/${id}`);
    return response.data;
  },

  async createTrelloProperty(propertyData) {
    const response = await apiClient.post('/propiedades/trello/create', propertyData);
    return response.data;
  },

  async updateTrelloProperty(id, propertyData) {
    const response = await apiClient.put(`/propiedades/trello/${id}`, propertyData);
    return response.data;
  },

  async deleteTrelloProperty(id) {
    const response = await apiClient.delete(`/propiedades/trello/${id}`);
    return response.data;
  },

  async movePropertyToList(id, listId, orden) {
    const response = await apiClient.put(`/propiedades/trello/${id}/move`, {
      list_id: listId,
      orden
    });
    return response.data;
  },

  async reorderProperties(properties) {
    const response = await apiClient.put('/propiedades/trello/reorder/properties', {
      properties
    });
    return response.data;
  },

  async getPropertiesByProject(projectId, params = {}) {
    const response = await apiClient.get(`/propiedades/trello/project/${projectId}`, { params });
    return response.data;
  }
};

export default propertyService;