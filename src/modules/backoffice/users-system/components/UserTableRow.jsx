import React from "react";
import UserTableStatus from "./UserTableStatus";
import UserTableActions from "./UserTableActions";

const UserTableRow = ({ user, onEdit, onDelete }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {user.nombre?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {user.nombre} {user.apellido}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.correo}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {user.rol?.nombre || 'Sin rol'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {user.celular || 'No especificado'}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {user.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString() : 'N/A'}
      </td>
      <td className="px-6 py-4">
        <UserTableActions
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default UserTableRow;
