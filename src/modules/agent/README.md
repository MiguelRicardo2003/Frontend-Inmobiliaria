# Módulo de Agente Inmobiliario

Este módulo contiene toda la funcionalidad para el rol de **Agente Inmobiliario** en el sistema.

## Estructura del Módulo

```
agent/
├── dashboard/
│   ├── services/
│   │   └── agentService.js      # Servicio de API para el agente
│   └── AgentDashboard.jsx       # Dashboard principal del agente
├── properties/
│   ├── AgentProperties.jsx      # Listado de propiedades del agente
│   └── PropertyForm.jsx         # Formulario para crear/editar propiedades
├── customers/
│   └── AgentCustomers.jsx       # Listado de clientes
├── sales/
│   ├── AgentSales.jsx           # Listado de ventas
│   └── SaleForm.jsx             # Formulario para registrar ventas
└── rentals/
    ├── AgentRentals.jsx         # Listado de arriendos
    └── RentalForm.jsx           # Formulario para crear arriendos
```

## Funcionalidades Principales

### 1. Dashboard (`/agent/dashboard`)
- **Estadísticas en tiempo real**:
  - Total de propiedades gestionadas
  - Propiedades activas y pendientes
  - Total de clientes
  - Ventas realizadas
  - Arriendos activos
- **Acciones rápidas** para agregar propiedades, registrar ventas y crear arriendos
- **Actividad reciente** del agente
- **Estado de propiedades** con contadores visuales

### 2. Gestión de Propiedades (`/agent/properties`)
- **Listado completo** de todas las propiedades del agente
- **Búsqueda** por nombre, dirección o descripción
- **Filtros** por estado (Disponible, Vendida, Arrendada, Reservada)
- **Acciones**:
  - Ver detalles de la propiedad
  - Editar información
  - Eliminar propiedad
- **Crear nueva propiedad** (`/agent/properties/new`)
- **Editar propiedad** (`/agent/properties/:id/edit`)

#### Formulario de Propiedad
Campos disponibles:
- Nombre de la propiedad
- Descripción
- Dirección
- Tipo de propiedad (catálogo)
- Estado (catálogo)
- Precio (CLP)
- Superficie (m²)
- Número de habitaciones
- Número de baños
- URL de imagen

### 3. Gestión de Clientes (`/agent/customers`)
- **Listado de todos los clientes** (solo rol Cliente, no muestra administradores ni agentes)
- **Búsqueda** por nombre, email o teléfono
- **Información mostrada**:
  - Nombre completo
  - Email
  - Teléfono
  - Fecha de registro
- **Acciones**:
  - Contactar por email

### 4. Gestión de Ventas (`/agent/sales`)
- **Listado de todas las ventas** realizadas
- **Información de cada venta**:
  - Propiedad vendida
  - Cliente comprador
  - Fecha de venta
  - Precio de venta
- **Registrar nueva venta** (`/agent/sales/new`)

#### Formulario de Venta
Campos disponibles:
- Selección de propiedad (solo disponibles)
- Selección de cliente
- Precio de venta (se autocompleta con el precio de la propiedad)
- Fecha de venta
- Observaciones

### 5. Gestión de Arriendos (`/agent/rentals`)
- **Estadísticas**:
  - Arriendos activos
  - Total de arriendos
  - Arriendos finalizados
- **Listado de todos los arriendos**
- **Estado visual** (Activo/Finalizado)
- **Información de cada arriendo**:
  - Propiedad arrendada
  - Arrendatario
  - Fecha de inicio y fin
  - Monto mensual
- **Crear nuevo arriendo** (`/agent/rentals/new`)

#### Formulario de Arriendo
Campos disponibles:
- Selección de propiedad (solo disponibles)
- Selección de cliente (arrendatario)
- Monto mensual (se autocompleta con el precio de la propiedad)
- Depósito de garantía (sugerencia: 1 mes)
- Fecha de inicio
- Fecha de fin (opcional, puede ser indefinido)
- Día de pago del mes (1-31)
- Observaciones

### 6. Contratos (`/agent/contracts`)
*(Por implementar)*

### 7. Estadísticas (`/agent/stats`)
*(Por implementar)*

### 8. Mi Perfil (`/agent/profile`)
*(Por implementar)*

### 9. Configuración (`/agent/settings`)
*(Por implementar)*

## Servicios de API

### `agentService.js`

El servicio centralizado para todas las operaciones del agente:

#### Dashboard
- `getDashboardStats()`: Obtiene estadísticas del dashboard

#### Propiedades
- `getProperties(filters)`: Lista propiedades con filtros opcionales
- `getPropertyById(id)`: Obtiene una propiedad por ID
- `createProperty(propertyData)`: Crea una nueva propiedad
- `updateProperty(id, propertyData)`: Actualiza una propiedad
- `deleteProperty(id)`: Elimina una propiedad

#### Clientes
- `getCustomers()`: Obtiene todos los clientes (solo rol Cliente)

#### Ventas
- `getSales()`: Lista todas las ventas
- `createSale(saleData)`: Registra una nueva venta

#### Arriendos
- `getRentals()`: Lista todos los arriendos
- `createRental(rentalData)`: Crea un nuevo arriendo

#### Contratos
- `getContracts()`: Lista todos los contratos
- `createContract(contractData)`: Crea un nuevo contrato

## Rutas Protegidas

Todas las rutas del agente están protegidas con el rol **"Agente"**:

```jsx
<ProtectedRoute requiredRole="Agente">
  <AgentLayout />
</ProtectedRoute>
```

## Componentes Reutilizados

El módulo del agente reutiliza componentes existentes:
- `StatCard`: Tarjetas de estadísticas
- `Button`: Botones del sistema
- `Input`: Campos de entrada
- `Card`, `CardContent`, `CardHeader`: Componentes de tarjeta
- `Modal`: Diálogos modales
- `NavItem`: Items de navegación

## Sidebar del Agente

`AgentSidebar.jsx` incluye:
- **Panel Principal**:
  - Dashboard
  - Mis Propiedades
  - Clientes
- **Transacciones**:
  - Ventas
  - Arriendos
  - Contratos
- **Cuenta**:
  - Mis Estadísticas
  - Mi Perfil
  - Configuración

## Layout del Agente

`AgentLayout.jsx` proporciona:
- Header común con toggle de sidebar
- Sidebar específico del agente
- Área de contenido con padding y scroll

## Flujo de Login

Al iniciar sesión, el sistema redirige según el rol:
- **Administrador** → `/dashboard`
- **Agente** → `/agent/dashboard`
- **Cliente** → `/client/dashboard`

## Endpoints del Backend Utilizados

- `GET /propiedades` - Listar propiedades
- `GET /propiedades/:id` - Obtener propiedad
- `POST /propiedades` - Crear propiedad
- `PUT /propiedades/:id` - Actualizar propiedad
- `DELETE /propiedades/:id` - Eliminar propiedad
- `GET /usuarios` - Listar usuarios (filtrado por rol Cliente)
- `GET /ventas` - Listar ventas
- `POST /ventas` - Crear venta
- `GET /arriendos` - Listar arriendos
- `POST /arriendos` - Crear arriendo
- `GET /contratos` - Listar contratos
- `POST /contratos` - Crear contrato
- `GET /tipos-propiedad` - Catálogo de tipos de propiedad
- `GET /estados-propiedad` - Catálogo de estados de propiedad

## Estados de Propiedad

1. **Disponible** (ID: 1) - Propiedad disponible para venta/arriendo
2. **Vendida** (ID: 2) - Propiedad vendida
3. **Arrendada** (ID: 3) - Propiedad en arriendo
4. **Reservada** (ID: 4) - Propiedad reservada

## Próximas Mejoras

- [ ] Implementar módulo de contratos completo
- [ ] Agregar estadísticas avanzadas del agente
- [ ] Implementar perfil editable del agente
- [ ] Agregar notificaciones en tiempo real
- [ ] Implementar chat con clientes
- [ ] Agregar calendario de citas
- [ ] Implementar reportes exportables
- [ ] Agregar galería de imágenes para propiedades
- [ ] Implementar sistema de comisiones
- [ ] Agregar seguimiento de visitas a propiedades
