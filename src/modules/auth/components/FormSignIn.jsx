import Input from "../../../components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import useAuth from "../../../core/store/auth/useAuth";

const FormSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

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
        
        if (isAdmin) {
          console.log('Redirigiendo a dashboard (Administrador)');
          navigate('/dashboard');
        } else if (result.user?.rol === 'Cliente') {
          console.log('Redirigiendo a home (Cliente)');
          navigate('/'); // Página principal para clientes
        } else {
          console.log('Redirigiendo a dashboard (Rol por defecto):', result.user?.rol);
          navigate('/dashboard'); // Por defecto al dashboard para otros roles
        }
      } else {
        setError("root", { type: "server", message: result?.error || "Credenciales inválidas" });
      }
    } catch (error) {
      setError("root", { type: "server", message: error?.message || "Error al iniciar sesión" });
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-lg p-6 md:p-8 rounded-xl shadow-md bg-white">
      {/* Encabezado */}
      <div className="text-center space-y-1 mb-6">
        <div className="text-left text-sm text-gray-600">Bienvenido a JustHome</div>
        <h1 className="text-3xl md:text-4xl font-bold text-black">Iniciar sesión</h1>
      </div>

      <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
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
        <Link to="/forgotPassword" className="text-gray-600 font-medium hover:underline">
          Olvide la contraseña
        </Link>
      </div>

      <div className="text-sm text-center text-gray-400 mt-6">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
          Registrate
        </Link>
      </div>
    </div>
  );
};

export default FormSignIn;
