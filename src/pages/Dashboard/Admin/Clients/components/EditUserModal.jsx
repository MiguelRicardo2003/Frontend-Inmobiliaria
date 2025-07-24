import React from "react";
import Button from "../../../../../components/ui/Admin/ButtonAdmin";

const EditUserModal = ({ user, onClose, onSubmit }) => {
  const [form, setForm] = React.useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    correo: user?.correo || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
    rol: user?.rol || "",
    descripcion: user?.descripcion || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...user, ...form });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Editar Usuario
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Seleccionar Rol</option>
            <option value="Cliente">Cliente</option>
            <option value="Agente">Agente</option>
          </select>
          <select
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Seleccionar Estado</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="danger" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
