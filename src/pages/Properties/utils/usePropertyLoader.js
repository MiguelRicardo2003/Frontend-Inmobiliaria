import { useState, useEffect } from 'react';
import { dataProperties } from '../../../shared/data';

const usePropertyLoader = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await new Promise(resolve => setTimeout(resolve, 1200));
        setProperties(dataProperties);
      } catch (err) {
        setError(err.message || 'Error al cargar las propiedades');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  return { properties, loading, error };
};

export default usePropertyLoader;
