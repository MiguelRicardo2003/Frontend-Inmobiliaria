import { useState, useEffect } from 'react';
import publicPropertyService from '../services/publicPropertyService';

const usePropertyLoader = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await publicPropertyService.getAllPublicProperties();
        console.log('Propiedades cargadas:', response);
        
        // El backend devuelve un array directamente
        const propiedadesArray = Array.isArray(response) ? response : [];
        
        // Mapear los datos del backend al formato esperado por el frontend
        const mappedProperties = propiedadesArray.map(prop => ({
          id: prop.id,
          titulo: prop.titulo,
          descripcion: prop.descripcion,
          precio: parseFloat(prop.precio),
          direccion: prop.direccion,
          ubicacion: prop.direccion, // usando direccion como ubicacion
          habitaciones: prop.habitaciones,
          banos: prop.banos,
          area: prop.metros_cuadrados,
          imagen: prop.imagenes && prop.imagenes.length > 0 
            ? prop.imagenes[0].url_imagen 
            : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
          imagenes: prop.imagenes || [],
          tipo: prop.tipo?.nombre || 'Propiedad',
          estado: prop.estado?.nombre || 'Disponible',
          ciudad: prop.direccion?.split(',')[1]?.trim() || 'Ciudad',
        }));
        
        setProperties(mappedProperties);
      } catch (err) {
        console.error('Error al cargar propiedades:', err);
        setError(err.message || 'Error al cargar las propiedades');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  return { properties, loading, error };
};

export default usePropertyLoader;
