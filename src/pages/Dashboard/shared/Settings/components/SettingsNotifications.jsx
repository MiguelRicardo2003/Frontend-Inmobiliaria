import React from "react";
import { Bell } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
} from "../../../../../components/ui/Admin/CardAdmin";

const SettingsNotifications = ({ notifications, setNotifications }) => {
  const handleToggle = (field) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const items = [
    {
      label: "Nuevos clientes",
      description: "Recibir notificaciones cuando se registre un nuevo cliente",
      field: "newClients",
    },
    {
      label: "Nuevas propiedades",
      description: "Notificar cuando se añada una nueva propiedad",
      field: "newProperties",
    },
    {
      label: "Mensajes",
      description: "Alertas de nuevos mensajes de clientes",
      field: "messages",
    },
    {
      label: "Citas programadas",
      description: "Recordatorios de citas próximas",
      field: "scheduledAppointments",
    },
    {
      label: "Reportes semanales",
      description: "Resumen semanal de actividad",
      field: "weeklyReports",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
          <Bell className="w-5 h-5" />
          Configuración de Notificaciones
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {items.map(({ label, description, field }) => (
          <div
            key={field}
            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[field]}
                onChange={() => handleToggle(field)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-black dark:peer-checked:bg-blue-500 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white dark:bg-gray-100 w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SettingsNotifications;
