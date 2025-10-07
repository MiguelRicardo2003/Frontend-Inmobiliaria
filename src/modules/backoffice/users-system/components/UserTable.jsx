import React from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

const UserTable = ({ users, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <UserTableHeader />
        <tbody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
