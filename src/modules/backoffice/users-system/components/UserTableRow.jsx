import React from "react";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";
import UserTableStatus from "./UserTableStatus";
import UserTableActions from "./UserTableActions";

const UserTableRow = ({ user, onEdit, onDelete, onToggleStatus }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4">
        <UserTableStatus 
          isActive={user.isActive} 
          onToggle={() => onToggleStatus(user.id)} 
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <UserTableActions
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default UserTableRow;
