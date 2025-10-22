import React, { useState } from "react";
import { Heart, Search, Filter, MapPin, Bed, Bath, Maximize, X } from "lucide-react";
import Button from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";

const ClientFavorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Apartamento Moderno en Centro",
      location: "Madrid, España",
      price: "€350,000",
      bedrooms: 3,
      bathrooms: 2,
      area: "120 m²",
      type: "Apartamento",
      status: "En Venta",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      addedDate: "2024-10-15",
    },
    {
      id: 2,
      title: "Casa con Jardín",
      location: "Barcelona, España",
      price: "€480,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "200 m²",
      type: "Casa",
      status: "En Venta",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600",
      addedDate: "2024-10-12",
    },
    {
      id: 3,
      title: "Penthouse de Lujo",
      location: "Valencia, España",
      price: "€650,000",
      bedrooms: 3,
      bathrooms: 2,
      area: "180 m²",
      type: "Penthouse",
      status: "En Venta",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
      addedDate: "2024-10-10",
    },
    {
      id: 4,
      title: "Estudio en Zona Universitaria",
      location: "Sevilla, España",
      price: "€1,200/mes",
      bedrooms: 1,
      bathrooms: 1,
      area: "45 m²",
      type: "Estudio",
      status: "En Alquiler",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      addedDate: "2024-10-08",
    },
    {
      id: 5,
      title: "Villa Mediterránea",
      location: "Málaga, España",
      price: "€890,000",
      bedrooms: 5,
      bathrooms: 4,
      area: "350 m²",
      type: "Villa",
      status: "En Venta",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
      addedDate: "2024-10-05",
    },
    {
      id: 6,
      title: "Loft Industrial",
      location: "Bilbao, España",
      price: "€2,500/mes",
      bedrooms: 2,
      bathrooms: 2,
      area: "110 m²",
      type: "Loft",
      status: "En Alquiler",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      addedDate: "2024-10-03",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Todos");

  const handleRemoveFavorite = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta propiedad de favoritos?")) {
      setFavorites(favorites.filter((fav) => fav.id !== id));
    }
  };

  const filteredFavorites = favorites.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "Todos" || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const propertyTypes = ["Todos", "Apartamento", "Casa", "Penthouse", "Estudio", "Villa", "Loft"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="text-red-500" size={28} />
            Mis Favoritos
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {favorites.length} {favorites.length === 1 ? "propiedad guardada" : "propiedades guardadas"}
          </p>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por título o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filtro por Tipo */}
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Favoritos */}
      {filteredFavorites.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm || filterType !== "Todos"
                ? "Intenta cambiar los filtros de búsqueda"
                : "Aún no has agregado propiedades a favoritos"}
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Explorar Propiedades
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleRemoveFavorite(property.id)}
                  className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900 transition"
                  title="Eliminar de favoritos"
                >
                  <Heart size={20} fill="currentColor" />
                </button>
                <div className="absolute bottom-2 left-2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {property.status}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {property.type}
                  </span>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mt-1">
                    {property.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1">
                  <MapPin size={14} />
                  {property.location}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Bed size={14} />
                    {property.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={14} />
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize size={14} />
                    {property.area}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {property.price}
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Ver Detalles
                  </Button>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Agregado el {new Date(property.addedDate).toLocaleDateString("es-ES")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientFavorites;
