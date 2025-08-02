# Implementación de Autenticación JWT

Esta implementación proporciona un sistema completo de autenticación JWT para la aplicación React de la inmobiliaria.

## Arquitectura

### Componentes Principales

1. **AuthContext** (`AuthContext.jsx`)
   - Contexto global para manejar el estado de autenticación
   - Proporciona funciones de login, logout y verificación de permisos
   - Maneja el almacenamiento seguro de tokens en cookies

2. **AuthService** (`authService.js`)
   - Servicio para manejar todas las llamadas a la API de autenticación
   - Incluye interceptores para manejar tokens expirados
   - Manejo centralizado de errores

3. **ProtectedRoute** (`ProtectedRoute.jsx`)
   - Componente para proteger rutas que requieren autenticación
   - Soporte para verificación de roles y permisos
   - Redirección automática a login

4. **useAuthForm** (`useAuthForm.js`)
   - Hook personalizado para manejar formularios de autenticación
   - Validación de campos en tiempo real
   - Manejo de estados de carga y errores

## Características

### 🔐 Seguridad
- Tokens JWT almacenados en cookies seguras
- Verificación automática de expiración de tokens
- Refresh automático de tokens
- Protección CSRF con SameSite cookies

### 🎯 Funcionalidades
- Login/Logout
- Registro de usuarios
- Recuperación de contraseña
- Verificación de roles y permisos
- Protección de rutas
- Validación de formularios

### 🛠️ Utilidades
- `JWTUtils` para manejo de tokens
- Validación de fortaleza de contraseñas
- Manejo de errores centralizado
- Interceptores de axios

## Uso

### Configuración Inicial

1. **Envolver la aplicación con AuthProvider**:
```jsx
import { AuthProvider } from './core/store/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRoutes} />
    </AuthProvider>
  );
}
```

2. **Proteger rutas**:
```jsx
import ProtectedRoute from './core/components/ProtectedRoute';

// Ruta protegida básica
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Ruta con rol específico
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>

// Ruta con permisos específicos
<ProtectedRoute requiredPermissions={['read:users', 'write:users']}>
  <UserManagement />
</ProtectedRoute>
```

### Uso en Componentes

```jsx
import { useAuth } from './core/store/AuthContext';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    hasRole, 
    hasPermission 
  } = useAuth();

  // Verificar autenticación
  if (!isAuthenticated) {
    return <div>Por favor inicia sesión</div>;
  }

  // Verificar rol
  if (hasRole('admin')) {
    return <AdminContent />;
  }

  // Verificar permisos
  if (hasPermission('read:properties')) {
    return <PropertyList />;
  }

  return <RegularContent />;
}
```

### Formularios de Autenticación

```jsx
import { useAuthForm } from './hooks/useAuthForm';

function LoginForm() {
  const { 
    formData, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleSubmit 
  } = useAuthForm('login');

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
```

## Configuración de la API

### Endpoints Requeridos

El servicio de autenticación espera los siguientes endpoints:

```javascript
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  PROFILE: '/auth/profile',
  UPDATE_PROFILE: '/auth/profile/update',
  CHANGE_PASSWORD: '/auth/change-password'
};
```

### Formato de Respuesta Esperado

```javascript
// Login exitoso
{
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: 1,
    email: "usuario@email.com",
    name: "Usuario Demo",
    role: "admin",
    permissions: ["read:users", "write:users"]
  }
}

// Error
{
  success: false,
  message: "Credenciales inválidas"
}
```

## Variables de Entorno

Configura las siguientes variables de entorno:

```env
VITE_API_URL=http://localhost:8000/api
VITE_JWT_SECRET=your-jwt-secret
VITE_COOKIE_DOMAIN=localhost
```

## Seguridad

### Mejores Prácticas Implementadas

1. **Almacenamiento Seguro**: Tokens almacenados en cookies httpOnly
2. **Expiración**: Verificación automática de expiración de tokens
3. **Refresh**: Renovación automática de tokens antes de expirar
4. **CSRF Protection**: Cookies configuradas con SameSite
5. **Validación**: Validación de entrada en formularios
6. **Sanitización**: Limpieza de datos de entrada

### Configuración de Cookies

```javascript
Cookies.set('authToken', token, { 
  expires: 7,           // 7 días
  secure: true,         // Solo HTTPS
  sameSite: 'strict'    // Protección CSRF
});
```

## Testing

### Tokens de Prueba

Para desarrollo, puedes usar `JWTUtils.createMockToken()`:

```javascript
import JWTUtils from './core/utils/jwtUtils';

const mockToken = JWTUtils.createMockToken({
  id: 1,
  email: 'test@example.com',
  role: 'admin'
}, 3600); // Expira en 1 hora
```

### Verificación de Tokens

```javascript
// Verificar validez
const isValid = JWTUtils.isTokenValid(token);

// Obtener información del usuario
const user = JWTUtils.getUserFromToken(token);

// Verificar tiempo restante
const timeRemaining = JWTUtils.getFormattedTimeRemaining(token);
```

## Troubleshooting

### Problemas Comunes

1. **Token expirado**: El sistema automáticamente redirige al login
2. **Error de CORS**: Verificar configuración del servidor
3. **Cookies no se guardan**: Verificar dominio y configuración HTTPS
4. **Refresh falla**: Verificar endpoint de refresh en el servidor

### Debug

Habilita logs detallados en desarrollo:

```javascript
// En AuthContext.jsx
if (process.env.NODE_ENV === 'development') {
  console.log('Auth state:', state);
}
```

## Contribución

Para agregar nuevas funcionalidades:

1. Extender `AuthContext` con nuevos métodos
2. Agregar endpoints en `authService.js`
3. Actualizar tipos y validaciones
4. Agregar tests correspondientes

## Licencia

Este código es parte del proyecto Frontend-Inmobiliaria y está sujeto a los términos de licencia del proyecto. 