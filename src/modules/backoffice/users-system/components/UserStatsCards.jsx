import React from "react";
import { Card, CardContent } from "../../../../components/ui/Card";

const UserStatsCards = ({ total, clientes, agentes, administradores }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Usuarios</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{clientes}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Clientes</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{agentes}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Agentes</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{administradores}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Administradores</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
