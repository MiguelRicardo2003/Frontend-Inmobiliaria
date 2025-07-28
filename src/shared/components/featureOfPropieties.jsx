
const Feature = ({ type, feature }) => {
    return (
        <div className="absolute left-4 top-2 lg:top-6 flex gap-2">
            <span className="bg-[#1F4B43] text-white text-xs font-semibold px-3 py-1 rounded-full">{type}</span>
            <span className="bg-[#E7C873] text-black text-xs font-semibold px-3 py-1 rounded-full">{feature}</span>
        </div>
    );
}

export default Feature; 