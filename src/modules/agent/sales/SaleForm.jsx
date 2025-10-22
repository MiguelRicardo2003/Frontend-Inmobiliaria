import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import agentService from "../dashboard/services/agentService";

const SaleForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);
  
  const [formData, setFormData] = useState({
    propiedad_id: "",
    usuario_id: "",
    precio_venta: "",
    fecha_venta: new Date().toISOString().split('T')[0],
    observaciones: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [propsResult, customersResult] = await Promise.all([
      agentService.getProperties({ estado_propiedad_id: 1 }), // Solo disponibles
      agentService.getCustomers()
    ]);
    
    if (propsResult.success) {
      setProperties(propsResult.data);
    }
    if (customersResult.success) {
      setCustomers(customersResult.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si cambia la propiedad, autocompletar el precio
    if (name === "propiedad_id" && value) {
      const selectedProperty = properties.find(p => p.id === parseInt(value));
      if (selectedProperty) {
        setFormData(prev => ({
          ...prev,
          propiedad_id: value,
          precio_venta: selectedProperty.precio
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.propiedad_id) {
      newErrors.propiedad_id = "Selecciona una propiedad";
    }
    if (!formData.usuario_id) {
      newErrors.usuario_id = "Selecciona un cliente";
    }
    if (!formData.precio_venta || formData.precio_venta <= 0) {
      newErrors.precio_venta = "El precio debe ser mayor a 0";
    }
    if (!formData.fecha_venta) {
      newErrors.fecha_venta = "La fecha es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const result = await agentService.createSale(formData);

    if (result.success) {
      navigate("/agent/sales");
    } else {
      alert(result.error || "Error al registrar la venta");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/agent/sales")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Registrar Venta
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Completa los datos de la venta de la propiedad
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Información de la Venta
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Propiedad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Propiedad *
              </label>
              <select
                name="propiedad_id"
                value={formData.propiedad_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una propiedad</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.nombre} - {property.direccion}
                  </option>
                ))}
              </select>
              {errors.propiedad_id && (
                <p className="text-red-500 text-sm mt-1">{errors.propiedad_id}</p>
              )}
            </div>

            {/* Cliente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cliente *
              </label>
              <select
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona un cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.nombre} - {customer.email}
                  </option>
                ))}
              </select>
              {errors.usuario_id && (
                <p className="text-red-500 text-sm mt-1">{errors.usuario_id}</p>
              )}
            </div>

            {/* Row: Precio y Fecha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio de Venta (CLP) *
                </label>
                <Input
                  type="number"
                  name="precio_venta"
                  value={formData.precio_venta}
                  onChange={handleChange}
                  placeholder="Ej: 150000000"
                  error={errors.precio_venta}
                />
                {errors.precio_venta && (
                  <p className="text-red-500 text-sm mt-1">{errors.precio_venta}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fecha de Venta *
                </label>
                <Input
                  type="date"
                  name="fecha_venta"
                  value={formData.fecha_venta}
                  onChange={handleChange}
                  error={errors.fecha_venta}
                />
                {errors.fecha_venta && (
                  <p className="text-red-500 text-sm mt-1">{errors.fecha_venta}</p>
                )}
              </div>
            </div>

            {/* Observaciones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Observaciones
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Notas adicionales sobre la venta..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/agent/sales")}
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
                    Registrar Venta
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

export default SaleForm;
