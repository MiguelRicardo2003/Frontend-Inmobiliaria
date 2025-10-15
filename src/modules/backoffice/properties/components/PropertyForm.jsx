import React, { useState, useEffect } from "react";
import Button from "../../../../components/ui/Button";
import { X, Upload, Plus, Trash2 } from "lucide-react";

const PropertyForm = ({ 
  property = null, 
  propertyTypes = [], 
  propertyStates = [], 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    direccion: '',
    metros_cuadrados: '',
    habitaciones: '',
    banos: '',
    tipo_id: '',
    estado_id: '',
    dueno_id: '',
    imagenes: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    if (property) {
      setFormData({
        titulo: property.titulo || '',
        descripcion: property.descripcion || '',
        precio: property.precio || '',
        direccion: property.direccion || '',
        metros_cuadrados: property.metros_cuadrados || '',
        habitaciones: property.habitaciones || '',
        banos: property.banos || '',
        tipo_id: property.tipo_id || '',
        estado_id: property.estado_id || '',
        dueno_id: property.dueno_id || '',
        imagenes: property.imagenes || []
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageAdd = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, { url: newImage.trim(), descripcion: '' }]
      }));
      setNewImage('');
    }
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
    if (!formData.precio.trim()) newErrors.precio = 'El precio es requerido';
    else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser un número válido mayor a 0';
    }
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!formData.tipo_id) newErrors.tipo_id = 'El tipo de propiedad es requerido';
    if (!formData.estado_id) newErrors.estado_id = 'El estado es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Preparar datos para envío
      const submitData = {
        ...formData,
        precio: parseFloat(formData.precio),
        metros_cuadrados: formData.metros_cuadrados ? parseFloat(formData.metros_cuadrados) : null,
        habitaciones: formData.habitaciones ? parseInt(formData.habitaciones) : null,
        banos: formData.banos ? parseInt(formData.banos) : null,
        tipo_id: parseInt(formData.tipo_id),
        estado_id: parseInt(formData.estado_id)
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {property ? 'Editar Propiedad' : 'Nueva Propiedad'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.titulo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Ej: Hermosa casa en el centro de la ciudad"
            />
            {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>}
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe las características principales de la propiedad..."
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Precio *
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.precio ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="500000000"
            />
            {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dirección *
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.direccion ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Calle 123 #45-67, Barrio Centro"
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
          </div>

          {/* Metros cuadrados */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Área (m²)
            </label>
            <input
              type="number"
              name="metros_cuadrados"
              value={formData.metros_cuadrados}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="120"
            />
          </div>

          {/* Habitaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Habitaciones
            </label>
            <input
              type="number"
              name="habitaciones"
              value={formData.habitaciones}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="3"
            />
          </div>

          {/* Baños */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Baños
            </label>
            <input
              type="number"
              name="banos"
              value={formData.banos}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="2"
            />
          </div>

          {/* Tipo de propiedad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Propiedad *
            </label>
            <select
              name="tipo_id"
              value={formData.tipo_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.tipo_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Seleccionar tipo</option>
              {propertyTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.nombre}
                </option>
              ))}
            </select>
            {errors.tipo_id && <p className="text-red-500 text-xs mt-1">{errors.tipo_id}</p>}
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado *
            </label>
            <select
              name="estado_id"
              value={formData.estado_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.estado_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Seleccionar estado</option>
              {propertyStates.map(state => (
                <option key={state.id} value={state.id}>
                  {state.nombre}
                </option>
              ))}
            </select>
            {errors.estado_id && <p className="text-red-500 text-xs mt-1">{errors.estado_id}</p>}
          </div>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Imágenes
          </label>
          <div className="space-y-2">
            {formData.imagenes.map((imagen, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={imagen.url}
                  onChange={(e) => {
                    const newImagenes = [...formData.imagenes];
                    newImagenes[index] = { ...imagen, url: e.target.value };
                    setFormData(prev => ({ ...prev, imagenes: newImagenes }));
                  }}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL de la imagen"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL de la imagen"
              />
              <button
                type="button"
                onClick={handleImageAdd}
                className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button 
            type="button"
            variant="outline" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? 'Guardando...' : (property ? 'Actualizar Propiedad' : 'Crear Propiedad')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
