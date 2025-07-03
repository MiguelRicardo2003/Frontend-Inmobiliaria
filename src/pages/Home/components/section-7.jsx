import Button from "../../../shared/button";
import { Phone, ArrowRight } from "lucide-react";

const Section7 = () => {
  return (
    <div className="w-full flex flex-col py-16 px-6">
      <div className="mx-auto text-center">

        {/* Título */}
        <div className="text-xl sm:text-4xl font-bold text-gray-900 mb-14">
          Conviértete en agente inmobiliario
        </div>

        {/* Subtítulo */}
        <div className="text-gray-700 sm:text-lg sm:text-right mb-11 pr-3">
          <div>
            ¿Quieres poner en arriendo tu casa o estás buscando tu hogar ideal,
            <div className="flex px-10">¿qué esperas para contactarnos?</div>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex flex-row px-30 justify-center mb-20">
          <img
            src="/img/professionals.png"
            alt="Professionals"
            className="w-[90%] h-[90%]"
          />
        </div>

        {/* Botones y contacto */}
        <div className="h-12 w-full items-center">
          <div className="flex px-8">
            <Button
              info={"Registrarme Ahora"}
              className="self-start bg-[#E7C873] hover:bg-yellow-300 text-black font-semibold px-4 py-3 rounded-xl"
              onClick={() => console.log("hola")}
            />
          </div>

          <div className="flex flex-row font-semibold text-black justify-end pr-3">
            <div className="h-12 w-40 flex justify-center py-3 gap-5">
              <Phone strokeWidth={1.25} />
              +57 123456789
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Section7;

