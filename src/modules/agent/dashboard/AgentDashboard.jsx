import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Users, 
  DollarSign, 
  Key, 
  TrendingUp, 
  TrendingDown,
  Eye,
  CheckCircle,
  Clock
} from "lucide-react";
import StatCard from "../../../components/ui/StatCard";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import agentService from "./services/agentService";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    properties: {
      total: 0,
      active: 0,
      pending: 0,
    },
    customers: {
      total: 0,
    },
    sales: {
      total: 0,
      thisMonth: 0,
    },
    rentals: {
      total: 0,
      active: 0,
    },
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const result = await agentService.getDashboardStats();
      
      if (result.success) {
        setStats(result.data.stats);
        setRecentActivities(result.data.recentActivities || []);
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Panel del Agente
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tus propiedades y clientes
          </p>
        </div>
        <Button onClick={() => navigate('/agent/properties/new')}>
          + Nueva Propiedad
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Mis Propiedades"
          value={stats.properties.total}
          icon={<Building2 className="w-6 h-6" />}
          trend={{ value: stats.properties.active, label: "activas" }}
          color="blue"
        />
        <StatCard
          title="Mis Clientes"
          value={stats.customers.total}
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Ventas"
          value={stats.sales.thisMonth}
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: stats.sales.total, label: "total" }}
          color="purple"
        />
        <StatCard
          title="Arriendos Activos"
          value={stats.rentals.active}
          icon={<Key className="w-6 h-6" />}
          trend={{ value: stats.rentals.total, label: "total" }}
          color="orange"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Acciones Rápidas
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/agent/properties/new')}
                className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Agregar Propiedad
                  </span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => navigate('/agent/sales/new')}
                className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Registrar Venta
                  </span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => navigate('/agent/rentals/new')}
                className="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Crear Arriendo
                  </span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => navigate('/agent/customers')}
                className="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Ver Clientes
                  </span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Actividad Reciente
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      {activity.type === 'property' && <Building2 className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'sale' && <DollarSign className="w-4 h-4 text-green-600" />}
                      {activity.type === 'rental' && <Key className="w-4 h-4 text-orange-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No hay actividad reciente
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Status */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Estado de Propiedades
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.properties.active}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Activas</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.properties.pending}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.properties.total}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
