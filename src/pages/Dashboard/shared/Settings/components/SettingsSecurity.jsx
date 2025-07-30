import React, { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
} from "../../../../../components/ui/Admin/CardAdmin";

const SettingsSecurity = ({ security, handleInputChange, setSecurity, setAlert }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateFields = () => {
    const { password, newPassword, confirmPassword } = security;
    if (!password || !newPassword || !confirmPassword) {
      setAlert({ type: "error", message: "Por favor completa todos los campos." });
      return false;
    }
    if (newPassword !== confirmPassword) {
      setAlert({ type: "error", message: "Las nuevas contraseñas no coinciden." });
      return false;
    }
    setAlert({ type: "", message: "" });
    return true;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setAlert({ type: "success", message: "Contraseña actualizada exitosamente" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    }
  };

  const renderPasswordField = (id, label, value, show, setShow) => (
    <div className="space-y-2 relative">
      <label htmlFor={id} className="block text-sm font-medium dark:text-gray-300">
        {label}
      </label>
      <input
        type={show ? "text" : "password"}
        id={id}
        value={value}
        onChange={(e) => handleInputChange(e, security, setSecurity)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-[33px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );

  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
            <Shield className="w-5 h-5" />
            Seguridad de la Cuenta
          </div>
        </CardHeader>

        <CardContent className="space-y-4 max-w-2xl pt-6 dark:text-white">
          {renderPasswordField("password", "Contraseña Actual", security.password, showPassword, setShowPassword)}
          {renderPasswordField("newPassword", "Nueva Contraseña", security.newPassword, showNewPassword, setShowNewPassword)}
          {renderPasswordField("confirmPassword", "Confirmar Nueva Contraseña", security.confirmPassword, showConfirmPassword, setShowConfirmPassword)}

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Cambiar Contraseña
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSecurity;
