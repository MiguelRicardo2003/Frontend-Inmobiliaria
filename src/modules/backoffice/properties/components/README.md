# Componentes de Propiedades - Estructura Modular

Este directorio contiene todos los componentes del sistema de gestión de propiedades, organizados en módulos específicos para máxima escalabilidad y mantenibilidad.

## Estructura Modular

### Organización de Módulos

```
components/
├── PropertyManagement/    # Módulo de Gestión de Propiedades
│   ├── PropertyTable.jsx
│   ├── PropertyCard.jsx
│   ├── PropertyForm.jsx
│   ├── PropertyDetail.jsx
│   └── index.js
├── ProjectManagement/     # Módulo de Gestión de Proyectos/Sedes
│   ├── ProjectCard.jsx
│   ├── ProjectForm.jsx
│   ├── ProjectBoard.jsx
│   ├── ProjectsBoard.jsx
│   └── index.js
├── TrelloBoard/          # Módulo del Tablero Trello
│   ├── TrelloBoard.jsx
│   ├── ListColumn.jsx
│   ├── SortablePropertyCard.jsx
│   └── index.js
├── UI/                   # Módulo de Componentes de UI
│   ├── Statistics.jsx
│   ├── FilterBar.jsx
│   ├── ViewToggle.jsx
│   └── index.js
├── index.js              # Exportación principal
└── README.md             # Esta documentación
```

## Módulos Disponibles

### 1. PropertyManagement
**Responsabilidad**: Gestión completa de propiedades individuales

- **PropertyTable** - Vista de tabla para listar propiedades
- **PropertyCard** - Tarjeta individual de propiedad
- **PropertyForm** - Formulario de creación/edición de propiedades
- **PropertyDetail** - Visualización detallada de propiedades

### 2. ProjectManagement
**Responsabilidad**: Gestión de proyectos/sedes y sus configuraciones

- **ProjectCard** - Tarjeta de proyecto/sede
- **ProjectForm** - Formulario de creación/edición de proyectos
- **ProjectBoard** - Tablero específico de proyecto
- **ProjectsBoard** - Vista general de todos los proyectos

### 3. TrelloBoard
**Responsabilidad**: Funcionalidad de tablero kanban con drag & drop

- **TrelloBoard** - Tablero principal de arrastrar y soltar
- **ListColumn** - Columna individual en el tablero
- **SortablePropertyCard** - Tarjeta de propiedad arrastrable

### 4. UI
**Responsabilidad**: Componentes de interfaz reutilizables

- **Statistics** - Visualización de estadísticas
- **FilterBar** - Controles de búsqueda y filtrado
- **ViewToggle** - Alternancia entre vistas

## Uso de los Módulos

### Importación por Módulo (Recomendado)
```jsx
// Importar solo el módulo de propiedades
import { PropertyTable, PropertyForm } from './components/PropertyManagement';

// Importar solo el módulo de proyectos
import { ProjectCard, ProjectForm } from './components/ProjectManagement';

// Importar solo el módulo Trello
import { TrelloBoard, ListColumn } from './components/TrelloBoard';

// Importar solo componentes UI
import { Statistics, FilterBar } from './components/UI';
```

### Importación Completa
```jsx
// Importar todos los componentes
import PropertyTable from './components/PropertyManagement/PropertyTable';
import ProjectCard from './components/ProjectManagement/ProjectCard';
import TrelloBoard from './components/TrelloBoard/TrelloBoard';
import Statistics from './components/UI/Statistics';
```

### Importación Directa
```jsx
// Importación directa de un componente específico
import PropertyTable from './components/PropertyManagement/PropertyTable';
```

## Ventajas de la Estructura Modular

### 1. Escalabilidad Máxima
- **Módulos Independientes**: Cada módulo puede crecer independientemente
- **Responsabilidades Claras**: Cada módulo tiene una función específica
- **Fácil Extensión**: Nuevos módulos se pueden agregar sin afectar los existentes

### 2. Mantenibilidad
- **Código Organizado**: Componentes relacionados están agrupados
- **Fácil Localización**: Encontrar componentes es más sencillo
- **Testing Modular**: Cada módulo puede ser probado independientemente

### 3. Rendimiento
- **Importación Selectiva**: Solo cargar los módulos necesarios
- **Bundle Optimization**: Reducción del tamaño del bundle final
- **Lazy Loading**: Posibilidad de cargar módulos bajo demanda

### 4. Reutilización
- **Módulos Portables**: Los módulos pueden ser reutilizados en otros proyectos
- **Dependencias Mínimas**: Cada módulo tiene sus propias dependencias
- **API Clara**: Cada módulo expone una API bien definida

## Agregando Nuevos Componentes

### 1. Identificar el Módulo Apropiado
Determina a qué módulo pertenece tu nuevo componente:
- **PropertyManagement**: Componentes relacionados con propiedades individuales
- **ProjectManagement**: Componentes relacionados con proyectos/sedes
- **TrelloBoard**: Componentes específicos del tablero kanban
- **UI**: Componentes de interfaz reutilizables

### 2. Crear el Componente en el Módulo
```jsx
// PropertyManagement/NewPropertyComponent.jsx
import React from 'react';

const NewPropertyComponent = ({ prop1, prop2 }) => {
  return <div>Nuevo componente de propiedad</div>;
};

export default NewPropertyComponent;
```

### 3. Agregar al Index del Módulo
```jsx
// PropertyManagement/index.js
export { default as NewPropertyComponent } from './NewPropertyComponent';
```

### 4. Crear un Nuevo Módulo (si es necesario)
Si el componente no encaja en ningún módulo existente:
```jsx
// NuevoModulo/index.js
export { default as NuevoComponente } from './NuevoComponente';
```

Y agregarlo al index principal:
```jsx
// components/index.js
export * from './NuevoModulo';
```

## Mejores Prácticas

1. **Mantén la Modularidad**: Cada componente debe estar en el módulo apropiado
2. **Documenta los Módulos**: Cada módulo debe tener su propia documentación
3. **Usa Importaciones Específicas**: Importa solo los módulos que necesites
4. **Mantén las Dependencias Mínimas**: Cada módulo debe ser lo más independiente posible
5. **Prueba por Módulo**: Escribe pruebas específicas para cada módulo

## Notas Importantes

- **Sin Conexiones de Rutas**: Los módulos no están conectados a rutas específicas
- **Independencia**: Cada módulo puede funcionar de manera independiente
- **Flexibilidad**: Los módulos pueden ser utilizados en diferentes contextos
- **Escalabilidad**: La estructura permite un crecimiento ilimitado y organizado 