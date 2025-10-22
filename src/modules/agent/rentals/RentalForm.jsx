import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import agentService from "../dashboard/services/agentService";

const RentalForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);
  
  const [formData, setFormData] = useState({
    propiedad_id: "",
    usuario_id: "",
    monto_mensual: "",
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_fin: "",
    dia_pago: "1",
    deposito_garantia: "",
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
    
    // Si cambia la propiedad, autocompletar el monto mensual
    if (name === "propiedad_id" && value) {
      const selectedProperty = properties.find(p => p.id === parseInt(value));
      if (selectedProperty) {
        setFormData(prev => ({
          ...prev,
          propiedad_id: value,
          monto_mensual: selectedProperty.precio,
          deposito_garantia: selectedProperty.precio // Sugerencia: 1 mes de garantía
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
    if (!formData.monto_mensual || formData.monto_mensual <= 0) {
      newErrors.monto_mensual = "El monto debe ser mayor a 0";
    }
    if (!formData.fecha_inicio) {
      newErrors.fecha_inicio = "La fecha de inicio es requerida";
    }
    if (!formData.dia_pago || formData.dia_pago < 1 || formData.dia_pago > 31) {
      newErrors.dia_pago = "El día de pago debe estar entre 1 y 31";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const result = await agentService.createRental(formData);

    if (result.success) {
      navigate("/agent/rentals");
    } else {
      alert(result.error || "Error al crear el arriendo");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/agent/rentals")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Crear Arriendo
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Completa los datos del nuevo arriendo
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Información del Arriendo
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
                Cliente (Arrendatario) *
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

            {/* Row: Monto y Garantía */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monto Mensual (CLP) *
                </label>
                <Input
                  type="number"
                  name="monto_mensual"
                  value={formData.monto_mensual}
                  onChange={handleChange}
                  placeholder="Ej: 500000"
                  error={errors.monto_mensual}
                />
                {errors.monto_mensual && (
                  <p className="text-red-500 text-sm mt-1">{errors.monto_mensual}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Depósito de Garantía (CLP)
                </label>
                <Input
                  type="number"
                  name="deposito_garantia"
                  value={formData.deposito_garantia}
                  onChange={handleChange}
                  placeholder="Ej: 500000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Generalmente equivale a 1 mes de arriendo
                </p>
              </div>
            </div>

            {/* Row: Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fecha de Inicio *
                </label>
                <Input
                  type="date"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleChange}
                  error={errors.fecha_inicio}
                />
                {errors.fecha_inicio && (
                  <p className="text-red-500 text-sm mt-1">{errors.fecha_inicio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fecha de Fin (Opcional)
                </label>
                <Input
                  type="date"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Dejar vacío para arriendo indefinido
                </p>
              </div>
            </div>

            {/* Día de Pago */}
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Día de Pago del Mes *
              </label>
              <Input
                type="number"
                name="dia_pago"
                value={formData.dia_pago}
                onChange={handleChange}
                min="1"
                max="31"
                placeholder="Ej: 1"
                error={errors.dia_pago}
              />
              {errors.dia_pago && (
                <p className="text-red-500 text-sm mt-1">{errors.dia_pago}</p>
              )}
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
                placeholder="Notas adicionales sobre el arriendo..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/agent/rentals")}
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
                    Crear Arriendo
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

export default RentalForm;
