import React from 'react';

// Card principal
const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <div
            className={`bg-transparent dark:bg-secondary-800 rounded-2xl shadow-md dark:shadow-secondary-900/20 overflow-hidden dark:border-secondary-700 ${hover ? 'hover:shadow-lg dark:hover:shadow-secondary-900/30 transform hover:-translate-y-1 transition-all duration-200' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// Subcomponentes para estructura flexible
const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`px-6 py-4 border-b border-secondary-100 dark:border-secondary-700 bg-white dark:bg-secondary-800 ${className}`} {...props}>
        {children}
    </div>
);

const CardContent = ({ children, className = '', ...props }) => (
    <div className={`px-6 py-4 ${className}`} {...props}>
        {children}
    </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
    <div className={`px-6 py-4 border-t border-secondary-100 dark:border-secondary-700 bg-transparent dark:bg-secondary-800 ${className}`} {...props}>
        {children}
    </div>
);

// Exportación con subcomponentes
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card, CardHeader, CardContent, CardFooter };
export default Card;
