// /**
//  * Configuración de rutas de error
//  * Siguiendo principio de Responsabilidad Única (SRP)
//  *
//  * @description Maneja únicamente rutas de error como 404
//  */

// import type { RouteObject } from "react-router-dom";
// import { NotFoundPage } from "@/modules/not-found/pages/NotFoundPage";
// import { ERROR_ROUTES } from "./RouteConfig";

// /**
//  * Rutas de manejo de errores
//  * Centraliza todas las rutas relacionadas con errores
//  */
// export const errorRoutes: RouteObject[] = [
//     {
//         path: ERROR_ROUTES.NOT_FOUND,
//         element: <NotFoundPage />,
//     },
//     {
//         path: "*",
//         element: <NotFoundPage />,
//     },
// ];