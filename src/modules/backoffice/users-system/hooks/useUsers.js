import { useState, useEffect } from 'react';
import userService from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await userService.getUsers();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error inesperado al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Cargar roles
  const loadRoles = async () => {
    try {
      const result = await userService.getRoles();
      if (result.success) {
        setRoles(result.data);
      }
    } catch (err) {
      console.error('Error cargando roles:', err);
    }
  };

  // Crear usuario
  const createUser = async (userData) => {
    try {
      const result = await userService.createUser(userData);
      if (result.success) {
        setUsers(prev => [...prev, result.data]);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Error inesperado al crear usuario' };
    }
  };

  // Actualizar usuario
  const updateUser = async (id, userData) => {
    try {
      
      const result = await userService.updateUser(id, userData);
      
      if (result.success) {
        setUsers(prev => prev.map(user => 
          user.id === id ? result.data : user
        ));
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Error inesperado al actualizar usuario' };
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    try {
      const result = await userService.deleteUser(id);
      if (result.success) {
        setUsers(prev => prev.filter(user => user.id !== id));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Error inesperado al eliminar usuario' };
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  return {
    users,
    roles,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser
  };
};
