const PropertyFilters = ({ filters, onChange, onClear }) => {
    return (
        <form className="w-full max-w-full mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-3 sm:p-4 flex flex-col gap-4 md:flex-row md:items-end md:gap-6 mb-8">
            <div className="flex flex-col w-full md:w-1/4">
                <label className="text-xs text-gray-500 mb-1">Buscar</label>
                <input
                    type="text"
                    name="search"
                    placeholder="Ubicación o nombre"
                    value={filters.search || ''}
                    onChange={e => onChange({ ...filters, search: e.target.value })}
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                />
            </div>
            <div className="flex flex-col w-full md:w-1/5">
                <label className="text-xs text-gray-500 mb-1">Tipo</label>
                <select
                    name="tipo"
                    value={filters.tipo || ''}
                    onChange={e => onChange({ ...filters, tipo: e.target.value })}
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                >
                    <option value="">Todos</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="oficina">Oficina</option>
                    <option value="hotel">Hotel</option>
                </select>
            </div>
            <div className="flex flex-col w-full md:w-1/5">
                <label className="text-xs text-gray-500 mb-1">Estado</label>
                <select
                    name="estado"
                    value={filters.estado || ''}
                    onChange={e => onChange({ ...filters, estado: e.target.value })}
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                >
                    <option value="">Todos</option>
                    <option value="venta">En venta</option>
                    <option value="arriendo">Arriendo</option>
                </select>
            </div>
            <div className="flex flex-col w-full md:w-1/5">
                <label className="text-xs text-gray-500 mb-1">Ciudad o zona</label>
                <input
                    type="text"
                    name="ciudad"
                    placeholder="Ciudad o zona"
                    value={filters.ciudad || ''}
                    onChange={e => onChange({ ...filters, ciudad: e.target.value })}
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                />
            </div>
            <div className="flex flex-col w-full md:w-1/6">
                <label className="text-xs text-gray-500 mb-1">Precio mínimo</label>
                <input
                    type="number"
                    name="precioMin"
                    placeholder="Mínimo"
                    value={filters.precioMin || ''}
                    onChange={e => onChange({ ...filters, precioMin: e.target.value })}
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                />
            </div>
            <div className="flex flex-col w-full md:w-1/6">
                <label className="text-xs text-gray-500 mb-1">Precio máximo</label>
                <input
                    type="number"
                    name="precioMax"
                    placeholder="Máximo"
                    value={filters.precioMax || ''}
                    onChange={e => onChange({ ...filters, precioMax: e.target.value })}
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                />
            </div>
            <div className="flex flex-col w-full md:w-auto md:ml-2 mt-2 md:mt-0">
                <button
                    type="button"
                    onClick={onClear}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm border border-gray-300 w-full md:w-auto"
                >
                    Limpiar filtros
                </button>
            </div>
        </form>
    );
};

export default PropertyFilters; 