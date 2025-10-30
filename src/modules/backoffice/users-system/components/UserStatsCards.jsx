import React from "react";
import { Card, CardContent } from "../../../../components/ui/Card";
import { Users, UserCheck, UserCog, Shield } from "lucide-react";

const UserStatsCards = ({ total, clientes, agentes, administradores }) => {
  const stats = [
    {
      label: "Total Usuarios",
      value: total,
      color: "text-blue-600 dark:text-blue-400",
      icon: <Users size={20} />,
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
    {
      label: "Clientes",
      value: clientes,
      color: "text-green-600 dark:text-green-400",
      icon: <UserCheck size={20} />,
      bgColor: "bg-green-50 dark:bg-green-900/30"
    },
    {
      label: "Agentes",
      value: agentes,
      color: "text-amber-600 dark:text-amber-400",
      icon: <UserCog size={20} />,
      bgColor: "bg-amber-50 dark:bg-amber-900/30"
    },
    {
      label: "Administradores",
      value: administradores,
      color: "text-purple-600 dark:text-purple-400",
      icon: <Shield size={20} />,
      bgColor: "bg-purple-50 dark:bg-purple-900/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white dark:bg-gray-800">
          <CardContent className="flex items-start">
            <div className={`mr-4 p-2 rounded-md ${stat.bgColor}`}>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${stat.color} mt-1`}>
                {stat.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStatsCards;
