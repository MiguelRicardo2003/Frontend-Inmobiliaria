import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "@core/store/auth/useAuth";

export const useFormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const result = await login({ correo: data.email, contrasenia: data.password });
      
      if (result?.success) {
        // Redirigir según el rol del usuario
        console.log('Usuario logueado:', result.user); // Para debug
        
        // Verificar si es administrador (diferentes variaciones posibles)
        const isAdmin = result.user?.rol === 'Administrador' || 
                       result.user?.rol === 'Admin' || 
                       result.user?.rol === 'administrador' ||
                       result.user?.rol?.toLowerCase() === 'administrador';
        
        const isAgent = result.user?.rol === 'Agente' ||
                       result.user?.rol === 'agente' ||
                       result.user?.rol?.toLowerCase() === 'agente';
        
        if (isAdmin) {
          console.log('Redirigiendo a dashboard (Administrador)');
          navigate('/dashboard');
        } else if (isAgent) {
          console.log('Redirigiendo a dashboard (Agente)');
          navigate('/agent/dashboard');
        } else if (result.user?.rol === 'Cliente') {
          console.log('Redirigiendo a dashboard de cliente');
          navigate('/client/dashboard');
        } else {
          console.log('Redirigiendo a dashboard de cliente (Rol por defecto):', result.user?.rol);
          navigate('/client/dashboard'); // Por defecto al dashboard de cliente
        }
      } else {
        setError("root", { type: "server", message: result?.error || "Credenciales inválidas" });
      }
    } catch (error) {
      setError("root", { type: "server", message: error?.message || "Error al iniciar sesión" });
    }
  };

  return {
    // Estado de visibilidad de contraseña
    showPassword,
    togglePasswordVisibility,

    // React Hook Form
    register,
    handleSubmit,
    errors,

    // Función de envío
    onSubmit,
  };
};
