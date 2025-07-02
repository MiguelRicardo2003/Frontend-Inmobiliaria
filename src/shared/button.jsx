
const Button = ({ info,className="",...action }) => {

    return (
        <div className="absolute">
            <button className={`${className}`}{...action}>
                {info} →
            </button>
        </div>
    )
}

export default Button;