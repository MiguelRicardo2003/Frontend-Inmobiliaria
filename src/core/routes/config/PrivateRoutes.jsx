/**
 * Configuración de rutas privadas
 * Siguiendo principio de Responsabilidad Única (SRP)
 *
 * @description Maneja únicamente rutas que requieren autenticación
 * Todas las rutas privadas usan AdminLayout y ProtectedRoute
 */

// import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../../../shared/layouts/AdminLayout";
import Dashboard from "../../../modules/backoffice/dashboard/Home";
import Clients from "../../../modules/backoffice/users-system/Clients";
import Analytics from "../../../modules/backoffice/analityc/Analytics";
import Calendar from "../../../modules/backoffice/calendar/Calendar";
import Properties from "../../../modules/backoffice/properties/Properties";
import Settings from "../../../modules/backoffice/settings/pages/Settings";
import Message from "../../../pages/Dashboard/Messages/Message";
import { PRIVATE_ROUTES } from "./RouteConfig";

/**
 * Rutas privadas del sistema
 * Todas requieren autenticación y rol de admin
 */
export const privateRoutes = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "messages",
        element: <Message />,
      },
    ],
  },
];