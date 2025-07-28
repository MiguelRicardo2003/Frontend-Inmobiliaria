import { Search } from "lucide-react";

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Buscar...", 
  className = "",
  disabled = false 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-base text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default SearchBar; 