import PropertyCard from './PropertyCard';
import '../styles/property-card-grid.css'; // Importa el CSS custom para los breakpoints

const PropertyCardList = ({ properties }) => (
    <div className="grid grid-cols-1 gap-6 px-2 property-card-grid">
        {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
        ))}
    </div>
);

export default PropertyCardList; 