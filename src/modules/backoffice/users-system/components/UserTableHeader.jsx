import React from "react";

const UserTableHeader = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Usuario
        </th>
        <th scope="col" className="px-6 py-3">
          Rol
        </th>
        <th scope="col" className="px-6 py-3">
          Estado
        </th>
        <th scope="col" className="px-6 py-3">
          Fecha de registro
        </th>
        <th scope="col" className="px-6 py-3">
          Acciones
        </th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
