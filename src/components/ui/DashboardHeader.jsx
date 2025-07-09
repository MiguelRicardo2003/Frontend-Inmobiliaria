import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Bell, Search, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const HeaderDashboard = ({ toggleSidebar, isSidebarOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);


  const navigate = useNavigate();

const handleLogout = () => {
  // Opcional: limpiar tokens o sesión
  // localStorage.removeItem('token');

  navigate("/login"); // Redirigir al login
};

  // Detectar scroll para fondo fijo
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!notifRef.current?.contains(e.target)) setShowNotifications(false);
      if (!userRef.current?.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        {/* Sidebar + título */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg text-gray-800 dark:text-white">
              Dash
            </span>
            <span className="text-blue-500 dark:text-blue-400 font-semibold text-lg">
              Board
            </span>
          </div>
        </div>

        {/* Buscador */}
        <div className="hidden md:flex items-center relative w-96 max-w-md">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-600 dark:text-gray-300 placeholder-gray-400"
          />
        </div>

        {/* Iconos lado derecho */}
        <div className="flex items-center space-x-3 relative">
          {/* Notificaciones */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-30">
                <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-semibold mb-2">Notificaciones</p>
                  <ul className="space-y-2">
                    <li>Tienes 3 nuevos mensajes</li>
                    <li>Nueva propiedad registrada</li>
                    <li>Nuevo cliente registrado</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Tema */}
          <ThemeToggle />

          {/* Usuario */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </button>
            {showUserMenu && (
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
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500 dark:text-red-400">
                    Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
