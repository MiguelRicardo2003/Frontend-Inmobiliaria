import React from 'react';
import { Card, CardContent } from '../../../../components/ui/Card';
import { Building2, Home, Key, DollarSign } from 'lucide-react';

const Statistics = ({ stats }) => {
  const { total, disponibles, arrendadas, vendidas } = stats;

  const statItems = [
    {
      label: "Total Propiedades",
      value: total,
      color: "text-blue-600 dark:text-blue-400",
      icon: <Building2 size={20} />,
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
    {
      label: "Disponibles",
      value: disponibles,
      color: "text-green-600 dark:text-green-400",
      icon: <Home size={20} />,
      bgColor: "bg-green-50 dark:bg-green-900/30"
    },
    {
      label: "Arrendadas",
      value: arrendadas,
      color: "text-amber-600 dark:text-amber-400",
      icon: <Key size={20} />,
      bgColor: "bg-amber-50 dark:bg-amber-900/30"
    },
    {
      label: "Vendidas",
      value: vendidas,
      color: "text-purple-600 dark:text-purple-400",
      icon: <DollarSign size={20} />,
      bgColor: "bg-purple-50 dark:bg-purple-900/30"
    }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800">
            <CardContent className="flex items-start">
              <div className={`mr-4 p-2 rounded-md ${item.bgColor}`}>
                <div className={item.color}>
                  {item.icon}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
                <p className={`text-2xl font-bold ${item.color} mt-1`}>
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Statistics; 