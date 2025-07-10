import React from "react";
import { Clock8 } from "lucide-react";
import Modal from '../../../components/ui/Modal';

const AttentionModal = ({ show, onClose }) => {
  return (
    <Modal isOpen={show} onClose={onClose} title="Horarios de Atención" size="md">
      <div className="text-center animate-zoomIn">
        <p className="text-black font-medium mb-2 flex flex-row gap-2 justify-center">
          <Clock8 /> Lunes a Viernes: 8:00 a.m. - 6:00 p.m.
        </p>
        <div className="text-black font-medium mb-4 flex flex-row gap-2 justify-center">
          <Clock8 /> Sábados: 9:00 a.m. - 1:00 p.m.
        </div>
      </div>
    </Modal>
  );
};

export default AttentionModal; 