import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropertyCard from '../PropertyManagement/PropertyCard';

const SortablePropertyCard = ({ property, listId, onEdit, onDelete, onDisable, onView, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: property.id,
    data: { listId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'z-50' : ''}`}
    >
      <PropertyCard
        property={property}
        onEdit={onEdit}
        onDelete={onDelete}
        onDisable={onDisable}
        onView={onView}
        isDragging={isDragging}
      />
    </div>
  );
};

export default SortablePropertyCard; 