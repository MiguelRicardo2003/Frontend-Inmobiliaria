import React from "react";

const Pagination = ({ current, total, onPageChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex justify-end mt-6 space-x-2 text-sm">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        aria-label="Anterior"
        className="flex items-center justify-center px-3 h-8 border rounded disabled:opacity-50 disabled:cursor-not-allowed
          text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>

      {/* Botones de página */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 h-8 border rounded transition-colors
            ${
              page === current
                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-600"
            }`}
        >
          {page}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        aria-label="Siguiente"
        className="flex items-center justify-center px-3 h-8 border rounded disabled:opacity-50 disabled:cursor-not-allowed
          text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
