const Hero = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-[#1B4F5C]">

      <div className="flex-row">
        <div className="text-left">
          <div className="text-xl md:text-5xl font-bold text-white pt-20 pe-60">El sitio #1 en el que confían los profesionales inmobiliarios
          </div>

          <div className="text-lg  md:text-4xl  text-white pt-28">
          Desde tan solo $10 por día con descuentos por tiempo limitado.
          </div>

          <button type ="button" className="text-yellow-400 text-xl font-semibold hover:text-yellow-300 transition inline-flex items-center pt-20" >Explorar más propiedades   ➜</button>
          
        </div>

        <div></div>       
      </div>

      

    </div>
  );
};

export default Hero;