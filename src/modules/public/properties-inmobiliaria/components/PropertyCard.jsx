import { useState, memo } from 'react';
import { Bed, Bath, SquaresSubtract, MapPin } from 'lucide-react';
import PropertyTags from './PropertyTags';
import PropertyModal from './PropertyModal';
import Card from '../../../../components/ui/Card';

const PropertyCard = ({ property, cardClassName = '' }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card
                className={`relative rounded-2xl overflow-hidden shadow-md mx-auto cursor-pointer group w-full aspect-square transition-transform duration-500 ease-in-out hover:scale-105 ${cardClassName}`}
                onClick={() => setOpen(true)}
                hover
            >
                <img
                    src={property.imagen}
                    alt={property.titulo}
                    loading='lazy'
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 z-10" />
                <div className="absolute top-4 left-4 z-20">
                    <PropertyTags estado={property.estado} featured={true} />
                </div>
                <div className="absolute left-0 bottom-14 px-4 z-20 w-full">
                    <h3 className="text-white text-lg font-bold mb-1 drop-shadow-lg">{property.titulo}</h3>
                    <div className="flex items-center gap-2 text-white text-sm drop-shadow-lg">
                        <MapPin size={20} />
                        <span>{property.ubicacion}</span>
                    </div>
                </div>
                <div className="absolute left-0 bottom-0 w-full bg-black bg-opacity-60 px-4 py-2 flex flex-wrap items-center gap-3 z-20">
                    <span className="text-white text-base font-bold mr-2">${property.precio.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-white text-sm"><Bed size={16} /> {property.habitaciones}</span>
                    <span className="flex items-center gap-1 text-white text-sm"><Bath size={16} /> {property.banos}</span>
                    <span className="flex items-center gap-1 text-white text-sm"><SquaresSubtract size={16} /> {property.area}</span>
                </div>
            </Card>
            <PropertyModal
                open={open}
                onClose={() => setOpen(false)}
                property={property}
            />
        </>
    );
};

export default memo(PropertyCard);
