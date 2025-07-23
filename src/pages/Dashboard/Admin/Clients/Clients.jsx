import { Pencil, Trash2 } from "lucide-react";
import Button from "../../../../components/ui/Admin/ButtonAdmin";

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
    nombre: "Miguel Angel",
    apellido: "Ricardo",
    telefono: "+57 300 123 4567",
    correo: "miguel_@hfhfhfhffhhelpoli.edu.com",
    rol: "Cliente",
    direccion: "Carepa",
    descripcion: "Inactivo",
  },
  {
    id: 3,
    nombre: "Miguel Angel",
    apellido: "Ricardo",
    telefono: "+57 300 123 4567",
    correo: "miguel_@elpoli.edu.com",
    rol: "Agente",
    direccion: "Carepa",
    descripcion: "Activo",
  },
  // Agrega más usuarios aquí
];

const Clients = () => {
  return (
    <div className="space-y-6">
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
      <div className="overflow-x-auto p-4 rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-300 text-gray-700 text-sm text-left">
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{user.id}</td>
                <td className="px-4 py-2 text-sm">{user.nombre}</td>
                <td className="px-4 py-2 text-sm">{user.apellido}</td>
                <td className="px-4 py-2 text-sm">{user.correo}</td>
                <td className="px-4 py-2 text-sm">{user.telefono}</td>
                <td className="px-4 py-2 text-sm">{user.rol}</td>
                <td className="px-4 py-2 text-sm">{user.direccion}</td>
                <td className="px-4 py-2 text-sm">{user.descripcion}</td>
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
      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
          1
        </button>
        <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
          2
        </button>
        <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
          3
        </button>
      </div>
    </div>
  );
};

export default Clients;
