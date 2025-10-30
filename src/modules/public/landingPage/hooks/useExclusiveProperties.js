import { useState, useEffect } from 'react';
import publicPropertyService from '../../../public/properties-inmobiliaria/services/publicPropertyService';

const useExclusiveProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExclusiveProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await publicPropertyService.getAllPublicProperties();
        
        // El backend devuelve un array directamente
        const propiedadesArray = Array.isArray(response) ? response : [];
        
        // Mapear y obtener solo las primeras 3 propiedades destacadas
        const mappedProperties = propiedadesArray
          .map(prop => ({
            id: prop.id,
            titulo: prop.titulo,
            descripcion: prop.descripcion,
            precio: parseFloat(prop.precio),
            direccion: prop.direccion,
            habitaciones: prop.habitaciones,
            banos: prop.banos,
            metros_cuadrados: prop.metros_cuadrados,
            imagen: prop.imagenes && prop.imagenes.length > 0 
              ? prop.imagenes[0].url_imagen 
              : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
            imagenes: prop.imagenes || [],
            tipo: prop.tipo?.nombre || 'Propiedad',
            estado: prop.estado?.nombre || 'Disponible',
          }))
          .slice(0, 3); // Solo las primeras 3
        
        setProperties(mappedProperties);
      } catch (err) {
        console.error('Error al cargar propiedades exclusivas:', err);
        setError(err.message || 'Error al cargar las propiedades');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadExclusiveProperties();
  }, []);

  return { properties, loading, error };
};

export default useExclusiveProperties;
