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

  // Subir imágenes a Supabase y guardar en BD
  async uploadImages(propertyId, files) {
    try {
      if (!files || files.length === 0) {
        console.warn('⚠️  No hay archivos para subir');
        return { success: true, data: [] };
      }

      const formData = new FormData();
      
      // Agregar cada archivo al FormData
      files.forEach((file, index) => {
        console.log(`📎 Agregando archivo ${index + 1}: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)} KB)`);
        formData.append('imagenes', file);
      });

      console.log(`📤 Subiendo ${files.length} imagen(es) para propiedad ${propertyId}`);
      console.log(`🌐 Endpoint: /propiedades/${propertyId}/imagenes`);

      // IMPORTANTE: NO establecer Content-Type manualmente
      // Axios lo hace automáticamente con el boundary correcto para multipart/form-data
      const response = await apiClient.post(
        `/propiedades/${propertyId}/imagenes`,
        formData
        // NO headers aquí - Axios los maneja automáticamente
      );

      console.log('✅ Respuesta del servidor:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Error subiendo imágenes:', error);
      console.error('   Status:', error.response?.status);
      console.error('   Message:', error.response?.data?.message);
      console.error('   Details:', error.response?.data?.details);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Error al subir imágenes' 
      };
    }
  },

  // Eliminar imágenes de una propiedad
  async deleteImages(propertyId, imageIds) {
    try {
      if (!imageIds || imageIds.length === 0) {
        return { success: true };
      }

      console.log(`🗑️  Eliminando ${imageIds.length} imagen(es) de propiedad ${propertyId}`);
      
      // Eliminar cada imagen
      const deletePromises = imageIds.map(imageId => 
        apiClient.delete(`/imagenes/${imageId}`)
      );

      await Promise.all(deletePromises);
      
      console.log('✅ Imágenes eliminadas exitosamente');
      return { success: true };
    } catch (error) {
      console.error('❌ Error eliminando imágenes:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al eliminar imágenes' 
      };
    }
  },

};

export default propertyService;

