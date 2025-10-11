import { useState } from 'react';
import { useAuth } from '../core/store/auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuthForm = (formType = 'login') => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la página de destino desde el estado de navegación
  const from = location.state?.from?.pathname || '/dashboard';

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El email es requerido';
    if (!emailRegex.test(email)) return 'El email no es válido';
    return null;
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return null;
  };

  // Validación de confirmación de contraseña
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Confirma tu contraseña';
    if (password !== confirmPassword) return 'Las contraseñas no coinciden';
    return null;
  };

  // Validación de nombre
  const validateName = (name) => {
    if (!name) return 'El nombre es requerido';
    if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres';
    return null;
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar email
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    // Validar contraseña
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    // Validaciones específicas según el tipo de formulario
    if (formType === 'register') {
      // Validar confirmación de contraseña
      const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
      if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

      // Validar nombre
      const nameError = validateName(formData.name);
      if (nameError) newErrors.name = nameError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Limpiar errores generales de autenticación
    clearError();
  };

  // Manejar envío del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar envío del formulario de registro
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      });

      if (result.success) {
        // Después del registro exitoso, hacer login automático
        const loginResult = await login({
          email: formData.email,
          password: formData.password
        });

        if (loginResult.success) {
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar envío del formulario según el tipo
  const handleSubmit = (e) => {
    if (formType === 'login') {
      handleLogin(e);
    } else if (formType === 'register') {
      handleRegister(e);
    }
  };

  // Limpiar formulario
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      rememberMe: false
    });
    setErrors({});
  };

  // Obtener el texto del botón según el estado
  const getButtonText = () => {
    if (isSubmitting) {
      return formType === 'login' ? 'Iniciando sesión...' : 'Registrando...';
    }
    return formType === 'login' ? 'Iniciar Sesión' : 'Registrarse';
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    getButtonText,
    from
  };
}; 