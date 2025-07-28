import { useState, useCallback } from 'react';

// Initial project data
const initialSedes = [
  {
    id: 1,
    nombre: "Sede Principal",
    ciudad: "Medellín",
    direccion: "Cra 1 #23-45",
    responsable: "Juan Pérez",
    propiedades: [
      { id: 1, name: "Casa 1", address: "Calle 123", price: 100000, estado: "disponible" },
      { id: 2, name: "Depto 2", address: "Av. Central 456", price: 80000, estado: "en_proceso" },
    ],
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    ciudad: "Bogotá",
    direccion: "Av. Norte 101",
    responsable: "Ana Gómez",
    propiedades: [
      { id: 3, name: "Casa 3", address: "Calle 789", price: 120000, estado: "vendida" },
      { id: 4, name: "Depto 4", address: "Av. Sur 101", price: 90000, estado: "arrendada" },
    ],
  },
  {
    id: 3,
    nombre: "Sucursal Sur",
    ciudad: "Cali",
    direccion: "Cra 15 #67-89",
    responsable: "Carlos López",
    propiedades: [
      { id: 5, name: "Casa 5", address: "Calle 321", price: 95000, estado: "disponible" },
      { id: 6, name: "Depto 6", address: "Av. Occidental 202", price: 75000, estado: "disponible" },
    ],
  },
  {
    id: 4,
    nombre: "Sucursal Este",
    ciudad: "Barranquilla",
    direccion: "Cra 45 #12-34",
    responsable: "María Rodríguez",
    propiedades: [
      { id: 7, name: "Casa 7", address: "Calle 456", price: 110000, estado: "en_proceso" },
      { id: 8, name: "Depto 8", address: "Av. Oriental 303", price: 85000, estado: "disponible" },
    ],
  },
  {
    id: 5,
    nombre: "Sucursal Oeste",
    ciudad: "Cartagena",
    direccion: "Cra 78 #90-12",
    responsable: "Pedro Martínez",
    propiedades: [
      { id: 9, name: "Casa 9", address: "Calle 789", price: 130000, estado: "vendida" },
      { id: 10, name: "Depto 10", address: "Av. Costera 404", price: 95000, estado: "arrendada" },
    ],
  },
  {
    id: 6,
    nombre: "Sucursal Centro",
    ciudad: "Pereira",
    direccion: "Cra 23 #45-67",
    responsable: "Laura Silva",
    propiedades: [
      { id: 11, name: "Casa 11", address: "Calle 654", price: 88000, estado: "disponible" },
      { id: 12, name: "Depto 12", address: "Av. Central 505", price: 72000, estado: "disponible" },
    ],
  },
];

const initialNewProject = {
  nombre: "",
  ciudad: "",
  direccion: "",
  responsable: "",
};

export const useProjects = () => {
  const [sedes, setSedes] = useState(initialSedes);
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState(initialNewProject);

  const selectProject = useCallback((projectId) => {
    setSelectedProjectId(projectId);
  }, []);

  const openAddProjectModal = useCallback(() => {
    setShowAddProject(true);
    setNewProject(initialNewProject);
  }, []);

  const closeAddProjectModal = useCallback(() => {
    setShowAddProject(false);
    setNewProject(initialNewProject);
  }, []);

  const updateNewProject = useCallback((field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  }, []);

  const addProject = useCallback((projectData) => {
    const newProjectWithId = {
      ...projectData,
      id: Date.now(), // Simple ID generation for demo
      propiedades: [],
    };
    setSedes(prev => [...prev, newProjectWithId]);
    closeAddProjectModal();
  }, [closeAddProjectModal]);

  const getSelectedProject = useCallback(() => {
    return sedes.find(sede => sede.id === selectedProjectId);
  }, [sedes, selectedProjectId]);

  const getProjectStatistics = useCallback((project) => {
    if (!project) return { total: 0, disponibles: 0, arrendadas: 0, vendidas: 0 };
    
    const total = project.propiedades.length;
    const disponibles = project.propiedades.filter(p => p.estado === "disponible").length;
    const arrendadas = project.propiedades.filter(p => p.estado === "arrendada").length;
    const vendidas = project.propiedades.filter(p => p.estado === "vendida").length;
    
    return { total, disponibles, arrendadas, vendidas };
  }, []);

  const updateProjectProperties = useCallback((projectId, properties) => {
    setSedes(prev => prev.map(sede => 
      sede.id === projectId 
        ? { ...sede, propiedades: properties }
        : sede
    ));
  }, []);

  return {
    // State
    sedes,
    selectedProjectId,
    showAddProject,
    newProject,
    
    // Actions
    selectProject,
    openAddProjectModal,
    closeAddProjectModal,
    updateNewProject,
    addProject,
    getSelectedProject,
    getProjectStatistics,
    updateProjectProperties,
  };
}; 