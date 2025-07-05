import React from "react";
import { Clock8 } from "lucide-react";

const AttentionModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center transform transition-all duration-300 scale-95 animate-zoomIn">
        <h3 className="text-2xl font-bold mb-4 text-black">Horarios de Atención</h3>
        <p className="text-black font-medium mb-2 flex flex-row gap-2 justify-center">
          <Clock8 /> Lunes a Viernes: 8:00 a.m. - 6:00 p.m.
        </p>
        <div className="text-black font-medium mb-4 flex flex-row gap-2 justify-center">
          <Clock8 /> Sábados: 9:00 a.m. - 1:00 p.m.
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AttentionModal; 