import React from 'react';
import { Users, Home, Eye, DollarSign } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';
import DynamicChart from './components/DynamicChart';

// Wrapper para mantener el nombre original 'Stat'
const Stat = (props) => <StatCard {...props} />;
import { salesData, propertyTypeData, COLORS, stats as statsData } from '../../../shared/data';

const iconMap = {
  Eye: <Eye />,
  Home: <Home />,
  Users: <Users />,
  DollarSign: <DollarSign />,
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
          <Stat
            key={index}
            icon={iconMap[stat.icon]}
            title={stat.title}
            value={stat.value}
            trend={{
              value: parseFloat(stat.change),
              isPositive: parseFloat(stat.change) >= 0,
            }}
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