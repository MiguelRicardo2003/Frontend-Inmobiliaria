import {
  Home,
  Building2,
  Users,
  FileText,
  Key,
  DollarSign,
  BarChart2,
  Settings,
  User,
} from "lucide-react";
import NavItem from "./NavItem";

const AgentSidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-10 h-full pt-16 transition-transform duration-300 ease-in-out
        w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}
    >
      <div className="h-full flex flex-col justify-between overflow-y-auto pb-4">
        <nav className="px-4 py-4">
          <p className={`text-xs font-semibold text-gray-400 uppercase mb-4`}>Menu</p>

          <ul className="space-y-1">
            <NavItem 
              icon={<Home size={20} />} 
              label="Dashboard" 
              to="/agent/dashboard" 
              isExpanded={true} 
            />
            <NavItem 
              icon={<Building2 size={20} />} 
              label="Mis Propiedades" 
              to="/agent/properties" 
              isExpanded={true} 
            />
            <NavItem 
              icon={<Users size={20} />} 
              label="Clientes" 
              to="/agent/customers" 
              isExpanded={true} 
            />
            <NavItem 
              icon={<DollarSign size={20} />} 
              label="Ventas" 
              to="/agent/sales" 
              isExpanded={true} 
            />
            <NavItem 
              icon={<Key size={20} />} 
              label="Arriendos" 
              to="/agent/rentals" 
              isExpanded={true} 
            />
            <NavItem 
              icon={<FileText size={20} />} 
              label="Contratos" 
              to="/agent/contracts" 
              isExpanded={true} 
            />
          </ul>

          <p className={`text-xs font-semibold text-gray-400 uppercase mt-8 mb-4`}>Preferences</p>

          <ul className="space-y-1">
            <NavItem 
              icon={<BarChart2 size={20} />} 
              label="Mis Estadísticas" 
              to="/agent/stats" 
              isExpanded={true} 
            />
            <NavItem 
              icon={<User size={20} />} 
              label="Mi Perfil" 
              to="/agent/profile" 
              isExpanded={true} 
            />
            <NavItem 
              icon={<Settings size={20} />} 
              label="Configuración" 
              to="/agent/settings" 
              isExpanded={true} 
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AgentSidebar;
