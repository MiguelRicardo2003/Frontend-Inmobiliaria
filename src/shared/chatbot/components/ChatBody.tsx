import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { OptionSelector } from './OptionSelector';
import type { Message, ChatOption } from '../types';

interface ChatBodyProps {
  messages: Message[];
  options: ChatOption[];
  onOptionSelect: (option: ChatOption) => void;
  isLoading: boolean;
}

/**
 * Cuerpo del chatbot que muestra la conversación
 */
export const ChatBody: React.FC<ChatBodyProps> = ({
  messages,
  options,
  onOptionSelect,
  isLoading
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
      {/* Mensajes */}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Selector de opciones */}
      {options.length > 0 && (
        <div className="flex justify-start">
          <div className="max-w-[80%]">
            <OptionSelector
              options={options}
              onSelect={onOptionSelect}
            />
          </div>
        </div>
      )}

      {/* Indicador de carga */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referencia para auto-scroll */}
      <div ref={messagesEndRef} />
    </div>
  );
};
