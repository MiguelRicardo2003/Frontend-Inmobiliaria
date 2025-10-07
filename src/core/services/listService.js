import apiClient from './apiService.js';

const listService = {
  async getAllLists(params = {}) {
    const response = await apiClient.get('/lists', { params });
    return response.data;
  },

  async getListById(id) {
    const response = await apiClient.get(`/lists/${id}`);
    return response.data;
  },

  async createList(listData) {
    const response = await apiClient.post('/lists', listData);
    return response.data;
  },

  async updateList(id, listData) {
    const response = await apiClient.put(`/lists/${id}`, listData);
    return response.data;
  },

  async deleteList(id) {
    const response = await apiClient.delete(`/lists/${id}`);
    return response.data;
  },

  async reorderLists(lists) {
    const response = await apiClient.put('/lists/reorder/lists', { lists });
    return response.data;
  }
};

export default listService;