import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = Cookies.get('accessToken');
        if (token) {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp > currentTime) {
            setUser(decoded);
            setIsAuthenticated(true);
          } else {
            // Token expirado
            logout();
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      // Aquí iría la llamada a la API de login
      // Por ahora simulamos un login exitoso
      const mockUser = {
        id: 1,
        email: credentials.email,
        name: 'Usuario Demo',
        role: 'admin',
        roles: ['admin'],
        areas: ['dashboard'],
        area_modulos: {
          dashboard: { activo: true, submodulos: ['home', 'analytics'] },
          properties: { activo: true, submodulos: ['list', 'create', 'edit'] },
          users: { activo: true, submodulos: ['list', 'create', 'edit'] }
        }
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Guardar en cookies
      Cookies.set('accessToken', mockToken, { 
        expires: 7, 
        secure: true, 
        sameSite: 'strict' 
      });
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setUser(null);
    setIsAuthenticated(false);
    // La navegación se manejará en los componentes que usen el hook
    window.location.href = '/login';
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.roles?.includes(role) || user.role === role;
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    // Implementar lógica de permisos según sea necesario
    return true;
  };

  const hasAnyPermission = (permissions) => {
    if (!user || !permissions.length) return false;
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions) => {
    if (!user || !permissions.length) return false;
    return permissions.every(permission => hasPermission(permission));
  };

  const hasModuleAccess = (moduloId) => {
    if (!user) return false;
    return user.area_modulos?.[moduloId]?.activo || false;
  };

  const hasSubmoduleAccess = (moduloId, submoduloId) => {
    if (!user) return false;
    const modulo = user.area_modulos?.[moduloId];
    return modulo?.activo && modulo?.submodulos?.includes(submoduloId);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasModuleAccess,
    hasSubmoduleAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
