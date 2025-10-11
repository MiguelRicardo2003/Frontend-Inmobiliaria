import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../../../core/store/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden md:block text-sm font-medium">
          {user?.name || 'Usuario'}
        </span>
      </button>

      {isDropdownOpen && (
        <>
          {/* Overlay para cerrar el dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || 'usuario@email.com'}
              </p>
              <p className="text-xs text-blue-600 font-medium capitalize">
                {user?.role || 'Usuario'}
              </p>
            </div>
            
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LogoutButton; 