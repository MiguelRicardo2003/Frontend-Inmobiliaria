import FormSingIn from "./components/FormSingIn";
import Button from "../../../src/components/ui/Button";
import { Link } from "react-router-dom";
const Login = () => {
  return (
      <div className="h-screen w-full  flex flex-col items-center justify-center bg-[#1E2A3A]">
      <div className="bg-white h-auto w-96 p-8 rounded-xl shadow-md">
        {/* Encabezado */}
        <div className="text-base  mb-1">Bienvenido a JustHome </div>
        <div className="h-20 w-auto flex text-4xl text-center items-center justify-center font-bold mb-4 text-black">Iniciar sesión</div>

        <FormSingIn/>

        {/* Botón de registro */}
        <Button variant="primary" className="w-full  text-center py-3 rounded-lg  transition mb-4 mt-3">Iniciar Sesión</Button>

        {/* Enlace de registro */}
        <div className="text-sm text-center text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
            Crear cuenta
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login;