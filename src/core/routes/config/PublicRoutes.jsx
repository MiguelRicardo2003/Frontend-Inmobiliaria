/**
 * Configuración de rutas públicas
 * Siguiendo principio de Responsabilidad Única (SRP)
 *
 * @description Maneja únicamente rutas accesibles sin autenticación
 */

// import { RouteObject } from "react-router-dom";
import Home from "../../../modules/landing/pages/Home";
import About from "../../../modules/about/About";
import Contact from "../../../modules/contact-inmobiliaria/pages/Contact";
import Properties from "../../../modules/properties-inmobiliaria/Properties";
import Service from "../../../modules/services-inmobiliaria/pages/Service";
import Login from "../../../modules/auth/pages/auth.module";
import Register from "../../../modules/auth/pages/Register";
import ForgotPassword from "../../../modules/auth/components/ForgotPassword";
import PublicLayout from "../../../shared/layouts/public/PublicLayout";
import { PUBLIC_ROUTES } from "./RouteConfig";

/**
 * Rutas públicas del sistema
 * - Ruta raíz ("/") -> Home con PublicLayout
 * - Rutas de autenticación sin layout
 * - Todas las rutas públicas usan PublicLayout
 */
export const publicRoutes = [
  // Rutas con layout público
  {
    path: PUBLIC_ROUTES.ROOT,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "services",
        element: <Service />,
      },
    ],
  },
  // Rutas de autenticación sin layout
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgotPassword",
    element: <ForgotPassword />,
  },
];