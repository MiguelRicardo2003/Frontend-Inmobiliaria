import { useState, useCallback, useEffect } from 'react';
import propertyService from '../../../../core/services/propertyService.js';

// Initial property form structure
const initialProperty = {
  codigo: "",
  titulo: "",
  descripcion: "",
  tipo: "casa",
  operacion: "venta",
  precio: "",
  moneda: "USD",
  ubicacion: {
    direccion: "",
    ciudad: "",
    departamento: "",
    codigoPostal: "",
  },
  caracteristicas: {
    superficie: "",
    habitaciones: "",
    banos: "",
    garajes: "",
    antiguedad: "",
    estrato: "",
  },
  amenidades: [""],
  imagenes: [],
  estado: "disponible",
  propietario: {
    nombre: "",
    telefono: "",
    email: "",
  },
};

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [propertyForm, setPropertyForm] = useState(initialProperty);
  const [editProperty, setEditProperty] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [propertyToView, setPropertyToView] = useState(null);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [propertyToDisable, setPropertyToDisable] = useState(null);

  // Cargar propiedades al montar el componente
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAllTrelloProperties();
      setProperties(data.data || data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar propiedades:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPropertyForm = useCallback(() => {
    setPropertyForm(initialProperty);
    setEditProperty(null);
  }, []);

  const openPropertyModal = useCallback((property = null) => {
    if (property) {
      setPropertyForm({
        codigo: property.codigo || "",
        titulo: property.titulo || property.name || "",
        descripcion: property.descripcion || "",
        tipo: property.tipo || "casa",
        operacion: property.operacion || "venta",
        precio: property.precio || property.price || "",
        moneda: property.moneda || "USD",
        ubicacion: {
          direccion: property.ubicacion?.direccion || property.direccion || property.address || "",
          ciudad: property.ubicacion?.ciudad || "",
          departamento: property.ubicacion?.departamento || "",
          codigoPostal: property.ubicacion?.codigoPostal || "",
        },
        caracteristicas: {
          superficie: property.caracteristicas?.superficie || property.metros_cuadrados || "",
          habitaciones: property.caracteristicas?.habitaciones || property.habitaciones || "",
          banos: property.caracteristicas?.banos || property.banos || "",
          garajes: property.caracteristicas?.garajes || "",
          antiguedad: property.caracteristicas?.antiguedad || "",
          estrato: property.caracteristicas?.estrato || "",
        },
        amenidades: property.amenidades || [""],
        imagenes: property.imagenes || [],
        estado: property.estado || "disponible",
        propietario: {
          nombre: property.propietario?.nombre || "",
          telefono: property.propietario?.telefono || "",
          email: property.propietario?.email || "",
        },
      });
      setEditProperty(property);
    } else {
      resetPropertyForm();
    }
    setShowPropertyModal(true);
  }, [resetPropertyForm]);

  const closePropertyModal = useCallback(() => {
    setShowPropertyModal(false);
    resetPropertyForm();
  }, [resetPropertyForm]);

  const openDetailModal = useCallback((property) => {
    setPropertyToView(property);
    setShowDetailModal(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setShowDetailModal(false);
    setPropertyToView(null);
  }, []);

  const openDisableModal = useCallback((property) => {
    setPropertyToDisable(property);
    setShowDisableModal(true);
  }, []);

  const closeDisableModal = useCallback(() => {
    setShowDisableModal(false);
    setPropertyToDisable(null);
  }, []);

  const updatePropertyForm = useCallback((field, value) => {
    setPropertyForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const updatePropertyFormNested = useCallback((section, field, value) => {
    setPropertyForm(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  }, []);

  const updateAmenidades = useCallback((index, value) => {
    setPropertyForm(prev => {
      const newAmenidades = [...prev.amenidades];
      newAmenidades[index] = value;
      return { ...prev, amenidades: newAmenidades };
    });
  }, []);

  const addAmenidad = useCallback(() => {
    setPropertyForm(prev => ({
      ...prev,
      amenidades: [...prev.amenidades, ""]
    }));
  }, []);

  const removeAmenidad = useCallback((index) => {
    setPropertyForm(prev => ({
      ...prev,
      amenidades: prev.amenidades.filter((_, i) => i !== index)
    }));
  }, []);

  const updateImages = useCallback((images) => {
    setPropertyForm(prev => ({ ...prev, imagenes: images }));
  }, []);

  const saveProperty = useCallback(async (propertyData) => {
    try {
      setLoading(true);
      let savedProperty;
      
      if (editProperty) {
        savedProperty = await propertyService.updateTrelloProperty(editProperty.id, propertyData);
        setProperties(prev => prev.map(p => p.id === editProperty.id ? savedProperty : p));
      } else {
        savedProperty = await propertyService.createTrelloProperty(propertyData);
        setProperties(prev => [...prev, savedProperty]);
      }
      
      closePropertyModal();
      return savedProperty;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [editProperty, closePropertyModal]);

  const deleteProperty = useCallback(async (propertyId) => {
    try {
      setLoading(true);
      await propertyService.deleteTrelloProperty(propertyId);
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      closeDisableModal();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [closeDisableModal]);

  return {
    // State
    properties,
    loading,
    error,
    propertyForm,
    editProperty,
    showPropertyModal,
    showDetailModal,
    propertyToView,
    showDisableModal,
    propertyToDisable,
    
    // Actions
    loadProperties,
    saveProperty,
    deleteProperty,
    setProperties,
    resetPropertyForm,
    openPropertyModal,
    closePropertyModal,
    openDetailModal,
    closeDetailModal,
    openDisableModal,
    closeDisableModal,
    updatePropertyForm,
    updatePropertyFormNested,
    updateAmenidades,
    addAmenidad,
    removeAmenidad,
    updateImages,
  };
}; 