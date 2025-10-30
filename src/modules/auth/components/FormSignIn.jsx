import Input from "@components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@components/ui/Button";
import useAuth from "../../../core/store/auth/useAuth";
import useToast from "../../../shared/hooks/useToast";
import ToastContainer from "../../../components/ui/ToastContainer";

const FormSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toasts, showSuccess, showError, removeToast } = useToast();

  const onSubmit = async (data, event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const result = await login({ correo: data.email, contrasenia: data.password });
      if (result?.success) {
        showSuccess('¡Inicio de sesión exitoso! Redirigiendo...', 3000);
        console.log('Usuario logueado:', result.user);
        
        const isAdmin = result.user?.rol === 'Administrador' || 
                       result.user?.rol === 'Admin' || 
                       result.user?.rol === 'administrador' ||
                       result.user?.rol?.toLowerCase() === 'administrador';
        
        const isAgent = result.user?.rol === 'Agente' ||
                       result.user?.rol === 'agente' ||
                       result.user?.rol?.toLowerCase() === 'agente';
        
        setTimeout(() => {
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
            navigate('/client/dashboard');
          }
        }, 1000);
      } else {
        showError(result?.error || 'Credenciales inválidas', 5000);
        setError("root", { type: "server", message: result?.error || "Credenciales inválidas" });
      }
    } catch (error) {
      console.error('Error en login:', error);
      showError(error?.message || 'Error al iniciar sesión', 5000);
      setError("root", { type: "server", message: error?.message || "Error al iniciar sesión" });
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
      <div className="w-full max-w-md md:max-w-lg p-6 md:p-8 rounded-xl shadow-md bg-white">
        <div className="text-center space-y-1 mb-6">
          <div className="text-left text-sm text-gray-600">Bienvenido a JustHome</div>
          <h1 className="text-3xl md:text-4xl font-bold text-black">Iniciar sesión</h1>
        </div>

        <form id="login-form" onSubmit={handleFormSubmit} className="grid gap-5">
          <Input
            label="Ingresa tu correo electronico"
            type="email"
            placeholder="Correo Electrónico"
            className="border-2"
            {...register("email", {
              required: "El correo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico inválido"
              }
            })}
            error={errors.email?.message}
          />

          <Input
            label="Introduce la contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            icon={showPassword ? EyeOff : Eye}
            iconPosition="right"
            onIconClick={() => setShowPassword(!showPassword)}
            className="border-2"
            {...register("password", {
              required: "La contraseña es requerida"
            })}
            error={errors.password?.message}
          />

          {errors.root?.message && (
            <p className="text-sm text-red-600 -mt-2">{errors.root.message}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 rounded-lg font-semibold transition"
          >
            Acceder
          </Button>
        </form>

        <div className="text-xs text-right mt-3">
          <Link to="/forgot-password" className="text-gray-600 font-medium hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="text-sm text-center text-gray-400 mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
            Registrate
          </Link>
        </div>
      </div>
    </>
  );
};

export default FormSignIn;
