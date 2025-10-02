// /**
//  * Configuración central de rutas del sistema
//  * Siguiendo principios de configuración centralizada
//  *
//  * @description Define constantes y configuraciones para el sistema de rutas
//  * Facilita mantenimiento y evita magic strings
//  */

// /**
//  * Rutas públicas del sistema
//  * Accesibles sin autenticación
//  */
// export const PUBLIC_ROUTES = {
//     ROOT: "/",
//     AUTH: "/auth",
//     REGISTER: "/register",
//     LANDING: "/",
//     COMPANIES: "/companies",
//     COMPANY_PROFILE: "/companies/:companyId",
//     EMPLOYEES: "/employers",
//     EMPLOYEE_PROFILE: "/employers/:employeeId",
// } as const;

// /**
//  * Rutas privadas del sistema
//  * Requieren autenticación
//  */
// export const PRIVATE_ROUTES = {
//     APP_ROOT: "/app",
//     DASHBOARD: "/app/dashboard",
//     USERS: "/app/users",
//     PLATFORM_ADMINS: "/app/platform-admins",
//     CANDIDATES: "/app/candidates",
//     COMPANIES: "/app/companies",
//     SETTINGS: "/app/settings",
//     PROFILE: "/app/profile",
//     RECOMMEND_JOBS: "/app/recommend-jobs",
// } as const;

// /**
//  * Rutas de error del sistema
//  */
// export const ERROR_ROUTES = {
//     NOT_FOUND: "/404",
//     UNAUTHORIZED: "/unauthorized",
//     SERVER_ERROR: "/500",
// } as const;

// /**
//  * Configuración de redirecciones por defecto
//  */
// export const DEFAULT_REDIRECTS = {
//     AUTHENTICATED_USER: PRIVATE_ROUTES.APP_ROOT,
//     UNAUTHENTICATED_USER: PUBLIC_ROUTES.AUTH,
//     UNAUTHORIZED_ACCESS: PRIVATE_ROUTES.APP_ROOT,
//     NOT_FOUND: ERROR_ROUTES.NOT_FOUND,
// } as const;

// /**
//  * Configuración de títulos de página
//  */
// export const PAGE_TITLES = {
//     LANDING: "Recruitment System",
//     AUTH: "Iniciar Sesión",
//     DASHBOARD: "Dashboard",
//     NOT_FOUND: "Página no encontrada",
// } as const;

// /**
//  * Utilidad para obtener rutas tipadas
//  */
// export type PublicRoute = typeof PUBLIC_ROUTES[keyof typeof PUBLIC_ROUTES];
// export type PrivateRoute = typeof PRIVATE_ROUTES[keyof typeof PRIVATE_ROUTES];
// export type ErrorRoute = typeof ERROR_ROUTES[keyof typeof ERROR_ROUTES];
// export type AnyRoute = PublicRoute | PrivateRoute | ErrorRoute;
