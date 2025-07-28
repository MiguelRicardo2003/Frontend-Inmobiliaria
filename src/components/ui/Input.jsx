import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  error,
  type,
  placeholder,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  id,
  onIconClick, // <-- NUEVO: se recibe la función como prop
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          onIconClick ? (
            <div
              onClick={onIconClick}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 cursor-pointer"
            >
              <Icon />
            </div>
          ) : (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          )
        )}

        <input
          type={type}
          id={inputId}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border-gray-300 dark:border-gray-600 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
            transition-colors dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            ${Icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500 dark:border-red-400' : ''}
            ${className}
          `}
          {...props}
        />

        {Icon && iconPosition === 'right' && (
          onIconClick ? (
            <div
              onClick={onIconClick}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 cursor-pointer"
            >
              <Icon />
            </div>
          ) : (
            <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          )
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};


export default Input;