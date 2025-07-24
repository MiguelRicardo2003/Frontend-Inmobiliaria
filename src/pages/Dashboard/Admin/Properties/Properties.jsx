import React, { useState } from "react";
import PropertyTable from "./components/PropertyTable";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import UserSearchBar from "../Clients/components/UserSearchBar";
import { Card, CardContent } from "../../../../components/ui/Admin/CardAdmin";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import ImageUpload from "../../../../components/ui/ImageUpload";
import { Building2, MapPin, User2, Home, ListOrdered } from "lucide-react";

// Datos mock de ejemplo
const initialSedes = [
  {
    id: 1,
    nombre: "Sede Principal",
    ciudad: "Medellín",
    direccion: "Cra 1 #23-45",
    responsable: "Juan Pérez",
    propiedades: [
      { id: 1, name: "Casa 1", address: "Calle 123", price: 100000, estado: "disponible" },
      { id: 2, name: "Depto 2", address: "Av. Central 456", price: 80000, estado: "en_proceso" },
    ],
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    ciudad: "Bogotá",
    direccion: "Av. Norte 101",
    responsable: "Ana Gómez",
    propiedades: [
      { id: 3, name: "Casa 3", address: "Calle 789", price: 120000, estado: "vendida" },
      { id: 4, name: "Depto 4", address: "Av. Sur 101", price: 90000, estado: "arrendada" },
    ],
  },
];

// Opciones para selects
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
  { value: "en_proceso", label: "En proceso" },
  { value: "deshabilitada", label: "Deshabilitada" },
];

const initialProperty = {
  codigo: "",
  titulo: "",
  descripcion: "",
  tipo: "casa",
  operacion: "venta",
  precio: "",
  moneda: "USD",
  ubicacion: {
    direccion: "",
    ciudad: "",
    departamento: "",
    codigoPostal: "",
  },
  caracteristicas: {
    superficie: "",
    habitaciones: "",
    banos: "",
    garajes: "",
    antiguedad: "",
    estrato: "",
  },
  amenidades: [""],
  imagenes: [],
  estado: "disponible",
  propietario: {
    nombre: "",
    telefono: "",
    email: "",
  },
};

const estadisticasSede = (sede) => {
  const total = sede.propiedades.length;
  const disponibles = sede.propiedades.filter(p => p.estado === "disponible").length;
  const arrendadas = sede.propiedades.filter(p => p.estado === "arrendada").length;
  const vendidas = sede.propiedades.filter(p => p.estado === "vendida").length;
  return { total, disponibles, arrendadas, vendidas };
};

const Properties = () => {
  const [sedes, setSedes] = useState(initialSedes);
  const [sedeSeleccionada, setSedeSeleccionada] = useState(sedes[0]?.id || null);
  const [showAddSede, setShowAddSede] = useState(false);
  const [nuevaSede, setNuevaSede] = useState({ nombre: "", ciudad: "", direccion: "", responsable: "" });
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [propertyForm, setPropertyForm] = useState(initialProperty);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [propertyToDisable, setPropertyToDisable] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [propertyToView, setPropertyToView] = useState(null);

  // --- SEDES ---
  const handleAddSede = (e) => {
    e.preventDefault();
    if (!nuevaSede.nombre.trim() || !nuevaSede.ciudad.trim() || !nuevaSede.direccion.trim() || !nuevaSede.responsable.trim()) return;
    const nueva = {
      id: Date.now(),
      ...nuevaSede,
      propiedades: [],
    };
    setSedes((prev) => [...prev, nueva]);
    setNuevaSede({ nombre: "", ciudad: "", direccion: "", responsable: "" });
    setShowAddSede(false);
    setSedeSeleccionada(nueva.id);
  };

  // --- PROPIEDADES ---
  const handleOpenPropertyModal = (property = null) => {
    setEditProperty(property);
    setPropertyForm(
      property
        ? {
            ...initialProperty,
            ...property,
            ubicacion: {
              ...initialProperty.ubicacion,
              ...(property.ubicacion || {}),
              direccion: property.address || property.ubicacion?.direccion || "",
              ciudad: property.ciudad || property.ubicacion?.ciudad || "",
              departamento: property.departamento || property.ubicacion?.departamento || "",
              codigoPostal: property.codigoPostal || property.ubicacion?.codigoPostal || "",
            },
            caracteristicas: {
              ...initialProperty.caracteristicas,
              ...(property.caracteristicas || {}),
            },
            propietario: {
              ...initialProperty.propietario,
              ...(property.propietario || {}),
            },
            amenidades: property.amenidades?.length > 0 ? property.amenidades : [""],
            imagenes: property.imagenes || [],
          }
        : initialProperty
    );
    setShowPropertyModal(true);
  };

  const handleSaveProperty = (e) => {
    e.preventDefault();
    const newProperty = {
      ...propertyForm,
      precio: parseFloat(propertyForm.precio),
      caracteristicas: {
        ...propertyForm.caracteristicas,
        superficie: parseFloat(propertyForm.caracteristicas.superficie),
        habitaciones: parseInt(propertyForm.caracteristicas.habitaciones) || 0,
        banos: parseInt(propertyForm.caracteristicas.banos) || 0,
        garajes: parseInt(propertyForm.caracteristicas.garajes) || 0,
        antiguedad: parseInt(propertyForm.caracteristicas.antiguedad) || 0,
        estrato: parseInt(propertyForm.caracteristicas.estrato) || 1,
      },
      amenidades: propertyForm.amenidades.filter((a) => a.trim() !== ""),
      imagenes: propertyForm.imagenes.filter((img) => img.url?.trim() !== ""),
    };
    setSedes((prev) =>
      prev.map((sede) => {
        if (sede.id !== sedeSeleccionada) return sede;
        if (editProperty) {
          // Editar
          return {
            ...sede,
            propiedades: sede.propiedades.map((p) =>
              p.id === editProperty.id ? { ...newProperty, id: editProperty.id } : p
            ),
          };
        } else {
          // Crear
          return {
            ...sede,
            propiedades: [...sede.propiedades, { ...newProperty, id: Date.now() }],
          };
        }
      })
    );
    setShowPropertyModal(false);
    setEditProperty(null);
    setPropertyForm(initialProperty);
  };

  const handleDeleteProperty = (property) => {
    setSedes((prev) =>
      prev.map((sede) =>
        sede.id === sedeSeleccionada
          ? { ...sede, propiedades: sede.propiedades.filter((p) => p.id !== property.id) }
          : sede
      )
    );
  };

  const handleDisableProperty = (property) => {
    setPropertyToDisable(property);
    setShowDisableModal(true);
  };
  const confirmDisableProperty = () => {
    if (propertyToDisable) {
      setSedes((prev) =>
        prev.map((sede) =>
          sede.id === sedeSeleccionada
            ? {
                ...sede,
                propiedades: sede.propiedades.map((p) =>
                  p.id === propertyToDisable.id ? { ...p, estado: "deshabilitada" } : p
                ),
              }
            : sede
        )
      );
    }
    setShowDisableModal(false);
    setPropertyToDisable(null);
  };
  const cancelDisableProperty = () => {
    setShowDisableModal(false);
    setPropertyToDisable(null);
  };

  const handleViewProperty = (property) => {
    setPropertyToView(property);
    setShowDetailModal(true);
  };
  const closeDetailModal = () => {
    setShowDetailModal(false);
    setPropertyToView(null);
  };

  // --- FILTROS ---
  const sedeActiva = sedes.find((s) => s.id === sedeSeleccionada);
  let propiedadesFiltradas = sedeActiva?.propiedades || [];
  if (searchTerm) {
    propiedadesFiltradas = propiedadesFiltradas.filter((p) =>
      (p.name || p.titulo).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (filterEstado) {
    propiedadesFiltradas = propiedadesFiltradas.filter((p) => p.estado === filterEstado);
  }

  // --- ESTADÍSTICAS ---
  const stats = sedeActiva ? estadisticasSede(sedeActiva) : { total: 0, disponibles: 0, arrendadas: 0, vendidas: 0 };

  return (
    <div className="p-6">
      {/* Sedes selector */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Building2 className="w-6 h-6 text-primary-500" /> Sedes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sedes.map((sede) => {
            const isActive = sede.id === sedeSeleccionada;
            return (
              <div
                key={sede.id}
                className={`relative rounded-xl border shadow-sm p-5 transition-all cursor-pointer bg-white dark:bg-gray-800 hover:shadow-lg ${isActive ? 'ring-2 ring-primary-500 border-primary-500' : 'border-gray-200 dark:border-gray-700'}`}
                onClick={() => setSedeSeleccionada(sede.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{sede.nombre}</h3>
                  </div>
                  {isActive && <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">Activa</span>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-400" /> <span className="font-medium">Ciudad:</span> {sede.ciudad}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4 text-green-400" /> <span className="font-medium">Dirección:</span> {sede.direccion}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1"><User2 className="w-4 h-4 text-amber-400" /> <span className="font-medium">Responsable:</span> {sede.responsable}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-1"><ListOrdered className="w-4 h-4 text-purple-400" /> <span className="font-medium">Propiedades:</span> {sede.propiedades.length}</p>
                {/* Botón eliminado */}
              </div>
            );
          })}
          {/* Tarjeta para agregar nueva sede */}
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-primary-300 rounded-xl p-5 cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all"
            onClick={() => setShowAddSede(true)}
          >
            <span className="text-4xl text-primary-500 mb-2">+</span>
            <span className="text-primary-700 font-medium">Nueva sede</span>
          </div>
        </div>
      </div>
      {/* Modal para crear sede */}
      <Modal isOpen={showAddSede} onClose={() => setShowAddSede(false)} title="Crear nueva sede">
        <form onSubmit={handleAddSede} className="flex flex-col gap-4">
          <input
            type="text"
            value={nuevaSede.nombre}
            onChange={(e) => setNuevaSede((s) => ({ ...s, nombre: e.target.value }))}
            placeholder="Nombre de la sede"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
            autoFocus
          />
          <input
            type="text"
            value={nuevaSede.ciudad}
            onChange={(e) => setNuevaSede((s) => ({ ...s, ciudad: e.target.value }))}
            placeholder="Ciudad"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <input
            type="text"
            value={nuevaSede.direccion}
            onChange={(e) => setNuevaSede((s) => ({ ...s, direccion: e.target.value }))}
            placeholder="Dirección"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <input
            type="text"
            value={nuevaSede.responsable}
            onChange={(e) => setNuevaSede((s) => ({ ...s, responsable: e.target.value }))}
            placeholder="Responsable"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <div className="flex gap-2 mt-2">
            <Button type="submit" variant="primary" size="sm">Agregar</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowAddSede(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>
      {/* Estadísticas */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Propiedades</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.disponibles}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Disponibles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.arrendadas}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Arrendadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-gray-600">{stats.vendidas}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Vendidas</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <UserSearchBar value={searchTerm} onChange={setSearchTerm} />
        <select
          value={filterEstado}
          onChange={e => setFilterEstado(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Todos los estados</option>
          <option value="disponible">Disponible</option>
          <option value="arrendada">Arrendada</option>
          <option value="vendida">Vendida</option>
          <option value="en_proceso">En proceso</option>
          <option value="deshabilitada">Deshabilitada</option>
        </select>
        <Button variant="primary" size="sm" onClick={() => handleOpenPropertyModal()}>+ Nueva propiedad</Button>
      </div>
      {/* Tabla de propiedades */}
      <PropertyTable
        properties={propiedadesFiltradas}
        onView={handleViewProperty}
        onEdit={handleOpenPropertyModal}
        onDelete={handleDeleteProperty}
        onDisable={handleDisableProperty}
      />
      {/* Modal de confirmación para deshabilitar propiedad */}
      <Modal isOpen={showDisableModal} onClose={cancelDisableProperty} title="Deshabilitar propiedad">
        <div className="space-y-4">
          <p>¿Estás seguro que deseas deshabilitar la propiedad <span className="font-semibold">{propertyToDisable?.titulo || propertyToDisable?.name}</span>?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={cancelDisableProperty}>Cancelar</Button>
            <Button variant="primary" onClick={confirmDisableProperty}>Deshabilitar</Button>
          </div>
        </div>
      </Modal>
      {/* Modal para crear/editar propiedad */}
      <Modal isOpen={showPropertyModal} onClose={() => setShowPropertyModal(false)} title={editProperty ? "Editar propiedad" : "Nueva propiedad"} size="xl">
        <form onSubmit={handleSaveProperty} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Código" value={propertyForm.codigo} onChange={e => setPropertyForm(f => ({ ...f, codigo: e.target.value }))} required />
            <Input label="Título" value={propertyForm.titulo} onChange={e => setPropertyForm(f => ({ ...f, titulo: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <textarea
              value={propertyForm.descripcion}
              onChange={e => setPropertyForm(f => ({ ...f, descripcion: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="Precio" type="number" value={propertyForm.precio} onChange={e => setPropertyForm(f => ({ ...f, precio: e.target.value }))} required />
            <Select label="Moneda" options={monedaOptions} value={propertyForm.moneda} onChange={e => setPropertyForm(f => ({ ...f, moneda: e.target.value }))} />
            <Select label="Tipo" options={typeOptions} value={propertyForm.tipo} onChange={e => setPropertyForm(f => ({ ...f, tipo: e.target.value }))} />
            <Select label="Operación" options={operationOptions} value={propertyForm.operacion} onChange={e => setPropertyForm(f => ({ ...f, operacion: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Superficie (m²)" type="number" value={propertyForm.caracteristicas.superficie} onChange={e => setPropertyForm(f => ({ ...f, caracteristicas: { ...f.caracteristicas, superficie: e.target.value } }))} required />
            <Input label="Habitaciones" type="number" value={propertyForm.caracteristicas.habitaciones} onChange={e => setPropertyForm(f => ({ ...f, caracteristicas: { ...f.caracteristicas, habitaciones: e.target.value } }))} />
            <Input label="Baños" type="number" value={propertyForm.caracteristicas.banos} onChange={e => setPropertyForm(f => ({ ...f, caracteristicas: { ...f.caracteristicas, banos: e.target.value } }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Garajes" type="number" value={propertyForm.caracteristicas.garajes} onChange={e => setPropertyForm(f => ({ ...f, caracteristicas: { ...f.caracteristicas, garajes: e.target.value } }))} />
            <Input label="Antigüedad (años)" type="number" value={propertyForm.caracteristicas.antiguedad} onChange={e => setPropertyForm(f => ({ ...f, caracteristicas: { ...f.caracteristicas, antiguedad: e.target.value } }))} />
            <Input label="Estrato" type="number" min="1" max="6" value={propertyForm.caracteristicas.estrato} onChange={e => setPropertyForm(f => ({ ...f, caracteristicas: { ...f.caracteristicas, estrato: e.target.value } }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Dirección" value={propertyForm.ubicacion.direccion} onChange={e => setPropertyForm(f => ({ ...f, ubicacion: { ...f.ubicacion, direccion: e.target.value } }))} required />
            <Input label="Ciudad" value={propertyForm.ubicacion.ciudad} onChange={e => setPropertyForm(f => ({ ...f, ubicacion: { ...f.ubicacion, ciudad: e.target.value } }))} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Departamento" value={propertyForm.ubicacion.departamento} onChange={e => setPropertyForm(f => ({ ...f, ubicacion: { ...f.ubicacion, departamento: e.target.value } }))} required />
            <Input label="Código Postal" value={propertyForm.ubicacion.codigoPostal} onChange={e => setPropertyForm(f => ({ ...f, ubicacion: { ...f.ubicacion, codigoPostal: e.target.value } }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Nombre del Propietario" value={propertyForm.propietario.nombre} onChange={e => setPropertyForm(f => ({ ...f, propietario: { ...f.propietario, nombre: e.target.value } }))} required />
            <Input label="Teléfono del Propietario" value={propertyForm.propietario.telefono} onChange={e => setPropertyForm(f => ({ ...f, propietario: { ...f.propietario, telefono: e.target.value } }))} required />
            <Input label="Email del Propietario" type="email" value={propertyForm.propietario.email} onChange={e => setPropertyForm(f => ({ ...f, propietario: { ...f.propietario, email: e.target.value } }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenidades</label>
            {propertyForm.amenidades.map((amenidad, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  placeholder="Amenidad"
                  value={amenidad}
                  onChange={e => {
                    const newAmenidades = [...propertyForm.amenidades];
                    newAmenidades[index] = e.target.value;
                    setPropertyForm(f => ({ ...f, amenidades: newAmenidades }));
                  }}
                />
                {index === propertyForm.amenidades.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPropertyForm(f => ({ ...f, amenidades: [...f.amenidades, ""] }))}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Imágenes</label>
            <ImageUpload images={propertyForm.imagenes} onImagesChange={imgs => setPropertyForm(f => ({ ...f, imagenes: imgs }))} />
          </div>
          <Select label="Estado" options={statusOptions} value={propertyForm.estado} onChange={e => setPropertyForm(f => ({ ...f, estado: e.target.value }))} />
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => { setShowPropertyModal(false); setEditProperty(null); setPropertyForm(initialProperty); }}>Cancelar</Button>
            <Button type="submit" variant="primary">{editProperty ? "Guardar cambios" : "Agregar"} Propiedad</Button>
          </div>
        </form>
      </Modal>
      {/* Modal de detalles de propiedad */}
      <Modal isOpen={showDetailModal} onClose={closeDetailModal} title={propertyToView ? (propertyToView.titulo || propertyToView.name) : "Detalles de propiedad"} size="xl">
        {propertyToView && (
          <div className="space-y-4">
            {/* Imágenes */}
            {propertyToView.imagenes && propertyToView.imagenes.length > 0 && (
              <div className="flex gap-4 overflow-x-auto">
                {propertyToView.imagenes.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={img.descripcion || `Imagen ${idx + 1}`}
                    className={`w-32 h-32 object-cover rounded-lg border ${img.principal ? 'border-primary-500' : 'border-gray-200'}`}
                  />
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-semibold">Código:</span> {propertyToView.codigo}</p>
                <p><span className="font-semibold">Título:</span> {propertyToView.titulo}</p>
                <p><span className="font-semibold">Descripción:</span> {propertyToView.descripcion}</p>
                <p><span className="font-semibold">Tipo:</span> {propertyToView.tipo}</p>
                <p><span className="font-semibold">Operación:</span> {propertyToView.operacion}</p>
                <p><span className="font-semibold">Precio:</span> ${propertyToView.precio?.toLocaleString()}</p>
                <p><span className="font-semibold">Moneda:</span> {propertyToView.moneda}</p>
                <p><span className="font-semibold">Estado:</span> {propertyToView.estado}</p>
              </div>
              <div>
                <p><span className="font-semibold">Dirección:</span> {propertyToView.ubicacion?.direccion}</p>
                <p><span className="font-semibold">Ciudad:</span> {propertyToView.ubicacion?.ciudad}</p>
                <p><span className="font-semibold">Departamento:</span> {propertyToView.ubicacion?.departamento}</p>
                <p><span className="font-semibold">Código Postal:</span> {propertyToView.ubicacion?.codigoPostal}</p>
                <p><span className="font-semibold">Superficie:</span> {propertyToView.caracteristicas?.superficie} m²</p>
                <p><span className="font-semibold">Habitaciones:</span> {propertyToView.caracteristicas?.habitaciones}</p>
                <p><span className="font-semibold">Baños:</span> {propertyToView.caracteristicas?.banos}</p>
                <p><span className="font-semibold">Garajes:</span> {propertyToView.caracteristicas?.garajes}</p>
                <p><span className="font-semibold">Antigüedad:</span> {propertyToView.caracteristicas?.antiguedad} años</p>
                <p><span className="font-semibold">Estrato:</span> {propertyToView.caracteristicas?.estrato}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-1">Amenidades:</p>
              <ul className="list-disc list-inside">
                {propertyToView.amenidades && propertyToView.amenidades.length > 0 ? (
                  propertyToView.amenidades.map((a, i) => <li key={i}>{a}</li>)
                ) : (
                  <li>No especificadas</li>
                )}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Propietario:</p>
              <p>{propertyToView.propietario?.nombre} ({propertyToView.propietario?.telefono} / {propertyToView.propietario?.email})</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Properties;