# Sistema de Gestión de Propiedades

Este directorio contiene un sistema de gestión de propiedades refactorizado y componentizado con vistas de tabla y tablero Trello.

## Resumen de la Arquitectura

El sistema está organizado en varias capas:

### 1. Hooks Personalizados (`/hooks`)
- **`useProperties.js`** - Gestiona el estado y operaciones de propiedades
- **`useProjects.js`** - Gestiona el estado y operaciones de proyectos/sedes  
- **`useFilters.js`** - Gestiona la funcionalidad de filtrado y búsqueda

### 2. Componentes (`/components`)
- **Componentes Principales:**
  - `PropertyTable.jsx` - Vista de tabla para propiedades
  - `PropertyCard.jsx` - Componente de tarjeta de propiedad individual
  - `ProjectCard.jsx` - Componente de tarjeta de proyecto/sede
  - `Statistics.jsx` - Componente de visualización de estadísticas
  - `FilterBar.jsx` - Controles de búsqueda y filtrado
  - `ViewToggle.jsx` - Alternancia entre vistas de tabla y tablero

- **Componentes de Formulario:**
  - `PropertyForm.jsx` - Formulario de creación/edición de propiedades
  - `ProjectForm.jsx` - Formulario de creación/edición de proyectos
  - `PropertyDetail.jsx` - Visualización de detalles de propiedad

- **Componentes del Tablero Trello:**
  - `TrelloBoard.jsx` - Tablero principal de arrastrar y soltar
  - `ListColumn.jsx` - Columna individual en el tablero
  - `SortablePropertyCard.jsx` - Tarjeta de propiedad arrastrable

### 3. Constantes (`/constants`)
- **`formOptions.js`** - Opciones de formulario, mapeos de estado y reglas de validación

### 4. Utilidades (`/utils`)
- **`propertyUtils.js`** - Funciones auxiliares para operaciones de propiedades

## Características Principales

### 🏢 Gestión de Proyectos
- Crear y gestionar múltiples proyectos/sedes
- Cada proyecto contiene sus propias propiedades
- Estadísticas y resumen del proyecto

### 📊 Sistema de Vista Dual
- **Vista de Tabla**: Tabla tradicional con ordenamiento y filtrado
- **Vista de Tablero**: Tablero kanban de arrastrar y soltar para gestión visual

### 🔍 Filtrado Avanzado
- Búsqueda por nombre de propiedad, dirección o código
- Filtrado por estado (disponible, vendida, arrendada, etc.)
- Funcionalidad de limpiar filtros

### 📝 Gestión de Propiedades
- Crear, editar y eliminar propiedades
- Formularios de propiedades ricos con validación
- Soporte para carga de imágenes
- Gestión de amenidades
- Seguimiento de información del propietario

### 🎯 Gestión de Estados
- Indicadores de estado visuales
- Cambios de estado por arrastrar y soltar en vista de tablero
- Filtrado basado en estado

## Uso

### Implementación Básica

```jsx
import PropertiesRefactored from './PropertiesRefactored';

function App() {
  return <PropertiesRefactored />;
}
```

### Usando Componentes Individuales

```jsx
import PropertyTable from './components/PropertyManagement/PropertyTable';
import PropertyForm from './components/PropertyManagement/PropertyForm';
import Statistics from './components/UI/Statistics';
import { useProperties, useProjects } from './hooks';

function CustomPropertiesPage() {
  const { properties, openPropertyModal } = useProperties();
  const { getSelectedProject } = useProjects();
  
  return (
    <div>
      <Statistics stats={getProjectStatistics(getSelectedProject())} />
      <PropertyTable properties={properties} onEdit={openPropertyModal} />
    </div>
  );
}
```

### Usando Hooks Personalizados

```jsx
import { useProperties, useFilters } from './hooks';

function MyComponent() {
  const { properties, addProperty } = useProperties();
  const { filterProperties, searchTerm } = useFilters();
  
  const filteredProperties = filterProperties(properties);
  
  return (
    <div>
      <input 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      {filteredProperties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

## Estructura de Datos

### Objeto Propiedad
```javascript
{
  id: number,
  codigo: string,
  titulo: string,
  descripcion: string,
  tipo: 'casa' | 'apartamento' | 'oficina' | 'local' | 'terreno' | 'bodega',
  operacion: 'venta' | 'alquiler',
  precio: number,
  moneda: 'USD' | 'EUR' | 'COP' | 'MXN',
  estado: 'disponible' | 'reservada' | 'vendida' | 'alquilada' | 'en_proceso' | 'deshabilitada',
  ubicacion: {
    direccion: string,
    ciudad: string,
    departamento: string,
    codigoPostal: string
  },
  caracteristicas: {
    superficie: number,
    habitaciones: number,
    banos: number,
    garajes: number,
    antiguedad: number,
    estrato: number
  },
  amenidades: string[],
  imagenes: Array<{url: string, descripcion: string, principal: boolean}>,
  propietario: {
    nombre: string,
    telefono: string,
    email: string
  }
}
```

### Objeto Proyecto
```javascript
{
  id: number,
  nombre: string,
  ciudad: string,
  direccion: string,
  responsable: string,
  propiedades: Property[]
}
```

## Estilos

El sistema utiliza Tailwind CSS con un sistema de diseño consistente:

- **Colores Principales**: Tema basado en azul con `primary-500` como color principal
- **Colores de Estado**: Verde (disponible), Amarillo (en proceso), Azul (arrendada), Gris (vendida)
- **Modo Oscuro**: Soporte completo para modo oscuro con prefijos `dark:`
- **Responsivo**: Diseño responsivo mobile-first

## Dependencias

- **React** - Framework principal
- **@dnd-kit/core** - Funcionalidad de arrastrar y soltar
- **@dnd-kit/sortable** - Arrastrar y soltar ordenable
- **lucide-react** - Iconos
- **Tailwind CSS** - Estilos

## Migración desde el Sistema Anterior

El archivo anterior `Properties.jsx` ha sido refactorizado en:

1. **Separación de Lógica**: Toda la lógica de negocio movida a hooks personalizados
2. **Descomposición de Componentes**: Componente grande dividido en componentes más pequeños y enfocados
3. **Reutilización**: Los componentes pueden usarse independientemente
4. **Mantenibilidad**: Clara separación de responsabilidades
5. **Seguridad de Tipos**: Mejor validación de props y manejo de errores

Para migrar desde el sistema anterior, reemplaza la importación:

```jsx
// Anterior
import Properties from './Properties';

// Nuevo
import PropertiesRefactored from './PropertiesRefactored';
```

## Mejoras Futuras

- [ ] Integración de API para persistencia de datos real
- [ ] Funciones de colaboración en tiempo real
- [ ] Reportes avanzados y análisis
- [ ] Operaciones masivas (importar/exportar)
- [ ] Búsqueda avanzada con filtros
- [ ] Funciones de comparación de propiedades
- [ ] Integración de calendario para visitas
- [ ] Notificaciones por email
- [ ] Soporte para aplicación móvil 