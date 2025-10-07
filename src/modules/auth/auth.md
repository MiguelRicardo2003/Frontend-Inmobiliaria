<!-- # Módulo de Autenticación - JustHome

## Descripción

Módulo completo de autenticación que maneja el proceso de inicio de sesión, validación de formularios, gestión de estado de autenticación y redirección segura.

## Características Principales

- **Página de Login Completa**: Diseño responsivo con branding y características del producto
- **Validación de Formularios**: Validación en tiempo real con feedback visual
- **Gestión de Estado**: Integración con Zustand para persistencia de sesión
- **Seguridad**: Encriptación de tokens y manejo seguro de credenciales
- **UX Optimizada**: Estados de carga, manejo de errores y feedback inmediato

## Estructura del Módulo

```
src/modules/auth/
├── components/              # Componentes del módulo
│   ├── FormLogin.tsx       # Formulario de inicio de sesión
│   └── __tests__/          # Tests de componentes
│       └── FormLogin.test.tsx
├── hooks/                  # Hooks personalizados
│   ├── useAuth.ts         # Hook principal de autenticación
│   ├── useFormLogin.ts    # Hook de validación de formulario
│   └── __tests__/         # Tests de hooks
│       ├── useAuth.test.ts
│       └── useFormLogin.test.ts
├── pages/                  # Páginas del módulo
│   └── auth.module.tsx    # Página principal de login
├── services/              # Servicios del módulo
│   ├── auth.services.ts   # Servicios de API
│   └── __tests__/         # Tests de servicios
│       └── auth.services.test.ts
├── types/                 # Tipos del módulo
│   └── Auth.types.ts      # Interfaces y tipos
├── useAuth.ts            # Hook legacy (por compatibilidad)
└── auth.md              # Documentación (este archivo)
```

## Componentes Principales

### FormLogin - Formulario de Inicio de Sesión

Componente que renderiza el formulario de login con validación en tiempo real.

#### Props

```typescript
interface FormLoginProps {
  formLoginData: LoginFormData;
  isLoading: boolean;
  setFormLoginData: (data: LoginFormData) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showErrors: boolean;
  emailError: string;
  handleInputChange: (field: string, value: string) => void;
}
``` -->
