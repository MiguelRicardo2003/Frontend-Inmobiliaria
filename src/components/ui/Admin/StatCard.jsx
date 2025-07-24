import React from 'react';
import { Card, CardContent } from './CardAdmin';

const StatCard = ({ title, value, icon,trend,className = '' }) => {
  return (
    <Card className={`${className} hover:translate-y-[-2px] transition-all`}>
      <CardContent className="flex items-start">
        <div className="mr-4 p-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-gray-100">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium ${
                trend.isPositive 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs mes anterior</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
