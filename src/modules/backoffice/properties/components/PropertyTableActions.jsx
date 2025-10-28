import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";

const PropertyTableActions = ({ property, onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit(property)}
        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        title="Editar propiedad"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(property)}
        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        title="Eliminar propiedad"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PropertyTableActions;

