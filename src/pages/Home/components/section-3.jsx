
import { FileText, HomeIcon, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: <FileText size={40} className="text-primary" />,
        title: "Amplia gama de propiedades",
        desc: "Ofrecemos asistencia legal especializada para todo lo relacionado con la propiedad en Colombia.",
    },
    {
        icon: <HomeIcon size={40} className="text-primary" />,
        title: "Comprar o alquilar casas",
        desc: "Vendemos tu casa al mejor precio del mercado y además con mucha rapidez.",
    },
    {
        icon: <ShieldCheck size={40} className="text-primary" />,
        title: "Con la confianza de miles de personas",
        desc: "Te ofrecemos asesoría gratuita para obtener un préstamo para tu nueva vivienda.",
    },
];

export default function Section3() {
    return (
        <section className="py-16 px-4 text-center bg-white">
            <h2 className="text-2xl font-bold mb-12">
                ¿Por qué deberías trabajar con nosotros?
            </h2>
            <div className="max-w-4xl mx-auto space-y-12">
                {features.map((item, i) => (
                    <div key={i} className="flex flex-col items-center space-y-4">
                        <div className="p-4">{item.icon}</div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600 max-w-md">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
