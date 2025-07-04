import { useState, useMemo, useEffect } from 'react';
import PropertyFilters from './components/PropertyFilters';
import PropertyCardList from './components/PropertyCardList';
import PropertyPagination from './components/PropertyPagination';
import { properties } from '../../shared/data';
import filterProperties from './utils/propertyFilter';
import { getPaginatedProperties } from './utils/paginationProperty';

const CARDS_PER_PAGE = 15; // 3 filas de 5 cards en desktop

const initialFilters = {
    search: '',
    tipo: '',
    estado: '',
    ciudad: '',
    precioMin: '',
    precioMax: ''
};

const Propertie = () => {
    const [filters, setFilters] = useState(initialFilters);
    const [page, setPage] = useState(1);

    // Filtrado de propiedades usando función utilitaria
    const filteredProperties = useMemo(() => filterProperties(properties, filters), [filters]);

    // Reiniciar página cuando cambian los filtros
    useEffect(() => {
        setPage(1);
    }, [filters]);

    // Propiedades paginadas y total de páginas
    const { paginated, totalPages } = useMemo(
        () => getPaginatedProperties(filteredProperties, page, CARDS_PER_PAGE),
        [filteredProperties, page]
    );

    const handleClearFilters = () => setFilters(initialFilters);

    return (
        <div className="w-full min-h-screen bg-gray-50 py-6 md:py-10">
            <div className="w-full px-2 sm:px-4 md:px-8 lg:px-0 flex flex-col items-center">
                <div className='w-full sm:px-4 md:px-8 lg:px-3 flex flex-col items-center'>
                    <PropertyFilters
                        filters={filters}
                        onChange={setFilters}
                        onClear={handleClearFilters}
                    />
                </div>
                <div className="w-full max-w-auto mx-auto px-1 sm:px-2 md:px-4 lg:px-2">
                    {filteredProperties.length === 0 ? (
                        <div className="text-center text-gray-500 py-16">No se encontraron propiedades.</div>
                    ) : (
                        <>
                            <PropertyCardList properties={paginated} />
                            <PropertyPagination
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Propertie; 