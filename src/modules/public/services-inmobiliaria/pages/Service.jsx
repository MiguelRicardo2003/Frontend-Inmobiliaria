import { useState } from "react";
import { services, colorVariants, iconMap } from "../utils/serviceData";
import ServiceCard from "../components/ServiceCard";
import AttentionModal from "../components/AttentionModal";
import Button from '../../../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <ServiceCard
              key={index}
              icon={renderIcon(service.iconName)}
              title={service.title}
              description={service.description}
              colorClass={colorVariants[service.color]}
            />
          ))}
        </div>
      </div>

      {/* Horarios de atención */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white max-w-2xl mx-auto p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-black mb-6">
              ¿Necesitas ayuda con tu propiedad?
            </h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para ayudarte. Contáctanos hoy
              mismo para una consulta personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="md"
                  className="px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Contáctanos
                </Button>
              </Link>
              <Button
                onClick={() => setShowModal(true)}
                variant="primary"
                size="md"
                className="px-6 py-3 text-base font-medium rounded-md text-white bg-[#2D3A4E] hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Ver Horarios de Atención
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AttentionModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Service;
