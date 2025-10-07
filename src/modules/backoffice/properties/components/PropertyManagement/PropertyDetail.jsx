import React from 'react';

const PropertyDetail = ({ property }) => {
  if (!property) return null;

  return (
    <div className="space-y-4">
      {/* Images */}
      {property.imagenes && property.imagenes.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {property.imagenes.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.descripcion || `Imagen ${idx + 1}`}
              className={`w-32 h-32 object-cover rounded-lg border ${
                img.principal ? 'border-primary-500' : 'border-gray-200 dark:border-gray-600'
              }`}
            />
          ))}
        </div>
      )}

      {/* Property Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 text-gray-900 dark:text-white">
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Código:</span> {property.codigo}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Título:</span> {property.titulo || property.name}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Descripción:</span> {property.descripcion}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Tipo:</span> {property.tipo}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Operación:</span> {property.operacion}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Precio:</span> <span className="text-green-600 dark:text-green-400">${property.precio?.toLocaleString() || property.price?.toLocaleString()}</span></p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Moneda:</span> {property.moneda}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Estado:</span> {property.estado}</p>
        </div>
        
        <div className="space-y-2 text-gray-900 dark:text-white">
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Dirección:</span> {property.ubicacion?.direccion || property.direccion || property.address}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Ciudad:</span> {property.ubicacion?.ciudad}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Departamento:</span> {property.ubicacion?.departamento}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Código Postal:</span> {property.ubicacion?.codigoPostal}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Superficie:</span> {property.caracteristicas?.superficie || property.metros_cuadrados} m²</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Habitaciones:</span> {property.caracteristicas?.habitaciones || property.habitaciones}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Baños:</span> {property.caracteristicas?.banos || property.banos}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Garajes:</span> {property.caracteristicas?.garajes}</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Antigüedad:</span> {property.caracteristicas?.antiguedad} años</p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-300">Estrato:</span> {property.caracteristicas?.estrato}</p>
        </div>
      </div>

      {/* Amenities */}
      <div className="text-gray-900 dark:text-white">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Amenidades:</p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          {property.amenidades && property.amenidades.length > 0 ? (
            property.amenidades.map((amenidad, i) => (
              <li key={i}>{amenidad}</li>
            ))
          ) : (
            <li>No especificadas</li>
          )}
        </ul>
      </div>

      {/* Owner Information */}
      <div className="text-gray-900 dark:text-white">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Propietario:</p>
        <p className="text-gray-600 dark:text-gray-400">
          {property.propietario?.nombre} (
          {property.propietario?.telefono} / {property.propietario?.email})
        </p>
      </div>
    </div>
  );
};

export default PropertyDetail; 