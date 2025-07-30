# Guía de Módulos - Sistema de Propiedades

Esta guía explica cómo utilizar la nueva estructura modular de componentes en el sistema de gestión de propiedades.

## Estructura Modular Implementada

### 📁 Módulos Creados

```
components/
├── PropertyManagement/    # 🏠 Gestión de Propiedades
├── ProjectManagement/     # 🏢 Gestión de Proyectos/Sedes  
├── TrelloBoard/          # 📋 Tablero Kanban
└── UI/                   # 🎨 Componentes de Interfaz
```

## Uso Práctico de los Módulos

### 1. PropertyManagement - Gestión de Propiedades

**Cuándo usar**: Para cualquier funcionalidad relacionada con propiedades individuales.

```jsx
// Ejemplo: Crear una página de listado de propiedades
import { PropertyTable, PropertyCard } from './components/PropertyManagement';
import { useProperties } from '../hooks/useProperties';

const PropertiesList = () => {
  const { properties } = useProperties();
  
  return (
    <div>
      <PropertyTable properties={properties} />
      {/* O usar cards individuales */}
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
```

### 2. ProjectManagement - Gestión de Proyectos

**Cuándo usar**: Para funcionalidades relacionadas con sedes/proyectos.

```jsx
// Ejemplo: Dashboard de proyectos
import { ProjectCard, ProjectForm } from './components/ProjectManagement';
import { useProjects } from '../hooks/useProjects';

const ProjectsDashboard = () => {
  const { sedes, selectedProjectId } = useProjects();
  
  return (
    <div>
      {sedes.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project}
          isActive={project.id === selectedProjectId}
        />
      ))}
    </div>
  );
};
```

### 3. TrelloBoard - Tablero Kanban

**Cuándo usar**: Para la vista de tablero con drag & drop.

```jsx
// Ejemplo: Vista de tablero Trello
import { TrelloBoard } from './components/TrelloBoard';
import { useProperties } from '../hooks/useProperties';

const TrelloView = () => {
  const { properties, updatePropertyStatus } = useProperties();
  
  return (
    <TrelloBoard 
      properties={properties}
      onPropertyMove={updatePropertyStatus}
    />
  );
};
```

### 4. UI - Componentes de Interfaz

**Cuándo usar**: Para componentes de UI reutilizables.

```jsx
// Ejemplo: Barra de herramientas
import { FilterBar, Statistics, ViewToggle } from './components/UI';

const Toolbar = ({ stats, onFilter, onViewChange }) => {
  return (
    <div className="flex gap-4">
      <Statistics stats={stats} />
      <FilterBar onFilter={onFilter} />
      <ViewToggle onViewChange={onViewChange} />
    </div>
  );
};
```

## Combinando Módulos

### Ejemplo Completo: Página Principal de Propiedades

```jsx
import React, { useState } from 'react';
import { useProperties, useProjects, useFilters } from '../hooks';

// Importaciones modulares
import { PropertyTable, PropertyForm } from './components/PropertyManagement';
import { ProjectCard } from './components/ProjectManagement';
import { TrelloBoard } from './components/TrelloBoard';
import { Statistics, FilterBar, ViewToggle } from './components/UI';

const PropertiesPage = () => {
  const { properties, showPropertyModal, openPropertyModal } = useProperties();
  const { sedes, selectedProjectId } = useProjects();
  const { filterProperties, searchTerm, setSearchTerm } = useFilters();
  
  const [currentView, setCurrentView] = useState('table');
  
  const filteredProperties = filterProperties(properties);
  
  return (
    <div className="p-6">
      {/* Header con estadísticas */}
      <div className="mb-6">
        <Statistics stats={getProjectStats(properties)} />
      </div>
      
      {/* Barra de herramientas */}
      <div className="flex justify-between items-center mb-6">
        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <ViewToggle 
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>
      
      {/* Selector de proyectos */}
      <div className="flex gap-4 mb-6">
        {sedes.map(project => (
          <ProjectCard 
            key={project.id}
            project={project}
            isActive={project.id === selectedProjectId}
          />
        ))}
      </div>
      
      {/* Vista de contenido */}
      {currentView === 'table' ? (
        <PropertyTable properties={filteredProperties} />
      ) : (
        <TrelloBoard properties={filteredProperties} />
      )}
      
      {/* Modal de formulario */}
      {showPropertyModal && (
        <PropertyForm />
      )}
    </div>
  );
};
```

## Ventajas de esta Organización

### ✅ **Escalabilidad**
- Cada módulo puede crecer independientemente
- Nuevos módulos se pueden agregar fácilmente
- No hay dependencias entre módulos

### ✅ **Mantenibilidad**
- Código organizado por responsabilidad
- Fácil localización de componentes
- Testing modular

### ✅ **Rendimiento**
- Importación selectiva de módulos
- Bundle optimization
- Lazy loading posible

### ✅ **Reutilización**
- Módulos portables
- API clara por módulo
- Dependencias mínimas

## Patrones de Importación

### 1. Importación por Módulo (Recomendado)
```jsx
import { PropertyTable, PropertyForm } from './components/PropertyManagement';
```

### 2. Importación Completa
```jsx
import PropertyTable from './components/PropertyManagement/PropertyTable';
import ProjectCard from './components/ProjectManagement/ProjectCard';
import TrelloBoard from './components/TrelloBoard/TrelloBoard';
```

### 3. Importación Directa
```jsx
import PropertyTable from './components/PropertyManagement/PropertyTable';
```

## Agregando Nuevos Componentes

### Paso 1: Identificar el Módulo
```jsx
// ¿Es un componente de propiedad? → PropertyManagement
// ¿Es un componente de proyecto? → ProjectManagement  
// ¿Es del tablero Trello? → TrelloBoard
// ¿Es un componente de UI? → UI
```

### Paso 2: Crear el Componente
```jsx
// PropertyManagement/PropertyGallery.jsx
import React from 'react';

const PropertyGallery = ({ images }) => {
  return <div>Galería de imágenes</div>;
};

export default PropertyGallery;
```

### Paso 3: Agregar al Módulo
```jsx
// PropertyManagement/index.js
export { default as PropertyGallery } from './PropertyGallery';
```

### Paso 4: Usar el Componente
```jsx
import { PropertyGallery } from './components/PropertyManagement';
```

## Notas Importantes

- **Sin Conexiones de Rutas**: Los módulos no están conectados a rutas específicas
- **Independencia**: Cada módulo funciona de manera independiente
- **Flexibilidad**: Los módulos pueden usarse en diferentes contextos
- **Escalabilidad**: Estructura preparada para crecimiento ilimitado

Esta organización modular proporciona una base sólida y escalable para el sistema de gestión de propiedades. 