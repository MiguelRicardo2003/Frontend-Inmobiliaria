import Feature from "../../../shared/featureOfPropieties";
import { MapPin, Bed, Bath, Ruler, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

const Section6 = () => {
    return (
        <section className="w-full bg-[#39465A] py-10 px-4 flex flex-col items-center">
            <div className="w-full max-w-2xl mx-auto">
                {/* Título */}
                <h2
                    className="text-white font-medium text-2xl sm:text-3xl md:text-4xl leading-tight text-center mx-auto mb-8 px-4"
                    style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: 0 }}
                >
                    Propiedades Exclusivas
                </h2>

                {/* Tarjeta principal - imagen de fondo y overlay */}
                <div className="w-full rounded-2xl shadow-lg mb-6 relative overflow-hidden h-64 sm:h-80 md:h-96">
                    {/* Imagen de fondo */}
                    <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                        alt="Villa One Hyde Park"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    
                    {/* En venta y casa*/}
                    <Feature />
                    {/* Contenido principal */}
                    <div className="relative z-20 flex flex-col justify-end h-full p-3">
                        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">Villa One Hyde Park</h3>
                        <div className="flex items-center text-gray-200 text-sm sm:text-base mb-4 gap-1">
                            <MapPin size={16} className="mr-1" />
                            2050 Bloomingdale Ave
                        </div>
                        <div className="flex items-center justify-between w-full text-white text-base sm:text-lg">
                            <span className="font-bold">$120,000</span>
                            <div className="flex items-center gap-2 sm:gap-3 mx-auto">
                                <span className="flex items-center gap-1"><Bed size={16}/>4</span>
                                <span className="mx-1 sm:mx-2">|</span>
                                <span className="flex items-center gap-1"><Bath size={16}/>2</span>
                                <span className="mx-1 sm:mx-2">|</span>
                                <span className="flex items-center gap-1"><Ruler size={16}/>350</span>
                            </div>
                            <span className="opacity-0">$120,000</span>
                        </div>
                    </div>
                </div>

                {/* Slider secundario */}
                <div className="w-full mx-auto mb-6 relative flex justify-center items-center">
                    <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
                            alt="Sala de estar"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                        {/* Flecha izquierda */}
                        <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-60 hover:bg-opacity-80 p-2 sm:p-4 rounded-full flex items-center justify-center shadow-md transition-all">
                            <ChevronLeft size={24} className="sm:w-8 sm:h-8 text-[#39465A]" />
                        </button>
                        {/* Flecha derecha */}
                        <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-60 hover:bg-opacity-80 p-2 sm:p-4 rounded-full flex items-center justify-center shadow-md transition-all">
                            <ChevronRight size={24} className="sm:w-8 sm:h-8 text-[#39465A]" />
                        </button>
                    </div>
                </div>

                {/* Bloques inferiores */}
                <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Imagen con play */}
                    <div className="w-full sm:flex-1 bg-white rounded-2xl flex items-center justify-center relative overflow-hidden h-48 sm:h-56 md:h-[242px]">
                        <img
                            src="https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80"
                            alt="Tour virtual"
                            className="w-full h-full object-cover rounded-2xl opacity-80"
                        />
                        <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-40 rounded-full p-2 sm:p-4 flex items-center justify-center">
                            <PlayCircle size={32} className="sm:w-10 sm:h-10 text-white" />
                        </button>
                    </div>
                    {/* Bloque amarillo */}
                    <div className="w-full sm:flex-1 bg-[#E7C873] rounded-2xl flex flex-col justify-center items-start p-4 sm:p-5 h-48 sm:h-56 md:h-[242px] relative">
                        <span className="text-xl sm:text-2xl font-bold text-[#39465A] mb-1">280+</span>
                        <span className="text-[#39465A] font-semibold mb-1 text-sm sm:text-base">Propiedades</span>
                        <span className="text-[#39465A] text-xs mb-6 sm:mb-8">Explora nuestra amplia variedad de propiedades para encontrar la casa de tus sueños hoy mismo.</span>
                        <button className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow">
                            <ChevronRight size={20} className="sm:w-6 sm:h-6 text-[#39465A]" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section6;    