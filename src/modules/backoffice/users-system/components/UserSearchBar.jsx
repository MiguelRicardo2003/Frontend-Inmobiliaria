import { Search } from "lucide-react";

const UserSearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full md:w-1/4 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Buscar por nombre, rol o estado"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-base text-gray-700 dark:text-gray-100 bg-white dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-400"
      />
    </div>
  );
};

export default UserSearchBar;
