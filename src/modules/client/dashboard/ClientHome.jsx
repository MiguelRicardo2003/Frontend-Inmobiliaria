import React from "react";
import { Heart, Eye, MessageSquare, Bell, Building2, Search } from "lucide-react";
import StatCard from "../../../components/ui/StatCard";
import Button from "../../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";

const ClientDashboard = () => {
  // Datos de ejemplo
  const stats = {
    favorites: {
      total: 12,
      trend: { value: 3, isPositive: true },
    },
    viewed: {
      total: 45,
      trend: { value: 8, isPositive: true },
    },
    messages: {
      total: 5,
      unread: 2,
      trend: { value: 2, isPositive: true },
    },
    notifications: {
      total: 8,
      trend: { value: 3, isPositive: true },
    },
  };

  // Propiedades favoritas recientes
  const recentFavorites = [
    {
      id: 1,
      title: "Apartamento Moderno en Centro",
      location: "Madrid, España",
      price: "€350,000",
      bedrooms: 3,
      bathrooms: 2,
      area: "120 m²",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    },
    {
      id: 2,
      title: "Casa con Jardín",
      location: "Barcelona, España",
      price: "€480,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "200 m²",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
    },
    {
      id: 3,
      title: "Penthouse de Lujo",
      location: "Valencia, España",
      price: "€650,000",
      bedrooms: 3,
      bathrooms: 2,
      area: "180 m²",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    },
  ];

  // Notificaciones recientes
  const recentNotifications = [
    {
      id: 1,
      type: "price_drop",
      message: "Bajada de precio en Apartamento Moderno en Centro",
      time: "Hace 2 horas",
      icon: "💰",
    },
    {
      id: 2,
      type: "new_message",
      message: "Nuevo mensaje del agente sobre Casa con Jardín",
      time: "Hace 5 horas",
      icon: "💬",
    },
    {
      id: 3,
      type: "new_property",
      message: "Nueva propiedad que coincide con tus preferencias",
      time: "Hace 1 día",
      icon: "🏠",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Bienvenido de nuevo
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Aquí está tu resumen de actividad inmobiliaria
          </p>
        </div>
        <div className="space-x-2 sm:gap-2 flex">
          <Button variant="outline" className="h-12 flex items-center gap-2">
            <Search size={18} />
            Buscar Propiedades
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Mis Favoritos"
          value={stats.favorites.total.toString()}
          icon={<Heart size={20} />}
          trend={stats.favorites.trend}
        />
        <StatCard
          title="Propiedades Vistas"
          value={stats.viewed.total.toString()}
          icon={<Eye size={20} />}
          trend={stats.viewed.trend}
        />
        <StatCard
          title="Mensajes"
          value={`${stats.messages.unread}/${stats.messages.total}`}
          icon={<MessageSquare size={20} />}
          trend={stats.messages.trend}
        />
        <StatCard
          title="Notificaciones"
          value={stats.notifications.total.toString()}
          icon={<Bell size={20} />}
          trend={stats.notifications.trend}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Favoritos Recientes */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex justify-between items-center bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Heart size={20} className="text-red-500" />
                Mis Favoritos Recientes
              </h3>
              <Button variant="link" className="text-blue-600 text-sm">
                Ver todos
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFavorites.map((property) => (
                  <div
                    key={property.id}
                    className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {property.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        📍 {property.location}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>🛏️ {property.bedrooms} hab</span>
                        <span>🚿 {property.bathrooms} baños</span>
                        <span>📏 {property.area}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {property.price}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notificaciones */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Bell size={20} className="text-yellow-500" />
                Notificaciones
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="flex gap-3">
                      <span className="text-2xl">{notification.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="w-full text-blue-600 text-sm mt-2">
                  Ver todas las notificaciones
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Búsqueda Rápida */}
      <Card>
        <CardHeader className="bg-white dark:bg-gray-800">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Building2 size={20} className="text-blue-500" />
            Búsqueda Rápida
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                placeholder="Madrid, Barcelona..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <option>Todos</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Penthouse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Precio Máximo
              </label>
              <input
                type="number"
                placeholder="€500,000"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full h-[42px] bg-blue-600 hover:bg-blue-700 text-white">
                <Search size={18} className="mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
