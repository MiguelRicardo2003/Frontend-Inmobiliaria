import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Key, Plus, Building2, Users, Calendar, FileText, CheckCircle, Clock } from "lucide-react";
import Button from "../../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import agentService from "../dashboard/services/agentService";

const AgentRentals = () => {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    setLoading(true);
    const result = await agentService.getRentals();
    if (result.success) {
      setRentals(result.data);
    }
    setLoading(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (fechaFin) => {
    if (!fechaFin) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Activo</span>;
    }
    
    const endDate = new Date(fechaFin);
    const now = new Date();
    
    if (endDate > now) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Activo</span>;
    } else {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Finalizado</span>;
    }
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Arriendos de Propiedades
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona los arriendos de tus propiedades
          </p>
        </div>
        <Button onClick={() => navigate("/agent/rentals/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Crear Arriendo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {rentals.filter(r => {
                    if (!r.fecha_fin) return true;
                    return new Date(r.fecha_fin) > new Date();
                  }).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Arriendos Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {rentals.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Arriendos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {rentals.filter(r => {
                    if (!r.fecha_fin) return false;
                    return new Date(r.fecha_fin) <= new Date();
                  }).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Finalizados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rentals List */}
      {rentals.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay arriendos registrados
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Comienza creando tu primer arriendo de propiedad
              </p>
              <Button onClick={() => navigate("/agent/rentals/new")}>
                <Plus className="w-4 h-4 mr-2" />
                Crear Arriendo
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {rentals.map((rental) => (
            <Card key={rental.id} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Rental Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {rental.Propiedad?.nombre || "Propiedad sin nombre"}
                      </h3>
                      {getStatusBadge(rental.fecha_fin)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{rental.Usuario?.nombre || "N/A"}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Inicio: {formatDate(rental.fecha_inicio)}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Fin: {rental.fecha_fin ? formatDate(rental.fecha_fin) : "Indefinido"}</span>
                      </div>

                      <div className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400">
                        <Key className="w-4 h-4 mr-1" />
                        {formatCurrency(rental.monto_mensual)}/mes
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/agent/rentals/${rental.id}`)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
                               hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors
                               flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Ver Detalle
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentRentals;
