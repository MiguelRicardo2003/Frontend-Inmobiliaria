// layouts/dashboardLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/ui/SidebarDashboard";
import HeaderDashboard from "../components/ui/DashboardHeader";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} />

      {/* Contenido principal */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isOpen ? "md:ml-64" : "md:ml-20"}`}>
        <HeaderDashboard toggleSidebar={toggleSidebar} isSidebarOpen={isOpen} />
        <div className="pt-20 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
