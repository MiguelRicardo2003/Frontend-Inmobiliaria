// import { useApi } from "@/core/api/useApi";
// import type { LoginRequest, LoginResponse, AuthResponse } from "@/modules/auth/types/Auth.types";
// import type { RegisterCandidateDto, RegisterCompanyDto } from "@/modules/auth/types/Auth.types";

// const api = useApi();

// // Función helper para mapear la respuesta del backend
// const mapResponse = (response: AuthResponse): LoginResponse['data'] => {
//     return {
//         user: response.user,
//         accessToken: response.tokens.accessToken,
//         refreshToken: response.tokens.refreshToken
//     };
// };

// // Función helper para manejar errores
// const handleError = (error: any): LoginResponse => {
//     const errorMessage = error.response?.data?.message ||
//                         error.response?.data?.error ||
//                         error.message ||
//                         "Error desconocido";

//     return {
//         success: false,
//         message: errorMessage,
//         data: undefined
//     };
// };

// // Funciones del servicio de autenticación
// export const login = async (data: LoginRequest): Promise<LoginResponse> => {
//     try {
//         const response = await api.authPost<AuthResponse>("/auth/login", data);
//         const mappedResponse = mapResponse(response);
//         return { success: true, data: mappedResponse, message: "Login exitoso" };
//     } catch (error: any) {
//         return handleError(error);
//     }
// };

// // Registrar candidato
// export const registerCandidate = async (data: RegisterCandidateDto): Promise<LoginResponse> => {
//     try {
//         const response = await api.authPost<AuthResponse>("/auth/register-candidate", data);
//         const mappedResponse = mapResponse(response);
//         return { success: true, data: mappedResponse, message: "Registro exitoso" };
//     } catch (error: any) {
//         return handleError(error);
//     }
// };

// // Registrar empresa
// export const registerCompany = async (data: RegisterCompanyDto): Promise<LoginResponse> => {
//     try {
//         const response = await api.authPost<AuthResponse>("/auth/register-company", data);
//         const mappedResponse = mapResponse(response);
//         return { success: true, data: mappedResponse, message: "Registro de empresa exitoso" };
//     } catch (error: any) {
//         return handleError(error);
//     }
// };

// export const authService = {
//     login,
//     registerCandidate,
//     registerCompany
// };

