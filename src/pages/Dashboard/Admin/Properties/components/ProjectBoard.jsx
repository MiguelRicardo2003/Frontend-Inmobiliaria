import React, { useState } from "react";
import ListColumn from "./ListColumn";
import PropertyCard from "./PropertyCard";
import Button from "../../../../../components/ui/Button";
import Modal from "../../../../../components/ui/Modal";
import Input from "../../../../../components/ui/Input";
import Select from "../../../../../components/ui/Select";
import ImageUpload from "../../../../../components/ui/ImageUpload";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToParentElement } from "@dnd-kit/modifiers";

// Opciones mock para selects
const typeOptions = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "oficina", label: "Oficina" },
  { value: "local", label: "Local" },
  { value: "terreno", label: "Terreno" },
  { value: "bodega", label: "Bodega" },
];
const operationOptions = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];
const monedaOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "COP", label: "COP" },
  { value: "MXN", label: "MXN" },
];
const statusOptions = [
  { value: "disponible", label: "Disponible" },
  { value: "reservada", label: "Reservada" },
  { value: "vendida", label: "Vendida" },
  { value: "alquilada", label: "Alquilada" },
  { value: "inactiva", label: "Inactiva" },
];

// Definir los estados como columnas
const propertyStates = [
  { key: "disponible", label: "Disponible" },
  { key: "en_proceso", label: "En proceso" },
  { key: "arrendada", label: "Arrendada" },
  { key: "vendida", label: "Vendida" },
];

// Datos mock iniciales de propiedades
const initialProperties = [
  { id: 1, name: "Casa 1", address: "Calle 123", price: 100000, estado: "disponible" },
  { id: 2, name: "Depto 2", address: "Av. Central 456", price: 80000, estado: "disponible" },
  { id: 3, name: "Casa 3", address: "Calle 789", price: 120000, estado: "vendida" },
  { id: 4, name: "Depto 4", address: "Av. Sur 101", price: 90000, estado: "arrendada" },
];

const defaultPropertyForm = {
  name: "",
  address: "",
  price: "",
  type: "casa",
  operation: "venta",
  moneda: "USD",
  superficie: "",
  habitaciones: "",
  banos: "",
  garajes: "",
  antiguedad: "",
  estrato: "1",
  amenidades: [""],
  imagenes: [],
  estado: "disponible",
  propietario: {
    nombre: "",
    telefono: "",
    email: "",
  },
};

// Componente para tarjeta sortable
const SortablePropertyCard = ({ property, listId, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: property.id,
    data: { listId },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PropertyCard {...property} {...props} />
    </div>
  );
};

// Mock de función para actualizar el estado en el backend
async function updatePropertyEstado(propertyId, nuevoEstadoId) {
  // Simula una llamada al backend con un pequeño delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Aquí iría el fetch/axios real
      // await fetch(`/api/propiedades/${propertyId}`, { method: 'PUT', ... })
      resolve({ success: true });
    }, 400);
  });
}

const ProjectBoard = ({ projectName, onBack }) => {
  // Cambiar el estado para manejar todas las propiedades y no listas
  const [properties, setProperties] = useState(initialProperties);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [propertyListId, setPropertyListId] = useState(null); // ahora es el estado destino
  const [propertyForm, setPropertyForm] = useState(defaultPropertyForm);
  const [propertyError, setPropertyError] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [activeProperty, setActiveProperty] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  // Abrir modal para agregar propiedad en un estado
  const openAddPropertyModal = (estado) => {
    setPropertyListId(estado);
    setPropertyForm({ ...defaultPropertyForm, estado });
    setPropertyError({});
    setEditingPropertyId(null);
    setShowAddPropertyModal(true);
  };

  // Abrir modal para editar propiedad
  const openEditPropertyModal = (estado, property) => {
    setPropertyListId(estado);
    setPropertyForm({
      ...defaultPropertyForm,
      ...property,
      propietario: property.propietario || defaultPropertyForm.propietario,
      amenidades: property.amenidades || [""],
      imagenes: property.imagenes || [],
      estado: property.estado || estado,
    });
    setPropertyError({});
    setEditingPropertyId(property.id);
    setShowAddPropertyModal(true);
  };

  // Guardar propiedad (agregar o editar)
  const handleAddProperty = (e) => {
    e.preventDefault();
    const errors = {};
    if (!propertyForm.name.trim()) errors.name = "El nombre es requerido";
    if (!propertyForm.address.trim()) errors.address = "La dirección es requerida";
    if (!propertyForm.price || isNaN(propertyForm.price)) errors.price = "Precio válido requerido";
    if (!propertyForm.propietario.nombre.trim()) errors.propietarioNombre = "Nombre del propietario requerido";
    if (!propertyForm.propietario.telefono.trim()) errors.propietarioTelefono = "Teléfono del propietario requerido";
    if (Object.keys(errors).length > 0) {
      setPropertyError(errors);
      return;
    }
    if (editingPropertyId) {
      // Editar
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === editingPropertyId
            ? { ...propertyForm, id: editingPropertyId, estado: propertyListId }
            : prop
        )
      );
    } else {
      // Agregar
      setProperties((prev) => [
        ...prev,
        {
          ...propertyForm,
          id: Date.now(),
          estado: propertyListId,
        },
      ]);
    }
    setShowAddPropertyModal(false);
    setPropertyListId(null);
    setPropertyForm(defaultPropertyForm);
    setPropertyError({});
    setEditingPropertyId(null);
  };

  // Eliminar propiedad
  const handleDeleteProperty = (estado, propertyId) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== propertyId));
  };

  // Drag helpers
  const findPropertyById = (id) => properties.find((p) => p.id === id);
  const handleDragStart = (event) => {
    const { active } = event;
    const found = findPropertyById(active.id);
    if (found) setActiveProperty(found);
  };

  // Cambia handleDragEnd para soportar drops sobre columnas vacías y tarjetas
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveProperty(null);
    if (!over || active.id === over.id) return;
    const from = findPropertyById(active.id);
    let toState = over.id;
    // Si over.id es un id de propiedad, busca en qué columna está
    if (!propertyStates.some(s => s.key === toState)) {
      for (const state of propertyStates) {
        const ids = properties.filter((p) => p.estado === state.key).map((p) => p.id);
        if (ids.includes(over.id)) {
          toState = state.key;
          break;
        }
      }
    }
    if (!from || !toState) return;
    if (from.estado !== toState) {
      const res = await updatePropertyEstado(from.id, toState);
      if (res && res.success) {
        setProperties((prev) =>
          prev.map((prop) =>
            prop.id === from.id ? { ...prop, estado: toState } : prop
          )
        );
      }
    }
  };

  // Amenidades y propietario helpers (sin cambios)
  const handlePropertyFormChange = (field, value) => {
    setPropertyForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleAmenidadChange = (index, value) => {
    const newAmenidades = [...propertyForm.amenidades];
    newAmenidades[index] = value;
    setPropertyForm((prev) => ({ ...prev, amenidades: newAmenidades }));
  };
  const addAmenidad = () => {
    setPropertyForm((prev) => ({ ...prev, amenidades: [...prev.amenidades, ""] }));
  };
  const handlePropietarioChange = (field, value) => {
    setPropertyForm((prev) => ({ ...prev, propietario: { ...prev.propietario, [field]: value } }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4 gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          ← Volver a proyectos
        </Button>
        <h2 className="text-xl font-bold">Tablero: {projectName || "Nombre de la Sede"}</h2>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <div className="flex gap-4 overflow-x-auto">
          {propertyStates.map((state) => (
            <SortableContext
              key={state.key}
              items={properties.filter((p) => p.estado === state.key).map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <ListColumn
                title={state.label}
                droppableId={state.key}
              >
                {properties
                  .filter((property) => property.estado === state.key)
                  .map((property) => (
                    <SortablePropertyCard
                      key={property.id}
                      property={property}
                      listId={state.key}
                      onEdit={() => openEditPropertyModal(state.key, property)}
                      onDelete={() => handleDeleteProperty(state.key, property.id)}
                      showEstado
                    />
                  ))}
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={() => openAddPropertyModal(state.key)}
                >
                  + Agregar propiedad
                </Button>
              </ListColumn>
            </SortableContext>
          ))}
        </div>
        <DragOverlay>
          {activeProperty ? (
            <PropertyCard
              name={activeProperty.name}
              address={activeProperty.address}
              price={activeProperty.price}
              estado={activeProperty.estado}
              showEstado
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      {/* Modal para agregar/editar propiedad */}
      <Modal isOpen={showAddPropertyModal} onClose={() => setShowAddPropertyModal(false)} title={editingPropertyId ? "Editar propiedad" : "Agregar nueva propiedad"} size="xl">
        <form onSubmit={handleAddProperty} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              value={propertyForm.name}
              onChange={(e) => handlePropertyFormChange("name", e.target.value)}
              error={propertyError.name}
              required
              autoFocus
            />
            <Input
              label="Dirección"
              value={propertyForm.address}
              onChange={(e) => handlePropertyFormChange("address", e.target.value)}
              error={propertyError.address}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Precio"
              type="number"
              value={propertyForm.price}
              onChange={(e) => handlePropertyFormChange("price", e.target.value)}
              error={propertyError.price}
              required
            />
            <Select
              label="Moneda"
              options={monedaOptions}
              value={propertyForm.moneda}
              onChange={(e) => handlePropertyFormChange("moneda", e.target.value)}
            />
            <Select
              label="Tipo"
              options={typeOptions}
              value={propertyForm.type}
              onChange={(e) => handlePropertyFormChange("type", e.target.value)}
            />
            <Select
              label="Operación"
              options={operationOptions}
              value={propertyForm.operation}
              onChange={(e) => handlePropertyFormChange("operation", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Superficie (m²)"
              type="number"
              value={propertyForm.superficie}
              onChange={(e) => handlePropertyFormChange("superficie", e.target.value)}
            />
            <Input
              label="Habitaciones"
              type="number"
              value={propertyForm.habitaciones}
              onChange={(e) => handlePropertyFormChange("habitaciones", e.target.value)}
            />
            <Input
              label="Baños"
              type="number"
              value={propertyForm.banos}
              onChange={(e) => handlePropertyFormChange("banos", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Garajes"
              type="number"
              value={propertyForm.garajes}
              onChange={(e) => handlePropertyFormChange("garajes", e.target.value)}
            />
            <Input
              label="Antigüedad (años)"
              type="number"
              value={propertyForm.antiguedad}
              onChange={(e) => handlePropertyFormChange("antiguedad", e.target.value)}
            />
            <Input
              label="Estrato"
              type="number"
              min="1"
              max="6"
              value={propertyForm.estrato}
              onChange={(e) => handlePropertyFormChange("estrato", e.target.value)}
            />
          </div>
          {/* Amenidades */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amenidades
            </label>
            {propertyForm.amenidades.map((amenidad, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  placeholder="Amenidad"
                  value={amenidad}
                  onChange={(e) => handleAmenidadChange(index, e.target.value)}
                />
                {index === propertyForm.amenidades.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAmenidad}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>
          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Imágenes
            </label>
            <ImageUpload
              images={propertyForm.imagenes}
              onImagesChange={(newImages) => handlePropertyFormChange("imagenes", newImages)}
            />
          </div>
          <Select
            label="Estado"
            options={propertyStates.map(s => ({ value: s.key, label: s.label }))}
            value={propertyForm.estado}
            onChange={(e) => handlePropertyFormChange("estado", e.target.value)}
          />
          {/* Propietario */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Nombre del Propietario"
              value={propertyForm.propietario.nombre}
              onChange={(e) => handlePropietarioChange("nombre", e.target.value)}
              error={propertyError.propietarioNombre}
              required
            />
            <Input
              label="Teléfono del Propietario"
              value={propertyForm.propietario.telefono}
              onChange={(e) => handlePropietarioChange("telefono", e.target.value)}
              error={propertyError.propietarioTelefono}
              required
            />
            <Input
              label="Email del Propietario"
              type="email"
              value={propertyForm.propietario.email}
              onChange={(e) => handlePropietarioChange("email", e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setShowAddPropertyModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingPropertyId ? "Actualizar" : "Agregar"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectBoard; 