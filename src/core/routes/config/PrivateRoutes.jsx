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
import ClientLayout from "../../../shared/layouts/ClientLayout";
import AgentLayout from "../../../shared/layouts/AgentLayout";
import Dashboard from "../../../modules/backoffice/dashboard/Home";
import Clients from "../../../modules/backoffice/users-system/pages/Clients";
import Analytics from "../../../modules/backoffice/analityc-system/pages/Analytics";
import Calendar from "../../../modules/backoffice/calendar-system/pages/Calendar";
import Properties from "../../../modules/backoffice/properties/Properties";
import Settings from "../../../modules/backoffice/settings/pages/Settings";
import ClientDashboard from "../../../modules/client/dashboard/ClientHome";
import ClientProfile from "../../../modules/client/profile/ClientProfile";
import ClientFavorites from "../../../modules/client/favorites/ClientFavorites";
import AgentDashboard from "../../../modules/agent/dashboard/AgentDashboard";
import AgentProperties from "../../../modules/agent/properties/AgentProperties";
import PropertyForm from "../../../modules/agent/properties/PropertyForm";
import AgentCustomers from "../../../modules/agent/customers/AgentCustomers";
import AgentSales from "../../../modules/agent/sales/AgentSales";
import SaleForm from "../../../modules/agent/sales/SaleForm";
import AgentRentals from "../../../modules/agent/rentals/AgentRentals";
import RentalForm from "../../../modules/agent/rentals/RentalForm";
import { PRIVATE_ROUTES } from "./RouteConfig";

/**
 * Rutas privadas del sistema
 * Incluye rutas para admin y cliente
 */
export const privateRoutes = [
  // Rutas de Administrador
  {
    path: "dashboard",
    element: (
      <ProtectedRoute requiredRole="Administrador">
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
    ],
  },
  // Rutas de Cliente
  {
    path: "client",
    element: (
      <ProtectedRoute requiredRole="Cliente">
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <ClientDashboard />,
      },
      {
        path: "profile",
        element: <ClientProfile />,
      },
      {
        path: "favorites",
        element: <ClientFavorites />,
      },
      {
        path: "properties",
        element: <div className="p-6">Explorar Propiedades (Por implementar)</div>,
      },
      {
        path: "messages",
        element: <div className="p-6">Mensajes (Por implementar)</div>,
      },
      {
        path: "notifications",
        element: <div className="p-6">Notificaciones (Por implementar)</div>,
      },
      {
        path: "settings",
        element: <div className="p-6">Configuración (Por implementar)</div>,
      },
      {
        path: "help",
        element: <div className="p-6">Ayuda (Por implementar)</div>,
      },
    ],
  },
  // Rutas de Agente
  {
    path: "agent",
    element: (
      <ProtectedRoute requiredRole="Agente">
        <AgentLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AgentDashboard />,
      },
      {
        path: "properties",
        element: <AgentProperties />,
      },
      {
        path: "properties/new",
        element: <PropertyForm />,
      },
      {
        path: "properties/:id/edit",
        element: <PropertyForm />,
      },
      {
        path: "customers",
        element: <AgentCustomers />,
      },
      {
        path: "sales",
        element: <AgentSales />,
      },
      {
        path: "sales/new",
        element: <SaleForm />,
      },
      {
        path: "rentals",
        element: <AgentRentals />,
      },
      {
        path: "rentals/new",
        element: <RentalForm />,
      },
      {
        path: "contracts",
        element: <div className="p-6">Contratos (Por implementar)</div>,
      },
      {
        path: "stats",
        element: <div className="p-6">Mis Estadísticas (Por implementar)</div>,
      },
      {
        path: "profile",
        element: <div className="p-6">Mi Perfil (Por implementar)</div>,
      },
      {
        path: "settings",
        element: <div className="p-6">Configuración (Por implementar)</div>,
      },
    ],
  },
];