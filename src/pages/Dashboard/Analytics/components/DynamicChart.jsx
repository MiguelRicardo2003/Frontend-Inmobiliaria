import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../../../../components/ui/Card';

const ChartControls = ({ chartType, setChartType }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    <button onClick={() => setChartType('line')} className={`px-4 py-2 text-sm rounded-lg font-semibold ${chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>
      Líneas
    </button>
    <button onClick={() => setChartType('bar')} className={`px-4 py-2 text-sm rounded-lg font-semibold ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>
      Barras
    </button>
    <button onClick={() => setChartType('pie')} className={`px-4 py-2 text-sm rounded-lg font-semibold ${chartType === 'pie' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>
      Pastel
    </button>
  </div>
);

const DynamicChart = ({ salesData, propertyTypeData, colors }) => {
  const [chartType, setChartType] = useState('line');

  const renderChart = () => {
    // ... (código de renderizado de gráficas, igual al que ya tenías)
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="month" strokeOpacity={0.5} />
            <YAxis strokeOpacity={0.5} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ventas" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="rentas" stroke="#82ca9d" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="month" strokeOpacity={0.5} />
            <YAxis strokeOpacity={0.5} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ventas" fill="#8884d8" />
            <Bar dataKey="rentas" fill="#82ca9d" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={propertyTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {propertyTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-blue-500">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Rendimiento de Ventas y Rentas</h3>
      <ChartControls chartType={chartType} setChartType={setChartType} />
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DynamicChart;