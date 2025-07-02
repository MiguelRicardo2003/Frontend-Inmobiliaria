import Feature from "../../../shared/featureOfPropieties";
import Button from "../../../shared/button";
import { SquaresSubtract, Bath, Bed } from 'lucide-react'
import Title from "../../../shared/tittlePropieties";
import Price from "../../../shared/pricePropieties"

const Section4 = () => {
    return (
        <section className="w-full">
            {/* Banner superior */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
                <img
                    src="https://res.cloudinary.com/dmc8ifonk/image/upload/v1750927247/imagenes_publicas/jyenucymyuqtporh8pil.jpg"
                    alt="Fondo"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center space-y-4 sm:space-y-6 px-4">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold max-w-lg">
                        Descubre un lugar donde te encantará vivir
                    </h2>
                    <Button funcion={"Ver Propiedades"} />
                </div>
            </div>

            {/* Sección de propiedad */}
            <div className="max-w-6xl items-center mx-auto py-8 flex flex-col md:flex-row lg:items-start">

                <div className="block md:hidden mb-4">
                    <Title title={"Villa One Hyde Park"} location={"Carepa, Colombia"} price={"120,000"} />
                    <div className="block md:hidden mb-4 ">
                    </div>
                </div>

                <div className="relative h-full ml-5 w-[330px] sm:h-[340px] md:h-[350px] lg:w-[500px] lg:h-[500px] xl:h-[500px] rounded-2xl overflow-hidden">
                    <img
                        src="https://res.cloudinary.com/dmc8ifonk/image/upload/v1750914433/imagenes_publicas/m9jfryzef2g7h3qsuhwv.jpg"
                        alt="Propiedad"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Etiquetas */}
                    <Feature />

                </div>


                {/* Información */}
                <div className="flex-1 w-full flex flex-col max-w-xl lg:py-16">
                    <div className="hidden md:block mb-4 px-20">
                        <Title title={"Villa One Hyde Park"} location={"Carepa, Colombia"} />
                    </div>
                    <div className="items-center px-20">
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 mt-4">
                            Encantadora casa de tres dormitorios y tres baños con una espaciosa cabaña de un dormitorio y un baño, y un cuarto para los suegros. La encantadora sala de estar cuenta con chimenea y fabulosos detalles art déco.
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1"><Bed /> 4 Cuartos</span>
                            <span className="flex items-center gap-1"><Bath /> 2 Baños</span>
                            <span className="flex items-center gap-1"><SquaresSubtract /> 350 m²</span>
                        </div>
                        <div className="hidden md:block mb-4">
                            <Price price={"120,000"} />
                        </div>
                        <Button funcion={"Más información"} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Section4;
