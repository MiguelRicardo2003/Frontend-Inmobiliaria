import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, RefreshCw, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Statistics from "./components/UI/Statistics";
import Pagination from "@/components/ui/Pagination";
import CreatePropertyModal from "./components/CreatePropertyModal";
import PropertySearchBar from "./components/PropertySearchBar";
import { useFilteredProperties } from "@/hooks/useFilteredProperties";
import EditPropertyModal from "./components/EditPropertyModal";
import SuccessModal from "../users-system/components/SuccessModal";
import DeleteConfirmModal from "../users-system/components/DeleteConfirmModal";
import DeleteSuccessModal from "../users-system/components/DeleteSuccessModal";
import { useProperties } from "./hooks/useProperties";
import PropertyTable from "./components/PropertyTable";

const Properties = () => {
  // Hook para manejar propiedades
  const { 
    properties, 
    propertyTypes,
    propertyStates,
    loading, 
    error, 
    loadProperties, 
    createProperty, 
    updateProperty, 
    deleteProperty
  } = useProperties();

  // Estados locales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [editProperty, setEditProperty] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Cerrar el modal de éxito después de 3 segundos
  useEffect(() => {
    if (showSuccessModal) {
      const timeout = setTimeout(() => {
        setShowSuccessModal(false);
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showSuccessModal]);

  const handleCreateProperty = async (propertyData) => {
    const result = await createProperty(propertyData);
    if (result.success) {
      setSuccessMessage("Propiedad creada correctamente");
      setShowSuccessModal(true);
      setIsModalOpen(false);
    } else {
      setSuccessMessage(`Error: ${result.error}`);
      setShowSuccessModal(true);
    }
  };

  const handleUpdateProperty = async (updatedProperty) => {
    const result = await updateProperty(updatedProperty.id, updatedProperty);
    if (result.success) {
      setEditProperty(null);
      setSuccessMessage("Propiedad actualizada correctamente");
      setShowSuccessModal(true);
    } else {
      setSuccessMessage(`Error: ${result.error}`);
      setShowSuccessModal(true);
    }
  };

  const { filteredProperties, paginatedProperties, totalPages } = useFilteredProperties(
    properties,
    searchTerm,
    {},
    currentPage,
    itemsPerPage
  );

  // Calcular estadísticas
  const totalPropiedades = properties?.length || 0;
  const totalVentas = properties?.filter(p => p.estado?.nombre === 'Vendida').length || 0;
  const totalArriendos = properties?.filter(p => p.estado?.nombre === 'Arrendada').length || 0;
  const totalActivas = properties?.filter(p => p.estado?.nombre === 'Disponible').length || 0;

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    const result = await deleteProperty(propertyToDelete.id);
    if (result.success) {
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
      setPropertyToDelete(null);
    } else {
      setSuccessMessage(`Error: ${result.error}`);
      setShowSuccessModal(true);
      setShowDeleteConfirm(false);
      setPropertyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setPropertyToDelete(null);
  };

  const handleCloseDeleteSuccess = () => {
    setShowDeleteSuccess(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={loadProperties} className="flex items-center gap-2">
            <RefreshCw size={16} />
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Propiedades
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestión y administración de las propiedades del sistema
          </p>
        </div>
        <div className="space-x-2 sm:gap-2 flex items-center">
          <Button 
            onClick={loadProperties}
            variant="outline" 
            className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-800 dark:text-white h-12 flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Actualizar
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex items-center gap-2"
          >
            <Plus size={16} />
            Nueva Propiedad
          </Button>
        </div>
      </div>

      {/* Tarjetas estadísticas */}
      <Statistics
        stats={{
          total: totalPropiedades,
          disponibles: totalActivas,
          arrendadas: totalArriendos,
          vendidas: totalVentas
        }}
      />

      {/* Buscador */}
      <div className="space-y-4">
        <PropertySearchBar
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
        {searchTerm && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredProperties.length === 0 ? (
              <span>No se encontraron resultados para "{searchTerm}"</span>
            ) : (
              <span>
                {filteredProperties.length} resultado{filteredProperties.length !== 1 ? 's' : ''} encontrado{filteredProperties.length !== 1 ? 's' : ''} para "{searchTerm}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Modal de crear propiedad */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Nueva Propiedad"
          size="xl"
        >
          <CreatePropertyModal
            propertyTypes={propertyTypes}
            propertyStates={propertyStates}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateProperty}
          />
        </Modal>
      )}

      {/* Modal de edición */}
      {editProperty && (
        <Modal
          isOpen={!!editProperty}
          onClose={() => setEditProperty(null)}
          title="Editar Propiedad"
          size="xl"
        >
          <EditPropertyModal
            property={editProperty}
            propertyTypes={propertyTypes}
            propertyStates={propertyStates}
            onClose={() => setEditProperty(null)}
            onSubmit={handleUpdateProperty}
          />
        </Modal>
      )}

      {/* Tabla de propiedades */}
      <div className="overflow-x-auto p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
        {paginatedProperties.length > 0 ? (
          <PropertyTable
            properties={paginatedProperties}
            onEdit={setEditProperty}
            onDelete={handleDeleteClick}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No se encontraron propiedades' : 'No hay propiedades registradas'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? `No se encontraron propiedades que coincidan con "${searchTerm}"`
                : 'Comienza agregando una nueva propiedad'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </div>

      {/* Paginación */}
      {paginatedProperties.length > 0 && totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* Confirmación de eliminación */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          onCancel={handleCancelDelete}
          onConfirm={handleDelete}
        />
      )}
      {/* Éxito de eliminación */}
      {showDeleteSuccess && (
        <DeleteSuccessModal onClose={handleCloseDeleteSuccess} />
      )}
    </div>
  );
};

export default Properties;