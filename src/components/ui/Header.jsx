import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, CircleUserRound } from "lucide-react";
import { navItems } from "../../data/navItems";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#2D3A4E] shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex relative items-center h-16">
        <div className="flex items-center gap-2 absolute left-4">
          {/* <img
            src="/LogoZeta.png"
            alt="Logo de la inmobiliaria"
            className="h-6"
          /> */}
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

        <div className="flex items-center gap-2 absolute right-4">
          <NavLink to="/login" className="flex items-center gap-2">
            <CircleUserRound size={40} color="#ffffff" />
          </NavLink>
          
          {/* Version Menu Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={40} />}
          </button>
        </div>
      </div>

      {/* Barra Nav Mobile */}
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
