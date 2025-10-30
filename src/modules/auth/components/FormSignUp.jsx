import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../core/store/auth/useAuth";
import useToast from "../../../shared/hooks/useToast";
import ToastContainer from "../../../components/ui/ToastContainer";
import authService from "../services/auth.service";

const FormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toasts, showSuccess, showError, removeToast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data, event) => {
    // Prevenir el comportamiento por defecto del formulario
    if (event) {
      event.preventDefault();
    }

    // Validar que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "Las contraseñas no coinciden" });
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
      const res = await authService.register(payload);
      
      if (res?.success) {
        // Mostrar toast de éxito
        showSuccess('¡Usuario registrado correctamente! Iniciando sesión...', 3000);
        
        // Después del registro exitoso, hacer login automático
        try {
          const loginResult = await login({ correo: data.email, contrasenia: data.password });
          if (loginResult?.success) {
            // Redirigir al dashboard de cliente (los usuarios registrados son clientes por defecto)
            setTimeout(() => {
              navigate('/client/dashboard');
            }, 1000);
          }
        } catch (loginError) {
          console.error('Error en login automático:', loginError);
          showError('Registro exitoso. Por favor inicia sesión manualmente.', 5000);
          // Si falla el login automático, redirigir a login manual
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } else {
        showError(res.message || 'Error al registrar usuario', 5000);
        setError("root", { type: "server", message: res.message || "Error al registrar" });
      }
    } catch (error) {
      console.error('Error en registro:', error);
      const message = error?.message || "Error al registrar usuario";
      showError(message, 5000);
      setError("root", { type: "server", message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleSubmit(onSubmit)(event);
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <div className="w-full max-w-md p-4 rounded-xl shadow-md bg-white max-h-[90vh] overflow-y-auto">
        {/* Encabezado */}
        <div className="text-center space-y-1 mb-4">
          <div className="text-left text-sm text-gray-600">Bienvenido a JustHome</div>
          <h1 className="text-2xl font-bold text-black">Crear cuenta</h1>
        </div>

        <form id="register-form" onSubmit={handleFormSubmit} className="grid gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              label="Nombre"
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="flex-1 border-2 text-sm"
              {...register("nombre", { required: "Este campo es obligatorio" })}
              error={errors.nombre?.message}
            />
            <Input
              label="Apellido"
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="flex-1 border-2 text-sm"
              {...register("apellido", { required: "Este campo es obligatorio" })}
              error={errors.apellido?.message}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              className="flex-1 border-2 text-sm"
              {...register("email", { 
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido"
                }
              })}
              error={errors.email?.message}
            />
            <Input
              label="Teléfono"
              type="tel"
              name="telefono"
              placeholder="Máximo 10 dígitos"
              className="flex-1 border-2 text-sm"
              {...register("telefono", { required: "Este campo es obligatorio" })}
              error={errors.telefono?.message}
            />
          </div>

          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={showPassword ? EyeOff : Eye}
            iconPosition="right"
            onIconClick={togglePasswordVisibility}
            className="border-2 text-sm"
            {...register("password", { required: "Este campo es obligatorio" })}
            error={errors.password?.message}
          />

          <Input
            label="Confirmar Contraseña"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            icon={showConfirmPassword ? EyeOff : Eye}
            iconPosition="right"
            onIconClick={toggleConfirmPasswordVisibility}
            className="border-2 text-sm"
            {...register("confirmPassword", {
              required: "Este campo es obligatorio",
            })}
            error={errors.confirmPassword?.message}
          />

          <div className="flex items-center">
            <input
              id="terms"
              name="termsAccepted"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register("termsAccepted", {
                required: "Debes aceptar los términos y condiciones",
              })}
            />
            <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
              Aceptar{" "}
              <a
                href="/terms"
                className="font-medium text-blue-600 hover:underline"
              >
                Términos y Condiciones
              </a>
            </label>
          </div>
          {errors.termsAccepted?.message && (
            <p className="text-xs text-red-600 -mt-1">{errors.termsAccepted.message}</p>
          )}

          {errors.root?.message && (
            <p className="text-xs text-red-600 -mt-1">{errors.root.message}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-2 rounded-lg font-semibold transition text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>

        <div className="text-xs text-center text-gray-400 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </>
  );
};

export default FormSignUp;
