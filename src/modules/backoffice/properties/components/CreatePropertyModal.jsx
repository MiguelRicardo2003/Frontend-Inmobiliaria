import React, { useState, useEffect } from "react";
import Button from "../../../../components/ui/Button";
import apiClient from "@/core/services/apiService";

const CreatePropertyModal = ({ onClose, onSubmit, propertyTypes = [], propertyStates = [] }) => {
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
    dueno_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await apiClient.get('/usuarios');
        if (mounted) setOwners(Array.isArray(data) ? data : []);
      } catch (e) {
        // Silenciar para no bloquear el formulario
        setOwners([]);
      }
    })();
    return () => { mounted = false };
  }, []);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);
    
    // Crear previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreview(newPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
    if (!formData.precio.trim()) newErrors.precio = 'El precio es requerido';
    else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) newErrors.precio = 'El precio debe ser un número válido';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!formData.metros_cuadrados.trim()) newErrors.metros_cuadrados = 'Los metros cuadrados son requeridos';
    else if (isNaN(formData.metros_cuadrados) || parseFloat(formData.metros_cuadrados) <= 0) newErrors.metros_cuadrados = 'Los metros cuadrados deben ser un número válido';
    if (!formData.habitaciones.trim()) newErrors.habitaciones = 'El número de habitaciones es requerido';
    else if (isNaN(formData.habitaciones) || parseInt(formData.habitaciones) < 0) newErrors.habitaciones = 'El número de habitaciones debe ser un número válido';
    if (!formData.banos.trim()) newErrors.banos = 'El número de baños es requerido';
    else if (isNaN(formData.banos) || parseInt(formData.banos) < 0) newErrors.banos = 'El número de baños debe ser un número válido';
    if (!formData.tipo_id) newErrors.tipo_id = 'El tipo de propiedad es requerido';
    if (!formData.estado_id) newErrors.estado_id = 'El estado de la propiedad es requerido';
    if (!formData.dueno_id) newErrors.dueno_id = 'El dueño es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const propertyData = {
        ...formData,
        images
      };
      await onSubmit(propertyData);
    } catch (error) {
      console.error('Error al crear propiedad:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Agregar Propiedad
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={formData.titulo}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.titulo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>}
          </div>

          <div>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.direccion ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
          </div>

          <div>
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.precio ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
          </div>

          <div>
            <input
              type="number"
              name="metros_cuadrados"
              placeholder="Metros cuadrados"
              value={formData.metros_cuadrados}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.metros_cuadrados ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.metros_cuadrados && <p className="text-red-500 text-xs mt-1">{errors.metros_cuadrados}</p>}
          </div>

          <div>
            <input
              type="number"
              name="habitaciones"
              placeholder="Habitaciones"
              value={formData.habitaciones}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.habitaciones ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.habitaciones && <p className="text-red-500 text-xs mt-1">{errors.habitaciones}</p>}
          </div>

          <div>
            <input
              type="number"
              name="banos"
              placeholder="Baños"
              value={formData.banos}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.banos ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.banos && <p className="text-red-500 text-xs mt-1">{errors.banos}</p>}
          </div>

          <div>
            <select
              name="tipo_id"
              value={formData.tipo_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.tipo_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Seleccionar Tipo</option>
              {propertyTypes.map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
            {errors.tipo_id && <p className="text-red-500 text-xs mt-1">{errors.tipo_id}</p>}
          </div>

          <div>
            <select
              name="estado_id"
              value={formData.estado_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.estado_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Seleccionar Estado</option>
              {propertyStates.map(estado => (
                <option key={estado.id} value={estado.id}>
                  {estado.nombre}
                </option>
              ))}
            </select>
            {errors.estado_id && <p className="text-red-500 text-xs mt-1">{errors.estado_id}</p>}
          </div>

          <div>
            <select
              name="dueno_id"
              value={formData.dueno_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.dueno_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Seleccionar Dueño</option>
              {owners.map(u => (
                <option key={u.id} value={u.id}>
                  {u.nombre} {u.apellido} ({u.correo})
                </option>
              ))}
            </select>
            {errors.dueno_id && <p className="text-red-500 text-xs mt-1">{errors.dueno_id}</p>}
          </div>
        </div>

        <div>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
              errors.descripcion ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
        </div>

        {/* Sección de imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Imágenes de la propiedad
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <svg className="h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm text-gray-600 dark:text-gray-300">Arrastra y suelta tus imágenes aquí, o</p>
              <div>
                <label htmlFor="property-images-input" className="inline-flex items-center px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  Seleccionar archivos
                </label>
                <input
                  id="property-images-input"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG (máx. ~10MB por archivo)</p>
            </div>

            {imagePreview.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {imagePreview.map((src, index) => (
                  <div key={index} className="relative group">
                    <img src={src} alt={`preview-${index}`} className="w-full h-28 object-cover rounded-md border border-gray-200 dark:border-gray-600" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 px-2 py-0.5 rounded text-xs bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
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
            {loading ? 'Creando...' : 'Crear Propiedad'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePropertyModal;
