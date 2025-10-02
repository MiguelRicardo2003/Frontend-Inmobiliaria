// /**
//  * Configuración de rutas privadas
//  * Siguiendo principio de Responsabilidad Única (SRP)
//  *
//  * @description Maneja únicamente rutas que requieren autenticación
//  * Todas las rutas privadas usan LayoutPrivate y ProtectedRoute
//  */

// import { Suspense } from "react";
// import type { RouteObject } from "react-router-dom";
// import ProtectedRoute from "@/core/routes/RoutesProtected";
// import { BackofficeCandidates } from "@/modules/backoffice/candidates/pages/BackofficeCandidates";
// import { BackofficeCompanies } from "@/modules/backoffice/companies/pages/BackofficeCompanies";
// import { LayoutPrivate } from "@/shared/layouts/components/LayoutPrivate";
// import { moduleRoutes } from "./ModuleRoutes";
// import { PRIVATE_ROUTES } from "./RouteConfig";
// import DashboardPage from "@/modules/backoffice/dashboard/pages/DashboardPage";
// import { BackofficeSettings } from "@/modules/backoffice/settings/pages/BackofficeSettings";
// import { PlatformAdminPage } from "@/modules/backoffice/users-platform/pages/PlatformAdminPage";
// import { RecommendJobsPage } from "@/modules/backoffice/recommend-jobs/pages/RecommendJobsPage";
// /**
//  * Rutas privadas del sistema
//  * Todas requieren autenticación y usan LayoutPrivate
//  */
// export const privateRoutes: RouteObject[] = [
//     {
//         path: PRIVATE_ROUTES.APP_ROOT,
//         element: (
//             <Suspense fallback={<div>Cargando...</div>}>
//                 <ProtectedRoute requiredRoles={['platform_admin']}>
//                     <LayoutPrivate />
//                 </ProtectedRoute>
//             </Suspense>
//         ),
//         children: [
//             {
//                 index: true,
//                 element: <DashboardPage />,
//             },
//             {
//                 path: "platform-admins",
//                 element: <PlatformAdminPage />,
//             },
//             {
//                 path: "recommend-jobs",
//                 element: <RecommendJobsPage />,
//             },
//             {
//                 path: "candidates",
//                 element: <BackofficeCandidates />,
//             },
//             {
//                 path: "companies",
//                 element: <BackofficeCompanies />,
//             },
//             {
//                 path: "settings",
//                 element: <BackofficeSettings />,
//             },
//             // Módulos del sistema
//             ...moduleRoutes
//         ],
//     },
// ];
