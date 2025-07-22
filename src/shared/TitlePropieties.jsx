import { MapPin } from "lucide-react";

const Title = ({ title, location, price }) => {
    return (
        <div className="flex flex-col px-5">
            <h2 className="text-3xl font-semibold mb-2">{title}</h2>
            <div className="flex items-center justify-between text-gray-600 text-sm sm:text-base">
                <p className="flex items-center gap-1">
                    <MapPin size={20} />
                    {location}
                </p>
                {price && (
                    <span className="text-red-500 text-base font-semibold">${price}</span>
                )}
            </div>
        </div>
    );
};

export default Title;