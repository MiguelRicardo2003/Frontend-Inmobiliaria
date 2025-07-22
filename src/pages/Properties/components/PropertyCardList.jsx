import PropertyCard from './PropertyCard';

const PropertyCardList = ({ properties }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8 px-2 py-2">
        {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
        ))}
    </div>
);

export default PropertyCardList; 