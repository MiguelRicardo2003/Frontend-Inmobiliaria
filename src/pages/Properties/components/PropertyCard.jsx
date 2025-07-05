import { useState } from 'react';
import { Bed, Bath, SquaresSubtract } from 'lucide-react';
import PropertyTags from './PropertyTags';
import PropertyModal from './PropertyModal';

const CARD_SIZE = 'w-[280px] h-[280px] 3xl:w-[350px] 3xl:h-[350px]';

const PropertyCard = ({ property, cardClassName = '' }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className={`relative rounded-3xl overflow-hidden shadow-md mx-auto cursor-pointer group ${CARD_SIZE} ${cardClassName}`}
                onClick={() => setOpen(true)}
            >
                <img
                    src={property.imagen}
                    alt={property.titulo}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 z-10" />
                <div className="absolute top-4 left-4 z-20">
                    <PropertyTags estado={property.estado} featured={true} />
                </div>
                <div className="absolute left-0 bottom-16 px-4 z-20 w-full">
                    <h3 className="text-white text-lg font-bold mb-1 drop-shadow-lg">{property.titulo}</h3>
                    <div className="flex items-center gap-2 text-white text-sm drop-shadow-lg">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        <span>{property.ubicacion}</span>
                    </div>
                </div>
                <div className="absolute left-0 bottom-0 w-full bg-black bg-opacity-60 px-4 py-2 flex flex-wrap items-center gap-3 z-20">
                    <span className="text-white text-base font-bold mr-2">${property.precio.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-white text-sm"><Bed size={16} /> {property.habitaciones}</span>
                    <span className="flex items-center gap-1 text-white text-sm"><Bath size={16} /> {property.banos}</span>
                    <span className="flex items-center gap-1 text-white text-sm"><SquaresSubtract size={16} /> {property.area}</span>
                </div>
            </div>

            {/* Modal separado */}
            <PropertyModal open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default PropertyCard;
