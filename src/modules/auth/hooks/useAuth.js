import { useState } from "react";
import { toast } from "sonner";
import authService from "@/core/services/authService";
import useAuth from "@/core/store/auth/useAuth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
	// hooks
	const { login: contextLogin } = useAuth();
	const navigate = useNavigate();

	// services
	const login = authService.login.bind(authService);

	// state
	const [process, setProcess] = useState(0);
	const [formLoginData, setFormLoginData] = useState({ email: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [component, setComponent] = useState('login');
	const [authError, setAuthError] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	// methods
	const handleProcess = async () => {
		switch (process) {
			case 0:
				await processSubmitLogin();
				break;
			default:
				break;
		}
	};

	const processSubmitLogin = async () => {
		try {
			setIsLoading(true);

			if (!formLoginData.email || !formLoginData.password) {
				if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
					window.dispatchEvent(new Event('force-validation'));
				}
				return toast.error('Completa el formulario para continuar');
			}

			const payload = {
				correo: formLoginData.email,
				contrasenia: formLoginData.password,
			};

			const result = await login(payload);

			// authService (core) returns { success: true, data: { accessToken, usuario } }
			// some other implementations may return { data: { usuario, accessToken } }
			const data = result?.data || result;

			if (data) {
				setAuthError('');
				const usuario = data.usuario || data.user || null;
				const accessToken = data.accessToken || data.token || null;
				const refreshToken = data.refreshToken || null;

				// Actualizar contexto AuthProvider si está disponible
				try {
					if (accessToken && usuario) {
						await contextLogin({ correo: usuario.correo || formLoginData.email, contrasenia: formLoginData.password });
					}
				} catch (e) {
					console.warn('context login failed:', e);
				}

				const userRole = usuario && (usuario.role || (Array.isArray(usuario.roles) ? usuario.roles[0] : null));

				if (userRole === 'platform_admin') {
					navigate('/app');
				} else if (userRole === 'candidate' || userRole === 'company_admin') {
					navigate('/');
				} else {
					navigate('/app');
				}

				return { success: true, data };
			}

			const msg = result?.message || 'Error de login';
			setAuthError(msg);
			toast.error(String(msg).toUpperCase());
			return { success: false, message: msg };
		} catch (error) {
			const errMsg = error?.response?.data?.message || error?.message || String(error);
			toast.error(String(errMsg));
			return { success: false, message: errMsg };
		} finally {
			setIsLoading(false);
		}
	};

	return {
		component,
		setComponent,
		isLoading,
		showPassword,
		setShowPassword,
		process,
		setProcess,
		formLoginData,
		setFormLoginData,
		handleProcess,
		authError,
	};
};

export default useAuth;
