import { useState, useCallback } from 'react';
import type { Message, ChatOption, ChatbotState } from '../types';
import { botResponses, chatOptions, initialMessages } from '../data/mockResponses';

/**
 * Hook personalizado para manejar la lógica del chatbot
 */
export const useChatbot = () => {
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isMinimized: false,
    messages: [],
    isLoading: false,
    selectedOption: null
  });

  // Generar ID único para mensajes
  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Agregar mensaje del bot
  const addBotMessage = useCallback((text: string, options?: ChatOption[]) => {
    const message: Message = {
      id: generateId(),
      text,
      isBot: true,
      timestamp: new Date(),
      type: options ? 'options' : 'text'
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }, []);

  // Agregar mensaje del usuario
  const addUserMessage = useCallback((text: string) => {
    const message: Message = {
      id: generateId(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }, []);

  // Inicializar conversación
  const initializeChat = useCallback(() => {
    const messages: Message[] = initialMessages.map((text, index) => ({
      id: generateId(),
      text,
      isBot: true,
      timestamp: new Date(),
      type: index === 1 ? 'options' : 'text'
    }));

    setState(prev => ({
      ...prev,
      messages,
      selectedOption: null
    }));
  }, []);

  // Manejar selección de opción
  const handleOptionSelect = useCallback(async (option: ChatOption) => {
    // Agregar mensaje del usuario
    addUserMessage(option.label);

    // Mostrar loading
    setState(prev => ({ ...prev, isLoading: true }));

    // Simular delay de respuesta
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Obtener respuesta del bot
    const response = botResponses[option.value] || botResponses.default;
    
    // Agregar respuesta del bot
    addBotMessage(response.text);

    // Ocultar loading
    setState(prev => ({ 
      ...prev, 
      isLoading: false,
      selectedOption: option.value
    }));
  }, [addBotMessage, addUserMessage]);

  // Manejar mensaje de texto del usuario
  const handleUserMessage = useCallback(async (text: string) => {
    // Agregar mensaje del usuario
    addUserMessage(text);

    // Mostrar loading
    setState(prev => ({ ...prev, isLoading: true }));

    // Simular delay de respuesta
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Respuesta genérica
    addBotMessage('Gracias por tu mensaje. Estoy procesando tu consulta y te responderé pronto. ¿Hay algo más en lo que pueda ayudarte?');

    // Ocultar loading
    setState(prev => ({ ...prev, isLoading: false }));
  }, [addBotMessage, addUserMessage]);

  // Abrir chatbot
  const openChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true, isMinimized: false }));
    if (state.messages.length === 0) {
      initializeChat();
    }
  }, [initializeChat, state.messages.length]);

  // Cerrar chatbot
  const closeChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false, isMinimized: false }));
  }, []);

  // Minimizar chatbot
  const minimizeChat = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  // Obtener opciones actuales
  const getCurrentOptions = useCallback((): ChatOption[] => {
    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage?.isBot && lastMessage.type === 'options') {
      return chatOptions;
    }
    return [];
  }, [state.messages]);

  return {
    state,
    actions: {
      openChat,
      closeChat,
      minimizeChat,
      handleOptionSelect,
      handleUserMessage,
      initializeChat
    },
    getCurrentOptions
  };
};
