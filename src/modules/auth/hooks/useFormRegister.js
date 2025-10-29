import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "@core/store/auth/useAuth";

export const useFormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    // Validar que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { 
        type: "manual", 
        message: "Las contraseñas no coinciden" 
      });
      return;
    }

    setIsLoading(true);

    const payload = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.email,
      celular: data.telefono,
      contrasenia: data.password,
    };

    try {
      const authServiceModule = await import("../services/auth.service");
      const res = await authServiceModule.default.register(payload);
      
      if (res?.success) {
        // Mostrar mensaje de éxito
        alert(res.message || 'Usuario registrado correctamente. Redirigiendo...');
        
        // Después del registro exitoso, hacer login automático
        try {
          const loginResult = await login({ 
            correo: data.email, 
            contrasenia: data.password 
          });
          
          if (loginResult?.success) {
            // Redirigir al dashboard de cliente
            window.location.href = '/client/dashboard';
          }
        } catch (loginError) {
          console.error('Error en login automático:', loginError);
          // Si falla el login automático, redirigir a login manual
          window.location.href = '/login';
        }
      } else {
        setError("root", { 
          type: "server", 
          message: res.message || "Error al registrar" 
        });
      }
    } catch (error) {
      console.error('Error en registro:', error);
      const message = error?.message || "Error al registrar usuario";
      setError("root", { type: "server", message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Estados de visibilidad de contraseñas
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,

    // Estado de carga
    isLoading,

    // React Hook Form
    register,
    handleSubmit,
    errors,

    // Función de envío
    onSubmit,
  };
};
