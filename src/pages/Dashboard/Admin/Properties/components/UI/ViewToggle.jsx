import React from 'react';
import Button from '../../../../../../components/ui/Button';
import { Table, Grid3X3 } from 'lucide-react';

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Button
        variant={currentView === 'table' ? 'primary' : 'ghost'}
        size="sm"
        icon={Table}
        onClick={() => onViewChange('table')}
        className={currentView === 'table' ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
        aria-label="Vista de tabla"
      >
        Tabla
      </Button>
      <Button
        variant={currentView === 'trello' ? 'primary' : 'ghost'}
        size="sm"
        icon={Grid3X3}
        onClick={() => onViewChange('trello')}
        className={currentView === 'trello' ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
        aria-label="Vista de tablero"
      >
        Tablero
      </Button>
    </div>
  );
};

export default ViewToggle; 