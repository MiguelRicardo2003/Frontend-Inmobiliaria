import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';

// Custom hooks
import { useProperties, useProjects, useFilters } from './hooks';

// Components
import ProjectCard from './components/ProjectManagement/ProjectCard';
import Statistics from './components/UI/Statistics';
import FilterBar from './components/UI/FilterBar';
import PropertyForm from './components/PropertyManagement/PropertyForm';
import PropertyDetail from './components/PropertyManagement/PropertyDetail';
import ProjectForm from './components/ProjectManagement/ProjectForm';
import ViewToggle from './components/UI/ViewToggle';
import PropertyTable from './components/PropertyManagement/PropertyTable';
import TrelloBoard from './components/TrelloBoard/TrelloBoard';

// Constants and utilities
import { statusOptions } from './constants';
import { validatePropertyForm } from './utils';

const PropertiesRefactored = () => {
  // Custom hooks
  const {
    properties,
    propertyForm,
    editProperty,
    showPropertyModal,
    showDetailModal,
    propertyToView,
    showDisableModal,
    propertyToDisable,
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
  } = useProperties();

  const {
    sedes,
    selectedProjectId,
    showAddProject,
    newProject,
    selectProject,
    openAddProjectModal,
    closeAddProjectModal,
    updateNewProject,
    addProject,
    getSelectedProject,
    getProjectStatistics,
    updateProjectProperties,
  } = useProjects();

  const {
    searchTerm,
    filterEstado,
    setSearchTerm,
    setFilterEstado,
    filterProperties,
    clearFilters,
    hasActiveFilters,
  } = useFilters();

  // Local state
  const [currentView, setCurrentView] = useState('table');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSedePage, setCurrentSedePage] = useState(1);

  // Pagination constants
  const SEDES_PER_PAGE = 4;

  // Get current project and its properties
  const currentProject = getSelectedProject();
  const currentProjectProperties = currentProject?.propiedades || [];
  const filteredProperties = filterProperties(currentProjectProperties);
  const stats = getProjectStatistics(currentProject);

  // --- PAGINACIÓN DE SEDES ---
  const totalSedesPages = Math.ceil(sedes.length / SEDES_PER_PAGE);
  const startIndex = (currentSedePage - 1) * SEDES_PER_PAGE;
  const endIndex = startIndex + SEDES_PER_PAGE;
  const sedesToShow = sedes.slice(startIndex, endIndex);

  const handleSedePageChange = (page) => {
    setCurrentSedePage(page);
  };

  // Load properties for current project
  useEffect(() => {
    if (currentProject) {
      setProperties(currentProject.propiedades || []);
    }
  }, [currentProject, setProperties]);

  // Handlers
  const handleAddProject = (formData) => {
    addProject(formData);
  };

  const handleSaveProperty = async (formData) => {
    setIsLoading(true);
    
    try {
      // Validate form
      const validation = validatePropertyForm(formData);
      if (!validation.isValid) {
        console.error('Validation errors:', validation.errors);
        return;
      }

      // Create or update property
      const newProperty = {
        ...formData,
        id: editProperty ? editProperty.id : Date.now(),
        sedeId: selectedProjectId,
      };

      if (editProperty) {
        // Update existing property
        const updatedProperties = properties.map(p => 
          p.id === editProperty.id ? newProperty : p
        );
        setProperties(updatedProperties);
        updateProjectProperties(selectedProjectId, updatedProperties);
      } else {
        // Add new property
        const updatedProperties = [...properties, newProperty];
        setProperties(updatedProperties);
        updateProjectProperties(selectedProjectId, updatedProperties);
      }

      closePropertyModal();
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProperty = (property) => {
    const updatedProperties = properties.filter(p => p.id !== property.id);
    setProperties(updatedProperties);
    updateProjectProperties(selectedProjectId, updatedProperties);
  };

  const handleDisableProperty = (property) => {
    openDisableModal(property);
  };

  const confirmDisableProperty = () => {
    if (propertyToDisable) {
      const updatedProperty = { ...propertyToDisable, estado: 'deshabilitada' };
      const updatedProperties = properties.map(p => 
        p.id === propertyToDisable.id ? updatedProperty : p
      );
      setProperties(updatedProperties);
      updateProjectProperties(selectedProjectId, updatedProperties);
    }
    closeDisableModal();
  };

  const handlePropertyMove = (propertyId, newStatus) => {
    const updatedProperties = properties.map(p => 
      p.id === propertyId ? { ...p, estado: newStatus } : p
    );
    setProperties(updatedProperties);
    updateProjectProperties(selectedProjectId, updatedProperties);
  };

  const handleViewProperty = (property) => {
    openDetailModal(property);
  };

  return (
    <div className="p-6">
      {/* Projects/Sedes Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Building2 className="w-6 h-6 text-primary-500" /> 
          Sedes
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sedesToShow.map((sede) => (
            <ProjectCard
              key={sede.id}
              project={sede}
              isActive={sede.id === selectedProjectId}
              onClick={selectProject}
            />
          ))}
          
          <ProjectCard
            showAddButton={true}
            onAddClick={openAddProjectModal}
          />
        </div>
        {/* Paginación de sedes - solo mostrar si hay más de 4 sedes */}
        {sedes.length > SEDES_PER_PAGE && (
          <div className="mt-6">
            <Pagination
              current={currentSedePage}
              total={totalSedesPages}
              onPageChange={handleSedePageChange}
            />
          </div>
        )}
      </div>

      {/* Statistics */}
      <Statistics stats={stats} />

      {/* View Toggle and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
        <ViewToggle 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
        
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterEstado={filterEstado}
          onFilterChange={setFilterEstado}
          onAddProperty={() => openPropertyModal()}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Content View */}
      {currentView === 'table' ? (
        <PropertyTable
          properties={filteredProperties}
          onView={handleViewProperty}
          onEdit={openPropertyModal}
          onDelete={handleDeleteProperty}
          onDisable={handleDisableProperty}
        />
      ) : (
        <div className="h-[600px]">
          <TrelloBoard
            properties={filteredProperties}
            onPropertyMove={handlePropertyMove}
            onPropertyEdit={openPropertyModal}
            onPropertyDelete={handleDeleteProperty}
            onAddProperty={(status) => {
              updatePropertyForm('estado', status);
              openPropertyModal();
            }}
          />
        </div>
      )}

      {/* Modals */}
      
      {/* Add Project Modal */}
      <Modal 
        isOpen={showAddProject} 
        onClose={closeAddProjectModal} 
        title="Crear nueva sede"
      >
        <ProjectForm
          formData={newProject}
          onFormChange={updateNewProject}
          onSubmit={handleAddProject}
          onCancel={closeAddProjectModal}
        />
      </Modal>

      {/* Property Form Modal */}
      <Modal 
        isOpen={showPropertyModal} 
        onClose={closePropertyModal} 
        title={editProperty ? "Editar propiedad" : "Nueva propiedad"} 
        size="xl"
      >
        <PropertyForm
          formData={propertyForm}
          onFormChange={updatePropertyForm}
          onNestedChange={updatePropertyFormNested}
          onAmenidadChange={updateAmenidades}
          onAddAmenidad={addAmenidad}
          onRemoveAmenidad={removeAmenidad}
          onImagesChange={updateImages}
          onSubmit={handleSaveProperty}
          onCancel={closePropertyModal}
          isEditing={!!editProperty}
          isLoading={isLoading}
        />
      </Modal>

      {/* Property Detail Modal */}
      <Modal 
        isOpen={showDetailModal} 
        onClose={closeDetailModal} 
        title={propertyToView ? (propertyToView.titulo || propertyToView.name) : "Detalles de propiedad"} 
        size="xl"
      >
        <PropertyDetail property={propertyToView} />
      </Modal>

      {/* Disable Property Confirmation Modal */}
      <Modal 
        isOpen={showDisableModal} 
        onClose={closeDisableModal} 
        title="Deshabilitar propiedad"
      >
        <div className="space-y-4">
          <p className="text-gray-900 dark:text-white">
            ¿Estás seguro que deseas deshabilitar la propiedad{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {propertyToDisable?.titulo || propertyToDisable?.name}
            </span>?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="danger" className="h-12 flex items-center gap-2" onClick={closeDisableModal}>
              Cancelar
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex items-center gap-2" onClick={confirmDisableProperty}>
              Deshabilitar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PropertiesRefactored; 