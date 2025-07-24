import React from "react";
import { Card } from "../../../../../components/ui/Card";
import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function PropertyTable({ properties, onView, onEdit, onDelete }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Propiedad</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Dirección</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Precio</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Estado</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No hay propiedades para mostrar.
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{property.name || property.titulo}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{property.address || property.direccion}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-green-600 font-semibold">${property.price || property.precio}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      property.estado === 'disponible'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                        : property.estado === 'vendida'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        : property.estado === 'arrendada'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                    }`}>
                      {property.estado || property.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView && onView(property)}
                        className="p-1 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit && onEdit(property)}
                        className="p-1 text-gray-600 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(property)}
                        className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
} 