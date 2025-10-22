import apiClient from '../../../../core/services/apiService';

const agentService = {
  // Dashboard stats
  async getDashboardStats() {
    try {
      const [propiedadesRes, clientesRes] = await Promise.all([
        apiClient.get('/propiedades'),
        apiClient.get('/usuarios')
      ]);

      const propiedades = propiedadesRes.data.data || [];
      const usuarios = clientesRes.data.data || [];
      
      // Filtrar solo clientes (no administradores ni agentes)
      const clientes = usuarios.filter(u => u.rol_id === 3); // 3 = Cliente

      return {
        success: true,
        data: {
          stats: {
            properties: {
              total: propiedades.length,
              active: propiedades.filter(p => p.estado_propiedad_id === 1).length,
              pending: propiedades.filter(p => p.estado_propiedad_id === 2).length,
            },
            customers: {
              total: clientes.length,
            },
            sales: {
              total: 0,
              thisMonth: 0,
            },
            rentals: {
              total: 0,
              active: 0,
            },
          },
          recentActivities: []
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar estadísticas'
      };
    }
  },

  // Properties
  async getProperties(filters = {}) {
    try {
      const response = await apiClient.get('/propiedades', { params: filters });
      return {
        success: true,
        data: response.data.data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener propiedades'
      };
    }
  },

  async getPropertyById(id) {
    try {
      const response = await apiClient.get(`/propiedades/${id}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener propiedad'
      };
    }
  },

  async createProperty(propertyData) {
    try {
      const response = await apiClient.post('/propiedades', propertyData);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear propiedad'
      };
    }
  },

  async updateProperty(id, propertyData) {
    try {
      const response = await apiClient.put(`/propiedades/${id}`, propertyData);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al actualizar propiedad'
      };
    }
  },

  async deleteProperty(id) {
    try {
      await apiClient.delete(`/propiedades/${id}`);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al eliminar propiedad'
      };
    }
  },

  // Customers (solo clientes)
  async getCustomers() {
    try {
      const response = await apiClient.get('/usuarios');
      const usuarios = response.data.data || [];
      
      // Filtrar solo clientes (rol_id = 3)
      const clientes = usuarios.filter(u => u.rol_id === 3);
      
      return {
        success: true,
        data: clientes
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener clientes'
      };
    }
  },

  // Sales
  async getSales() {
    try {
      const response = await apiClient.get('/ventas');
      return {
        success: true,
        data: response.data.data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener ventas'
      };
    }
  },

  async createSale(saleData) {
    try {
      const response = await apiClient.post('/ventas', saleData);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear venta'
      };
    }
  },

  // Rentals
  async getRentals() {
    try {
      const response = await apiClient.get('/arriendos');
      return {
        success: true,
        data: response.data.data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener arriendos'
      };
    }
  },

  async createRental(rentalData) {
    try {
      const response = await apiClient.post('/arriendos', rentalData);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear arriendo'
      };
    }
  },

  // Contracts
  async getContracts() {
    try {
      const response = await apiClient.get('/contratos');
      return {
        success: true,
        data: response.data.data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener contratos'
      };
    }
  },

  async createContract(contractData) {
    try {
      const response = await apiClient.post('/contratos', contractData);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear contrato'
      };
    }
  }
};

export default agentService;
