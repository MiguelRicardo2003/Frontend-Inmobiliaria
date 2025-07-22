import { useState } from "react";
import PersonalInfoForm from "./components/PersonalInfoForm";
import PasswordChangeForm from "./components/PasswordChangeForm";

const Settings = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
  });

  const [passwords, setPasswords] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se envian los datos al backend
    console.log("Datos guardados:", form);
    console.log("Contraseñas:", passwords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Ajustes del Administrador
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tu perfil y configuración de cuenta.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <PersonalInfoForm form={form} onChange={handlePersonalChange} />
        <PasswordChangeForm passwords={passwords} onChange={handlePasswordChange} />
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
