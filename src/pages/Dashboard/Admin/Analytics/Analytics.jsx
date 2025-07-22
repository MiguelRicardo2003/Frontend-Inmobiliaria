import React from 'react';
import { Users, Home, Eye, DollarSign } from 'lucide-react';
import StatCard from './components/StatCard';
import DynamicChart from './components/DynamicChart';
import { salesData, propertyTypeData, COLORS, stats as statsData } from '../../../../shared/data';

const iconMap = {
  Eye,
  Home,
  Users,
  DollarSign,
};

const Analytics = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Dashboard de Análisis
      </h1>

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
          salesData={salesData}
          propertyTypeData={propertyTypeData}
          colors={COLORS}
        />
      </div>
    </div>
  );
};

export default Analytics;