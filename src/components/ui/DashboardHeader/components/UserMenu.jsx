import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { User } from "lucide-react";
import useAuth from "../../../../core/store/auth/useAuth";
// import ThemeToggle from "../../ThemeToggle";

const UserMenu = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          {/* Indicador de usuario activo */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-32">
            {user?.nombre || 'Usuario'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
            {user?.rol || 'Usuario'}
          </p>
        </div>
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-30">
          {/* Información del usuario */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user?.nombre || 'Usuario'} {user?.apellido || ''}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.correo || 'usuario@email.com'}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium capitalize">
              {user?.rol || 'Usuario'}
            </p>
          </div>
          
          {/* Opciones del menú */}
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Perfil
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Configuración
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500 dark:text-red-400"
            >
              Cerrar sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
