import Input from "../../../components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FormSingIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-auto w-auto">
      <div className="h-50 w-auto mb-1">
        <form action="">
          <Input
            label="Ingresa tu correo electronico"
            type="email"
            placeholder="Correo Electrónico"
            className="mb-8 border-2"
          />
          <Input
            label="Introduce la contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            icon={showPassword ? EyeOff : Eye}
            iconPosition="right"
            onIconClick={() => setShowPassword(!showPassword)}
            className="mt-2 border-2"
          />
        </form>
      </div>
      <div className="text-xs text-right mb-1 mt-2">
        <Link
          to="/forgotPassword"
          className="text-gray-600 font-medium hover:underline"
        >
          Olvide la contraseña
        </Link>
      </div>
    </div>
  );
};

export default FormSingIn;
