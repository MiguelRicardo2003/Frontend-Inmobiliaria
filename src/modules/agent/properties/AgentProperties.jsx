import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin,
  Home as HomeIcon,
  DollarSign,
  Filter
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import agentService from "../dashboard/services/agentService";
import Modal from "../../../components/ui/Modal";

const AgentProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, filterStatus]);

  const loadProperties = async () => {
    setLoading(true);
    const result = await agentService.getProperties();
    if (result.success) {
      setProperties(result.data);
    }
    setLoading(false);
  };

  const filterProperties = () => {
    let filtered = properties;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.direccion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (p) => p.estado_propiedad_id === parseInt(filterStatus)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleDelete = async () => {
    if (!propertyToDelete) return;

    const result = await agentService.deleteProperty(propertyToDelete.id);
    if (result.success) {
      setProperties(properties.filter((p) => p.id !== propertyToDelete.id));
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (estadoId) => {
    const statuses = {
      1: { label: "Disponible", color: "bg-green-100 text-green-800" },
      2: { label: "Vendida", color: "bg-blue-100 text-blue-800" },
      3: { label: "Arrendada", color: "bg-purple-100 text-purple-800" },
      4: { label: "Reservada", color: "bg-yellow-100 text-yellow-800" },
    };
    const status = statuses[estadoId] || { label: "Desconocido", color: "bg-gray-100 text-gray-800" };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
        {status.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Mis Propiedades
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tus propiedades inmobiliarias
          </p>
        </div>
        <Button onClick={() => navigate("/agent/properties/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Propiedad
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar propiedades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="1">Disponible</option>
                <option value="2">Vendida</option>
                <option value="3">Arrendada</option>
                <option value="4">Reservada</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay propiedades
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "No se encontraron propiedades con los filtros aplicados"
                  : "Comienza agregando tu primera propiedad"}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button onClick={() => navigate("/agent/properties/new")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Propiedad
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {property.imagen_url ? (
                  <img
                    src={property.imagen_url}
                    alt={property.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {getStatusBadge(property.estado_propiedad_id)}
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                  {property.nombre}
                </h3>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="truncate">{property.direccion}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                  <HomeIcon className="w-4 h-4 mr-1" />
                  <span>{property.TipoPropiedad?.nombre || "Sin tipo"}</span>
                </div>

                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-lg mb-4">
                  <DollarSign className="w-5 h-5" />
                  {formatPrice(property.precio)}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => navigate(`/agent/properties/${property.id}`)}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/agent/properties/${property.id}/edit`)}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setPropertyToDelete(property);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPropertyToDelete(null);
        }}
        title="Eliminar Propiedad"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar la propiedad{" "}
            <strong>{propertyToDelete?.nombre}</strong>? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setPropertyToDelete(null);
              }}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentProperties;
