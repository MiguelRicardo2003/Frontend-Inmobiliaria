import React from "react";
import { User, CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
} from "../../../../components/ui/Admin/CardAdmin";
import ImageUploader from "./ImageUploader";
import PersonalInfoForm from "./PersonalInfoForm";

const SettingsProfile = ({ profile, handleProfileChange, setAlert }) => {
  const handleImageChange = (file) => {
    // Lógica para actualizar imagen de perfil 
  };

  const handleSave = () => {
    // Validación simple
    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim() ||
      !profile.email.trim() ||
      !profile.phone.trim()
    ) {
      setAlert({
        type: "error",
        message: "Por favor completa todos los campos.",
      });
      return;
    }

    // Simula guardado exitoso
    setAlert({
      type: "success",
      message: "Cambios guardados correctamente.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
          <User className="w-5 h-5" /> Información del Perfil
        </div>
      </CardHeader>

      <CardContent className="space-y-6 dark:bg-gray-900 dark:text-white">
        {/* Carga de imagen */}
        <ImageUploader onChange={handleImageChange} />

        {/* Formulario de información */}
        <PersonalInfoForm
          form={{
            nombre: profile.firstName,
            apellidos: profile.lastName,
            email: profile.email,
            telefono: profile.phone,
          }}
          onChange={(e) => {
            const fieldMap = {
              nombre: "firstName",
              apellidos: "lastName",
              email: "email",
              telefono: "phone",
            };
            handleProfileChange({
              target: {
                id: fieldMap[e.target.name],
                value: e.target.value,
              },
            });
          }}
        />

        <div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsProfile;
