import React, { useState } from 'react';
import { Users, Home, Eye, DollarSign } from 'lucide-react';
import StatCard from './components/StatCard';
import DynamicChart from './components/DynamicChart';
import {
  salesData,
  propertyTypeData,
  COLORS,
  stats as statsData,
  ventasData, // ← ya normalizado
} from '../../../shared/utils/data';

const iconMap = {
  Eye,
  Home,
  Users,
  DollarSign,
};

// Obtener sedes desde los keys del objeto ventasData
const sedes = Object.keys(ventasData);

// 🧠 Función que agrupa y suma por mes
const agruparPorMes = data => {
  const resultado = {};

  data.forEach(({ month, ventas, rentas }) => {
    if (!resultado[month]) {
      resultado[month] = { month, ventas: 0, rentas: 0 };
    }
    resultado[month].ventas += ventas;
    resultado[month].rentas += rentas;
  });

  const ordenMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  return ordenMeses.map(m => resultado[m]).filter(Boolean);
};

const Analytics = () => {
  const [sede, setSede] = useState('');

  // Si hay sede seleccionada, se toma directamente
  // Si no, se agrupan todos los datos por mes con sumatoria
  const allData = sedes.flatMap(s => ventasData[s]);
  const chartSalesData = sede
    ? ventasData[sede] || []
    : agruparPorMes(allData);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">

      <div className='flex justify-between items-center mb-6'>

   
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Dashboard de Análisis  
      </h1>
 
        {/* Selección de sede */}
      <div className="flex gap-2 items-end">
        <p className="text-gray-900 dark:text-gray-100 text-2xl">Selecciona la Sede</p>
        <select
          className="border border-gray-300 rounded-md p-2"
          value={sede}
          onChange={e => setSede(e.target.value)}
        >
          <option value="">Todas</option>
          {sedes.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div> 

         </div>




      {/* Sección de Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            icon={iconMap[stat.icon]}
            title={stat.title}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </div>

  
      {/* Sección de Gráficas */}
      <div className="grid grid-cols-1 gap-8">

        
        <DynamicChart
          salesData={chartSalesData}
          propertyTypeData={propertyTypeData}
          colors={COLORS}
        />
      </div>
    </div>
  );
};

export default Analytics;
