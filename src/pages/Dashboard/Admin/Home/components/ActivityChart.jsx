import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader } from '../../../../../components/ui/Card';

const ActivityChart = () => {
  // Datos simulados para la gráfica
  const activityData = [
    { day: 'Lun', actividad: 25 },
    { day: 'Mar', actividad: 40 },
    { day: 'Mié', actividad: 30 },
    { day: 'Jue', actividad: 65 },
    { day: 'Vie', actividad: 45 },
    { day: 'Sáb', actividad: 20 },
    { day: 'Dom', actividad: 35 },
  ];

  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center bg-white dark:bg-gray-800">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Actividad semanal</h3>
        <select className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Esta semana</option>
          <option>La semana pasada</option>
          <option>Mes pasado</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                strokeOpacity={isDarkMode ? 0.1 : 0.2}
                stroke={isDarkMode ? "#374151" : "#e5e7eb"}
              />
              <XAxis 
                dataKey="day" 
                strokeOpacity={isDarkMode ? 0.7 : 0.6}
                stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                tick={{ fill: isDarkMode ? "#9ca3af" : "#6b7280" }}
              />
              <YAxis 
                strokeOpacity={isDarkMode ? 0.7 : 0.6}
                stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                tick={{ fill: isDarkMode ? "#9ca3af" : "#6b7280" }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                  border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: isDarkMode ? "#f9fafb" : "#111827"
                }}
              />
              <Bar 
                dataKey="actividad" 
                fill={isDarkMode ? "#60a5fa" : "#3b82f6"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
