// utils/jwt/validationUtils.js
import { decodeToken } from './decodeUtils.js';

/**
 * Verifica si un token es válido (no ha expirado)
 */
export function isTokenValid(token) {
  if (!token) return false;
  const decoded = decodeToken(token);
  if (!decoded) return false;
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
}

/**
 * Retorna el tiempo restante del token
 */
export function getTokenTimeRemaining(token) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return -1;

  const currentTime = Date.now() / 1000;
  return Math.max(0, decoded.exp - currentTime);
}

/**
 * Verifica si el token necesita ser refrescado
 */
export function needsRefresh(token, thresholdMinutes = 5) {
  const timeRemaining = getTokenTimeRemaining(token);
  if (timeRemaining === -1) return true;
  return timeRemaining <= thresholdMinutes * 60;
}

/**
 * Devuelve una cadena legible del tiempo restante
 */
export function getFormattedTimeRemaining(token) {
  const timeRemaining = getTokenTimeRemaining(token);
  if (timeRemaining === -1) return 'Token inválido';

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}, ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''}, ${seconds} segundo${seconds > 1 ? 's' : ''}`;
  return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
}
