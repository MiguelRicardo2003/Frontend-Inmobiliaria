import { Menu, X } from "lucide-react";

const SidebarToggle = ({ toggleSidebar, isSidebarOpen }) => (
  <button
    onClick={toggleSidebar}
    className="p-2 mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    aria-label="Toggle sidebar"
  >
    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
);

export default SidebarToggle;
