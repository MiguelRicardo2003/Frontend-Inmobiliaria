import React from 'react';
import { Users, Home, Eye, DollarSign } from 'lucide-react';
import StatCard from './components/StatCard';
import DynamicChart from './components/DynamicChart';

// Datos simulados
const salesData = [
  { month: 'Ene', ventas: 40, rentas: 24 },
  { month: 'Feb', ventas: 30, rentas: 14 },
  { month: 'Mar', ventas: 20, rentas: 58 },
  { month: 'Abr', ventas: 27, rentas: 39 },
  { month: 'May', ventas: 18, rentas: 48 },
  { month: 'Jun', ventas: 23, rentas: 38 },
];

const propertyTypeData = [
  { name: 'Casas', value: 400 },
  { name: 'Aptos', value: 300 },
  { name: 'Oficinas', value: 300 },
  { name: 'Terrenos', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const stats = [
    { title: 'Total de Visitas', value: '2.4M', change: '+14.5%', icon: Eye },
    { title: 'Propiedades Activas', value: '1,204', change: '+2.1%', icon: Home },
    { title: 'Nuevos Usuarios', value: '350', change: '-1.8%', icon: Users },
    { title: 'Ingresos del Mes', value: '$45,231', change: '+5.9%', icon: DollarSign },
];

const Analytics = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Dashboard de Análisis
      </h1>

      {/* Sección de Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            icon={stat.icon}
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