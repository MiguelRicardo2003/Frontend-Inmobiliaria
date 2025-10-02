// import { useApi } from "@/core/api/useApi";
// import type {
//     PlatformAdmin,
//     QueryAdminsParams,
//     PaginatedAdminsResponse,
//     CreateAdminData,
//     CreateAdminResponse,
//     DeleteAdminResponse
// } from '../types/platform-admin.types';

// const api = useApi();

// // Función helper para manejar errores de forma consistente
// const handleError = (error: any): never => {
//     const errorMessage = error.response?.data?.message ||
//         error.response?.data?.error ||
//         error.message ||
//         "Error desconocido";
//     throw new Error(errorMessage);
// };

// // Función helper para construir query parameters
// const buildQueryParams = (params: QueryAdminsParams): string => {
//     const searchParams = new URLSearchParams();

//     Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== '') {
//             searchParams.append(key, value.toString());
//         }
//     });

//     return searchParams.toString();
// };

// // Wrapper para manejar errores de forma consistente
// const apiCall = async <T>(apiFunction: () => Promise<T>): Promise<T> => {
//     try {
//         return await apiFunction();
//     } catch (error) {
//         return handleError(error);
//     }
// };

// // Funciones del servicio
// export const createAdmin = (adminData: CreateAdminData): Promise<PlatformAdmin> =>
//     apiCall(async () => {
//         const response = await api.post<CreateAdminResponse>("/admin/register-admin", adminData);
//         return response.admin;
//     });

// export const getAdmins = (params: QueryAdminsParams = {}): Promise<PaginatedAdminsResponse> =>
//     apiCall(async () => {
//         const queryString = buildQueryParams(params);
//         const url = queryString ? `/admin/admins?${queryString}` : "/admin/admins";
//         return await api.get<PaginatedAdminsResponse>(url);
//     });

// export const getAdminById = (id: number): Promise<PlatformAdmin> =>
//     apiCall(async () => {
//         return await api.get<PlatformAdmin>(`/admin/users/${id}`);
//     });

// export const deleteAdmin = (id: number): Promise<DeleteAdminResponse> =>
//     apiCall(async () => {
//         return await api.deleteData<DeleteAdminResponse>(`/admin/users/${id}`);
//     });

// export const platformAdminService = {
//     createAdmin,
//     getAdmins,
//     getAdminById,
//     deleteAdmin,
// };
