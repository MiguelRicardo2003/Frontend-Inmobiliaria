import React from 'react';
import { Building2, MapPin, User2, Home, ListOrdered } from 'lucide-react';

const ProjectCard = ({ 
  project, 
  isActive = false, 
  onClick, 
  showAddButton = false,
  onAddClick 
}) => {
  if (showAddButton) {
    return (
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-primary-300 rounded-xl p-5 cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all"
        onClick={onAddClick}
      >
        <span className="text-4xl text-primary-500  dark:text-white mb-2">+</span>
        <span className="text-primary-700 dark:text-white font-medium">Nueva sede</span>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-xl border shadow-sm p-5 transition-all cursor-pointer bg-white dark:bg-gray-800 hover:shadow-lg ${
        isActive 
          ? 'ring-2 ring-primary-500 border-primary-500' 
          : 'border-gray-200 dark:border-gray-700'
      }`}
      onClick={() => onClick(project.id)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-primary-400 dark:text-white" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {project.nombre}
          </h3>
        </div>
        {isActive && (
          <span className="text-xs bg-primary-100 dark:bg-primary-900 dark:text-white text-primary-700 px-2 py-1 rounded-full">
            Activa
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="font-medium">Ciudad:</span> {project.ciudad}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <MapPin className="w-4 h-4 text-green-400" />
          <span className="font-medium">Dirección:</span> {project.direccion}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <User2 className="w-4 h-4 text-amber-400" />
          <span className="font-medium">Responsable:</span> {project.responsable}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <ListOrdered className="w-4 h-4 text-purple-400" />
          <span className="font-medium">Propiedades:</span> {project.propiedades?.length || 0}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard; 