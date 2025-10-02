import { useState, useMemo, useCallback } from 'react';

export const useFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");

  const filterProperties = useCallback((properties) => {
    let filtered = properties || [];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((property) =>
        (property.name || property.titulo || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (property.address || property.direccion || property.ubicacion?.direccion || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (property.codigo || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterEstado) {
      filtered = filtered.filter((property) => property.estado === filterEstado);
    }

    return filtered;
  }, [searchTerm, filterEstado]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setFilterEstado("");
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchTerm || filterEstado;
  }, [searchTerm, filterEstado]);

  return {
    // State
    searchTerm,
    filterEstado,
    
    // Actions
    setSearchTerm,
    setFilterEstado,
    filterProperties,
    clearFilters,
    hasActiveFilters,
  };
}; 