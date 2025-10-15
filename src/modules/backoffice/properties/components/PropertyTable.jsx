import React from "react";
import PropertyTableHeader from "./PropertyTableHeader";
import PropertyTableRow from "./PropertyTableRow";

const PropertyTable = ({ properties, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <PropertyTableHeader />
        <tbody>
          {properties.map((property) => (
            <PropertyTableRow
              key={property.id}
              property={property}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;

