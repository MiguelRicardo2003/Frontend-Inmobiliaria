import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

// Configuración de cookies
const COOKIE_CONFIG = {
  expires: 7, // 7 días
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/'
};

// Configuración de tokens
const TOKEN_CONFIG = {
  ACCESS_TOKEN_KEY: 'authToken',
  REFRESH_TOKEN_KEY: 'refreshToken',
  TOKEN_EXPIRY_BUFFER: 5 * 60 // 5 minutos de buffer antes de la expiración
};

/**
 * Verifica si un token JWT es válido
 * @param {string} token - Token JWT a verificar
 * @returns {boolean} - True si el token es válido
 */
export const isTokenValid = (token) => {
  if (!token || typeof token !== 'string') return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Verificar si el token ha expirado (con buffer de seguridad)
    return decoded.exp > (currentTime + TOKEN_CONFIG.TOKEN_EXPIRY_BUFFER);
  } catch (error) {
    console.error('Error validando token:', error);
    return false;
  }
};

/**
 * Obtiene el token de acceso desde las cookies
 * @returns {string|null} - Token de acceso o null si no existe
 */
export const getTokenFromCookies = () => {
  try {
    return Cookies.get(TOKEN_CONFIG.ACCESS_TOKEN_KEY) || null;
  } catch (error) {
    console.error('Error obteniendo token de cookies:', error);
    return null;
  }
};

/**
 * Obtiene el token de refresh desde las cookies
 * @returns {string|null} - Token de refresh o null si no existe
 */
export const getRefreshTokenFromCookies = () => {
  try {
    return Cookies.get(TOKEN_CONFIG.REFRESH_TOKEN_KEY) || null;
  } catch (error) {
    console.error('Error obteniendo refresh token de cookies:', error);
    return null;
  }
};

/**
 * Guarda el token de acceso en las cookies
 * @param {string} token - Token de acceso a guardar
 * @param {number} expires - Días de expiración (opcional)
 */
export const saveTokenToCookies = (token, expires = COOKIE_CONFIG.expires) => {
  try {
    if (!token) {
      console.warn('Intento de guardar token vacío');
      return;
    }
    
    Cookies.set(TOKEN_CONFIG.ACCESS_TOKEN_KEY, token, {
      ...COOKIE_CONFIG,
      expires
    });
  } catch (error) {
    console.error('Error guardando token en cookies:', error);
  }
};

/**
 * Guarda el token de refresh en las cookies
 * @param {string} refreshToken - Token de refresh a guardar
 * @param {number} expires - Días de expiración (opcional)
 */
export const saveRefreshTokenToCookies = (refreshToken, expires = 30) => {
  try {
    if (!refreshToken) {
      console.warn('Intento de guardar refresh token vacío');
      return;
    }
    
    Cookies.set(TOKEN_CONFIG.REFRESH_TOKEN_KEY, refreshToken, {
      ...COOKIE_CONFIG,
      expires
    });
  } catch (error) {
    console.error('Error guardando refresh token en cookies:', error);
  }
};

/**
 * Elimina el token de acceso de las cookies
 */
export const removeTokenFromCookies = () => {
  try {
    Cookies.remove(TOKEN_CONFIG.ACCESS_TOKEN_KEY, { path: '/' });
  } catch (error) {
    console.error('Error eliminando token de cookies:', error);
  }
};

/**
 * Elimina el token de refresh de las cookies
 */
export const removeRefreshTokenFromCookies = () => {
  try {
    Cookies.remove(TOKEN_CONFIG.REFRESH_TOKEN_KEY, { path: '/' });
  } catch (error) {
    console.error('Error eliminando refresh token de cookies:', error);
  }
};

/**
 * Elimina todos los tokens de autenticación
 */
export const clearAllAuthTokens = () => {
  removeTokenFromCookies();
  removeRefreshTokenFromCookies();
};

/**
 * Decodifica un token JWT y retorna la información del usuario
 * @param {string} token - Token JWT a decodificar
 * @returns {object|null} - Información del usuario o null si hay error
 */
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.sub || decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      permissions: decoded.permissions || [],
      exp: decoded.exp,
      iat: decoded.iat,
      ...decoded
    };
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};

/**
 * Verifica si un token expirará pronto (en los próximos 5 minutos)
 * @param {string} token - Token JWT a verificar
 * @returns {boolean} - True si el token expirará pronto
 */
export const isTokenExpiringSoon = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = decoded.exp - currentTime;
    
    return timeUntilExpiry <= TOKEN_CONFIG.TOKEN_EXPIRY_BUFFER;
  } catch (error) {
    console.error('Error verificando expiración del token:', error);
    return true;
  }
};

/**
 * Obtiene el tiempo restante hasta la expiración del token
 * @param {string} token - Token JWT
 * @returns {number} - Tiempo restante en segundos, -1 si hay error
 */
export const getTokenTimeUntilExpiry = (token) => {
  if (!token) return -1;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return Math.max(0, decoded.exp - currentTime);
  } catch (error) {
    console.error('Error calculando tiempo de expiración:', error);
    return -1;
  }
};
