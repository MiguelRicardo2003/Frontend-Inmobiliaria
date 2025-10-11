import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/core/store/auth.store';

export const useLogout = () => {
	const navigate = useNavigate();
	const { clearAuth } = useAuthStore();

	const logout = () => {
		// Limpiar el estado de autenticación
		clearAuth();
		// Limpiar el historial de navegación
		window.history.pushState(null, '', '/');
		// Redirigir al usuario a la landing
		navigate('/', { replace: true });
	};

	return { logout };
};
