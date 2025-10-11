// Componente principal
export { Chatbot } from './Chatbot';
export { default } from './Chatbot';

// Componentes individuales
export { ChatHeader } from './components/ChatHeader';
export { ChatBody } from './components/ChatBody';
export { ChatFooter } from './components/ChatFooter';
export { MessageBubble } from './components/MessageBubble';
export { OptionSelector } from './components/OptionSelector';

// Hooks
export { useChatbot } from './hooks/useChatbot';

// Tipos
export type {
  Message,
  ChatOption,
  BotResponse,
  ChatbotState,
  ChatbotProps
} from './types';

// Datos mock
export { chatOptions, botResponses, initialMessages } from './data/mockResponses';



