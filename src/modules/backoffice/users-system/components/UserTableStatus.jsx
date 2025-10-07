import React from "react";
import { UserCheck, UserX } from "lucide-react";

const UserTableStatus = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
        isActive
          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
          : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
      }`}
    >
      {isActive ? (
        <>
          <UserCheck className="w-3 h-3 mr-1" />
          Activo
        </>
      ) : (
        <>
          <UserX className="w-3 h-3 mr-1" />
          Inactivo
        </>
      )}
    </button>
  );
};

export default UserTableStatus;
