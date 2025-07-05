import ButtonPhone from "./buttonlabelphone";

const Section7 = () => {
  return (
    <div className="w-full flex flex-col py-16 px-6 md:px-16">
      <div className="mx-auto text-center lg:flex lg:flex-row">

        {/* Título */}
        <div className="lg:flex-row lg:text-left lg:mt-28">

          <div className="flex text-4xl font-bold  mb-8 justify-center md:text-4xl md:justify-center  lg:h-20 lg:w-auto  lg:font-semibold  lg:text-start lg:justify-start lg:mt-10 lg:text-balance  text-gray-900 ">
            Conviértete en agente inmobiliario
          </div>

          {/* Subtítulo */}
          <div className="text-gray-700 flex flex-row text-lg md:text-balance  mb-11  lg:text-left lg:justify-start ">
            Quieres poner en arriendo tu casa o estás buscando tu hogar ideal,¿Qué esperas para contactarnos?
          </div>


          <div className="h-12 w-full items-center hidden sm:hidden lg:block">
            <ButtonPhone />
          </div>

        </div>

        {/* Imagen */}
        <div className="lg:flex-row lg:h-[85%] lg:w-[85%] lg:mt-10">
          <div className="flex flex-row px-30 justify-center sm:mb-20">
            <img
              src="/img/professionals.png"
              alt="Professionals"
              className="w-[90%] h-[90%] "
            />
          </div>
        </div>

        {/* Botones y contacto */}
        <div className="h-12 w-full items-center  block md:block lg:hidden mt-10"><ButtonPhone/></div>
      </div>
    </div>
  );
};

export default Section7;

