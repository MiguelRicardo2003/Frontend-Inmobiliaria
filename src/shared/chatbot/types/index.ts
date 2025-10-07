/**
 * Tipos para el sistema de chatbot
 */

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'options';
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
}

export interface BotResponse {
  id: string;
  text: string;
  options?: ChatOption[];
  action?: string;
}

export interface ChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  isLoading: boolean;
  selectedOption: string | null;
}

export interface ChatbotProps {
  onClose?: () => void;
  onMinimize?: () => void;
  initialMessage?: string;
  maxCharacters?: number;
}



