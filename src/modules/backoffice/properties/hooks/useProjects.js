import { useState, useCallback, useEffect } from 'react';
import projectService from '../../../../core/services/projectService.js';

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState(initialNewProject);
  const [editProject, setEditProject] = useState(null);

  // Cargar proyectos al montar el componente
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getAllProjects();
      setProjects(data.data || data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar proyectos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const saveProject = useCallback(async (projectData) => {
    try {
      setLoading(true);
      let savedProject;
      
      if (editProject) {
        savedProject = await projectService.updateProject(editProject.id, projectData);
        setProjects(prev => prev.map(p => p.id === editProject.id ? savedProject : p));
      } else {
        savedProject = await projectService.createProject(projectData);
        setProjects(prev => [...prev, savedProject]);
      }
      
      closeAddProjectModal();
      return savedProject;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [editProject, closeAddProjectModal]);

  const addProject = useCallback((projectData) => {
    const newProjectWithId = {
      ...projectData,
      id: Date.now(), // Simple ID generation for demo
      propiedades: [],
    };
    setProjects(prev => [...prev, newProjectWithId]);
    closeAddProjectModal();
  }, [closeAddProjectModal]);

  const getSelectedProject = useCallback(() => {
    return projects.find(project => project.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  const getProjectStatistics = useCallback((project) => {
    if (!project) return { total: 0, disponibles: 0, arrendadas: 0, vendidas: 0 };
    
    const total = project.propiedades?.length || 0;
    const disponibles = project.propiedades?.filter(p => p.estado === "disponible").length || 0;
    const arrendadas = project.propiedades?.filter(p => p.estado === "arrendada").length || 0;
    const vendidas = project.propiedades?.filter(p => p.estado === "vendida").length || 0;
    
    return { total, disponibles, arrendadas, vendidas };
  }, []);

  const updateProjectProperties = useCallback((projectId, properties) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, propiedades: properties }
        : project
    ));
  }, []);

  return {
    // State
    projects,
    loading,
    error,
    selectedProjectId,
    showAddProject,
    newProject,
    editProject,
    
    // Actions
    loadProjects,
    saveProject,
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