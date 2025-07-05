import { useState, useEffect } from 'react';
import { dataProperties} from '../../../shared/data'
const usePropertyLoader = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProperties(dataProperties);
      setLoading(false);
    }, 1200); // tiempo simulado

    return () => clearTimeout(timeout);
  }, []);

  return { properties, loading };
};

export default usePropertyLoader;
