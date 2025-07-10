import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

const Input = ({
    label,
    error,
    type,
    placeholder,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    id,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && iconPosition === 'left' && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-4 h-4" />
                )}
                <input
                    type={type}
                    id={inputId}
                    placeholder={placeholder}
                    className={`
            w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
            transition-colors bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100
            placeholder-secondary-400 dark:placeholder-secondary-500
            ${Icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${error ? 'border-error-500 focus:ring-error-500 dark:border-error-400' : ''}
            ${className}
          `}
                    {...props}
                />
                {Icon && iconPosition === 'right' && (
                    <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-4 h-4" />
                )}
            </div>
            {error && <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>}
        </div>
    );
};

export default Input;