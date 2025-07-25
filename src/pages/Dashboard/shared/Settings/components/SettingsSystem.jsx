import React, { useState } from "react";
import { Database } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../../../../components/ui/Admin/CardAdmin";

const SettingsSystem = ({ onLanguageChange, setAlert }) => {
  const [config, setConfig] = useState({
    timezone: "Europa/Londres",
    language: "English",
    currency: "Euro (€)",
    dateFormat: "DD/MM/YYYY",
    backup: false,
    maintenance: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "language" && value === "English" && onLanguageChange) {
        onLanguageChange("en");
      }
      return newConfig;
    });
  };

  const handleSubmit = () => {
    if (setAlert) {
      setAlert({ type: "success", message: "Configuración guardada correctamente" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
          <Database className="w-5 h-5" />
          Configuración del Sistema
        </div>
      </CardHeader>

      <CardContent className="dark:bg-gray-900 dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Zona Horaria */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Zona Horaria</label>
            <select
              name="timezone"
              value={config.timezone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md"
            >
              <option value="Europa/Londres">Europa/Londres</option>
              <option value="America/Bogota">América/Bogotá</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
            </select>
          </div>

          {/* Idioma */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Idioma</label>
            <select
              name="language"
              value={config.language}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md"
            >
              <option value="English">English</option>
              <option value="Español">Español</option>
            </select>
          </div>

          {/* Moneda */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Moneda</label>
            <select
              name="currency"
              value={config.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md"
            >
              <option value="Euro (€)">Euro (€)</option>
              <option value="USD ($)">USD ($)</option>
              <option value="COP ($)">COP ($)</option>
            </select>
          </div>

          {/* Formato Fecha */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Formato de Fecha</label>
            <select
              name="dateFormat"
              value={config.dateFormat}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        {/* Backup toggle */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold dark:text-white">Backup automático</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Realizar copias de seguridad diarias
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="backup"
                checked={config.backup}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        </div>

        {/* Botón Guardar */}
        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Guardar Configuración
        </button>
      </CardContent>
    </Card>
  );
};

export default SettingsSystem;
