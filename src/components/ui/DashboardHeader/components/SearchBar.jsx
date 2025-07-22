import { Search } from "lucide-react";

const SearchBar = () => (
  <div className="hidden md:flex items-center relative w-96 max-w-md">
    <Search className="absolute left-3 text-gray-400" size={18} />
    <input
      type="text"
      placeholder="Buscar..."
      className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-600 dark:text-gray-300 placeholder-gray-400"
    />
  </div>
);

export default SearchBar;
