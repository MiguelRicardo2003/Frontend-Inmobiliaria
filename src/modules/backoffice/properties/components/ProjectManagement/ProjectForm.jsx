import React, { useState } from 'react';
import Input from '../../../../../components/ui/Input';
import Select from '../../../../../components/ui/Select';
import Button from '../../../../../components/ui/Button';
import useToast from '../../../../../services/Toast/useToast';

const ProjectForm = ({ onSubmit, onCancel, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState(initialData || {
    nombre: '',
    ciudad: '',
    direccion: '',
    responsable: '',
    estado: 'activo'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nombre?.trim() || !formData.ciudad?.trim() || !formData.direccion?.trim() || !formData.responsable?.trim()) {
      showError("Por favor completa todos los campos requeridos");
      return;
    }
    
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nombre de la sede"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Nombre de la sede"
        required
        autoFocus
      />
      
      <Input
        label="Ciudad"
        value={formData.ciudad}
        onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
        placeholder="Ciudad"
        required
      />
      
      <Input
        label="Dirección"
        value={formData.direccion}
        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
        placeholder="Dirección"
        required
      />
      
      <Input
        label="Responsable"
        value={formData.responsable}
        onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
        placeholder="Responsable"
        required
      />
      
      <div className="flex gap-2 mt-2 justify-end">
        <Button 
          type="button" 
          variant="danger" 
          className="h-12 flex items-center gap-2"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Agregar')}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm; 