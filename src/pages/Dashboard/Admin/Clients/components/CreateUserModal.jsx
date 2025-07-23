import React from "react";
import Button from "../../../../../components/ui/Admin/ButtonAdmin";

const CreateUserModal = ({ onClose, onSubmit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Agregar Usuario
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Apellido"
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          placeholder="Correo"
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Dirección"
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Seleccionar Rol</option>
          <option value="Cliente">Cliente</option>
          <option value="Agente">Agente</option>
        </select>
        <select className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Seleccionar Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="danger" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onSubmit}>Agregar</Button>
      </div>
    </div>
  );
};

export default CreateUserModal;
