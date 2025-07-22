import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { User } from "lucide-react";
// import ThemeToggle from "../../ThemeToggle";

const UserMenu = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");

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
        className="flex items-center space-x-2 p-1 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <User size={16} />
        </div>
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-30">
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
