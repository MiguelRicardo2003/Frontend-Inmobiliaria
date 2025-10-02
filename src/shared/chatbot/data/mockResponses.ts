import type { BotResponse, ChatOption } from '../types';

/**
 * Opciones predefinidas del chatbot
 */
export const chatOptions: ChatOption[] = [
  {
    id: 'job-offers',
    label: 'Ofertas de empleo',
    value: 'job-offers'
  },
  {
    id: 'company-register',
    label: 'Registrar empresa',
    value: 'company-register'
  },
  {
    id: 'technical-support',
    label: 'Soporte técnico',
    value: 'technical-support'
  },
  {
    id: 'account-help',
    label: 'Ayuda con mi cuenta',
    value: 'account-help'
  },
  {
    id: 'pricing',
    label: 'Precios y planes',
    value: 'pricing'
  }
];

/**
 * Respuestas del bot basadas en las opciones seleccionadas
 */
export const botResponses: Record<string, BotResponse> = {
  'job-offers': {
    id: 'job-offers-response',
    text: '¡Perfecto! Te ayudo con las ofertas de empleo. Puedes buscar por categoría, ubicación o palabras clave. ¿Qué tipo de trabajo estás buscando?',
    options: [
      { id: 'search-jobs', label: 'Buscar trabajos', value: 'search-jobs' },
      { id: 'create-alert', label: 'Crear alerta de empleo', value: 'create-alert' },
      { id: 'upload-cv', label: 'Subir mi CV', value: 'upload-cv' }
    ]
  },
  'company-register': {
    id: 'company-register-response',
    text: 'Excelente elección! Para registrar tu empresa necesitarás algunos documentos básicos. Te guío paso a paso:',
    options: [
      { id: 'start-registration', label: 'Comenzar registro', value: 'start-registration' },
      { id: 'requirements', label: 'Ver requisitos', value: 'requirements' },
      { id: 'contact-sales', label: 'Contactar ventas', value: 'contact-sales' }
    ]
  },
  'technical-support': {
    id: 'technical-support-response',
    text: 'Estoy aquí para ayudarte con cualquier problema técnico. ¿Qué necesitas resolver?',
    options: [
      { id: 'login-issues', label: 'Problemas de acceso', value: 'login-issues' },
      { id: 'browser-problems', label: 'Problemas del navegador', value: 'browser-problems' },
      { id: 'mobile-app', label: 'App móvil', value: 'mobile-app' }
    ]
  },
  'account-help': {
    id: 'account-help-response',
    text: 'Te ayudo con tu cuenta. ¿Qué necesitas hacer?',
    options: [
      { id: 'reset-password', label: 'Restablecer contraseña', value: 'reset-password' },
      { id: 'update-profile', label: 'Actualizar perfil', value: 'update-profile' },
      { id: 'delete-account', label: 'Eliminar cuenta', value: 'delete-account' }
    ]
  },
  'pricing': {
    id: 'pricing-response',
    text: 'Te muestro nuestros planes y precios. Tenemos opciones para empresas de todos los tamaños:',
    options: [
      { id: 'view-plans', label: 'Ver planes', value: 'view-plans' },
      { id: 'free-trial', label: 'Prueba gratuita', value: 'free-trial' },
      { id: 'contact-sales', label: 'Contactar ventas', value: 'contact-sales' }
    ]
  },
  'default': {
    id: 'default-response',
    text: 'Gracias por tu mensaje. Estoy procesando tu consulta y te responderé pronto. ¿Hay algo más en lo que pueda ayudarte?',
    options: chatOptions
  }
};

/**
 * Mensajes iniciales del bot
 */
export const initialMessages = [
  'Hola, soy el asistente virtual de Recruitment.',
  'Por favor, selecciona una de las siguientes opciones:'
];
