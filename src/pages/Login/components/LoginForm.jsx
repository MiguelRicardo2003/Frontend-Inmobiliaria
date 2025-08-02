import { useState } from "react";
import { useAuth } from "../../../core/store/auth/AuthContext";

const LoginForm = () => {
  const { login, error, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setFormError("Por favor, completa todos los campos.");
      return;
    }
    await login(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        autoComplete="username"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        autoComplete="current-password"
      />
      {(formError || error) && (
        <div className="text-red-600 text-sm">{formError || error}</div>
      )}
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
        disabled={isLoading}
      >
        {isLoading ? "Accediendo..." : "Acceder"}
      </button>
    </form>
  );
};

export default LoginForm;