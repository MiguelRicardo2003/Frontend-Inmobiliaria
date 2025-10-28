import { useState, useEffect } from 'react';
import propertyService from '../services/propertyService';
import { uploadPropertyPhotos } from '@/lib/uploadPropertyPhotos';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyStates, setPropertyStates] = useState([]);

  // Cargar propiedades
  const loadProperties = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await propertyService.getProperties(params);
      
      if (result.success) {
        setProperties(result.data.data || result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error inesperado al cargar propiedades');
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos de referencia
  const loadReferenceData = async () => {
    try {
      // Cargar tipos de propiedades
      const typesResult = await propertyService.getPropertyTypes();
      if (typesResult.success) {
        setPropertyTypes(typesResult.data);
      }

      // Cargar estados de propiedades
      const statesResult = await propertyService.getPropertyStates();
      if (statesResult.success) {
        setPropertyStates(statesResult.data);
      }
    } catch (err) {
      console.error('Error cargando datos de referencia:', err);
    }
  };

  // Crear propiedad
  const createProperty = async (propertyData) => {
    try {
      // Separar imágenes si vienen adjuntas
      const { images, ...rest } = propertyData || {};
      const result = await propertyService.createProperty(rest);
      if (result.success) {
        const created = result.data;
        // Si hay imágenes, subir a Supabase (simple y funcional, sin registrar en backend)
        if (images && images.length > 0 && created?.id) {
          try {
            const uploads = await uploadPropertyPhotos(images, created.id);
            console.log('Imágenes subidas a Supabase:', uploads);
          } catch (imgErr) {
            // No romper el flujo de creación de propiedad si falla la subida de imágenes
            console.error('Fallo al subir/registrar imágenes:', imgErr);
          }
        }
        setProperties(prev => [...prev, created]);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Error inesperado al crear propiedad' };
    }
  };

  // Actualizar propiedad
  const updateProperty = async (id, propertyData) => {
    try {
      const result = await propertyService.updateProperty(id, propertyData);
      if (result.success) {
        setProperties(prev => prev.map(property => 
          property.id === id ? result.data : property
        ));
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Error inesperado al actualizar propiedad' };
    }
  };

  // Eliminar propiedad
  const deleteProperty = async (id) => {
    try {
      const result = await propertyService.deleteProperty(id);
      if (result.success) {
        setProperties(prev => prev.filter(property => property.id !== id));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Error inesperado al eliminar propiedad' };
    }
  };


  // Cargar datos iniciales
  useEffect(() => {
    loadProperties();
    loadReferenceData();
  }, []);

  return {
    // Estado
    properties,
    propertyTypes,
    propertyStates,
    loading,
    error,
    
    // Acciones
    loadProperties,
    createProperty,
    updateProperty,
    deleteProperty
  };
};