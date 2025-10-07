/**
 * Punto de entrada principal para todas las rutas
 * Combina rutas públicas, privadas y de error
 */

import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./config/PublicRoutes";
import { privateRoutes } from "./config/PrivateRoutes";
import { errorRoutes } from "./config/ErrorRoutes";

/**
 * Configuración completa de rutas de la aplicación
 * Orden: Públicas -> Privadas -> Errores
 */
const appRoutes = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  ...errorRoutes,
]);

export default appRoutes;
