import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Plus, Building2, Users, Calendar, FileText } from "lucide-react";
import Button from "../../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import agentService from "../dashboard/services/agentService";

const AgentSales = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    setLoading(true);
    const result = await agentService.getSales();
    if (result.success) {
      setSales(result.data);
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
      month: "long",
      day: "numeric",
    });
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
            Ventas de Propiedades
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona las ventas de tus propiedades
          </p>
        </div>
        <Button onClick={() => navigate("/agent/sales/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Registrar Venta
        </Button>
      </div>

      {/* Sales List */}
      {sales.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay ventas registradas
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Comienza registrando tu primera venta de propiedad
              </p>
              <Button onClick={() => navigate("/agent/sales/new")}>
                <Plus className="w-4 h-4 mr-2" />
                Registrar Venta
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sales.map((sale) => (
            <Card key={sale.id} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Sale Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {sale.Propiedad?.nombre || "Propiedad sin nombre"}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Cliente: {sale.Usuario?.nombre || "N/A"}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(sale.fecha_venta)}</span>
                      </div>

                      <div className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatCurrency(sale.precio_venta)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/agent/sales/${sale.id}`)}
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

export default AgentSales;
