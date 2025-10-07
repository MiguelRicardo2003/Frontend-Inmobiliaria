import React from 'react';
import { X, Minimize2 } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

/**
 * Header del chatbot con logo y controles
 */
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClose,
  onMinimize,
  isMinimized
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-2xl">
      {/* Logo y título */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Recruitment</h3>
          <p className="text-xs text-gray-500">Asistente virtual</p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-2">
        <button
          onClick={onMinimize}
          className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100"
          aria-label={isMinimized ? 'Expandir chat' : 'Minimizar chat'}
        >
          <Minimize2 size={16} />
        </button>
        
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100"
          aria-label="Cerrar chat"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
