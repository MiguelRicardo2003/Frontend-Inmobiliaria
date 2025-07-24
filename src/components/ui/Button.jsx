import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    children,
    className = '',
    disabled,
    classNameIcon,
    ...props
}) => {
    const baseClasses =
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary:
            'bg-[#2D3A4E] text-white hover:bg-[#1E2A3A] focus:ring-[#2D3A4E] shadow-md hover:shadow-lg',
        secondary:
            'bg-[#E7C873] text-black hover:bg-yellow-300 focus:ring-[#E7C873] shadow-md hover:shadow-lg',
        outline:
            'border-2 border-[#2D3A4E] bg-white text-[#2D3A4E] hover:bg-gray-50 focus:ring-[#2D3A4E]',
        ghost:
            'text-[#2D3A4E] hover:bg-gray-100 focus:ring-[#2D3A4E]',
        danger:
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
        success:
            'bg-[#1F4B43] text-white hover:bg-[#163A33] focus:ring-[#1F4B43] shadow-md hover:shadow-lg',
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
    };

    const isDisabled = disabled || loading;

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Cargando...
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && (
                        <Icon className={classNameIcon ? `w-4 h-4 ${classNameIcon}` : 'w-4 h-4 mr-2'} />
                    )}
                    {children}
                    {Icon && iconPosition === 'right' && (
                        <Icon className={classNameIcon ? `w-4 h-4 ${classNameIcon}` : 'w-4 h-4 ml-2'} />
                    )}
                </>
            )}
        </button>
    );
};

export default Button;
