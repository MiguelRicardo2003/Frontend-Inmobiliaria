import Feature from "../../../shared/components/featureOfPropieties";
import Button from "../../../components/ui/Button";
import { SquaresSubtract, Bath, Bed, ArrowRight } from 'lucide-react'
import Title from "../../../shared/components/TitlePropieties";
import { Link } from "react-router-dom";
import Card from '../../../components/ui/Card';

const FeaturedProperty = () => {
    return (
        <section className="w-full">
            {/* Banner superior */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
                <img
                    src="https://res.cloudinary.com/dmc8ifonk/image/upload/v1750927247/imagenes_publicas/jyenucymyuqtporh8pil.jpg"
                    alt="Fondo"
                    className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center space-y-4 sm:space-y-6 px-4">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold max-w-lg">
                        Descubre un lugar donde te encantará vivir
                    </h2>
                    <div className="flex justify-center">
                        <Link to="/properties">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="group self-start flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                icon={ArrowRight}
                                iconPosition="right"
                            >
                                Ver Propiedades
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sección de propiedad */}
            <div className="max-w-6xl items-center md:ml-4 py-8 flex flex-col mt-8 mb-10 md:flex-row lg:items-start lg:mx-auto lg:justify-center">

                <div className="block md:hidden mb-4">
                    <Title title={"Villa One Hyde Park"} location={"Carepa, Colombia"} price={"120,000"} />
                </div>

                <Card className="relative h-full md:ml-5 w-[330px] sm:h-[340px] md:h-[350px] lg:w-[500px] lg:h-[500px] xl:h-[500px] rounded-2xl overflow-hidden p-0">
                    <img
                        src="https://res.cloudinary.com/dmc8ifonk/image/upload/v1750914433/imagenes_publicas/m9jfryzef2g7h3qsuhwv.jpg"
                        alt="Propiedad"
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                    {/* Etiquetas */}
                    <Feature type="EN VENTA" feature="DESTACADA" />
                </Card>

                {/* Información */}
                <div className="flex-1 w-full flex flex-col md:ml-4 lg:ml-12 py-4 max-w-xl lg:py-16">
                    <div className="hidden md:block mb-4 md:px-4">
                        <Title title={"Villa One Hyde Park"} location={"Carepa, Colombia"} />
                    </div>
                    <div className=" items-center px-10">
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 mt-4 sm:w-[340px] md:w-auto mx-auto">
                            Encantadora casa de tres dormitorios y tres baños con una espaciosa cabaña de un dormitorio y un baño, y un cuarto para los suegros. La encantadora sala de estar cuenta con chimenea y fabulosos detalles art déco.
                        </p>

                        <div className="flex flex-wrap py-2 justify-center md:justify-start sm:px-24 md:px-0 gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1"><Bed /> 4 Cuartos</span>
                            <span className="flex items-center gap-1"><Bath /> 2 Baños</span>
                            <span className="flex items-center gap-1"><SquaresSubtract /> 350 m²</span>
                        </div>
                        <div className="flex flex-col md:gap-10  md:flex-row lg:flex-col lg:gap-0">
                            <div className="hidden mt-2 md:block mb-4">
                                <span className="text-red-500 text-lg sm:text-xl font-semibold">$120.000</span>
                            </div>
                            <div className="flex py-4 justify-center lg:justify-start md:py-0">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="group self-start flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                    icon={ArrowRight}
                                    iconPosition="right"
                                >
                                    Más información
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperty;
