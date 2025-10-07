import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Send, Clock } from 'lucide-react';

interface ChatFooterProps {
  onSendMessage: (message: string) => void;
  maxCharacters?: number;
  isLoading?: boolean;
}

/**
 * Footer del chatbot con input y controles
 */
export const ChatFooter: React.FC<ChatFooterProps> = ({
  onSendMessage,
  maxCharacters = 500,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setMessage(value);
      setCharacterCount(value.length);
    }
  };

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      setCharacterCount(0);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isNearLimit = characterCount > maxCharacters * 0.8;
  const isAtLimit = characterCount >= maxCharacters;

  return (
    <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
      {/* Input de mensaje */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta"
            disabled={isLoading}
            className={`w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              isAtLimit ? 'border-red-300 focus:ring-red-500' : ''
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Escribe tu mensaje"
            maxLength={maxCharacters}
          />

          {/* Contador de caracteres */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span className={`text-xs ${
              isAtLimit ? 'text-red-500' : isNearLimit ? 'text-yellow-500' : 'text-gray-400'
            }`}>
              {characterCount}/{maxCharacters}
            </span>
          </div>
        </div>

        {/* Botón de enviar */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || isLoading || isAtLimit}
          className={`p-3 rounded-lg transition-colors ${
            message.trim() && !isLoading && !isAtLimit
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Enviar mensaje"
        >
          <Send size={16} />
        </button>
      </div>

      {/* Indicador de límite de caracteres */}
      {isNearLimit && (
        <div className="mt-2 text-xs text-yellow-600">
          {isAtLimit
            ? 'Has alcanzado el límite de caracteres'
            : `Te quedan ${maxCharacters - characterCount} caracteres`
          }
        </div>
      )}
    </div>
  );
};
