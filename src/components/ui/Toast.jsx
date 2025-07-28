import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  isVisible = true
}) => {
  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, onClose]);

  const toastStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    }
  };

  const style = toastStyles[type];

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-right-full duration-300`}>
      <div className={`${style.bg} ${style.border} border rounded-lg p-4 shadow-lg`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {style.icon}
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${style.text}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className={`inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast; 