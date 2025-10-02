import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ChatOption } from '../types';

interface OptionSelectorProps {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}

/**
 * Selector de opciones con dropdown
 */
export const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ChatOption | null>(null);

  const handleSelect = (option: ChatOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors flex items-center justify-between"
        aria-label="Seleccionar opción"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm">
          {selectedOption ? selectedOption.label : 'Elige una opción'}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
              role="option"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};



