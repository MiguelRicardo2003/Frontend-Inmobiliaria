import { useMemo } from "react";

export const useFilteredProperties = (properties, searchTerm, filters = {}, currentPage, itemsPerPage) => {
  const filteredProperties = useMemo(() => {
    if (!properties || !Array.isArray(properties)) {
      return [];
    }
    
    if (!searchTerm.trim()) {
      return properties;
    }
    
    const term = searchTerm.toLowerCase();
    return properties.filter((property) => {
      const titulo = property.titulo?.toLowerCase() || '';
      const descripcion = property.descripcion?.toLowerCase() || '';
      const direccion = property.direccion?.toLowerCase() || '';
      const precio = property.precio?.toString() || '';
      const tipo = property.tipo?.nombre?.toLowerCase() || '';
      const estado = property.estado?.nombre?.toLowerCase() || '';
      
      return (
        titulo.includes(term) ||
        descripcion.includes(term) ||
        direccion.includes(term) ||
        precio.includes(term) ||
        tipo.includes(term) ||
        estado.includes(term)
      );
    });
  }, [properties, searchTerm]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { filteredProperties, paginatedProperties, totalPages };
};
