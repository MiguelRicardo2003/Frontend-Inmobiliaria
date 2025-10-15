import React from "react";

const PropertyTableHeader = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Propiedad
        </th>
        <th scope="col" className="px-6 py-3">
          Tipo
        </th>
        <th scope="col" className="px-6 py-3">
          Estado
        </th>
        <th scope="col" className="px-6 py-3">
          Precio
        </th>
        <th scope="col" className="px-6 py-3">
          Área
        </th>
        <th scope="col" className="px-6 py-3">
          Fecha
        </th>
        <th scope="col" className="px-6 py-3">
          Acciones
        </th>
      </tr>
    </thead>
  );
};

export default PropertyTableHeader;
