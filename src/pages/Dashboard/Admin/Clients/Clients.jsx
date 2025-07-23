import { useState } from "react";
import { Pencil, Trash2, Search, Filter } from "lucide-react";
import Button from "../../../../components/ui/Admin/ButtonAdmin";
import UserStatsCards from "./components/UserStatsCards";
import { Card, CardContent } from "../../../../components/ui/Admin/CardAdmin";
import Input from "../../../../components/ui/Input";
import NewItemButton from "../../../../components/ui/Admin/NewItemButton";
import Pagination from "../../../../components/ui/Pagination";
import CreateUserModal from "./components/CreateUserModal";

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
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);

  const totalUsuarios = usuarios.length;
  const totalClientes = usuarios.filter((u) => u.rol === "Cliente").length;
  const totalAgentes = usuarios.filter((u) => u.rol === "Agente").length;
  const totalActivos = usuarios.filter(
    (u) => u.descripcion === "Activo"
  ).length;

  const paginatedUsers = usuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Usuarios
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestión de usuarios
          </p>
        </div>
        <div className="space-x-2 sm:gap-2 flex">
          <Button variant="outline">Exportar Datos</Button>
          <Button>Generar Informe</Button>
        </div>
      </div>

      {/* Tarjetas estadísticas */}
      <UserStatsCards
        total={totalUsuarios}
        clientes={totalClientes}
        agentes={totalAgentes}
        activos={totalActivos}
      />

      {/* Filtro + Búsqueda + Botón nuevo */}
      <Card className="bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Input de búsqueda */}
            <div className="w-full md:w-1/4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar usuarios..." className="pl-10" />
            </div>

            {/* Botón Filtros */}
            <Button variant="outline" className="w-full md:w-40">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>

            <NewItemButton
              label="Nuevo Cliente"
              onClick={() => setIsModalOpen(true)}
            />

            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <CreateUserModal
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={() => {
                    // Aquí procesas el formulario
                    setIsModalOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil size={18} />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700">
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
    </div>
  );
};

export default Clients;
