import React, { useState } from 'react';
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Eye, EyeOff } from 'lucide-react';

const FormSignUp = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false, // 1. Añadir estado para el checkbox
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      // 2. Manejar el cambio para inputs de texto y checkboxes
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    // 3. Añadir validación para los términos y condiciones
    if (!formData.termsAccepted) {
      alert("Debes aceptar los Términos y Condiciones para registrarte.");
      return;
    }
    console.log('Datos del formulario:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          label="Nombre"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="flex-1"
        />
        <Input
          label="Apellido"
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="flex-1"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          className="flex-1"
        />
        <Input
          label="Teléfono"
          type="tel"
          name="telefono"
          placeholder="Máximo 10 dígitos"
          value={formData.telefono}
          onChange={handleChange}
          className="flex-1"
        />
      </div>

      {/* 3. Campo de Contraseña principal usando su propio estado y función */}
      <div className="relative mb-4">
        <Input
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-9 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* 4. Campo de Confirmar Contraseña usando su propio estado y función */}
      <div className="relative mb-6">
        <Input
          label="Confirmar Contraseña"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={toggleConfirmPasswordVisibility}
          className="absolute right-3 top-9 text-gray-500"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* 4. Añadir el checkbox de Términos y Condiciones */}
      <div className="flex items-center mb-6">
        <input
          id="terms"
          name="termsAccepted"
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          Aceptar <a href="/terms" className="font-medium text-blue-600 hover:underline">Términos y Condiciones</a>
        </label>
      </div>

      <Button type="submit" className="w-full">
        Registrarse
      </Button>
    </form>
  );
};

export default FormSignUp;
