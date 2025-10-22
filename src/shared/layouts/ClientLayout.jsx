// layouts/ClientLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ClientSidebar from "../../components/ui/ClientSidebar";
import HeaderDashboard from "../../components/ui/DashboardHeader/DashboardHeader";

const ClientLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <ClientSidebar isOpen={isOpen} />

      {/* Contenido principal */}
      <div className={"flex-1 overflow-y-auto transition-all duration-300 md:ml-64"}>
        <HeaderDashboard toggleSidebar={toggleSidebar} isSidebarOpen={isOpen} />
        <div className="pt-20 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
