import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, CircleUserRound } from "lucide-react";
import { navItems } from "../../data/navItems";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#2D3A4E] shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex relative items-center h-16">
        {/* Logo */}
        <NavLink to="/">
          <div className="flex items-center gap-2 left-4">
            <h1 className="text-xl font-bold text-white">JustHome</h1>
          </div>
        </NavLink>

        {/* Desktop nav con íconos */}
        <nav className="hidden lg:flex gap-10 text-base font-medium mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-1 hover:text-blue-400 transition ${
                  isActive ? "text-blue-400 font-semibold" : "text-white"
                }`
              }
            >
              {item.icon && <item.icon size={18} />} {/* Se añade el ícono */}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Icono usuario + hamburguesa */}
        <div className="flex items-center gap-2 absolute right-4">
          <NavLink to="/login" className="flex items-center gap-2">
            <CircleUserRound size={32} color="#ffffff" />
          </NavLink>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pb-4">
          <h2 className="text-center font-bold text-lg mb-2">Menú</h2>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md text-base ${
                    isActive
                      ? "bg-[#2D3A4E] text-white"
                      : "text-black hover:bg-gray-100"
                  }`
                }
              >
                {item.icon && <item.icon size={18} />}{" "}
                {/* Ícono también en mobile */}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
