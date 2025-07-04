import Button from "../../../shared/button";
import { Phone, ArrowRight } from "lucide-react";

const Section7 = () => {
  return (
    <div className="w-full flex flex-col py-16 px-6 md:px-16">
      <div className="mx-auto text-center lg:flex lg:flex-row">

        {/* Título */}

        <div className="lg:flex-row">

          <div className="text-2xl font-bold sm:text-4xl sm:mb-14 md:text-4xl lg:h-20 lg:w-auto  lg:font-semibold lg:px-20  text-gray-900  bg-gray-400">
            Conviértete en agente inmobiliario
          </div>

          {/* Subtítulo */}
          <div className="text-gray-700 flex flex-row sm:text-lg sm:text-left sm:px-5 sm:mb-11 lg:text-left  bg-orange-200">
            <div className="bg-slate-400">¿Quieres poner en arriendo tu casa o estás buscando tu hogar ideal,¿Qué esperas para contactarnos?
            </div>
          </div>


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
                <Phone strokeWidth={1.25} />+57 123456789
              </div>
            </div>
          </div>

        </div>

        {/* Imagen */}
        <div className="lg:flex-row">
          <div className="flex flex-row px-30 justify-center sm:mb-20">
            <img
              src="/img/professionals.png"
              alt="Professionals"
              className="w-[90%] h-[90%]"
            />
          </div>
        </div>

        {/* Botones y contacto */}


      </div>
    </div>
  );
};

export default Section7;

