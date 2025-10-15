import { useNavigate } from 'react-router-dom';
import useAuth from '@/core/store/auth/useAuth';

export const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.history.pushState(null, '', '/');
        navigate('/', { replace: true });
    };

    return { logout: handleLogout };
};
