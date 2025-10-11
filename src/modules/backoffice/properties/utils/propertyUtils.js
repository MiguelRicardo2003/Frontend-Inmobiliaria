import { statusColors } from '../constants/formOptions';

// Format price with currency
export const formatPrice = (price, currency = 'USD') => {
  if (!price) return '-';
  
  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(price);
};

// Get status color class
export const getStatusColor = (status) => {
  return statusColors[status] || statusColors.disponible;
};

// Format date
export const formatDate = (date) => {
  if (!date) return '-';
  
  try {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return '-';
  }
};

// Get property display name
export const getPropertyDisplayName = (property) => {
  return property.titulo || property.name || property.codigo || 'Sin título';
};

// Get property address
export const getPropertyAddress = (property) => {
  return property.ubicacion?.direccion || property.direccion || property.address || '-';
};

// Get property type display name
export const getPropertyTypeDisplay = (property) => {
  const typeMap = {
    casa: 'Casa',
    apartamento: 'Apartamento',
    oficina: 'Oficina',
    local: 'Local',
    terreno: 'Terreno',
    bodega: 'Bodega'
  };
  
  return typeMap[property.tipo] || property.tipo || '-';
};

// Get property status display name
export const getPropertyStatusDisplay = (property) => {
  const statusMap = {
    disponible: 'Disponible',
    reservada: 'Reservada',
    vendida: 'Vendida',
    alquilada: 'Alquilada',
    en_proceso: 'En proceso',
    deshabilitada: 'Deshabilitada'
  };
  
  return statusMap[property.estado] || property.estado || '-';
};

// Validate property form data
export const validatePropertyForm = (formData) => {
  const errors = {};
  
  if (!formData.codigo?.trim()) {
    errors.codigo = 'El código es requerido';
  }
  
  if (!formData.titulo?.trim()) {
    errors.titulo = 'El título es requerido';
  }
  
  if (!formData.descripcion?.trim()) {
    errors.descripcion = 'La descripción es requerida';
  }
  
  if (!formData.precio || formData.precio <= 0) {
    errors.precio = 'El precio debe ser mayor a 0';
  }
  
  if (!formData.ubicacion?.direccion?.trim()) {
    errors.direccion = 'La dirección es requerida';
  }
  
  if (!formData.ubicacion?.ciudad?.trim()) {
    errors.ciudad = 'La ciudad es requerida';
  }
  
  if (!formData.propietario?.nombre?.trim()) {
    errors.propietario_nombre = 'El nombre del propietario es requerido';
  }
  
  if (!formData.propietario?.telefono?.trim()) {
    errors.propietario_telefono = 'El teléfono del propietario es requerido';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Filter properties by search term
export const filterPropertiesBySearch = (properties, searchTerm) => {
  if (!searchTerm) return properties;
  
  const term = searchTerm.toLowerCase();
  
  return properties.filter(property => {
    const title = getPropertyDisplayName(property).toLowerCase();
    const address = getPropertyAddress(property).toLowerCase();
    const code = (property.codigo || '').toLowerCase();
    
    return title.includes(term) || address.includes(term) || code.includes(term);
  });
};

// Filter properties by status
export const filterPropertiesByStatus = (properties, status) => {
  if (!status) return properties;
  
  return properties.filter(property => property.estado === status);
};

// Sort properties by field
export const sortProperties = (properties, field, direction = 'asc') => {
  return [...properties].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];
    
    // Handle nested properties
    if (field.includes('.')) {
      const keys = field.split('.');
      aValue = keys.reduce((obj, key) => obj?.[key], a);
      bValue = keys.reduce((obj, key) => obj?.[key], b);
    }
    
    // Handle different data types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}; 