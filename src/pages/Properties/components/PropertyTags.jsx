const PropertyTags = ({ estado, featured }) => {
    const tags = [];
    if (estado === 'venta') tags.push({ label: 'EN VENTA', className: 'bg-green-800 text-white' });
    if (estado === 'arriendo') tags.push({ label: 'ARRIENDO', className: 'bg-yellow-600 text-white' });
    if (featured) tags.push({ label: 'DESTACADO', className: 'bg-yellow-400 text-gray-800' });
    return (
        <div className="flex gap-2">
            {tags.map((tag, i) => (
                <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${tag.className}`}
                >
                    {tag.label}
                </span>
            ))}
        </div>
    );
};

export default PropertyTags; 