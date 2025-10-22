import React, { useState, useEffect } from "react";
import { BarChart2, Users, Home, Building2, Wallet, ArrowUp, ArrowDown, DollarSign, Key } from "lucide-react";
import StatCard from "../../../components/ui/StatCard";
import Button from "../../../components/ui/Button";
import ActivityChart from "./components/ActivityChart";
import RecentActivity from "./components/RecentActivity";
import TasksList from "./components/TasksList";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import dashboardService from "./services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: {
      total: 0,
      trend: { value: 0, isPositive: true },
    },
    properties: {
      sold: 0,
      rented: 0,
      available: 0,
      total: 0,
      trend: { value: 0, isPositive: true },
    },
    customers: {
      total: 0,
      active: 0,
      trend: { value: 0, isPositive: true },
    },
    transactions: {
      monthly: 0,
      trend: { value: 0, isPositive: false },
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar estadísticas al montar el componente
  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await dashboardService.getDashboardStats();
      
      if (result.success) {
        setStats({
          revenue: {
            total: 2450000, // Este valor puede venir del backend en el futuro
            trend: { value: 12.5, isPositive: true },
          },
          properties: {
            sold: 0, // Esto puede calcularse con ventas
            rented: 0, // Esto puede calcularse con arriendos
            available: result.data.propiedades.total,
            total: result.data.propiedades.total,
            trend: { value: 8.2, isPositive: true },
          },
          customers: {
            total: result.data.usuarios.total,
            active: result.data.usuarios.activos,
            trend: { value: 15.3, isPositive: true },
          },
          transactions: {
            monthly: 0, // Esto puede calcularse con transacciones
            trend: { value: 5.7, isPositive: false },
          },
        });
      } else {
        setError(result.error || 'Error al cargar estadísticas');
      }
    } catch (err) {
      console.error('Error cargando estadísticas:', err);
      setError('Error inesperado al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Resumen general del rendimiento inmobiliario
          </p>
        </div>
        <div className="space-x-2 sm:gap-2 flex">
          <Button 
            variant="outline" 
            className="h-12 flex items-center gap-2"
            onClick={loadDashboardStats}
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex items-center gap-2">
            Generar Informe
          </Button>
        </div>
      </div>

      {/* Mensaje de Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
          <p className="font-medium">Error al cargar datos</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Estado de Carga */}
      {loading && !error ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Usuarios"
              value={stats.customers.total.toString()}
              icon={<Users size={20} />}
              trend={stats.customers.trend}
            />
            <StatCard
              title="Total Propiedades"
              value={stats.properties.total.toString()}
              icon={<Building2 size={20} />}
              trend={stats.properties.trend}
            />
            <StatCard
              title="Usuarios Activos"
              value={stats.customers.active.toString()}
              icon={<Users size={20} />}
              trend={stats.customers.trend}
            />
            <StatCard
              title="Transacciones Mensuales"
              value={stats.transactions.monthly.toString()}
              icon={<Wallet size={20} />}
              trend={stats.transactions.trend}
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex justify-between items-center bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Rendimiento de Ventas
              </h3>
              <select className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Este Año</option>
                <option>Último Año</option>
                <option>Últimos 2 Años</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ActivityChart />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader className="flex justify-between items-center bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Estado de Propiedades
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Vendidas */}
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        Vendidas
                      </p>
                      <p className="text-2xl font-semibold text-green-700 dark:text-green-300">
                        {stats.properties.sold}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <ArrowUp size={16} className="mr-1" />
                    8.2%
                  </span>
                </div>

                {/* Alquiladas */}
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Alquiladas
                      </p>
                      <p className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
                        {stats.properties.rented}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <ArrowUp size={16} className="mr-1" />
                    5.3%
                  </span>
                </div>

                {/* Disponibles */}
                <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                        Disponibles
                      </p>
                      <p className="text-2xl font-semibold text-amber-700 dark:text-amber-300">
                        {stats.properties.available}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                    <ArrowDown size={16} className="mr-1" />
                    2.1%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TasksList />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
