import React from "react";
import { Card } from "../../../../../components/ui/Card";
import Button from "../../../../../components/ui/Button";
import { Edit, Trash2 } from "lucide-react";

const estadoColors = {
  disponible: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  "en_proceso": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  arrendada: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  vendida: "bg-gray-200 text-gray-800 dark:bg-gray-700/40 dark:text-gray-200",
};

const PropertyCard = ({ name, address, price, estado, showEstado, onEdit, onDelete }) => {
  return (
    <Card hover className="mb-2">
      <Card.Content>
        <div className="flex justify-between items-center gap-2">
          <div>
            <span className="font-medium text-base block">{name}</span>
            <span className="text-xs text-gray-500 block">{address}</span>
            <span className="text-sm text-green-600 font-semibold">${price}</span>
            {showEstado && estado && (
              <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${estadoColors[estado] || "bg-gray-100 text-gray-800"}`}>
                {estado.charAt(0).toUpperCase() + estado.slice(1).replace("_", " ")}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                icon={Edit}
                onPointerDown={e => e.stopPropagation()}
                onClick={onEdit}
                aria-label="Editar propiedad"
              />
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onPointerDown={e => e.stopPropagation()}
                onClick={onDelete}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                aria-label="Eliminar propiedad"
              />
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PropertyCard; 