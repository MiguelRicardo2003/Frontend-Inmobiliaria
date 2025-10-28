import React from "react";
import { Edit, Trash2 } from "lucide-react";

const UserTableActions = ({ user, onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit(user)}
        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        title="Editar usuario"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(user)}
        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        title="Eliminar usuario"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UserTableActions;
