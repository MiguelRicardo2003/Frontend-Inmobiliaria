# Componentes UI Generales

Este directorio contiene todos los componentes de interfaz de usuario generales que pueden ser utilizados en toda la aplicación.

## Componentes Disponibles

### 🎨 **Componentes Básicos**
- **`Button.jsx`** - Botón con múltiples variantes y tamaños
- **`Card.jsx`** - Tarjeta con subcomponentes (Header, Content, Footer)
- **`Input.jsx`** - Campo de entrada de texto
- **`Select.jsx`** - Selector desplegable
- **`Modal.jsx`** - Modal/ventana emergente
- **`Pagination.jsx`** - Paginación

### 📊 **Componentes de Datos**
- **`StatCard.jsx`** - Tarjeta de estadísticas con iconos y tendencias


### 🖼️ **Componentes de Medios**
- **`ImageUpload.jsx`** - Carga de imágenes

### 🧭 **Componentes de Navegación**
- **`Header.jsx`** - Encabezado de página
- **`Footer.jsx`** - Pie de página
- **`SidebarDashboard.jsx`** - Barra lateral del dashboard
- **`NavItem.jsx`** - Elemento de navegación

## Migración desde Componentes Admin

### ❌ **Eliminados**
Se eliminó la carpeta `Admin/` que contenía componentes específicos:
- `CardAdmin.jsx` → Reemplazado por `Card.jsx` general
- `ButtonAdmin.jsx` → Reemplazado por `Button.jsx` general
- `StatCard.jsx` → Reemplazado por `StatCard.jsx` general


### ✅ **Beneficios de la Migración**
1. **Consistencia**: Todos los componentes usan el mismo sistema de diseño
2. **Mantenibilidad**: Un solo lugar para mantener cada componente
3. **Reutilización**: Los componentes pueden usarse en cualquier parte de la aplicación
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades sin duplicar código

## Uso de los Componentes

### Button
```jsx
import Button from '../../components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Hacer clic
</Button>
```

### Card
```jsx
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card';

<Card>
  <CardHeader>Título</CardHeader>
  <CardContent>Contenido</CardContent>
  <CardFooter>Pie</CardFooter>
</Card>
```

### StatCard
```jsx
import StatCard from '../../components/ui/StatCard';
import { Users } from 'lucide-react';

<StatCard 
  title="Usuarios Totales"
  value="1,234"
  icon={<Users />}
  variant="success"
  trend={{ isPositive: true, value: 12 }}
/>
```



## Variantes Disponibles

### Button Variants
- `primary` - Azul principal
- `secondary` - Gris secundario
- `success` - Verde de éxito
- `danger` - Rojo de peligro
- `warning` - Amarillo de advertencia
- `info` - Azul cielo informativo
- `outline` - Contorno
- `ghost` - Fantasma

### StatCard Variants
- `default` - Azul por defecto
- `success` - Verde de éxito
- `warning` - Amarillo de advertencia
- `danger` - Rojo de peligro
- `info` - Azul cielo informativo

## Notas Importantes

- **Diseño Consistente**: Todos los componentes siguen el mismo sistema de diseño
- **Dark Mode**: Soporte completo para modo oscuro
- **Responsive**: Diseño responsivo en todos los componentes
- **Accesibilidad**: Componentes accesibles con ARIA labels y focus management
- **TypeScript**: Preparados para migración a TypeScript si es necesario

## Archivos Actualizados

Los siguientes archivos fueron actualizados para usar componentes generales:

### Dashboard Admin
- `Properties.jsx` - Usa `Card` general en lugar de `CardAdmin`
- `Home/Home.jsx` - Usa `StatCard` y `Button` generales
- `Clients/Clients.jsx` - Usa `Button` general
- `Analytics/Analytics.jsx` - Usa `StatCard` general

### Componentes de Properties
- `Statistics.jsx` - Usa `Card` general

### Componentes de Home
- `TasksList.jsx` - Usa `Card` y `Button` generales
- `RecentActivity.jsx` - Usa `Card` general
- `ActivityChart.jsx` - Usa `Card` general

### Componentes de Clients
- `UserStatsCards.jsx` - Usa `Card` general
- `CreateUserModal.jsx` - Usa `Button` general
- `EditUserModal.jsx` - Usa `Button` general

Esta migración asegura que toda la aplicación use un sistema de componentes consistente y mantenible. 