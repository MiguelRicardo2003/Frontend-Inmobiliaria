import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ListColumn from './ListColumn';
import SortablePropertyCard from './SortablePropertyCard';
import Button from '../../../../../../components/ui/Button';
import { propertyStates } from '../../constants/formOptions';

const TrelloBoard = ({ 
  properties, 
  onPropertyMove, 
  onPropertyEdit, 
  onPropertyDelete,
  onPropertyDisable,
  onPropertyView,
  onAddProperty 
}) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState(null);

  // Group properties by status
  const groupedProperties = propertyStates.reduce((acc, state) => {
    acc[state.key] = properties.filter(prop => prop.estado === state.key);
    return acc;
  }, {});

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active && over && active.id !== over.id) {
      const activeProperty = properties.find(p => p.id === active.id);
      const targetListId = over.id;

      if (activeProperty && activeProperty.estado !== targetListId) {
        onPropertyMove(activeProperty.id, targetListId);
      }
    }
  };

  const getActiveProperty = () => {
    return properties.find(p => p.id === activeId);
  };

  return (
    <div className="h-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 h-full overflow-x-auto pb-4">
          {propertyStates.map((state) => (
            <ListColumn
              key={state.key}
              id={state.key}
              title={state.label}
              color={state.color}
              properties={groupedProperties[state.key] || []}
              onPropertyEdit={onPropertyEdit}
              onPropertyDelete={onPropertyDelete}
              onPropertyDisable={onPropertyDisable}
              onPropertyView={onPropertyView}
              onAddProperty={() => onAddProperty(state.key)}
            />
          ))}
        </div>

        {/* Drag Overlay */}
        {activeId && (
          <div className="fixed pointer-events-none z-50">
            <SortablePropertyCard property={getActiveProperty()} isDragging />
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default TrelloBoard; 