import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Camera, Save, X } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import useAuth from "../../../core/store/auth/useAuth";

const ClientProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
    direccion: "",
    ciudad: "",
    pais: "",
    codigo_postal: "",
    imagen_perfil: null,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correo: user.correo || "",
        celular: user.celular || "",
        direccion: "",
        ciudad: "",
        pais: "",
        codigo_postal: "",
        imagen_perfil: user.imagen_perfil || null,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          imagen_perfil: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Aquí implementarías la llamada a tu API
      // await updateUserProfile(profileData);
      
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      alert("Perfil actualizado correctamente");
      setIsEditing(false);
    } catch (error) {
      alert("Error al actualizar el perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Restaurar datos originales
    if (user) {
      setProfileData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correo: user.correo || "",
        celular: user.celular || "",
        direccion: "",
        ciudad: "",
        pais: "",
        codigo_postal: "",
        imagen_perfil: user.imagen_perfil || null,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Mi Perfil
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tu información personal
          </p>
        </div>
        <div className="space-x-2">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Editar Perfil
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="text-gray-600"
              >
                <X size={18} className="mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save size={18} className="mr-2" />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Foto de Perfil */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Foto de Perfil
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {profileData.imagen_perfil ? (
                      <img
                        src={profileData.imagen_perfil}
                        alt="Perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                    >
                      <Camera size={20} />
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {profileData.nombre} {profileData.apellido}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cliente
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Adicional */}
          <Card className="mt-6">
            <CardHeader className="bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Estadísticas
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Propiedades Favoritas
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    12
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Propiedades Vistas
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    45
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Búsquedas Guardadas
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    3
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información Personal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Información Personal
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre
                    </label>
                    <Input
                      name="nombre"
                      value={profileData.nombre}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={User}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Apellido
                    </label>
                    <Input
                      name="apellido"
                      value={profileData.apellido}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={User}
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                {/* Correo y Teléfono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Correo Electrónico
                    </label>
                    <Input
                      name="correo"
                      type="email"
                      value={profileData.correo}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={Mail}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teléfono
                    </label>
                    <Input
                      name="celular"
                      type="tel"
                      value={profileData.celular}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={Phone}
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dirección
                  </label>
                  <Input
                    name="direccion"
                    value={profileData.direccion}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    icon={MapPin}
                    placeholder="Calle, número, piso..."
                  />
                </div>

                {/* Ciudad, País y Código Postal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ciudad
                    </label>
                    <Input
                      name="ciudad"
                      value={profileData.ciudad}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Madrid"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      País
                    </label>
                    <Input
                      name="pais"
                      value={profileData.pais}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="España"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Código Postal
                    </label>
                    <Input
                      name="codigo_postal"
                      value={profileData.codigo_postal}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="28001"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cambio de Contraseña */}
          <Card className="mt-6">
            <CardHeader className="bg-white dark:bg-gray-800">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Seguridad
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Para cambiar tu contraseña, haz clic en el botón de abajo.
                </p>
                <Button variant="outline" className="w-full md:w-auto">
                  Cambiar Contraseña
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
