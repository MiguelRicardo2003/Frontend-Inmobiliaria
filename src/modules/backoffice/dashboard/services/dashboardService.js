import apiClient from '../../../../core/services/apiService';

const dashboardService = {
  // Obtener estadísticas generales del dashboard
  async getDashboardStats() {
    try {
      const [usuariosResponse, propiedadesResponse] = await Promise.all([
        apiClient.get('/usuarios'),
        apiClient.get('/propiedades')
      ]);

      const usuarios = usuariosResponse.data;
      const propiedades = propiedadesResponse.data;

      // Calcular estadísticas
      const totalUsuarios = usuarios.length;
      const totalPropiedades = propiedades.length;

      // Contar usuarios activos (puedes ajustar esta lógica según tu modelo de datos)
      const usuariosActivos = usuarios.filter(u => u.activo !== false).length;

      return {
        success: true,
        data: {
          usuarios: {
            total: totalUsuarios,
            activos: usuariosActivos,
          },
          propiedades: {
            total: totalPropiedades,
          },
        },
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas del dashboard:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener estadísticas',
      };
    }
  },

  // Obtener todos los usuarios
  async getUsuarios() {
    try {
      const response = await apiClient.get('/usuarios');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener usuarios',
      };
    }
  },

  // Obtener todas las propiedades
  async getPropiedades() {
    try {
      const response = await apiClient.get('/propiedades');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error obteniendo propiedades:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener propiedades',
      };
    }
  },
};

export default dashboardService;
