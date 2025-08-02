// utils/jwt/permissionUtils.js
import { getUserFromToken } from './decodeUtils.js';

/**
 * Verifica si el usuario tiene un rol específico
 */
export function hasRole(token, role) {
  const user = getUserFromToken(token);
  return user && user.role === role;
}

/**
 * Verifica si el usuario tiene un permiso específico
 */
export function hasPermission(token, permission) {
  const user = getUserFromToken(token);
  return user && user.permissions.includes(permission);
}

/**
 * Verifica si tiene todos los permisos
 */
export function hasAllPermissions(token, permissions) {
  const user = getUserFromToken(token);
  if (!user || !user.permissions) return false;

  return permissions.every(p => user.permissions.includes(p));
}

/**
 * Verifica si tiene al menos un permiso
 */
export function hasAnyPermission(token, permissions) {
  const user = getUserFromToken(token);
  if (!user || !user.permissions) return false;

  return permissions.some(p => user.permissions.includes(p));
}
