import React from "react";
import { Card, CardContent } from "../../../../../components/ui/Admin/CardAdmin";

const UserStatsCards = ({ total, clientes, agentes, activos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-blue-600">{total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Usuarios</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-green-600">{clientes}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Clientes</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{agentes}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Agentes</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-red-600">{activos}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Activos</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
