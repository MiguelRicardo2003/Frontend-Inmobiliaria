import apiClient from '../../../../core/services/apiService';

const imageService = {
  async createImagesForProperty(propiedadId, uploads) {
    if (!uploads || uploads.length === 0) return { success: true, data: [] };
    const payload = uploads.map((u, index) => ({
      propiedad_id: propiedadId,
      url_imagen: u.publicUrl,
      orden: index
    }));
    try {
      // Intentar bulk primero
      const response = await apiClient.post('/imagenes/bulk', payload);
      return { success: true, data: response.data };
    } catch (error) {
      // Fallback: enviar uno por uno si bulk no existe
      try {
        const created = [];
        for (const item of payload) {
          const resp = await apiClient.post('/imagenes', item);
          created.push(resp.data);
        }
        return { success: true, data: created };
      } catch (err) {
        return { success: false, error: err.response?.data?.message || 'Error al registrar imágenes' };
      }
    }
  }
};

export default imageService;


