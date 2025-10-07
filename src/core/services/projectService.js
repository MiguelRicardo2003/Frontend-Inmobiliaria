import apiClient from './apiService.js';

const projectService = {
  async getAllProjects(params = {}) {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },

  async getProjectById(id) {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(projectData) {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  async updateProject(id, projectData) {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
  },

  async deleteProject(id) {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },

  async getProjectStructure(id) {
    const response = await apiClient.get(`/projects/${id}/structure`);
    return response.data;
  }
};

export default projectService;