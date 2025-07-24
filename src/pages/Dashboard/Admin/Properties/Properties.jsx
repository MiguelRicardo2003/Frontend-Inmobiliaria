import React, { useState } from "react";
import PropertyTable from "./components/PropertyTable";
import Button from "../../../../components/ui/Button";

// Datos mock de ejemplo
const initialSedes = [
  {
    id: 1,
    nombre: "Sede Principal",
    propiedades: [
      { id: 1, name: "Casa 1", address: "Calle 123", price: 100000, estado: "disponible" },
      { id: 2, name: "Depto 2", address: "Av. Central 456", price: 80000, estado: "en_proceso" },
    ],
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    propiedades: [
      { id: 3, name: "Casa 3", address: "Calle 789", price: 120000, estado: "vendida" },
      { id: 4, name: "Depto 4", address: "Av. Sur 101", price: 90000, estado: "arrendada" },
    ],
  },
];
  
const Properties = () => {
  const [sedes, setSedes] = useState(initialSedes);
  const [sedeSeleccionada, setSedeSeleccionada] = useState(sedes[0]?.id || null);
  const [showAddSede, setShowAddSede] = useState(false);
  const [nuevaSede, setNuevaSede] = useState("");

  const handleView = (property) => {
    alert(`Ver detalles de: ${property.name || property.titulo}`);
  };

  const handleEdit = (property) => {
    alert(`Editar propiedad: ${property.name || property.titulo}`);
  };

  const handleDelete = (property) => {
    setSedes((prev) =>
      prev.map((sede) =>
        sede.id === sedeSeleccionada
          ? { ...sede, propiedades: sede.propiedades.filter((p) => p.id !== property.id) }
          : sede
      )
    );
  };

  const handleAddSede = (e) => {
    e.preventDefault();
    if (!nuevaSede.trim()) return;
    const nueva = {
      id: Date.now(),
      nombre: nuevaSede,
      propiedades: [],
    };
    setSedes((prev) => [...prev, nueva]);
    setNuevaSede("");
    setShowAddSede(false);
    setSedeSeleccionada(nueva.id);
  };

  const sedeActiva = sedes.find((s) => s.id === sedeSeleccionada);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2">
          {sedes.map((sede) => (
            <button
              key={sede.id}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sede.id === sedeSeleccionada
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSedeSeleccionada(sede.id)}
            >
              {sede.nombre}
            </button>
          ))}
        </div>
        <Button variant="primary" size="sm" className="ml-4" onClick={() => setShowAddSede(true)}>
          + Nueva sede
        </Button>
      </div>
      {showAddSede && (
        <form onSubmit={handleAddSede} className="mb-6 flex gap-2 items-center">
          <input
            type="text"
            value={nuevaSede}
            onChange={(e) => setNuevaSede(e.target.value)}
            placeholder="Nombre de la nueva sede"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          <Button type="submit" variant="primary" size="sm">Agregar</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setShowAddSede(false)}>Cancelar</Button>
        </form>
      )}
      <h1 className="text-2xl font-bold mb-4">Propiedades de la Sede</h1>
      <PropertyTable
        properties={sedeActiva?.propiedades || []}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Properties;