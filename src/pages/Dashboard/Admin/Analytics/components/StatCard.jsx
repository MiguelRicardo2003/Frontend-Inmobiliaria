import React from 'react';
import Card from '../../../../../components/ui/Card';

const StatCard = ({ icon, title, value, change }) => {
  const Icon = icon;
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <Card className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between ">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{value}</p>
        <p className={`text-sm font-medium ${changeColor}`}>{change} vs mes anterior</p>
      </div>
    </Card>
  );
};

export default StatCard;