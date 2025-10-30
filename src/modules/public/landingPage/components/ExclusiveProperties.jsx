import Feature from "../../../../shared/components/featureOfPropieties";
import { MapPin, Bed, Bath, Ruler, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Card from '../../../../components/ui/Card';
import useExclusiveProperties from '../hooks/useExclusiveProperties';

const ExclusiveProperties = () => {
    const { properties, loading } = useExclusiveProperties();
    const mainProperty = properties[0];
    const sliderImages = mainProperty?.imagenes || [];

    if (loading) {
        return (
            <section className="w-full bg-[#39465A] py-10 px-4 flex items-center">
                <div className="w-full max-w-6xl mx-auto">
                    <h2 className="text-white font-medium text-2xl sm:text-3xl md:text-4xl leading-tight text-center mx-auto mb-8 px-4">
                        Propiedades Exclusivas
                    </h2>
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
                    </div>
                </div>
            </section>
        );
    }

    if (!mainProperty) {
        return null;
    }

    return (
        <section className="w-full bg-[#39465A] py-10 px-4 flex items-center">
            <div className="w-full max-w-6xl mx-auto">
                {/* Título */}
                <h2 className="text-white font-medium text-2xl sm:text-3xl md:text-4xl leading-tight text-center mx-auto mb-8 px-4">
                    Propiedades Exclusivas
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* TARJETA PRINCIPAL */}
                    <Card className="w-full group lg:col-span-1 rounded-2xl shadow-lg relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] p-0">
                        <img
                            src={mainProperty.imagen}
                            alt={mainProperty.titulo}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                        <Feature type={mainProperty.estado.toUpperCase()} feature="DESTACADA" />
                        <div className="relative z-20 flex flex-col justify-end h-full p-3">
                            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">{mainProperty.titulo}</h3>
                            <div className="flex items-center text-gray-200 text-sm sm:text-base mb-4 gap-1">
                                <MapPin size={16} className="mr-1" />
                                {mainProperty.direccion}
                            </div>
                            <div className="flex items-center justify-between w-full text-white text-base sm:text-lg">
                                <span className="font-bold">${mainProperty.precio.toLocaleString()}</span>
                                <div className="flex items-center gap-2 sm:gap-3 mx-auto">
                                    <span className="flex items-center gap-1"><Bed size={16} />{mainProperty.habitaciones}</span>
                                    <span className="mx-1 sm:mx-2">|</span>
                                    <span className="flex items-center gap-1"><Bath size={16} />{mainProperty.banos}</span>
                                    <span className="mx-1 sm:mx-2">|</span>
                                    <span className="flex items-center gap-1"><Ruler size={16} />{mainProperty.metros_cuadrados}</span>
                                </div>
                                <span className="opacity-0">${mainProperty.precio.toLocaleString()}</span>
                            </div>
                        </div>
                    </Card>

                    {/* COLUMNA DERECHA (Slider + 2 bloques) */}
                    <div className="flex flex-col gap-4 justify-between">
                        {/* SLIDER */}
                        <Card className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden p-0">
                            <img
                                src={sliderImages.length > 0 ? sliderImages[0].url_imagen : mainProperty.imagen}
                                alt="Imagen de la propiedad"
                                className="w-full h-full object-cover rounded-1xl"
                            />
                            {sliderImages.length > 1 && (
                                <>
                                    <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-60 hover:bg-opacity-80 p-2 sm:p-4 rounded-full flex items-center justify-center shadow-md transition-all">
                                        <ChevronLeft size={24} className="sm:w-8 sm:h-8 text-[#39465A]" />
                                    </button>
                                    <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-60 hover:bg-opacity-80 p-2 sm:p-4 rounded-full flex items-center justify-center shadow-md transition-all">
                                        <ChevronRight size={24} className="sm:w-8 sm:h-8 text-[#39465A]" />
                                    </button>
                                </>
                            )}
                        </Card>
                        {/* BLOQUES INFERIORES */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Imagen con Play */}
                            <Card className="w-full sm:flex-1 rounded-2xl flex items-center justify-center relative overflow-hidden h-48 sm:h-56 md:h-[242px] transition-transform duration-500 ease-in-out hover:scale-105 p-0">
                                <img
                                    src={sliderImages.length > 1 ? sliderImages[1].url_imagen : mainProperty.imagen}
                                    alt="Tour virtual"
                                    className="w-full h-full object-cover rounded-1xl opacity-80"
                                />
                                <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-40 rounded-full p-2 sm:p-4 flex items-center justify-center">
                                    <PlayCircle size={32} className="sm:w-10 sm:h-10 text-white" />
                                </button>
                            </Card>
                            {/* Bloque amarillo */}
                            <div className="w-full sm:flex-1 bg-[#E7C873] rounded-2xl flex flex-col justify-center items-start p-4 sm:p-5 h-48 sm:h-56 md:h-[242px] relative transition-transform duration-500 ease-in-out hover:scale-105">
                                <span className="text-xl sm:text-2xl font-bold text-[#39465A] mb-1">{properties.length}+</span>
                                <span className="text-[#39465A] font-semibold mb-1 text-sm sm:text-base">Propiedades</span>
                                <span className="text-[#39465A] text-xs mb-6 sm:mb-8">
                                    Explora nuestra amplia variedad de propiedades para encontrar la casa de tus sueños hoy mismo.
                                </span>
                                <Link to="/properties">
                                    <button className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow">
                                        <ChevronRight size={20} className="sm:w-6 sm:h-6 text-[#39465A]" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ExclusiveProperties;    