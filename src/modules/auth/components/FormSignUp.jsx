import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../core/store/auth/useAuth";

const FormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const onSubmit = async (data) => {
    const payload = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.email,
      celular: data.telefono,
      contrasenia: data.password,
      rol: 'agente inmobiliario',
    };

    try {
      const res = await (await import("../../../core/services/authService")).default.register(payload);
      if (res) {
        await login({ email: data.email, password: data.password });
      }
    } catch (error) {
      const message = error?.message || "Error al registrar";
      setError("root", { type: "server", message });
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
      <header className="text-center mb-8">
        <p className="text-gray-500 text-left mb-4">Bienvenido a JustHome</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro Deshabilitado</h1>
        <p className="text-sm text-gray-600">El registro de agentes lo realiza el administrador desde el panel.</p>
        <p className="text-sm text-gray-600">Si necesitas acceso, contacta al administrador.</p>
        <div className="mt-4">
          <Link to="/login" className="font-semibold text-brand-dark hover:underline">Ir a Iniciar Sesión</Link>
        </div>
      </header>

      <form className="w-full opacity-50 pointer-events-none" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            label="Nombre"
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="flex-1 border-2"
            {...register("nombre", { required: "Este campo es obligatorio" })}
          />
          <Input
            label="Apellido"
            type="text"
            name="apellido"
            placeholder="Apellido"
            className="flex-1 border-2"
            {...register("apellido", { required: "Este campo es obligatorio" })}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            className="flex-1 border-2"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          <Input
            label="Teléfono"
            type="tel"
            name="telefono"
            placeholder="Máximo 10 dígitos"
            className="flex-1 border-2"
            {...register("telefono", { required: "Este campo es obligatorio" })}
          />
        </div>

        {/* Campo de Contraseña con botón para mostrar/ocultar (centrado) */}
        <div className="mb-4">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={showPassword ? EyeOff : Eye}
            iconPosition="right"
            onIconClick={togglePasswordVisibility}
            className="border-2 pr-12" // reserva espacio para el icono
            {...register("password", { required: "Este campo es obligatorio" })}
          />
        </div>

        <div className="mb-6">
          <Input
            label="Confirmar Contraseña"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            icon={showConfirmPassword ? EyeOff : Eye}
            iconPosition="right"
            onIconClick={toggleConfirmPasswordVisibility}
            className="border-2 pr-12" // reserva espacio para el icono
            {...register("confirmPassword", {
              required: "Este campo es obligatorio",
            })}
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            id="terms"
            name="termsAccepted"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register("termsAccepted", {
              required: "Debes aceptar los términos y condiciones",
            })}
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            Aceptar{" "}
            <a
              href="/terms"
              className="font-medium text-blue-600 hover:underline"
            >
              Términos y Condiciones
            </a>
          </label>
        </div>

        {errors.root?.message && (
          <p className="text-sm text-red-600 mb-4">{errors.root.message}</p>
        )}

        <Button type="submit" className="w-full">
          Registrarse
        </Button>
      </form>
      <footer className="mt-6 text-sm text-center text-gray-500">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-dark hover:underline"
        >
          Inicia Sesión
        </Link>
      </footer>
    </div>
  );
};

export default FormSignUp;
