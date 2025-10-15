import React, { useState, useEffect } from "react";
import Button from "../../../../components/ui/Button";

const EditUserModal = ({ user, onClose, onSubmit, roles = [] }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    contrasenia: '',
    rol_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        correo: user.correo || '',
        celular: user.celular || '',
        contrasenia: '',
        rol_id: user.rol?.id || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.correo.trim()) newErrors.correo = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = 'El correo no es válido';
    if (!formData.celular.trim()) newErrors.celular = 'El teléfono es requerido';
    if (!formData.rol_id) newErrors.rol_id = 'El rol es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Solo incluir contraseña si se proporcionó una nueva
      const updateData = { ...formData };
      if (!updateData.contrasenia) {
        delete updateData.contrasenia;
      }
      
      await onSubmit({ ...user, ...updateData });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Editar Usuario
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.nombre ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.apellido ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
          </div>

          <div>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.correo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="celular"
              placeholder="Teléfono"
              value={formData.celular}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400 ${
                errors.celular ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.celular && <p className="text-red-500 text-xs mt-1">{errors.celular}</p>}
          </div>

          <div>
            <input
              type="password"
              name="contrasenia"
              placeholder="Nueva contraseña (opcional)"
              value={formData.contrasenia}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-400"
            />
            <p className="text-xs text-gray-500 mt-1">Dejar vacío para mantener la contraseña actual</p>
          </div>

          <div>
            <select
              name="rol_id"
              value={formData.rol_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border text-sm text-gray-700 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.rol_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Seleccionar Rol</option>
              {roles.map(rol => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre}
                </option>
              ))}
            </select>
            {errors.rol_id && <p className="text-red-500 text-xs mt-1">{errors.rol_id}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            type="button"
            variant="outline" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? 'Actualizando...' : 'Actualizar Usuario'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
