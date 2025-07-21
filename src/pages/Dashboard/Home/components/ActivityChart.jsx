import React from 'react';
import { Card, CardContent, CardHeader } from '../../../../components/ui/Admin/CardAdmin';

const ActivityChart = () => {
  // Datos simulados para la gráfica
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activityData = [25, 40, 30, 65, 45, 20, 35];

  // Escalado basado en el valor máximo
  const maxValue = Math.max(...activityData);

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Actividad semanal</h3>
        <select className="text-sm bg-transparent border-gray-200 dark:border-gray-700 rounded">
          <option>Esta semana</option>
          <option>La semana pasada</option>
          <option>Mes pasado</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <div className="flex h-full items-end space-x-2">
            {activityData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-sm hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors relative group"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {value}
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{daysOfWeek[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
