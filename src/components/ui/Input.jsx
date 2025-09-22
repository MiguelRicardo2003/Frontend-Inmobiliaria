import React from "react";

const Input = ({
  label,
  error,
  icon: Icon,
  iconPosition = "left",
  onIconClick,
  className = "",
  ...props
}) => {
  const hasIcon = Boolean(Icon);
  const isRight = iconPosition === "right";

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className={[
            "block w-full rounded-md",
            "border-2 border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200",
            "placeholder:text-gray-400",
            "px-4 py-3", // más padding horizontal y vertical
            hasIcon && (isRight ? "pr-12" : "pl-12"), // espacio para el ícono
            className,
          ].join(" ")}
          {...props}
        />

        {hasIcon && (
          <div
            className={[
              "absolute inset-y-0 flex items-center", // centra verticalmente
              isRight ? "right-3" : "left-3",
            ].join(" ")}
          >
            {onIconClick ? (
              <button
                type="button"
                onClick={onIconClick}
                className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                aria-label="toggle-visibility"
              >
                <Icon size={20} className="text-gray-500" />
              </button>
            ) : (
              <Icon size={20} className="text-gray-500 pointer-events-none" />
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;