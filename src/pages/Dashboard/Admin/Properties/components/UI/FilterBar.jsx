import React from 'react';
import Button from '../../../../../../components/ui/Button';
import SearchBar from '../../../../../../components/ui/SearchBar';
import { statusOptions } from '../../constants/formOptions';

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  filterEstado, 
  onFilterChange, 
  onAddProperty,
  hasActiveFilters,
  onClearFilters 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center ">
      <SearchBar 
        value={searchTerm} 
        onChange={onSearchChange} 
        placeholder="Buscar propiedades..."
        className="w-full md:w-1/2"
      />
      
      <select
        value={filterEstado}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-3 py-2 h-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <option value="" className="text-gray-900 dark:text-white">Todos los estados</option>
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="flex gap-2 h-12">
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
          >
            Limpiar filtros
          </Button>
        )}
        <Button 
          variant="primary" 
          size="sm" 
          className="bg-blue-500 hover:bg-blue-600 text-black h-12 flex items-center gap-2"
          onClick={onAddProperty}
        >
          + Nueva propiedad
        </Button>
      </div>
    </div>
  );
};

export default FilterBar; 