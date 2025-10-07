import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../store/auth/useAuth';
import AccessDeniedMessage from '../components/AccessDeniedMessage';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredPermissions = [], 
  requiredAnyPermission = [],
  redirectTo = '/login',
  fallbackComponent = null
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    hasRole, 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions 
  } = useAuth();

  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Verificar rol específico
  if (requiredRole && !hasRole(requiredRole)) {
    return fallbackComponent || (
      <AccessDeniedMessage
        title="Acceso Denegado"
        message={`No tienes el rol necesario (${requiredRole}) para acceder a esta página.`}
      />
    );
  }

  // Verificar todos los permisos
  if (requiredPermissions.length > 0 && !hasAllPermissions(requiredPermissions)) {
    return fallbackComponent || (
      <AccessDeniedMessage
        title="Acceso Denegado"
        message="No tienes todos los permisos necesarios para acceder a esta página."
        details={`Permisos requeridos: ${requiredPermissions.join(', ')}`}
      />
    );
  }

  // Verificar al menos un permiso
  if (requiredAnyPermission.length > 0 && !hasAnyPermission(requiredAnyPermission)) {
    return fallbackComponent || (
      <AccessDeniedMessage
        title="Acceso Denegado"
        message="No tienes ninguno de los permisos necesarios para acceder a esta página."
        details={`Al menos uno de estos permisos es requerido: ${requiredAnyPermission.join(', ')}`}
      />
    );
  }

  // Si todo está bien, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;
