import React from 'react';

const PropertyModal = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col transform transition-all duration-300 scale-95 animate-zoomIn items-center">
                <button
                    className="ml-auto mb-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                    onClick={onClose}
                >
                    Cerrar
                </button>
                <div className="text-lg font-semibold text-gray-700">Modal de detalles</div>
            </div>
        </div>
    );
};

export default PropertyModal;
