import features from "../../../layouts/shared/data";

const Section3 = () => {

    return (
        <section className="py-16 px-4 text-center bg-white">
            <h2 className="text-2xl font-bold mb-12">
                ¿Por qué deberías trabajar con nosotros?
            </h2>
            <div className="max-w-4xl mx-auto space-y-12">
                {features.map((
                    {
                        icon: Icon,
                        title,
                        desc
                    }, i) => (
                    <div key={i} className="flex flex-col items-center space-y-4">
                        <Icon className="text-[180px]" />
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-sm text-gray-600 max-w-md">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Section3;