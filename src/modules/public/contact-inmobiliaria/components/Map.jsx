import { LocateFixed } from "lucide-react";
import Card from "../../../../components/ui/Card";

const Maps = () => {
  return (
    <Card className="h-full">
      <div className="bg-white rounded-lg p-6 flex flex-col gap-4 h-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="font-bold text-lg text-gray-800">Nuestra Ubicación</h3>
          <a
            href="https://www.google.com/maps/place/Carepa,+Antioquia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2 rounded-lg bg-[#2D3A4E] hover:bg-gray-700 px-4 py-2 items-center justify-center text-sm text-white w-full sm:w-48"
          >
            Ver en Google Maps
          </a>
        </div>

        {/* Mapa embebido */}
        <div className="w-full h-[250px] lg:h-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15813.223995572967!2d-76.65282199999999!3d7.757335049999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e501011e6079edf%3A0xe70ddb22010b94cb!2sParque%20Principal!5e0!3m2!1ses!2sco!4v1751686564544!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de la inmobiliaria"
          ></iframe>
        </div>
      </div>
    </Card>
  );
};

export default Maps;
