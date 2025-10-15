import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import UserStatsCards from "./components/UserStatsCards";
import Pagination from "@/components/ui/Pagination";
import CreateUserModal from "./components/CreateUserModal";
import UserSearchBar from "./components/UserSearchBar";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";
import EditUserModal from "./components/EditUserModal";
import SuccessModal from "./components/SuccessModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import DeleteSuccessModal from "./components/DeleteSuccessModal";
import { useUsers } from "./hooks/useUsers";
import UserTable from "./components/UserTable";

const Clients = () => {
  // Hook para manejar usuarios
  const { 
    users, 
    roles, 
    loading, 
    error, 
    loadUsers, 
    createUser, 
    updateUser, 
    deleteUser 
  } = useUsers();

  // Estados locales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleCreateUser = async (userData) => {
    const result = await createUser(userData);
    if (result.success) {
      setSuccessMessage("Usuario creado correctamente");
      setShowSuccessModal(true);
      setIsModalOpen(false);
    } else {
      setSuccessMessage(`Error: ${result.error}`);
      setShowSuccessModal(true);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    const result = await updateUser(updatedUser.id, updatedUser);
    if (result.success) {
      setEditUser(null);
      setSuccessMessage("Usuario actualizado correctamente");
      setShowSuccessModal(true);
    } else {
      setSuccessMessage(`Error: ${result.error}`);
      setShowSuccessModal(true);
    }
  };

  const { filteredUsers, paginatedUsers, totalPages } = useFilteredUsers(
    users,
    searchTerm,
    currentPage,
    itemsPerPage
  );

  // Calcular estadísticas
  const totalUsuarios = users.length;
  const totalClientes = users.filter((u) => u.rol?.nombre === "Cliente").length;
  const totalAgentes = users.filter((u) => u.rol?.nombre === "Agente").length;
  const totalAdministradores = users.filter((u) => u.rol?.nombre === "Administrador").length;

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    const result = await deleteUser(userToDelete.id);
    if (result.success) {
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
      setUserToDelete(null);
    } else {
      setSuccessMessage(`Error: ${result.error}`);
      setShowSuccessModal(true);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const handleCloseDeleteSuccess = () => {
    setShowDeleteSuccess(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={loadUsers} className="flex items-center gap-2">
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
            Usuarios
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestión y administración de los usuarios del sistema
          </p>
        </div>
        <div className="space-x-2 sm:gap-2 flex items-center">
          <Button 
            onClick={loadUsers}
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
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Tarjetas estadísticas */}
      <UserStatsCards
        total={totalUsuarios}
        clientes={totalClientes}
        agentes={totalAgentes}
        administradores={totalAdministradores}
      />

      {/* Buscador */}
      <div className="space-y-4">
        <UserSearchBar
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
        {searchTerm && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredUsers.length === 0 ? (
              <span>No se encontraron resultados para "{searchTerm}"</span>
            ) : (
              <span>
                {filteredUsers.length} resultado{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''} para "{searchTerm}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Modal de crear usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateUserModal
            roles={roles}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateUser}
          />
        </div>
      )}

      {/* Modal de edición */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <EditUserModal
            user={editUser}
            roles={roles}
            onClose={() => setEditUser(null)}
            onSubmit={handleUpdateUser}
          />
        </div>
      )}

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
        {paginatedUsers.length > 0 ? (
          <UserTable
            users={paginatedUsers}
            onEdit={setEditUser}
            onDelete={handleDeleteClick}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? `No se encontraron usuarios que coincidan con "${searchTerm}"`
                : 'Comienza agregando un nuevo usuario'
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
      {paginatedUsers.length > 0 && totalPages > 1 && (
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

export default Clients;
