import React from "react";
import { Card } from "../../../../../components/ui/Card";
import Button from "../../../../../components/ui/Button";
import { Trash2 } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

const ListColumn = ({ title, children, onDelete, droppableId }) => {
  const { setNodeRef } = useDroppable({ id: droppableId });
  return (
    <Card className="min-w-[250px] max-w-xs flex flex-col bg-gray-100">
      <Card.Header className="text-center bg-white flex items-center justify-between gap-2">
        <h3 className="font-semibold flex-1 text-center">{title}</h3>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            aria-label="Eliminar lista"
          />
        )}
      </Card.Header>
      <Card.Content
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-2 bg-gray-100 min-h-[80px] justify-between"
      >
        {children}
      </Card.Content>
    </Card>
  );
};

export default ListColumn; 