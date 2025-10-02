// /**
//  * Configuración de rutas públicas
//  * Siguiendo principio de Responsabilidad Única (SRP)
//  *
//  * @description Maneja únicamente rutas accesibles sin autenticación
//  * La ruta raíz ("/") muestra directamente LandingPage sin layout
//  */

// import type { RouteObject } from "react-router-dom";
// // import { Navigate } from "react-router-dom";
// import LoginPage from "@/modules/auth/pages/auth.module";
// import { LandingPage } from "@/modules/landing/pages/landing";
// import RegisterPage from "@/modules/auth/pages/register.module";
// import { CompanyProfilePage } from "@/modules/companies/pages/CompanyProfilePage";
// import { PUBLIC_ROUTES } from "./RouteConfig";
// import PublicLayout from "@/shared/layouts/public/PublicLayout";
// import { EmployeeProfilePage } from "@/modules/candidates/pages/EmployeeProfilePage";

// /**
//  * Rutas públicas del sistema
//  * - Ruta raíz ("/") -> LandingPage
//  * - Ruta de autenticación ("/auth") -> LoginPage
//  * - Ruta de registro ("/register") -> RegisterPage
//  * - Ruta de perfil de empresa ("/company-profile") -> CompanyProfilePage
//  * - Ruta de perfil de empleado ("/employee-profile") -> EmployeeProfilePage
//  */
// export const publicRoutes: RouteObject[] = [
//     // Ruta de landing
//     {
//         path: PUBLIC_ROUTES.ROOT,
//         element: <PublicLayout />,
//         children: [
//             {
//                 index: true,
//                 element: <LandingPage />,
//             },
//             {
//                 path: PUBLIC_ROUTES.COMPANIES,
//                 element: <CompanyProfilePage />,
//             },
//             {
//                 path: PUBLIC_ROUTES.COMPANY_PROFILE,
//                 element: <CompanyProfilePage />,
//             },
//             {
//                 path: PUBLIC_ROUTES.EMPLOYEES,
//                 element: <EmployeeProfilePage />,
//             },
//         ],
//     },
//     // Ruta de autenticación
//     {
//         path: PUBLIC_ROUTES.AUTH,
//         element: <LoginPage />,
//     },
//     // Ruta de registro
//     {
//         path: PUBLIC_ROUTES.REGISTER,
//         element: <RegisterPage />,
//     },
// ];
