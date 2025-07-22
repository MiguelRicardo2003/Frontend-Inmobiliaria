import {
  Home,
  BarChart2,
  Settings,
  Users,
  Calendar,
  Mail,
  HelpCircle,
  TableProperties,
} from "lucide-react";
import NavItem from "./NavItem";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-10 h-full pt-16 transition-all duration-300 ease-in-out 
                 ${
                   isOpen
                     ? "w-64 translate-x-0 shadow-lg"
                     : "w-64 -translate-x-full md:translate-x-0 md:w-20"
                 } 
                 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}
    >
      <div className="h-full flex flex-col justify-between overflow-y-auto pb-4">
        <nav className="px-4 py-4">
          <p
            className={`text-xs font-semibold text-gray-400 uppercase mb-4 ${
              !isOpen ? "md:text-center" : ""
            }`}
          >
            {isOpen ? "Menu Principal" : "Menu"}
          </p>

          <ul className="space-y-1">
            <NavItem
              icon={<Home size={20} />}
              label="Dashboard"
              to="/dashboard"
              isExpanded={isOpen}
            />
            <NavItem
              icon={<BarChart2 size={20} />}
              label="Analisis"
              to="/dashboard/Analytics"
              isExpanded={isOpen}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Usuarios"
              to="/dashboard/clients"
              isExpanded={isOpen}
            />
            <NavItem
              icon={<TableProperties size={20} />}
              label="Propiedades"
              to="/dashboard/properties"
              isExpanded={isOpen}
            />
            <NavItem
              icon={<Calendar size={20} />}
              label="Calendario"
              to="/dashboard/calendar"
              isExpanded={isOpen}
            />
            <NavItem
              icon={<Mail size={20} />}
              label="Mensajes"
              to="/dashboard/messages"
              isExpanded={isOpen}
              badge="4"
            />
          </ul>

          <p
            className={`text-xs font-semibold text-gray-400 uppercase mt-8 mb-4 ${
              !isOpen ? "md:text-center" : ""
            }`}
          >
            {isOpen ? "Preferences" : "Prefs"}
          </p>

          <ul className="space-y-1">
            <NavItem
              icon={<Settings size={20} />}
              label="Ajustes"
              to="/dashboard/settings"
              isExpanded={isOpen}
            />
            <NavItem
              icon={<HelpCircle size={20} />}
              label="Ayuda"
              to="/dashboard/help"
              isExpanded={isOpen}
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
