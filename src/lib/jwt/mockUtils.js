// utils/jwt/mockUtils.js

/**
 * Crea un token JWT simulado
 */
export function createMockToken(payload = {}, expiresIn = 3600) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
  
    const now = Math.floor(Date.now() / 1000);
    const exp = now + expiresIn;
  
    const tokenPayload = {
      iat: now,
      exp,
      ...payload
    };
  
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(tokenPayload));
  
    return `${encodedHeader}.${encodedPayload}.mock_signature`;
  }
  