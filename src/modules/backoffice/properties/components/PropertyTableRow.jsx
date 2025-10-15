import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import PropertyTableActions from "./PropertyTableActions";

const PropertyTableRow = ({ property, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO');
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4">
            <img 
              src={property.imagenes?.[0]?.url || '/placeholder-property.jpg'} 
              alt={property.titulo}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/placeholder-property.jpg';
              }}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {property.titulo}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {property.direccion}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {property.tipo?.nombre || 'Sin tipo'}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          property.estado?.nombre === 'Venta' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : property.estado?.nombre === 'Arriendo'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
        }`}>
          {property.estado?.nombre || 'Sin estado'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
        {formatPrice(property.precio)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {property.metros_cuadrados ? `${property.metros_cuadrados} m²` : 'N/A'}
        {property.habitaciones && property.banos && (
          <div className="text-xs text-gray-400">
            {property.habitaciones} hab • {property.banos} baños
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {formatDate(property.fecha_publicacion)}
      </td>
      <td className="px-6 py-4">
        <PropertyTableActions
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default PropertyTableRow;

