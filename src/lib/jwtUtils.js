import { jwtDecode } from 'jwt-decode';

/**
 * Clase de utilidades para manejar tokens JWT
 */
class JWTUtils {
  /**
   * Decodifica un token JWT
   * @param {string} token - El token JWT a decodificar
   * @returns {object} - El payload decodificado del token
   */
  static decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  /**
   * Verifica si un token es válido (no ha expirado)
   * @param {string} token - El token JWT a verificar
   * @returns {boolean} - true si el token es válido, false en caso contrario
   */
  static isTokenValid(token) {
    if (!token) return false;

    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return false;

      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error al verificar la validez del token:', error);
      return false;
    }
  }

  /**
   * Obtiene el tiempo restante hasta que expire el token
   * @param {string} token - El token JWT
   * @returns {number} - Tiempo restante en segundos, -1 si el token es inválido
   */
  static getTokenTimeRemaining(token) {
    if (!token) return -1;

    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) return -1;

      const currentTime = Date.now() / 1000;
      return Math.max(0, decoded.exp - currentTime);
    } catch (error) {
      console.error('Error al obtener el tiempo restante del token:', error);
      return -1;
    }
  }

  /**
   * Verifica si un token necesita ser refrescado
   * @param {string} token - El token JWT
   * @param {number} thresholdMinutes - Minutos antes de la expiración para considerar refrescar
   * @returns {boolean} - true si el token necesita ser refrescado
   */
  static needsRefresh(token, thresholdMinutes = 5) {
    const timeRemaining = this.getTokenTimeRemaining(token);
    if (timeRemaining === -1) return true;

    const thresholdSeconds = thresholdMinutes * 60;
    return timeRemaining <= thresholdSeconds;
  }

  /**
   * Extrae información del usuario del token
   * @param {string} token - El token JWT
   * @returns {object|null} - Información del usuario o null si no se puede extraer
   */
  static getUserFromToken(token) {
    if (!token) return null;

    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return null;

      // Extraer información común del usuario del token
      return {
        id: decoded.sub || decoded.user_id || decoded.id,
        email: decoded.email,
        name: decoded.name || decoded.full_name || decoded.username,
        role: decoded.role || decoded.user_role,
        permissions: decoded.permissions || decoded.scopes || [],
        iat: decoded.iat,
        exp: decoded.exp
      };
    } catch (error) {
      console.error('Error al extraer información del usuario del token:', error);
      return null;
    }
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string} token - El token JWT
   * @param {string} role - El rol a verificar
   * @returns {boolean} - true si el usuario tiene el rol
   */
  static hasRole(token, role) {
    const user = this.getUserFromToken(token);
    return user && user.role === role;
  }

  /**
   * Verifica si el usuario tiene un permiso específico
   * @param {string} token - El token JWT
   * @param {string} permission - El permiso a verificar
   * @returns {boolean} - true si el usuario tiene el permiso
   */
  static hasPermission(token, permission) {
    const user = this.getUserFromToken(token);
    return user && user.permissions && user.permissions.includes(permission);
  }

  /**
   * Verifica si el usuario tiene todos los permisos especificados
   * @param {string} token - El token JWT
   * @param {string[]} permissions - Array de permisos a verificar
   * @returns {boolean} - true si el usuario tiene todos los permisos
   */
  static hasAllPermissions(token, permissions) {
    const user = this.getUserFromToken(token);
    if (!user || !user.permissions) return false;

    return permissions.every(permission => user.permissions.includes(permission));
  }

  /**
   * Verifica si el usuario tiene al menos uno de los permisos especificados
   * @param {string} token - El token JWT
   * @param {string[]} permissions - Array de permisos a verificar
   * @returns {boolean} - true si el usuario tiene al menos un permiso
   */
  static hasAnyPermission(token, permissions) {
    const user = this.getUserFromToken(token);
    if (!user || !user.permissions) return false;

    return permissions.some(permission => user.permissions.includes(permission));
  }

  /**
   * Formatea el tiempo restante del token en un formato legible
   * @param {string} token - El token JWT
   * @returns {string} - Tiempo formateado (ej: "2 horas, 30 minutos")
   */
  static getFormattedTimeRemaining(token) {
    const timeRemaining = this.getTokenTimeRemaining(token);
    if (timeRemaining === -1) return 'Token inválido';

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = Math.floor(timeRemaining % 60);

    if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}, ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minuto${minutes > 1 ? 's' : ''}, ${seconds} segundo${seconds > 1 ? 's' : ''}`;
    } else {
      return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }
  }

  /**
   * Crea un token JWT simulado para desarrollo/testing
   * @param {object} payload - El payload del token
   * @param {number} expiresIn - Tiempo de expiración en segundos
   * @returns {string} - Token JWT simulado
   */
  static createMockToken(payload = {}, expiresIn = 3600) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const exp = now + expiresIn;

    const tokenPayload = {
      iat: now,
      exp: exp,
      ...payload
    };

    // En un entorno real, esto sería firmado por el servidor
    // Aquí solo simulamos la estructura
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(tokenPayload));
    
    return `${encodedHeader}.${encodedPayload}.mock_signature`;
  }
}

export default JWTUtils; 