import React from "react";
import { Card } from "../../../../../../components/ui/Card";
import Button from "../../../../../../components/ui/Button";
import { Edit, Trash2, Eye, Ban } from "lucide-react";
import { 
  getPropertyDisplayName, 
  getPropertyAddress, 
  formatPrice, 
  getStatusColor,
  getPropertyTypeDisplay 
} from "../../utils/propertyUtils";

const PropertyCard = ({ 
  property, 
  onEdit, 
  onDelete, 
  onView,
  onDisable,
  isDragging = false 
}) => {
  const displayName = getPropertyDisplayName(property);
  const address = getPropertyAddress(property);
  const price = formatPrice(property.precio || property.price, property.moneda);
  const statusColor = getStatusColor(property.estado);
  const propertyType = getPropertyTypeDisplay(property);

  return (
    <Card className={`mb-2 transition-all ${isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'}`}>
      <Card.Content className="p-3">
        {/* Property Image */}
        {property.imagenes && property.imagenes.length > 0 && (
          <div className="mb-2">
            <img 
              src={property.imagenes[0].url} 
              alt={displayName}
              className="w-full h-24 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Property Information */}
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {displayName}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {address}
              </p>
            </div>
            <div className="flex gap-1">
              {onView && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Eye}
                  onPointerDown={e => e.stopPropagation()}
                  onClick={() => onView(property)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label="Ver detalles"
                />
              )}
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Edit}
                  onPointerDown={e => e.stopPropagation()}
                  onClick={() => onEdit(property)}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Editar propiedad"
                />
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Trash2}
                  onPointerDown={e => e.stopPropagation()}
                  onClick={() => onDelete(property)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  aria-label="Eliminar propiedad"
                />
              )}
              {onDisable && property.estado !== 'deshabilitada' && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Ban}
                  onPointerDown={e => e.stopPropagation()}
                  onClick={() => onDisable(property)}
                  className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                  aria-label="Deshabilitar propiedad"
                />
              )}
            </div>
          </div>

          {/* Price and Type */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              {price}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {propertyType}
            </span>
          </div>

          {/* Characteristics */}
          <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
            {property.caracteristicas?.superficie && (
              <span>{property.caracteristicas.superficie}m²</span>
            )}
            {property.caracteristicas?.habitaciones && (
              <span>{property.caracteristicas.habitaciones} hab</span>
            )}
            {property.caracteristicas?.banos && (
              <span>{property.caracteristicas.banos} baños</span>
            )}
          </div>

          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
              {property.estado?.charAt(0).toUpperCase() + property.estado?.slice(1).replace("_", " ") || 'Sin estado'}
            </span>
            {property.codigo && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                #{property.codigo}
              </span>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PropertyCard; 