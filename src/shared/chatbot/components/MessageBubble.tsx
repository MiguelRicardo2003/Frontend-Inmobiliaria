import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

/**
 * Componente para mostrar burbujas de mensajes
 * Separa mensajes del bot (izquierda) y del usuario (derecha)
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.isBot;

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {isBot ? <Bot size={16} /> : <User size={16} />}
        </div>

        {/* Mensaje */}
        <div className={`px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-gray-100 text-gray-800 rounded-bl-md'
            : 'bg-blue-500 text-white rounded-br-md'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 ${
            isBot ? 'text-gray-500' : 'text-blue-100'
          }`}>
            {message.timestamp.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};



