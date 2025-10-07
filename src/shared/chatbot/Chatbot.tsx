import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatHeader } from './components/ChatHeader';
import { ChatBody } from './components/ChatBody';
import { ChatFooter } from './components/ChatFooter';
import { useChatbot } from './hooks/useChatbot';
import type { ChatbotProps } from './types';

/**
 * Componente principal del chatbot
 * Chat flotante estilo InfoJobs adaptado a la plataforma de empleos
 */
export const Chatbot: React.FC<ChatbotProps> = ({
  onClose,
  onMinimize,
  maxCharacters = 500
}) => {
  const { state, actions, getCurrentOptions } = useChatbot();

  // Efecto para manejar el cierre desde props
  useEffect(() => {
    if (onClose && !state.isOpen) {
      onClose();
    }
  }, [state.isOpen, onClose]);

  // Efecto para manejar la minimización desde props
  useEffect(() => {
    if (onMinimize) {
      onMinimize();
    }
  }, [state.isMinimized, onMinimize]);

  // Si está cerrado, mostrar solo el botón flotante
  if (!state.isOpen) {
    return (
      <button
        onClick={actions.openChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
        aria-label="Abrir chat de asistencia"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <ChatHeader
        onClose={actions.closeChat}
        onMinimize={actions.minimizeChat}
        isMinimized={state.isMinimized}
      />

      {/* Body - Solo visible si no está minimizado */}
      {!state.isMinimized && (
        <>
          <ChatBody
            messages={state.messages}
            options={getCurrentOptions()}
            onOptionSelect={actions.handleOptionSelect}
            isLoading={state.isLoading}
          />

          {/* Footer */}
          <ChatFooter
            onSendMessage={actions.handleUserMessage}
            maxCharacters={maxCharacters}
            isLoading={state.isLoading}
          />
        </>
      )}

      {/* Overlay para cerrar al hacer clic fuera */}
      <div
        className="fixed inset-0 -z-10"
        onClick={actions.closeChat}
        aria-hidden="true"
      />
    </div>
  );
};

export default Chatbot;



