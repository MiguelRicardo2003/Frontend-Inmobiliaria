import { useState, useEffect } from 'react';
import propertyService from '../services/propertyService';

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
      console.log('\n🏗️  Creando propiedad...');
      console.log('📋 propertyData recibido:', propertyData);
      
      // Separar imágenes si vienen adjuntas
      const { images, ...rest } = propertyData || {};
      
      console.log('📸 Imágenes detectadas:', images ? images.length : 0);
      if (images && images.length > 0) {
        console.log('📎 Archivos:', images.map((f, i) => `${i + 1}. ${f.name} (${f.type})`));
      }
      
      console.log('📝 Datos de propiedad (sin imágenes):', rest);
      
      const result = await propertyService.createProperty(rest);
      if (result.success) {
        const created = result.data;
        console.log('✅ Propiedad creada:', created.id);
        
        // Si hay imágenes, subirlas usando el endpoint del backend
        if (images && images.length > 0 && created?.id) {
          try {
            console.log(`\n📸 Iniciando subida de ${images.length} imagen(es)...`);
            console.log(`   Propiedad ID: ${created.id}`);
            
            const uploadResult = await propertyService.uploadImages(created.id, images);
            
            console.log('📊 Resultado de subida:', uploadResult);
            
            if (uploadResult.success) {
              console.log('✅ Imágenes subidas y guardadas exitosamente');
              console.log('   Total imágenes:', uploadResult.data?.data?.total_imagenes);
              // Actualizar la propiedad con las imágenes
              created.imagenes = uploadResult.data?.data?.imagenes_subidas || [];
            } else {
              console.error('❌ Error al subir imágenes:', uploadResult.error);
              alert(`⚠️ Propiedad creada, pero hubo un error al subir las imágenes: ${uploadResult.error}`);
              // No romper el flujo si falla la subida
            }
          } catch (imgErr) {
            console.error('❌ Excepción al subir imágenes:', imgErr);
            alert(`⚠️ Propiedad creada, pero hubo un error al subir las imágenes: ${imgErr.message}`);
            // No romper el flujo de creación de propiedad si falla la subida de imágenes
          }
        } else {
          console.log('ℹ️  No hay imágenes para subir');
        }
        
        setProperties(prev => [...prev, created]);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('❌ Error inesperado en createProperty:', err);
      return { success: false, error: 'Error inesperado al crear propiedad' };
    }
  };

  // Actualizar propiedad
  const updateProperty = async (id, propertyData) => {
    try {
      console.log('\n📝 Actualizando propiedad...');
      console.log('📋 propertyData recibido:', propertyData);
      
      // Separar imágenes y datos de propiedad
      const { images, deletedImages, existingImages, ...rest } = propertyData || {};
      
      console.log('🗑️  Imágenes a eliminar:', deletedImages?.length || 0);
      console.log('📸 Nuevas imágenes:', images?.length || 0);
      console.log('🖼️  Imágenes existentes conservadas:', existingImages?.length || 0);
      
      // 1. Actualizar datos de la propiedad
      const result = await propertyService.updateProperty(id, rest);
      
      if (result.success) {
        console.log('✅ Propiedad actualizada');
        
        // 2. Eliminar imágenes marcadas para eliminar
        if (deletedImages && deletedImages.length > 0) {
          try {
            console.log(`\n🗑️  Eliminando ${deletedImages.length} imagen(es)...`);
            await propertyService.deleteImages(id, deletedImages);
            console.log('✅ Imágenes eliminadas');
          } catch (delErr) {
            console.error('❌ Error eliminando imágenes:', delErr);
            // No romper el flujo
          }
        }
        
        // 3. Subir nuevas imágenes
        if (images && images.length > 0) {
          try {
            console.log(`\n📸 Subiendo ${images.length} nueva(s) imagen(es)...`);
            const uploadResult = await propertyService.uploadImages(id, images);
            
            if (uploadResult.success) {
              console.log('✅ Nuevas imágenes subidas');
            } else {
              console.error('❌ Error subiendo nuevas imágenes:', uploadResult.error);
              alert(`⚠️ Propiedad actualizada, pero hubo un error al subir las nuevas imágenes: ${uploadResult.error}`);
            }
          } catch (imgErr) {
            console.error('❌ Excepción al subir imágenes:', imgErr);
            alert(`⚠️ Propiedad actualizada, pero hubo un error al subir las nuevas imágenes: ${imgErr.message}`);
          }
        }
        
        // 4. Actualizar el estado local
        setProperties(prev => prev.map(property => 
          property.id === id ? result.data : property
        ));
        
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('❌ Error inesperado al actualizar propiedad:', err);
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