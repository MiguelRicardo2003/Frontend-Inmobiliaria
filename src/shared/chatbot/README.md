# Chatbot Component

Un chatbot web flotante desarrollado en React + TypeScript + Tailwind CSS, inspirado en el diseño de InfoJobs pero adaptado para la plataforma de empleos.

## Características

### 🎨 **Diseño**
- **Posición flotante** en la esquina inferior derecha
- **Expandible/colapsable** con animaciones suaves
- **Diseño moderno** con Tailwind CSS
- **Responsive** y accesible

### 💬 **Funcionalidad**
- **Conversación bidireccional** (usuario ↔ bot)
- **Opciones predefinidas** con dropdown
- **Mensajes de texto libre** con límite de caracteres
- **Indicadores de carga** y typing
- **Auto-scroll** a nuevos mensajes

### 🔧 **Técnico**
- **TypeScript** para tipado fuerte
- **Hooks personalizados** para lógica reutilizable
- **Componentes modulares** y reutilizables
- **Estado local** con useState
- **Accesibilidad** completa (ARIA, navegación por teclado)

## Estructura de Archivos

```
src/shared/components/chatbot/
├── components/
│   ├── ChatHeader.tsx      # Header con logo y controles
│   ├── ChatBody.tsx        # Área de conversación
│   ├── ChatFooter.tsx      # Input y controles de envío
│   ├── MessageBubble.tsx   # Burbujas de mensajes
│   └── OptionSelector.tsx  # Selector de opciones
├── hooks/
│   └── useChatbot.ts       # Lógica principal del chatbot
├── data/
│   └── mockResponses.ts    # Respuestas y opciones mock
├── types/
│   └── index.ts            # Tipos TypeScript
├── Chatbot.tsx             # Componente principal
├── index.ts                # Exportaciones
└── README.md               # Documentación
```

## Uso

### Básico
```tsx
import { Chatbot } from '@/shared/components/chatbot';

function App() {
  return (
    <div>
      {/* Tu aplicación */}
      <Chatbot />
    </div>
  );
}
```

### Con Props Personalizadas
```tsx
import { Chatbot } from '@/shared/components/chatbot';

function App() {
  const handleClose = () => {
    console.log('Chatbot cerrado');
  };

  const handleMinimize = () => {
    console.log('Chatbot minimizado');
  };

  return (
    <div>
      <Chatbot
        onClose={handleClose}
        onMinimize={handleMinimize}
        maxCharacters={300}
        initialMessage="¡Hola! ¿En qué puedo ayudarte?"
      />
    </div>
  );
}
```

## Componentes

### Chatbot (Principal)
- **Props**: `ChatbotProps`
- **Funcionalidad**: Orquesta todos los subcomponentes
- **Estado**: Maneja apertura/cierre/minimización

### ChatHeader
- **Props**: `onClose`, `onMinimize`, `isMinimized`
- **Funcionalidad**: Logo, título y controles

### ChatBody
- **Props**: `messages`, `options`, `onOptionSelect`, `isLoading`
- **Funcionalidad**: Muestra conversación y opciones

### ChatFooter
- **Props**: `onSendMessage`, `maxCharacters`, `isLoading`
- **Funcionalidad**: Input de texto y envío

### MessageBubble
- **Props**: `message`
- **Funcionalidad**: Renderiza mensajes individuales

### OptionSelector
- **Props**: `options`, `onSelect`
- **Funcionalidad**: Dropdown de opciones

## Hooks

### useChatbot
Hook principal que maneja toda la lógica del chatbot:

```tsx
const {
  state,           // Estado actual
  actions,         // Acciones disponibles
  getCurrentOptions // Obtener opciones actuales
} = useChatbot();
```

**Estado**:
- `isOpen`: Chat abierto/cerrado
- `isMinimized`: Chat minimizado/expandido
- `messages`: Array de mensajes
- `isLoading`: Estado de carga
- `selectedOption`: Opción seleccionada

**Acciones**:
- `openChat()`: Abrir chat
- `closeChat()`: Cerrar chat
- `minimizeChat()`: Minimizar/expandir
- `handleOptionSelect(option)`: Manejar selección
- `handleUserMessage(text)`: Manejar mensaje de usuario

## Personalización

### Agregar Nuevas Opciones
Edita `src/shared/components/chatbot/data/mockResponses.ts`:

```typescript
export const chatOptions: ChatOption[] = [
  // ... opciones existentes
  {
    id: 'nueva-opcion',
    label: 'Nueva Opción',
    value: 'nueva-opcion'
  }
];

export const botResponses: Record<string, BotResponse> = {
  // ... respuestas existentes
  'nueva-opcion': {
    id: 'nueva-opcion-response',
    text: 'Respuesta para nueva opción',
    options: [/* opciones adicionales */]
  }
};
```

### Personalizar Estilos
Los estilos están en Tailwind CSS. Puedes modificar:
- Colores en las clases `bg-*`, `text-*`
- Tamaños en `w-*`, `h-*`, `p-*`, `m-*`
- Animaciones en `transition-*`, `animate-*`

### Cambiar Límite de Caracteres
```tsx
<Chatbot maxCharacters={1000} />
```

## Accesibilidad

- ✅ **Navegación por teclado** completa
- ✅ **Etiquetas ARIA** en todos los elementos interactivos
- ✅ **Contraste** accesible
- ✅ **Focus management** apropiado
- ✅ **Screen reader** compatible

## Responsive

- ✅ **Mobile-first** design
- ✅ **Breakpoints** de Tailwind
- ✅ **Touch-friendly** en móviles
- ✅ **Overflow** manejado correctamente

## Próximas Mejoras

- [ ] **Persistencia** de conversación (localStorage)
- [ ] **Temas** claro/oscuro
- [ ] **Sonidos** de notificación
- [ ] **Integración** con API real
- [ ] **Múltiples idiomas**
- [ ] **Historial** de conversaciones



