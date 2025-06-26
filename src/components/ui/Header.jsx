import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, CircleUserRound } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/about", label: "Sobre Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/propiedades", label: "Propiedades" },
    { path: "/contacto", label: "Contáctanos" },
    // { path: "/login", label: "Iniciar Sesión" },
  ];

  return (
    <header className="bg-[#2D3A4E] shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex relative items-center h-16">
        <div className="flex items-center gap-2 absolute left-4">
          <img
            src="/LogoZeta.png"
            alt="Logo de la inmobiliaria"
            className="h-6"
          />
          <h1 className="text-xl font-bold text-white">Inmobiliaria</h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-14 text-sm font-medium mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-blue-600 transition ${
                  isActive ? "text-blue-600 font-semibold" : "text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink></NavLink>
        <div className="flex items-center gap-2 absolute right-4">
          <CircleUserRound size={40} color="#ffffff" />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 border-b text-sm ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
