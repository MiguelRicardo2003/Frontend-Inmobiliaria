import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Button from "../../../components/ui/Button";
import UserStatsCards from "./components/UserStatsCards";
import Pagination from "../../../components/ui/Pagination";
import CreateUserModal from "./components/CreateUserModal";
import UserSearchBar from "./components/UserSearchBar";
import { useFilteredUsers } from "../../../hooks/useFilteredUsers";
import EditUserModal from "./components/EditUserModal";
import SuccessModal from "./components/SuccessModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import DeleteSuccessModal from "./components/DeleteSuccessModal";

const usuarios = [
  {
    id: 1,
    nombre: "Miguel Angel",
    apellido: "Ricardo",
    telefono: "+57 300 123 4567",
    correo: "miguel_@elpoli.edu.com",
    rol: "Cliente",
    direccion: "Carepa",
    descripcion: "Activo",
  },
  {
    id: 2,
    nombre: "Laura",
    apellido: "Martínez",
    telefono: "+57 310 987 6543",
    correo: "laura@gmail.com",
    rol: "Cliente",
    direccion: "Apartadó",
    descripcion: "Inactivo",
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Gómez",
    telefono: "+57 320 456 7890",
    correo: "carlos@agente.com",
    rol: "Agente",
    direccion: "Turbo",
    descripcion: "Activo",
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "López",
    telefono: "+57 315 234 5678",
    correo: "ana@gmail.com",
    rol: "Agente",
    direccion: "Necoclí",
    descripcion: "Activo",
  },
  {
    id: 5,
    nombre: "Jorge",
    apellido: "Restrepo",
    telefono: "+57 300 321 4321",
    correo: "jorge@gmail.com",
    rol: "Cliente",
    direccion: "Chigorodó",
    descripcion: "Inactivo",
  },
];

const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
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

  const handleUpdateUser = (updatedUser) => {
    const idx = usuarios.findIndex((u) => u.id === updatedUser.id);
    if (idx !== -1) {
      usuarios[idx] = { ...usuarios[idx], ...updatedUser };
    }
    setEditUser(null);
    setSuccessMessage("Usuario actualizado correctamente");
    setShowSuccessModal(true);
  };

  const { filteredUsers, paginatedUsers, totalPages } = useFilteredUsers(
    usuarios,
    searchTerm,
    currentPage,
    itemsPerPage
  );

  const totalUsuarios = usuarios.length;
  const totalClientes = usuarios.filter((u) => u.rol === "Cliente").length;
  const totalAgentes = usuarios.filter((u) => u.rol === "Agente").length;
  const totalActivos = usuarios.filter(
    (u) => u.descripcion === "Activo"
  ).length;

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      const idx = usuarios.findIndex((u) => u.id === userToDelete.id);
      if (idx !== -1) {
        usuarios.splice(idx, 1);
      }
    }
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const handleCloseDeleteSuccess = () => {
    setShowDeleteSuccess(false);
  };

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
          <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 dark:text-white h-12 flex items-center gap-2">Exportar Datos</Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex items-center gap-2">Generar Informe</Button>
        </div>
      </div>

      {/* Tarjetas estadísticas */}
      <UserStatsCards
        total={totalUsuarios}
        clientes={totalClientes}
        agentes={totalAgentes}
        activos={totalActivos}
      />

      {/* Buscador + botón nuevo */}
      <div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <UserSearchBar
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo Cliente
          </Button>
        </div>
      </div>

      {/* Modal de crear usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <CreateUserModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={() => {
              setIsModalOpen(false);
              setSuccessMessage("Usuario creado correctamente");
              setShowSuccessModal(true);
            }}
          />
        </div>
      )}

      {/* Modal de edición */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <EditUserModal
            user={editUser}
            onClose={() => setEditUser(null)}
            onSubmit={handleUpdateUser}
          />
        </div>
      )}

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white text-sm text-left">
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id + user.correo}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-200"
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.nombre}</td>
                <td className="px-4 py-2">{user.apellido}</td>
                <td className="px-4 py-2">{user.correo}</td>
                <td className="px-4 py-2">{user.telefono}</td>
                <td className="px-4 py-2">{user.rol}</td>
                <td className="px-4 py-2">{user.direccion}</td>
                <td className="px-4 py-2">{user.descripcion}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2 items-center justify-center">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => setEditUser(user)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <Pagination
        current={currentPage}
        total={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

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
