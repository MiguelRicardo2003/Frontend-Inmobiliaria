import React from "react";
import { Edit, Trash2 } from "lucide-react";

const UserTableActions = ({ user, onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit(user)}
        className="text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity"
        title="Editar usuario"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(user)}
        className="text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity"
        title="Eliminar usuario"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UserTableActions;
