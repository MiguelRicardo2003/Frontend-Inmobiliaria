// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { AuthState, Role, User } from '@/core/types/store.types';

// // Funciones de encriptación independientes (no hooks)
// const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-fallback-key-here';

// const encrypt = (data: unknown): string => {
//     try {
//         // Convertir los datos a string si no lo son
//         const stringData = typeof data === 'string' ? data : JSON.stringify(data);
//         // Crear el buffer de datos
//         const textToChars = stringData.split('').map(c => c.charCodeAt(0));
//         // Aplicar la encriptación XOR con la key
//         const encrypted = textToChars.map((char, index) => {
//             const keyChar = ENCRYPTION_KEY.charCodeAt(index % ENCRYPTION_KEY.length);
//             return String.fromCharCode(char ^ keyChar);
//         }).join('');
//         // Convertir a base64 para almacenamiento seguro
//         const result = btoa(encrypted);
//         return result;
//     } catch {
//         return '';
//     }
// };

// const decrypt = (encryptedData: string): unknown => {
//     try {
//         if (!encryptedData) return null;
//         // Decodificar el base64
//         const decoded = atob(encryptedData);

//         // Revertir la encriptación XOR
//         const decrypted = decoded.split('').map((char, index) => {
//             const keyChar = ENCRYPTION_KEY.charCodeAt(index % ENCRYPTION_KEY.length);
//             return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
//         }).join('');

//         // Intentar parsear como JSON si es posible
//         try {
//             const result = JSON.parse(decrypted);
//             return result;
//         } catch {
//             return decrypted;
//         }
//     } catch {
//         return null;
//     }
// };

// export const useAuthStore = create<AuthState>()(
//     persist(
//         (set, get) => ({
//             user: null,
//             token: null,
//             refreshToken: null,
//             isAuthenticated: false,
//             setAuth: (user: User, accessToken: string, refresh?: string) => {
//                 const encryptedUser = encrypt(user);
//                 const encryptedToken = encrypt(accessToken);
//                 const encryptedRefresh = refresh ? encrypt(refresh) : null;

//                 set({
//                     user: encryptedUser,
//                     token: encryptedToken,
//                     refreshToken: encryptedRefresh,
//                     isAuthenticated: true,
//                 });
//             },
//             clearAuth: () => {
//                 set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
//             },
//             logout: () => {
//                 set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
//                 window.location.href = '/auth';
//             },
//             hasRole: (role: Role) => {
//                 const { user } = get();
//                 if (!user) return false;
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return false;
//                 // Verificar tanto los roles nuevos (códigos del backend) como los legacy
//                 const userRoles = decryptedUser.roles || [];
//                 return userRoles.includes(role) ?? false;
//             },
//             hasAnyRole: (roles: Role[]) => {
//                 const { user } = get();
//                 if (!user) return false;
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return false;
//                 return decryptedUser.roles?.some((role: Role) => roles.includes(role)) ?? false;
//             },
//             hasAllRoles: (roles: Role[]) => {
//                 const { user } = get();
//                 if (!user) return false;
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return false;
//                 return decryptedUser.roles?.every((role: Role) => roles.includes(role)) ?? false;
//             },
//             getUser: () => {
//                 const { user } = get();
//                 if (!user) return null;
//                 return decrypt(user) as User | null;
//             },
//             // Permisos de módulos
//             hasModuleAccess: (moduloId: string) => {
//                 const { user } = get();
//                 if (!user) return false;
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return false;
//                 const areaModulos = decryptedUser.area_modulos;
//                 if (!areaModulos) return false;
//                 return areaModulos[moduloId]?.activo ?? false;
//             },
//             hasSubmoduleAccess: (moduloId: string, submoduloId: string) => {
//                 const { user } = get();
//                 if (!user) return false;
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return false;
//                 const areaModulos = decryptedUser.area_modulos;
//                 if (!areaModulos || !areaModulos[moduloId]?.activo) return false;
//                 return areaModulos[moduloId]?.submodulos?.includes(submoduloId) ?? false;
//             },
//             getAvailableModules: () => {
//                 const { user } = get();
//                 if (!user) return [];
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return [];
//                 const areaModulos = decryptedUser.area_modulos;
//                 if (!areaModulos) return [];
//                 return Object.keys(areaModulos).filter(moduloId => areaModulos[moduloId]?.activo);
//             },
//             getAvailableSubmodules: (moduloId: string) => {
//                 const { user } = get();
//                 if (!user) return [];
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return [];
//                 const areaModulos = decryptedUser.area_modulos;
//                 if (!areaModulos || !areaModulos[moduloId]?.activo) return [];
//                 return areaModulos[moduloId]?.submodulos || [];
//             },
//             getUserAreas: () => {
//                 const { user } = get();
//                 if (!user) return [];
//                 const decryptedUser = decrypt(user) as User | null;
//                 if (!decryptedUser) return [];
//                 return decryptedUser.areas || [];
//             },
//             getDecryptedUser: () => {
//                 const { user } = get();
//                 if (!user) return null;
//                 const decrypted = decrypt(user) as User | null;
//                 return decrypted;
//             },
//             getDecryptedToken: () => {
//                 const { token } = get();
//                 if (!token) return null;
//                 const decrypted = decrypt(token) as string | null;
//                 return decrypted;
//             },
//             getDecryptedRefreshToken: () => {
//                 const { refreshToken } = get();
//                 if (!refreshToken) return null;
//                 const decrypted = decrypt(refreshToken) as string | null;
//                 return decrypted;
//             },
//         }),
//         {
//             name: 'auth-storage',
//             partialize: (state) => {
//                 return {
//                     user: state.user,
//                     token: state.token,
//                     refreshToken: state.refreshToken,
//                     isAuthenticated: state.isAuthenticated,
//                 };
//             },
//         }
//     )
// );
