import { Filter, X } from "lucide-react";
import Button from "../../../../components/ui/Button";

const PropertyFilters = ({ filters, onFiltersChange, propertyTypes, propertyStates }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      tipo_id: '',
      estado_id: '',
      precio_min: '',
      precio_max: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro por tipo */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo de Propiedad
          </label>
          <select
            value={filters.tipo_id}
            onChange={(e) => handleFilterChange('tipo_id', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los tipos</option>
            {propertyTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por estado */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Estado
          </label>
          <select
            value={filters.estado_id}
            onChange={(e) => handleFilterChange('estado_id', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            {propertyStates.map(state => (
              <option key={state.id} value={state.id}>
                {state.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por precio mínimo */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Precio Mínimo
          </label>
          <input
            type="number"
            placeholder="0"
            value={filters.precio_min}
            onChange={(e) => handleFilterChange('precio_min', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro por precio máximo */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Precio Máximo
          </label>
          <input
            type="number"
            placeholder="Sin límite"
            value={filters.precio_max}
            onChange={(e) => handleFilterChange('precio_max', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;

