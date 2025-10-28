# Dashboard de Cliente - Documentación

## 📋 Descripción General

Se ha creado una vista completa para los clientes siguiendo el mismo diseño y estructura del dashboard administrativo. Los clientes tienen su propio espacio personalizado con funcionalidades específicas.

## 🗂️ Estructura de Archivos

```
Frontend-Inmobiliaria/src/
├── modules/client/
│   ├── dashboard/
│   │   └── ClientHome.jsx          # Dashboard principal del cliente
│   ├── profile/
│   │   └── ClientProfile.jsx       # Perfil y configuración del cliente
│   └── favorites/
│       └── ClientFavorites.jsx     # Propiedades favoritas
├── shared/layouts/
│   └── ClientLayout.jsx            # Layout principal para cliente
└── components/ui/
    └── ClientSidebar.jsx           # Sidebar específico para cliente
```

## 🎯 Funcionalidades Implementadas

### 1. Dashboard del Cliente (`/client/dashboard`)
- **Estadísticas personales:**
  - Mis Favoritos
  - Propiedades Vistas
  - Mensajes
  - Notificaciones
- **Favoritos recientes:** Muestra las últimas propiedades guardadas
- **Notificaciones:** Alertas sobre cambios de precio, nuevos mensajes, etc.
- **Búsqueda rápida:** Filtros para buscar propiedades por ubicación, tipo y precio

### 2. Mi Perfil (`/client/profile`)
- **Información personal:**
  - Nombre y apellido
  - Correo electrónico
  - Teléfono
  - Dirección completa
- **Foto de perfil:** Subida y visualización de imagen
- **Estadísticas:** Propiedades favoritas, vistas y búsquedas guardadas
- **Seguridad:** Opción para cambiar contraseña
- **Modo edición:** Permite actualizar todos los datos personales

### 3. Mis Favoritos (`/client/favorites`)
- **Lista de propiedades guardadas**
- **Búsqueda y filtros:**
  - Por título o ubicación
  - Por tipo de propiedad
- **Información detallada de cada propiedad:**
  - Imagen
  - Ubicación
  - Precio
  - Habitaciones, baños, área
  - Estado (Venta/Alquiler)
  - Fecha en que se agregó a favoritos
- **Acciones:**
  - Ver detalles
  - Eliminar de favoritos

## 🎨 Diseño y Estilo

- **Consistencia:** Mismo diseño que el dashboard administrativo
- **Tema claro/oscuro:** Soporte completo para dark mode
- **Responsivo:** Optimizado para móvil, tablet y desktop
- **Iconos:** Lucide React para una experiencia visual consistente
- **Colores:**
  - Primario: Azul (#3B82F6)
  - Favoritos: Rojo (#EF4444)
  - Notificaciones: Amarillo (#EAB308)

## 🔐 Sistema de Autenticación y Roles

### Roles del Sistema:
1. **Administrador** → `/dashboard` (Dashboard admin)
2. **Agente** → `/dashboard` (Dashboard admin)
3. **Cliente** → `/client/dashboard` (Dashboard cliente)

### Rutas Protegidas:
```javascript
// Rutas de Cliente (requieren rol "Cliente")
/client/dashboard       # Dashboard principal
/client/profile         # Mi perfil
/client/favorites       # Mis favoritos
/client/properties      # Explorar propiedades (pendiente)
/client/messages        # Mensajes (pendiente)
/client/notifications   # Notificaciones (pendiente)
/client/settings        # Configuración (pendiente)
/client/help            # Ayuda (pendiente)
```

## 🚀 Cómo Usar

### 1. Registro de Cliente:
```
1. Ir a /register
2. Completar formulario
3. El usuario se crea automáticamente con rol "Cliente"
4. Login automático y redirección a /client/dashboard
```

### 2. Login como Cliente:
```
1. Ir a /login
2. Ingresar credenciales
3. Si el rol es "Cliente", redirige a /client/dashboard
4. Si el rol es "Administrador" o "Agente", redirige a /dashboard
```

## 📱 Menú del Cliente (Sidebar)

### Menu Principal:
- 🏠 Mi Inicio
- 🏢 Explorar Propiedades
- ❤️ Mis Favoritos
- 💬 Mensajes
- 🔔 Notificaciones

### Mi Cuenta:
- 👤 Mi Perfil
- ⚙️ Configuración
- ❓ Ayuda

## 🔄 Flujo de Usuario Cliente

```mermaid
graph TD
    A[Registro/Login] --> B{¿Rol?}
    B -->|Cliente| C[/client/dashboard]
    B -->|Admin/Agente| D[/dashboard]
    C --> E[Ver Dashboard]
    C --> F[Editar Perfil]
    C --> G[Ver Favoritos]
    E --> H[Buscar Propiedades]
    G --> I[Gestionar Favoritos]
    F --> J[Actualizar Datos]
```

## 🛠️ Funcionalidades Pendientes

Las siguientes rutas están definidas pero pendientes de implementación:
- ✅ `/client/dashboard` - **Completado**
- ✅ `/client/profile` - **Completado**
- ✅ `/client/favorites` - **Completado**
- ⏳ `/client/properties` - Explorar propiedades
- ⏳ `/client/messages` - Sistema de mensajería
- ⏳ `/client/notifications` - Centro de notificaciones
- ⏳ `/client/settings` - Configuración avanzada
- ⏳ `/client/help` - Centro de ayuda

## 📝 Notas Técnicas

### Componentes Reutilizables:
- `StatCard`: Tarjetas de estadísticas
- `Card`: Contenedor genérico
- `Button`: Botones con variantes
- `Input`: Campos de formulario
- `NavItem`: Items del menú lateral

### Datos de Ejemplo:
Actualmente, las vistas usan datos de ejemplo (mock data). Para conectar con el backend:

1. **Dashboard:** Conectar estadísticas reales del usuario
2. **Perfil:** Integrar API de actualización de usuario
3. **Favoritos:** Conectar con el sistema de favoritos del backend

### Estado Global:
El sistema usa `useAuth()` para acceder al usuario actual:
```javascript
const { user } = useAuth();
// user.nombre, user.correo, user.rol, etc.
```

## 🎯 Próximos Pasos

1. **Backend:**
   - API para favoritos de propiedades
   - API para actualizar perfil de usuario
   - Sistema de notificaciones

2. **Frontend:**
   - Implementar exploración de propiedades
   - Sistema de mensajería con agentes
   - Centro de notificaciones en tiempo real
   - Búsquedas guardadas

3. **Mejoras:**
   - Subida real de imágenes de perfil
   - Validaciones de formularios
   - Mensajes de éxito/error con Toast
   - Animaciones y transiciones

## 🐛 Solución de Problemas

### El cliente no puede acceder al dashboard:
1. Verificar que el usuario tenga rol "Cliente" en la BD
2. Verificar que el token JWT incluya el rol correcto
3. Revisar `ProtectedRoute` en las rutas

### Las rutas no funcionan:
1. Verificar que las importaciones en `PrivateRoutes.jsx` sean correctas
2. Asegurarse de que `ClientLayout` esté bien configurado
3. Revisar la consola del navegador para errores

### El diseño no se ve bien:
1. Verificar que Tailwind CSS esté configurado correctamente
2. Asegurarse de que los iconos de Lucide React estén instalados
3. Revisar el tema claro/oscuro

## 📚 Referencias

- **Diseño base:** Dashboard Administrativo
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router v6](https://reactrouter.com/)

---

✅ **Sistema de Dashboard de Cliente implementado y listo para usar**
