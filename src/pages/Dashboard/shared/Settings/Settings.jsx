import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import SettingsProfile from "./components/SettingsProfile";
import SettingsNotifications from "./components/SettingsNotifications";
import SettingsSecurity from "./components/SettingsSecurity";
import SettingsSystem from "./components/SettingsSystem";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../components/ui/Tabs";

const Settings = () => {
  const [tab, setTab] = useState("profile");

  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "Usuario",
    email: "admin@inmobiliaria.com",
    phone: "+34 600 123 456",
  });

  const [notifications, setNotifications] = useState({
    clientes: true,
    propiedades: true,
    mensajes: true,
    citas: true,
    reportes: false,
  });

  const [security, setSecurity] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
    twoFA: false,
  });

  const [system, setSystem] = useState({
    timezone: "europe/madrid",
    language: "es",
    currency: "eur",
    dateFormat: "dd/mm/yyyy",
    backup: true,
    maintenance: false,
  });

  const [profileAlert, setProfileAlert] = useState({ type: "", message: "" });
  const [securityAlert, setSecurityAlert] = useState({ type: "", message: "" });
  const [systemAlert, setSystemAlert] = useState({ type: "", message: "" });

  // Ocultar alertas automáticamente
  useEffect(() => {
    if (profileAlert.message) {
      const timeout = setTimeout(() => {
        setProfileAlert({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [profileAlert.message]);

  useEffect(() => {
    if (securityAlert.message) {
      const timeout = setTimeout(() => {
        setSecurityAlert({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [securityAlert.message]);

  useEffect(() => {
    if (systemAlert.message) {
      const timeout = setTimeout(() => {
        setSystemAlert({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [systemAlert.message]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSwitch = (key, section) => (e) => {
    if (section === "notifications")
      setNotifications({ ...notifications, [key]: e.target.checked });
    if (section === "security")
      setSecurity({ ...security, [key]: e.target.checked });
    if (section === "system") setSystem({ ...system, [key]: e.target.checked });
  };

  const handleInputChange = (e, section, setSection) => {
    setSection({ ...section, [e.target.id]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ajustes del Administrador
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configuración del sistema y preferencias
          </p>
        </div>

        {/* Alertas con soporte dark */}
        {tab === "profile" && profileAlert.message && (
          <div
            className={`ml-4 px-4 py-2 rounded-md flex items-center gap-2 shadow-md border
              ${
                profileAlert.type === "success"
                  ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                  : ""
              }
              ${
                profileAlert.type === "error"
                  ? "bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
                  : ""
              }
          `}
          >
            {profileAlert.type === "success" && <CheckCircle size={18} />}
            {profileAlert.type === "error" && <XCircle size={18} />}
            {profileAlert.message}
          </div>
        )}

        {tab === "security" && securityAlert.message && (
          <div
            className={`ml-4 px-4 py-2 rounded-md flex items-center gap-2 shadow-md border
              ${
                securityAlert.type === "success"
                  ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                  : ""
              }
              ${
                securityAlert.type === "error"
                  ? "bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
                  : ""
              }
          `}
          >
            {securityAlert.type === "success" && <CheckCircle size={18} />}
            {securityAlert.type === "error" && <XCircle size={18} />}
            {securityAlert.message}
          </div>
        )}

        {tab === "system" && systemAlert.message && (
          <div
            className={`ml-4 px-4 py-2 rounded-md flex items-center gap-2 shadow-md border
              ${
                systemAlert.type === "success"
                  ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                  : ""
              }
              ${
                systemAlert.type === "error"
                  ? "bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
                  : ""
              }
          `}
          >
            {systemAlert.type === "success" && <CheckCircle size={18} />}
            {systemAlert.type === "error" && <XCircle size={18} />}
            {systemAlert.message}
          </div>
        )}
      </div>

      <Tabs value={tab} onChange={setTab}>
        <TabsList value={tab} onChange={setTab}>
          <TabsTrigger tab="profile">Perfil</TabsTrigger>
          <TabsTrigger tab="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger tab="security">Seguridad</TabsTrigger>
          <TabsTrigger tab="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent tab="profile" value={tab}>
          <SettingsProfile
            profile={profile}
            handleProfileChange={handleProfileChange}
            setAlert={setProfileAlert}
          />
        </TabsContent>

        <TabsContent tab="notifications" value={tab}>
          <SettingsNotifications
            notifications={notifications}
            handleSwitch={handleSwitch}
          />
        </TabsContent>

        <TabsContent tab="security" value={tab}>
          <SettingsSecurity
            security={security}
            handleInputChange={handleInputChange}
            setSecurity={setSecurity}
            setAlert={setSecurityAlert}
          />
        </TabsContent>

        <TabsContent tab="system" value={tab}>
          <SettingsSystem
            system={system}
            handleInputChange={{ ...handleInputChange, setSystem }}
            handleSwitch={handleSwitch}
            setAlert={setSystemAlert}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
