// Property type options
export const typeOptions = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "oficina", label: "Oficina" },
  { value: "local", label: "Local" },
  { value: "terreno", label: "Terreno" },
  { value: "bodega", label: "Bodega" },
];

// Operation type options
export const operationOptions = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];

// Currency options
export const monedaOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "COP", label: "COP" },
  { value: "MXN", label: "MXN" },
];

// Status options
export const statusOptions = [
  { value: "disponible", label: "Disponible" },
  { value: "reservada", label: "Reservada" },
  { value: "vendida", label: "Vendida" },
  { value: "alquilada", label: "Alquilada" },
  { value: "en_proceso", label: "En proceso" },
  { value: "deshabilitada", label: "Deshabilitada" },
];

// Property states for Trello board
export const propertyStates = [
  { key: "disponible", label: "Disponible", color: "#10B981" },
  { key: "en_proceso", label: "En proceso", color: "#F59E0B" },
  { key: "arrendada", label: "Arrendada", color: "#3B82F6" },
  { key: "vendida", label: "Vendida", color: "#6B7280" },
];

// Status color mapping
export const statusColors = {
  disponible: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
  reservada: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
  vendida: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300",
  alquilada: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
  en_proceso: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300",
  deshabilitada: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
};

// Form field validation rules
export const validationRules = {
  codigo: { required: true, minLength: 3 },
  titulo: { required: true, minLength: 5 },
  descripcion: { required: true, minLength: 10 },
  precio: { required: true, min: 0 },
  superficie: { required: true, min: 0 },
  direccion: { required: true },
  ciudad: { required: true },
  departamento: { required: true },
  propietario_nombre: { required: true },
  propietario_telefono: { required: true },
}; 