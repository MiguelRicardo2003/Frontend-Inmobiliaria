import React, { useEffect, useState } from "react";
import SidebarToggle from "./components/SidebarToggle";
import BrandLogo from "./components/BrandLogo";
import SearchBar from "./components/SearchBar";
import NotificationBell from "./components/NotificationBell";
import UserMenu from "./components/UserMenu";

const HeaderDashboard = ({ toggleSidebar, isSidebarOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center">
          <SidebarToggle toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <BrandLogo />
        </div>

        <SearchBar />

        <div className="flex items-center space-x-3 relative">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
