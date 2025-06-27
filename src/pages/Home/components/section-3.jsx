import features from "../../../shared/data";

const Section3 = () => {

    return (
        <section className="py-16 px-4 text-center bg-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
                ¿Por qué deberías trabajar con nosotros?
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:flex md:grid-cols-3 gap-12">
                {features.map((
                    {
                        icon: Icon,
                        title,
                        desc
                    }, i) => (
                    <div key={i} className="flex flex-col items-center space-y-4">
                        <Icon className="text-[100px] sm:text-[140px] md:text-[180px]" />
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">{title}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-md">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Section3;