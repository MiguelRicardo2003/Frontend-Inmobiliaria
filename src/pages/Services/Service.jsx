import { useState } from "react";
import { services, colorVariants, iconMap } from "./serviceData";
import { Clock8 } from "lucide-react";

const Service = () => {
  const [showModal, setShowModal] = useState(false);

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  return (
    <div className="bg-white relative">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Edificio de oficinas moderno"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Brindamos servicios inmobiliarios completos, enfocados en cubrir
              cada una de tus necesidades con estándares superiores de calidad y
              un compromiso absoluto con el profesionalismo.
            </p>
          </div>
        </div>
      </div>

      {/* Cards de servicios */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-[20px] border-2 ${
                colorVariants[service.color]
              } p-6 flex gap-6 items-center min-h-[150px]`}
            >
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                  colorVariants[service.color]
                } bg-opacity-20`}
              >
                {renderIcon(service.iconName)}
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-black mb-1 leading-snug text-center md:text-left">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center md:text-left">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horarios de atención */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            ¿Necesitas ayuda con tu propiedad?
          </h2>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte. Contáctanos hoy
            mismo para una consulta personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573189267246"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Contáctanos
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-white bg-[#2D3A4E] hover:bg-gray-700 transition-colors"
            >
              Ver Horarios de Atención
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center transform transition-all duration-300 scale-95 animate-zoomIn">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Horarios de Atención
            </h3>
            <p className="text-black font-medium mb-2 flex flex-row gap-2 justify-center">
              <Clock8 />
              Lunes a Viernes: 8:00 a.m. - 6:00 p.m.
            </p>
            <div className="text-black font-medium mb-4 flex flex-row gap-2 justify-center">
              <Clock8 />
              Sábados: 9:00 a.m. - 1:00 p.m.
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
