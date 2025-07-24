import React from "react";

const ProjectsBoard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableros de Proyectos (Sedes)</h1>
      {/* Aquí se mostrarán los tableros de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ejemplo de tablero de proyecto */}
        <div className="bg-white rounded shadow p-4 flex flex-col items-center justify-center min-h-[150px] cursor-pointer hover:bg-gray-100 transition">
          <span className="text-lg font-semibold">Sede Principal</span>
        </div>
        {/* Más tableros aquí... */}
      </div>
    </div>
  );
};

export default ProjectsBoard; 