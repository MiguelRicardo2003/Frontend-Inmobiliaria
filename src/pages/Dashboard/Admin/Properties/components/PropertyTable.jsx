import React from "react";
import { Card } from "../../../../../components/ui/Card";
import { Eye, Pencil, Trash2, Ban } from 'lucide-react';

// Mock de catálogos para tipo, estado y dueño
const tipoCatalogo = {
  1: "Casa",
  2: "Apartamento",
  3: "Oficina",
  4: "Local",
  5: "Terreno",
  6: "Bodega"
};
const estadoCatalogo = {
  1: "Disponible",
  2: "Reservada",
  3: "Vendida",
  4: "Alquilada",
  5: "En proceso",
  6: "Deshabilitada"
};
const duenoCatalogo = {
  "uuid-1": { nombre: "Juan Pérez", email: "juan@email.com" },
  "uuid-2": { nombre: "Ana Gómez", email: "ana@email.com" },
  "uuid-3": { nombre: "Carlos Ruiz", email: "carlos@email.com" }
};

export default function PropertyTable({ properties, onView, onEdit, onDelete, onDisable }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Imagen</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Título</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Precio</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Dirección</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Metros²</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Habitaciones</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Baños</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Tipo</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Estado</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Dueño</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Fecha publicación</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No hay propiedades para mostrar.
                </td>
              </tr>
            ) : (
              properties.map((property) => {
                // Mock para tipo, estado y dueño
                const tipo = property.tipo_nombre || tipoCatalogo[property.tipo_id] || property.tipo || "-";
                const estado = property.estado_nombre || estadoCatalogo[property.estado_id] || property.estado || "-";
                const dueno = property.dueno_nombre || duenoCatalogo[property.dueno_id]?.nombre || property.propietario?.nombre || "-";
                const duenoEmail = property.dueno_email || duenoCatalogo[property.dueno_id]?.email || property.propietario?.email || "";
                const fecha = property.fecha_publicacion ? new Date(property.fecha_publicacion).toLocaleDateString() : "-";
                return (
                  <tr key={property.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-4">
                      {property.imagenes && property.imagenes.length > 0 ? (
                        <img src={property.imagenes[0].url} alt={property.imagenes[0].descripcion || property.titulo} className="w-14 h-14 object-cover rounded-lg border" />
                      ) : (
                        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">-</div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{property.titulo || property.name}</td>
                    <td className="py-4 px-4 text-green-600 font-semibold">${property.precio?.toLocaleString() || property.price?.toLocaleString() || "-"}</td>
                    <td className="py-4 px-4">{property.direccion || property.address || property.ubicacion?.direccion || "-"}</td>
                    <td className="py-4 px-4">{property.metros_cuadrados || property.caracteristicas?.superficie || "-"}</td>
                    <td className="py-4 px-4">{property.habitaciones || property.caracteristicas?.habitaciones || "-"}</td>
                    <td className="py-4 px-4">{property.banos || property.caracteristicas?.banos || "-"}</td>
                    <td className="py-4 px-4">{tipo}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        estado === 'Disponible'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                          : estado === 'Vendida' || estado === 'Alquilada'
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                          : estado === 'Deshabilitada'
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {estado}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span>{dueno}</span>
                      {duenoEmail && <div className="text-xs text-gray-500">{duenoEmail}</div>}
                    </td>
                    <td className="py-4 px-4">{fecha}</td>
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
                        {onDisable && estado !== 'Deshabilitada' && (
                          <button
                            onClick={() => onDisable(property)}
                            className="p-1 text-gray-600 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-400"
                            title="Deshabilitar"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
} 