import React, { useState } from "react";
import { Card } from "../../../../../../components/ui/Card";
import Button from "../../../../../../components/ui/Button";
import Modal from "../../../../../../components/ui/Modal";
import { Plus, Trash2 } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortablePropertyCard from "./SortablePropertyCard";
import useToast from "../../../../../../services/Toast/useToast";

const ListColumn = ({ 
  id, 
  title, 
  color, 
  properties = [], 
  onPropertyEdit, 
  onPropertyDelete, 
  onPropertyDisable,
  onPropertyView,
  onAddProperty 
}) => {
  const { setNodeRef } = useDroppable({ id });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [disableModalOpen, setDisableModalOpen] = useState(false);
  const [propertyToDisable, setPropertyToDisable] = useState(null);
  const { showSuccess } = useToast();

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (propertyToDelete && onPropertyDelete) {
      onPropertyDelete(propertyToDelete);
    }
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleDisableClick = (property) => {
    setPropertyToDisable(property);
    setDisableModalOpen(true);
  };

  const handleConfirmDisable = () => {
    if (propertyToDisable && onPropertyDisable) {
      onPropertyDisable(propertyToDisable);
    }
    setDisableModalOpen(false);
    setPropertyToDisable(null);
  };

  const handleCancelDisable = () => {
    setDisableModalOpen(false);
    setPropertyToDisable(null);
  };

  return (
    <>
      <Card className="min-w-[280px] max-w-sm flex flex-col bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <Card.Header 
          className="text-center bg-white dark:bg-gray-700 flex items-center justify-between gap-2 p-3"
          style={{ borderTop: `3px solid ${color}` }}
        >
          <h3 className="font-semibold flex-1 text-center text-gray-900 dark:text-white">
            {title}
          </h3>
          <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full font-medium">
            {properties.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            icon={Plus}
            onClick={() => onAddProperty(id)}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Agregar propiedad"
          />
        </Card.Header>
        
        <Card.Content
          ref={setNodeRef}
          className="flex-1 flex flex-col gap-2 p-3 bg-gray-50 dark:bg-gray-800 min-h-[200px]"
        >
          {properties.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
              No hay propiedades
            </div>
          ) : (
            <SortableContext items={properties.map(p => p.id)} strategy={verticalListSortingStrategy}>
              {properties.map((property) => (
                <SortablePropertyCard
                  key={property.id}
                  property={property}
                  listId={id}
                  onEdit={() => onPropertyEdit(property)}
                  onDelete={handleDeleteClick}
                  onDisable={handleDisableClick}
                  onView={onPropertyView}
                />
              ))}
            </SortableContext>
          )}
        </Card.Content>
      </Card>

      {/* Confirmation Modal for Delete */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        title="Confirmar eliminación"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar la propiedad{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{propertyToDelete?.titulo || propertyToDelete?.name}"
            </span>
            ? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              className="h-12 flex items-center gap-2"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              className="h-12 flex items-center gap-2"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal for Disable */}
      <Modal
        isOpen={disableModalOpen}
        onClose={handleCancelDisable}
        title="Confirmar deshabilitación"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Estás seguro de que deseas deshabilitar la propiedad{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{propertyToDisable?.titulo || propertyToDisable?.name}"
            </span>
            ?
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancelDisable}
              className="h-12 flex items-center gap-2"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDisable}
              className="h-12 flex items-center gap-2"
            >
              Deshabilitar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListColumn; 