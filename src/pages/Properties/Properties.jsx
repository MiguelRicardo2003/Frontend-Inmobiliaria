import { useState, useMemo, useEffect } from 'react';
import PropertyFilters from './components/PropertyFilters';
import PropertyCardList from './components/PropertyCardList';
import PropertyPagination from './components/PropertyPagination';
import filterProperties from './utils/propertyFilter';
import { getPaginatedProperties } from './utils/paginationProperty';
import usePropertyLoader from './utils/usePropertyLoader';

const CARDS_PER_PAGE = 15;

const initialFilters = {
    search: '',
    tipo: '',
    estado: '',
    ciudad: '',
    precioMin: '',
    precioMax: '',
};

const Propertie = () => {
    const [filters, setFilters] = useState(initialFilters);
    const [page, setPage] = useState(1);
    const { properties: dataProperties, loading: initialLoading } = usePropertyLoader();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!initialLoading) setLoading(false);
    }, [initialLoading]);

    useEffect(() => {
        if (initialLoading) return;

        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [filters]);

    useEffect(() => {
        setPage(1);
    }, [filters]);

    const filteredProperties = useMemo(
        () => filterProperties(dataProperties, filters),
        [dataProperties, filters]
    );

    const { paginated, totalPages } = useMemo(
        () => getPaginatedProperties(filteredProperties, page, CARDS_PER_PAGE),
        [filteredProperties, page]
    );

    const handleClearFilters = () => setFilters(initialFilters);

    return (
        <div className="w-full min-h-screen bg-gray-50 py-6 md:py-10">
            <div className="w-full px-2 sm:px-4 md:px-8 lg:px-0 flex flex-col items-center">

                <div className="w-full sm:px-4 md:px-8 lg:px-3 flex flex-col items-center">
                    <PropertyFilters
                        filters={filters}
                        onChange={setFilters}
                        onClear={handleClearFilters}
                    />
                </div>

                <div className="w-full max-w-auto mx-auto px-1 sm:px-2 md:px-4 lg:px-2">
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600" />
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center text-gray-500 py-16">
                            No se encontraron propiedades.
                        </div>
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
