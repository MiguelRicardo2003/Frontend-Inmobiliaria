const Price = ({ price }) => {
    return (
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
            <span className="text-red-500 text-lg sm:text-xl font-semibold">${price}</span>
        </div>
    )
}

export default Price