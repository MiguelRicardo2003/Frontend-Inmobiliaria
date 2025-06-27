
const Button = ({ funcion }) => {

    return (
        <div className="relative">
            <button className="self-start bg-[#E7C873] hover:bg-yellow-300 text-black font-medium px-6 py-3 rounded-xl">
                {funcion} →
            </button>
        </div>
    )
}

export default Button;