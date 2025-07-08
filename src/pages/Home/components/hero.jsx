import { MoveRight } from "lucide-react";

const Hero = () => {

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col  bg-[#1B4F5C]">
      <div className="flex-row flex-1 flex ">
        <div className="
        ml-10 mt-10 mr-10
        2xl:ml-20 2xl:mt-24 
        xl:ml-20 xl:mt-36 
        lg:ml-20 lg:mt-44 
        md:ml-20 md:mt-52 
        sm:ml-20 sm:mt-52 
        ">
          <div
            className="font-bold text-white 
          
          text-xl 
          md:text-2xl  
          lg:text-5xl 
          xl:text-6xl 
          2xl:text-6xl "
          >
            <p>El sitio #1 en el que</p>
            <p>confían los profesionales</p>
            <p>inmobiliarios</p>
          </div>
          <div className="text-lg  text-white mt-20
          sm:text-sm 
          md:text-sm  
          lg:text-md 
          xl:text-lg 
          2xl:text-xl 
          ">
            <p>
              Desde tan solo $10 por día con descuentos por tiempo limitado.
            </p>
            <a href=""
              className="inline-block mt-10 font-bold text-[#e7c873]">
              <span className="flex items-center gap-5 ">
                Explorar más propiedades
                <MoveRight />
              </span>
            </a>
          </div>

        </div>
      </div>

      <div className="relative w-full h-full">
        <div className="banner  absolute left-0 bottom-0 bg-[#e7c873] sm:w-1/3 h-56 sm:h-20
          rounded-tr-2xl sm:rounded-tr-2xl sm:flex sm:flex-row flex-col justify-around items-center
          space-y-5 sm:space-y-0" >
          <div>
            <p className="font-bold text-[20px]  md:text-md">680</p>
            <p className="text-sm">Premiado</p>
          </div>

          <div>
            <p className="font-bold  text-[20px] md:text-md">8k+</p>
            <p className="text-sm">Cliente feliz</p>
          </div>

          <div>
            <p className="font-bold  text-[20px]  md:text-md">500+</p>
            <p className="text-sm ">
              Propiedad<br className="block sm:hidden" /> lista
            </p>
          </div>
        </div>
        <img
          src="/img/home.png"
          alt="home"
          className="absolute right-0 bottom-0 w-2/3 md:w-1/2 h-auto z-10 pointer-events-none select-none "
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Hero;