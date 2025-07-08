import React from 'react';

const NavItem = ({ icon, label, active, isExpanded, badge }) => {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center p-2 rounded-lg group transition-colors ${
          active 
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-200' 
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        <span className="flex-shrink-0">{icon}</span>

        {isExpanded && (
          <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
        )}

        {isExpanded && badge && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 ml-auto">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
};

export default NavItem;
