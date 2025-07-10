import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 flex items-center justify-center px-4 animate-fadeIn">
            <div
                className={`w-full ${sizeClasses[size]} bg-white border border-secondary-200 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 scale-95 animate-zoomIn`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-secondary-600">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        icon={X}
                        className=" hover:text-gray-600 "
                    >
                        <span className="sr-only">Cerrar</span>
                    </Button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
