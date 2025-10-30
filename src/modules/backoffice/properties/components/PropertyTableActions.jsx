import React from "react";
import { Edit, Trash2 } from "lucide-react";

const PropertyTableActions = ({ property, onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit(property)}
        className="text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity"
        title="Editar propiedad"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(property)}
        className="text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity"
        title="Eliminar propiedad"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PropertyTableActions;

