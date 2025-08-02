// utils/jwt/decodeUtils.js
import { jwtDecode } from 'jwt-decode';

/**
 * Decodifica un token JWT
 */
export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}

/**
 * Extrae información del usuario desde el token
 */
export function getUserFromToken(token) {
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  return {
    id: decoded.sub || decoded.user_id || decoded.id,
    email: decoded.email,
    name: decoded.name || decoded.full_name || decoded.username,
    role: decoded.role || decoded.user_role,
    permissions: decoded.permissions || decoded.scopes || [],
    iat: decoded.iat,
    exp: decoded.exp
  };
}
