import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Building2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import agentService from "../dashboard/services/agentService";
import apiClient from "../../../core/services/apiService";

const PropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [tiposPropiedad, setTiposPropiedad] = useState([]);
  const [estadosPropiedad, setEstadosPropiedad] = useState([]);
  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    direccion: "",
    precio: "",
    superficie: "",
    habitaciones: "",
    banos: "",
    tipo_propiedad_id: "",
    estado_propiedad_id: "1",
    imagen_url: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCatalogs();
    if (isEditing) {
      loadProperty();
    }
  }, [id]);

  const loadCatalogs = async () => {
    try {
      const [tiposRes, estadosRes] = await Promise.all([
        apiClient.get('/tipos-propiedad'),
        apiClient.get('/estados-propiedad')
      ]);
      
      setTiposPropiedad(tiposRes.data.data || []);
      setEstadosPropiedad(estadosRes.data.data || []);
    } catch (error) {
      console.error('Error loading catalogs:', error);
    }
  };

  const loadProperty = async () => {
    setLoading(true);
    const result = await agentService.getPropertyById(id);
    if (result.success) {
      setFormData({
        nombre: result.data.nombre || "",
        descripcion: result.data.descripcion || "",
        direccion: result.data.direccion || "",
        precio: result.data.precio || "",
        superficie: result.data.superficie || "",
        habitaciones: result.data.habitaciones || "",
        banos: result.data.banos || "",
        tipo_propiedad_id: result.data.tipo_propiedad_id || "",
        estado_propiedad_id: result.data.estado_propiedad_id || "1",
        imagen_url: result.data.imagen_url || "",
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
    }
    if (!formData.precio || formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }
    if (!formData.tipo_propiedad_id) {
      newErrors.tipo_propiedad_id = "Selecciona un tipo de propiedad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const result = isEditing
      ? await agentService.updateProperty(id, formData)
      : await agentService.createProperty(formData);

    if (result.success) {
      navigate("/agent/properties");
    } else {
      alert(result.error || "Error al guardar la propiedad");
    }

    setLoading(false);
  };

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/agent/properties")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? "Editar Propiedad" : "Nueva Propiedad"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? "Actualiza los datos de la propiedad" : "Completa los datos de la nueva propiedad"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Información de la Propiedad
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de la Propiedad *
              </label>
              <Input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Casa en La Reina"
                error={errors.nombre}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe las características de la propiedad..."
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dirección *
              </label>
              <Input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ej: Av. Larraín 5862, La Reina"
                error={errors.direccion}
              />
              {errors.direccion && (
                <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
              )}
            </div>

            {/* Row 1: Tipo y Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Propiedad *
                </label>
                <select
                  name="tipo_propiedad_id"
                  value={formData.tipo_propiedad_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un tipo</option>
                  {tiposPropiedad.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
                {errors.tipo_propiedad_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.tipo_propiedad_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  name="estado_propiedad_id"
                  value={formData.estado_propiedad_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {estadosPropiedad.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Precio y Superficie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio (CLP) *
                </label>
                <Input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Ej: 150000000"
                  error={errors.precio}
                />
                {errors.precio && (
                  <p className="text-red-500 text-sm mt-1">{errors.precio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Superficie (m²)
                </label>
                <Input
                  type="number"
                  name="superficie"
                  value={formData.superficie}
                  onChange={handleChange}
                  placeholder="Ej: 120"
                />
              </div>
            </div>

            {/* Row 3: Habitaciones y Baños */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Habitaciones
                </label>
                <Input
                  type="number"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  placeholder="Ej: 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Baños
                </label>
                <Input
                  type="number"
                  name="banos"
                  value={formData.banos}
                  onChange={handleChange}
                  placeholder="Ej: 2"
                />
              </div>
            </div>

            {/* Imagen URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL de Imagen
              </label>
              <Input
                type="text"
                name="imagen_url"
                value={formData.imagen_url}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL de la imagen principal de la propiedad
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/agent/properties")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? "Actualizar" : "Crear"} Propiedad
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PropertyForm;
