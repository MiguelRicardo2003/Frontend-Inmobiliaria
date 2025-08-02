import React, { createContext, useEffect, useReducer, useCallback } from 'react';
import { authReducer, initialState, AUTH_ACTIONS } from './authReducer';
import { isTokenValid, getTokenFromCookies, saveTokenToCookies, removeTokenFromCookies } from './authUtils';
import authService from '../../services/authService';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Función para decodificar token y obtener información del usuario
  const decodeToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.sub || decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        permissions: decoded.permissions || [],
        exp: decoded.exp
      };
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }, []);

  // Función para inicializar autenticación
  const initializeAuth = useCallback(async () => {
    try {
      const token = getTokenFromCookies();
      
      if (!token) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return;
      }

      // Verificar si es un token mock para desarrollo
      if (token === 'mock-jwt-token') {
        const mockUser = {
          id: 1,
          email: 'demo@email.com',
          name: 'Usuario Demo',
          role: 'admin',
          permissions: ['ver-propiedades', 'editar-propiedades', 'ver-clientes', 'editar-clientes'],
          exp: Date.now() / 1000 + 3600 // 1 hora
        };
        
        dispatch({ 
          type: AUTH_ACTIONS.LOGIN_SUCCESS, 
          payload: { user: mockUser, token } 
        });
        authService.setAuthToken(token);
      } else if (isTokenValid(token)) {
        // Token real válido
        const user = decodeToken(token);
        if (user) {
          dispatch({ 
            type: AUTH_ACTIONS.LOGIN_SUCCESS, 
            payload: { user, token } 
          });
          authService.setAuthToken(token);
        } else {
          removeTokenFromCookies();
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      } else {
        // Token expirado, intentar refresh
        try {
          const refreshResult = await authService.refreshToken();
          if (refreshResult.token) {
            const user = decodeToken(refreshResult.token);
            if (user) {
              dispatch({ 
                type: AUTH_ACTIONS.LOGIN_SUCCESS, 
                payload: { user, token: refreshResult.token } 
              });
              authService.setAuthToken(refreshResult.token);
            }
          } else {
            removeTokenFromCookies();
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
          }
        } catch (refreshError) {
          removeTokenFromCookies();
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      }
    } catch (error) {
      console.error('Error inicializando autenticación:', error);
      removeTokenFromCookies();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, [decodeToken]);

  // Función de login mejorada
  const login = useCallback(async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      // Para desarrollo, usar mock si las credenciales son las de demo
      if (credentials.email === 'demo@email.com' && credentials.password === 'demo123') {
        const token = 'mock-jwt-token';
        const user = {
          id: 1,
          email: credentials.email,
          name: 'Usuario Demo',
          role: 'admin',
          permissions: ['ver-propiedades', 'editar-propiedades', 'ver-clientes', 'editar-clientes'],
          exp: Date.now() / 1000 + 3600
        };
        
        saveTokenToCookies(token);
        authService.setAuthToken(token);
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: { user, token } });
        return { success: true };
      }

      // Para producción, usar el servicio real
      const response = await authService.login(credentials);
      if (response.token) {
        const user = decodeToken(response.token);
        if (user) {
          saveTokenToCookies(response.token);
          authService.setAuthToken(response.token);
          dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: { user, token: response.token } });
          return { success: true };
        }
      }
      
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: 'Error al procesar la respuesta del servidor' });
      return { success: false };
    } catch (error) {
      const errorMessage = error.message || 'Error al iniciar sesión';
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }, [decodeToken]);

  // Función de logout mejorada
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout del servidor:', error);
    } finally {
      removeTokenFromCookies();
      authService.clearAuthToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // Función para verificar permisos mejorada
  const hasPermission = useCallback((permission) => {
    if (!state.user?.permissions) return false;
    return state.user.permissions.includes(permission);
  }, [state.user]);

  // Función para verificar roles mejorada
  const hasRole = useCallback((role) => {
    if (!state.user?.role) return false;
    return state.user.role === role;
  }, [state.user]);

  // Función para verificar múltiples permisos
  const hasAnyPermission = useCallback((permissions) => {
    if (!state.user?.permissions) return false;
    return permissions.some(permission => state.user.permissions.includes(permission));
  }, [state.user]);

  // Función para verificar todos los permisos
  const hasAllPermissions = useCallback((permissions) => {
    if (!state.user?.permissions) return false;
    return permissions.every(permission => state.user.permissions.includes(permission));
  }, [state.user]);

  // Inicializar autenticación al montar el componente
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Verificar expiración del token periódicamente
  useEffect(() => {
    if (state.token && state.token !== 'mock-jwt-token') {
      const interval = setInterval(() => {
        if (!isTokenValid(state.token)) {
          logout();
        }
      }, 60000); // Verificar cada minuto
      
      return () => clearInterval(interval);
    }
  }, [state.token, logout]);

  const value = {
    ...state,
    login,
    logout,
    clearError: () => dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR }),
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isTokenValid: () => isTokenValid(state.token),
    refreshToken: authService.refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
