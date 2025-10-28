import {
  Home,
  Heart,
  User,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  Building2,
} from "lucide-react";
import NavItem from "./NavItem";

const ClientSidebar = ({ isOpen }) => {
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
          <p className={`text-xs font-semibold text-gray-400 uppercase mb-4`}>Menu Principal</p>

          <ul className="space-y-1">
            <NavItem icon={<Home size={20} />} label="Mi Inicio" to="/client/dashboard" isExpanded={true} />
            <NavItem icon={<Building2 size={20} />} label="Explorar Propiedades" to="/client/properties" isExpanded={true} />
            <NavItem icon={<Heart size={20} />} label="Mis Favoritos" to="/client/favorites" isExpanded={true} />
            <NavItem icon={<MessageSquare size={20} />} label="Mensajes" to="/client/messages" isExpanded={true} />
            <NavItem icon={<Bell size={20} />} label="Notificaciones" to="/client/notifications" isExpanded={true} />
          </ul>

          <p className={`text-xs font-semibold text-gray-400 uppercase mt-8 mb-4`}>Mi Cuenta</p>

          <ul className="space-y-1">
            <NavItem icon={<User size={20} />} label="Mi Perfil" to="/client/profile" isExpanded={true} />
            <NavItem icon={<Settings size={20} />} label="Configuración" to="/client/settings" isExpanded={true} />
            <NavItem icon={<HelpCircle size={20} />} label="Ayuda" to="/client/help" isExpanded={true} />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default ClientSidebar;
