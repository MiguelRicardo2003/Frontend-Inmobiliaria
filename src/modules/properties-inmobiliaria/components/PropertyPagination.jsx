import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyPagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center mt-8">
            <div className="flex rounded-full border border-blue-200 overflow-hidden bg-white">
                <button
                    className="px-4 py-2 text-lg flex items-center justify-center disabled:opacity-40"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft size={22} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`px-6 py-2 text-lg font-semibold border-r border-blue-200 last:border-none transition-colors flex items-center justify-center ${page === i + 1 ? 'bg-[#2D3A4E] text-white' : 'bg-white text-[#2D3A4E] hover:bg-blue-50'}`}
                        onClick={() => onPageChange(i + 1)}
                        disabled={page === i + 1}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="px-4 py-2 text-lg flex items-center justify-center disabled:opacity-40"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    <ChevronRight size={22} />
                </button>
            </div>
        </div>
    );
};

export default PropertyPagination; 