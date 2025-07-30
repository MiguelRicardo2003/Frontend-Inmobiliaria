import React from 'react';
import { Card, CardContent } from './Card';

const StatCard = ({ title, value, icon, trend, className = '', variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400',
    success: 'bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400',
    warning: 'bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400',
    danger: 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400',
    info: 'bg-sky-50 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400',
  };

  return (
    <Card className={`${className} hover:translate-y-[-2px] transition-all duration-200`}>
      <CardContent className="flex items-start">
        <div className={`mr-4 p-2 rounded-md ${variantClasses[variant]}`}>
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