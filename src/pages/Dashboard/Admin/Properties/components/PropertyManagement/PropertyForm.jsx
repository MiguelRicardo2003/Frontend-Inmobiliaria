import React from 'react';
import Input from '../../../../../../components/ui/Input';
import Select from '../../../../../../components/ui/Select';
import ImageUpload from '../../../../../../components/ui/ImageUpload';
import Button from '../../../../../../components/ui/Button';
import useToast from '../../../../../../services/Toast/useToast';
import { 
  typeOptions, 
  operationOptions, 
  monedaOptions, 
  statusOptions 
} from '../../constants/formOptions';

const PropertyForm = ({
  formData,
  onFormChange,
  onNestedChange,
  onAmenidadChange,
  onAddAmenidad,
  onRemoveAmenidad,
  onImagesChange,
  onSubmit,
  onCancel,
  isEditing = false,
  isLoading = false
}) => {
  const { showError } = useToast();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.titulo?.trim() || !formData.precio || !formData.direccion?.trim()) {
      showError("Por favor completa todos los campos requeridos");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Código" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.codigo} 
          onChange={(e) => onFormChange('codigo', e.target.value)} 
          required 
        />
        <Input 
          label="Título" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.titulo} 
          onChange={(e) => onFormChange('titulo', e.target.value)} 
          required 
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descripción
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={formData.descripcion}
          onChange={(e) => onFormChange('descripcion', e.target.value)}
          rows={3}
          required
        />
      </div>

      {/* Price and Type */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input 
          label="Precio" 
          type="number" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.precio} 
          onChange={(e) => onFormChange('precio', e.target.value)} 
          required 
        />
        <Select 
          label="Moneda" 
          options={monedaOptions} 
          value={formData.moneda} 
          onChange={(e) => onFormChange('moneda', e.target.value)} 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
        />
        <Select 
          label="Tipo" 
          options={typeOptions} 
          value={formData.tipo} 
          onChange={(e) => onFormChange('tipo', e.target.value)} 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
        />
        <Select 
          label="Operación" 
          options={operationOptions} 
          value={formData.operacion} 
          onChange={(e) => onFormChange('operacion', e.target.value)} 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
        />
      </div>

      {/* Characteristics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input 
          label="Superficie (m²)" 
          type="number" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.caracteristicas.superficie} 
          onChange={(e) => onNestedChange('caracteristicas', 'superficie', e.target.value)} 
          required 
        />
        <Input 
          label="Habitaciones" 
          type="number" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.caracteristicas.habitaciones} 
          onChange={(e) => onNestedChange('caracteristicas', 'habitaciones', e.target.value)} 
        />
        <Input 
          label="Baños" 
          type="number" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.caracteristicas.banos} 
          onChange={(e) => onNestedChange('caracteristicas', 'banos', e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input 
          label="Garajes" 
          type="number" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.caracteristicas.garajes} 
          onChange={(e) => onNestedChange('caracteristicas', 'garajes', e.target.value)} 
        />
        <Input 
          label="Antigüedad (años)" 
          type="number" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.caracteristicas.antiguedad} 
          onChange={(e) => onNestedChange('caracteristicas', 'antiguedad', e.target.value)} 
        />
        <Input 
          label="Estrato" 
          type="number" 
          min="1" 
          max="6" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.caracteristicas.estrato} 
          onChange={(e) => onNestedChange('caracteristicas', 'estrato', e.target.value)} 
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Dirección" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.ubicacion.direccion} 
          onChange={(e) => onNestedChange('ubicacion', 'direccion', e.target.value)} 
          required 
        />
        <Input 
          label="Ciudad" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.ubicacion.ciudad} 
          onChange={(e) => onNestedChange('ubicacion', 'ciudad', e.target.value)} 
          required 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Departamento" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.ubicacion.departamento} 
          onChange={(e) => onNestedChange('ubicacion', 'departamento', e.target.value)} 
          required 
        />
        <Input 
          label="Código Postal" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.ubicacion.codigoPostal} 
          onChange={(e) => onNestedChange('ubicacion', 'codigoPostal', e.target.value)} 
        />
      </div>

      {/* Owner Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input 
          label="Nombre del Propietario" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.propietario.nombre} 
          onChange={(e) => onNestedChange('propietario', 'nombre', e.target.value)} 
          required 
        />
        <Input 
          label="Teléfono del Propietario" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.propietario.telefono} 
          onChange={(e) => onNestedChange('propietario', 'telefono', e.target.value)} 
          required 
        />
        <Input 
          label="Email del Propietario" 
          type="email" 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
          value={formData.propietario.email} 
          onChange={(e) => onNestedChange('propietario', 'email', e.target.value)} 
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Amenidades
        </label>
        {formData.amenidades.map((amenidad, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
              placeholder="Amenidad"
              value={amenidad}
              onChange={(e) => onAmenidadChange(index, e.target.value)}
            />
            {formData.amenidades.length > 1 && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => onRemoveAmenidad(index)}
              >
                -
              </Button>
            )}
            {index === formData.amenidades.length - 1 && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={onAddAmenidad}
              >
                +
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Imágenes
        </label>
        <ImageUpload 
          images={formData.imagenes} 
          onImagesChange={onImagesChange} 
        />
      </div>

      {/* Status */}
      <Select 
        label="Estado" 
        options={statusOptions} 
        value={formData.estado} 
        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
        onChange={(e) => onFormChange('estado', e.target.value)} 
      />

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button 
          type="button"   
          variant="danger" 
          className="h-12 flex items-center gap-2"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          className=" text-black h-12 flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : (isEditing ? "Guardar cambios" : "Agregar")} Propiedad
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm; 