// layouts/dashboardLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/ui/SidebarDashboard";
import HeaderDashboard from "../components/ui/DashboardHeader";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <HeaderDashboard/>
        {/* Puedes agregar un header del dashboard aquí si deseas */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
