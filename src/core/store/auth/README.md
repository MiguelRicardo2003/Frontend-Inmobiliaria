# Sistema de Autenticación

Este sistema de autenticación está diseñado para ser escalable, seguro y fácil de usar. Incluye manejo de tokens JWT, refresh tokens, permisos granulares y protección de rutas.

## 🏗️ Arquitectura

```
src/core/store/auth/
├── AuthProvider.jsx      # Proveedor principal del contexto
├── authReducer.js        # Reducer para manejo de estado
├── authUtils.js          # Utilidades para manejo de tokens
├── useAuth.js           # Hook personalizado
└── README.md            # Esta documentación

src/core/services/
└── authService.js       # Servicio para comunicación con API

src/core/components/
└── ProtectedRoute.jsx   # Componente para proteger rutas
```

## 🚀 Características

### ✅ Implementadas
- ✅ Autenticación con JWT
- ✅ Refresh tokens automático
- ✅ Manejo de permisos granulares
- ✅ Protección de rutas
- ✅ Interceptores de axios
- ✅ Manejo de errores robusto
- ✅ Modo desarrollo con mock
- ✅ Cookies seguras
- ✅ Verificación de expiración de tokens

### 🔄 Escalabilidad
- 🔄 Múltiples roles de usuario
- 🔄 Permisos granulares
- 🔄 Refresh tokens automático
- 🔄 Cola de peticiones fallidas
- 🔄 Interceptores configurables

## 📖 Uso

### 1. Configurar el Provider

```jsx
// App.jsx
import { AuthProvider } from './core/store/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      {/* Tu aplicación aquí */}
    </AuthProvider>
  );
}
```

### 2. Usar el Hook

```jsx
import useAuth from './core/store/auth/useAuth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    hasRole, 
    hasPermission 
  } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await login({
        email: 'user@example.com',
        password: 'password'
      });
      
      if (result.success) {
        // Login exitoso
      }
    } catch (error) {
      // Manejar error
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bienvenido, {user.name}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
    </div>
  );
}
```

### 3. Proteger Rutas

```jsx
import ProtectedRoute from './core/components/ProtectedRoute';

// Ruta básica protegida
<ProtectedRoute>
  <AdminDashboard />
</ProtectedRoute>

// Ruta con rol específico
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>

// Ruta con permisos específicos (todos requeridos)
<ProtectedRoute requiredPermissions={['ver-propiedades', 'editar-propiedades']}>
  <PropertyManager />
</ProtectedRoute>

// Ruta con permisos específicos (al menos uno requerido)
<ProtectedRoute requiredAnyPermission={['ver-propiedades', 'ver-clientes']}>
  <Dashboard />
</ProtectedRoute>

// Ruta con componente personalizado para acceso denegado
<ProtectedRoute 
  requiredRole="admin"
  fallbackComponent={<CustomAccessDenied />}
>
  <AdminDashboard />
</ProtectedRoute>
```

## 🔐 Permisos y Roles

### Roles Disponibles
- `admin` - Acceso completo
- `agent` - Agente inmobiliario
- `user` - Usuario básico

### Permisos Disponibles
- `ver-propiedades` - Ver propiedades
- `editar-propiedades` - Editar propiedades
- `crear-propiedades` - Crear propiedades
- `eliminar-propiedades` - Eliminar propiedades
- `ver-clientes` - Ver clientes
- `editar-clientes` - Editar clientes
- `crear-clientes` - Crear clientes
- `eliminar-clientes` - Eliminar clientes

### Verificar Permisos

```jsx
const { hasPermission, hasRole, hasAnyPermission, hasAllPermissions } = useAuth();

// Verificar un permiso específico
if (hasPermission('editar-propiedades')) {
  // Mostrar botón de editar
}

// Verificar un rol específico
if (hasRole('admin')) {
  // Mostrar funcionalidades de admin
}

// Verificar múltiples permisos (al menos uno)
if (hasAnyPermission(['ver-propiedades', 'ver-clientes'])) {
  // Mostrar dashboard
}

// Verificar múltiples permisos (todos requeridos)
if (hasAllPermissions(['ver-propiedades', 'editar-propiedades'])) {
  // Mostrar editor completo
}
```

## 🔧 Configuración

### Variables de Entorno

```env
REACT_APP_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Configuración de Cookies

```javascript
// authUtils.js
const COOKIE_CONFIG = {
  expires: 7, // 7 días
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/'
};
```

### Configuración de Tokens

```javascript
// authUtils.js
const TOKEN_CONFIG = {
  ACCESS_TOKEN_KEY: 'authToken',
  REFRESH_TOKEN_KEY: 'refreshToken',
  TOKEN_EXPIRY_BUFFER: 5 * 60 // 5 minutos de buffer
};
```

## 🛡️ Seguridad

### Características de Seguridad
- ✅ Tokens JWT con expiración
- ✅ Refresh tokens automático
- ✅ Cookies seguras (httpOnly en producción)
- ✅ Validación de tokens en cada petición
- ✅ Limpieza automática de tokens expirados
- ✅ Protección CSRF con sameSite
- ✅ Manejo seguro de errores

### Buenas Prácticas
1. **Nunca almacenar tokens en localStorage** (excepto para desarrollo)
2. **Usar cookies seguras** en producción
3. **Validar permisos en el frontend y backend**
4. **Implementar rate limiting** en el backend
5. **Usar HTTPS** en producción
6. **Rotar refresh tokens** regularmente

## 🧪 Desarrollo

### Modo Mock
Para desarrollo, el sistema incluye un modo mock que permite probar sin backend:

```javascript
// Credenciales de prueba
email: 'demo@email.com'
password: 'demo123'
```

### Testing

```jsx
// Ejemplo de test
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './AuthProvider';
import useAuth from './useAuth';

function TestComponent() {
  const { isAuthenticated } = useAuth();
  return <div>{isAuthenticated ? 'Autenticado' : 'No autenticado'}</div>;
}

test('should show authentication status', () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
  
  expect(screen.getByText('No autenticado')).toBeInTheDocument();
});
```

## 🚨 Manejo de Errores

### Errores Comunes
- `401` - Token expirado o inválido
- `403` - Permisos insuficientes
- `404` - Recurso no encontrado
- `422` - Datos de validación inválidos
- `429` - Demasiadas peticiones
- `500` - Error interno del servidor

### Recuperación Automática
- ✅ Refresh automático de tokens
- ✅ Reintento de peticiones fallidas
- ✅ Redirección automática al login
- ✅ Limpieza de estado en errores

## 📈 Escalabilidad

### Para Añadir Nuevos Roles
1. Actualizar el enum de roles en el backend
2. Añadir permisos específicos del rol
3. Actualizar la documentación

### Para Añadir Nuevos Permisos
1. Definir el permiso en el backend
2. Asignar el permiso a roles específicos
3. Usar el permiso en ProtectedRoute

### Para Personalizar Comportamiento
1. Extender AuthProvider
2. Crear hooks personalizados
3. Implementar middleware personalizado

## 🔄 Migración

### De Sistema Anterior
1. Reemplazar AuthContext.jsx con AuthProvider.jsx
2. Actualizar imports en useAuth.js
3. Migrar configuración de tokens
4. Actualizar ProtectedRoute si es necesario

### A Producción
1. Configurar variables de entorno
2. Habilitar HTTPS
3. Configurar cookies seguras
4. Implementar rate limiting
5. Configurar monitoreo de errores 