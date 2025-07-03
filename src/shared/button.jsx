const Button = ({ info, className = "", icon, ...action }) => {

    return (
        <div className="absolute">
            <button className={`${className}`}{...action}>
                {info} {icon}
            </button>
        </div>
    )
}

export default Button;