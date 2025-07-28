import React from 'react';
import { Card, CardContent } from '../../../../../../components/ui/Card';

const Statistics = ({ stats }) => {
  const { total, disponibles, arrendadas, vendidas } = stats;

  const statItems = [
    {
      label: "Total Propiedades",
      value: total,
      color: "text-blue-600 dark:text-blue-400",

    },
    {
      label: "Disponibles",
      value: disponibles,
      color: "text-green-600 dark:text-green-400",

    },
    {
      label: "Arrendadas",
      value: arrendadas,
      color: "text-blue-600 dark:text-blue-400",

    },
    {
      label: "Vendidas",
      value: vendidas,
      color: "text-gray-600 dark:text-gray-400",
    }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg">{item.icon}</span>
                <p className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Statistics; 