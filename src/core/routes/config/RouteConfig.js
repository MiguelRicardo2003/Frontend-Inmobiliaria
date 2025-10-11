/**
 * Configuración central de rutas del sistema
 * Siguiendo principios de configuración centralizada
 *
 * @description Define constantes y configuraciones para el sistema de rutas
 * Facilita mantenimiento y evita magic strings
 */

/**
 * Rutas públicas del sistema
 * Accesibles sin autenticación
 */
export const PUBLIC_ROUTES = {
  ROOT: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PROPERTIES: "/properties",
  SERVICES: "/services",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgotPassword",
};

/**
 * Rutas privadas del sistema
 * Requieren autenticación
 */
export const PRIVATE_ROUTES = {
  DASHBOARD: "/dashboard",
  CLIENTS: "/dashboard/clients",
  ANALYTICS: "/dashboard/analytics",
  CALENDAR: "/dashboard/calendar",
  PROPERTIES: "/dashboard/properties",
  SETTINGS: "/dashboard/settings",
  MESSAGES: "/dashboard/messages",
};

/**
 * Rutas de error del sistema
 */
export const ERROR_ROUTES = {
  NOT_FOUND: "/404",
  UNAUTHORIZED: "/unauthorized",
  SERVER_ERROR: "/500",
};

/**
 * Configuración de redirecciones por defecto
 */
export const DEFAULT_REDIRECTS = {
  AUTHENTICATED_USER: PRIVATE_ROUTES.DASHBOARD,
  UNAUTHENTICATED_USER: PUBLIC_ROUTES.LOGIN,
  UNAUTHORIZED_ACCESS: PUBLIC_ROUTES.LOGIN,
  NOT_FOUND: ERROR_ROUTES.NOT_FOUND,
};

/**
 * Configuración de títulos de página
 */
export const PAGE_TITLES = {
  LANDING: "JustHome - Inmobiliaria",
  AUTH: "Iniciar Sesión",
  DASHBOARD: "Dashboard",
  NOT_FOUND: "Página no encontrada",
};

/**
 * Utilidad para obtener rutas tipadas
 * Nota: Los tipos TypeScript están comentados para compatibilidad con JavaScript
 */
// export type PublicRoute = typeof PUBLIC_ROUTES[keyof typeof PUBLIC_ROUTES];
// export type PrivateRoute = typeof PRIVATE_ROUTES[keyof typeof PRIVATE_ROUTES];
// export type ErrorRoute = typeof ERROR_ROUTES[keyof typeof ERROR_ROUTES];
// export type AnyRoute = PublicRoute | PrivateRoute | ErrorRoute;