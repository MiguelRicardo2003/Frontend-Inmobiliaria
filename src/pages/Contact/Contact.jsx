import { Phone, MapPin, Mail } from "lucide-react";
import Form from "./components/Form";
import Map from "./components/Map";

const Contact = () => {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-bold text-3xl text-gray-900">Contacto</h1>
        <p className="text-gray-700 mt-6 text-1xl">
          En Inmobiliaria, estamos listos para ayudarte a encontrar la propiedad ideal para ti. Si tienes preguntas o necesitas más información, no dudes en ponerte en contacto con nosotros.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-6">
          <Form />

          <div className="bg-gray-100 rounded-lg p-6 flex flex-col gap-3 h-full max-w-lg">
            <div className="flex items-center gap-2 text-gray-800">
              <Phone className="w-4 h-4" />
              (+57) 300 254 34 10
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <MapPin className="w-4 h-4" />
              Carepa, Colombia
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <Mail className="w-4 h-4" />
              inmobiliaria@example.com
            </div>
          </div>
        </div>
        <Map/>
      </div>
    </div>
  );
};

export default Contact;
