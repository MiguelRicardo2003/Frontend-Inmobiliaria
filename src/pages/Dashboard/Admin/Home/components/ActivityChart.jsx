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
import { Card, CardContent, CardHeader } from '../../../../../components/ui/Admin/CardAdmin';

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
        <div className="w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="day" strokeOpacity={0.6} />
              <YAxis strokeOpacity={0.6} />
              <Tooltip />
              <Bar dataKey="actividad" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
