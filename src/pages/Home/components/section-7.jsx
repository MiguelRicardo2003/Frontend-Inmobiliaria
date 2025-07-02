import Button from "../../../shared/button";
import { Phone, ArrowRight } from "lucide-react";
const Section7 = () => {
  return (
    <div className="w-full flex flex-col  py-16 px-6">
      <div className="mx-auto text-center ">

        {/* Título */}
        <div className="text-xl sm:text-4xl font-bold text-gray-900 mb-14 ">
          Conviértete en agente inmobiliario
        </div>

        {/* Subtítulo */}
        <div className="text-gray-600 sm:text-lg sm:text-right  ">
          <div >Quieres poner en arriendo tu casa o estas buscando tu hogar ideal,
            <div className=" flex  px-10">que esperar para contactarnos.</div>
          </div>
        </div>

        {/* Imagenes */}


        {/* Botones */}
        <div className="h-12 w-full items-center   ">

          <Button
            info={"Registrarme Ahora"}
            className="self-start flex items-center gap-2 bg-[#E7C873] hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl"
            icon={<ArrowRight strokeWidth={1.25} />}
          />

          <div className="flex flex-row font-semibold text-black justify-end ">
            <div className="h-12 w-40 flex  justify-center py-3 gap-5"><Phone strokeWidth={1.25} />+57 123456789</div>
          </div>
        </div>




      </div>
    </div>
  );
}

export default Section7; 