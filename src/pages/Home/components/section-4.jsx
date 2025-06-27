import Feature from "../../../shared/featureOfPropieties";
import Button from "../../../shared/button";

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
            <div className="max-w-6xl mx-auto px-20 py-12 flex flex-col md:flex-row items-center lg:items-start gap-10">
                {/* Imagen con etiquetas */}
                <div className="relative h-full w-[330px] sm:h-[330px] md:h-[350px] lg:w-[500px] lg:h-[450px] xl:h-[500px] rounded-2xl overflow-hidden">
                    <img
                        src="https://res.cloudinary.com/dmc8ifonk/image/upload/v1750914433/imagenes_publicas/m9jfryzef2g7h3qsuhwv.jpg"
                        alt="Propiedad"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Etiquetas */}
                    <Feature />
                </div>

                {/* Información */}
                <div className="flex-1 w-full flex flex-col justify-between max-w-xl lg:py-28">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Villa One Hyde Park</h2>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-600 mb-4 gap-1">
                            <p className="flex items-center gap-1 text-sm sm:text-base">
                                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" />
                                </svg>
                                Carepa, Colombia
                            </p>
                            <span className="text-red-500 text-lg sm:text-xl font-semibold">$120,000</span>
                        </div>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                            Encantadora casa de tres dormitorios y tres baños con una espaciosa cabaña de un dormitorio y un baño, y un cuarto para los suegros. La encantadora sala de estar cuenta con chimenea y fabulosos detalles art déco.
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                            <span className="flex items-center gap-1">🛏️ 4 Cuartos</span>
                            <span className="flex items-center gap-1">🛁 2 Baños</span>
                            <span className="flex items-center gap-1">📐 350 m²</span>
                        </div>
                    </div>
                    <Button funcion={"Más información"} />
                </div>
            </div>
        </section>
    );
};

export default Section4;
