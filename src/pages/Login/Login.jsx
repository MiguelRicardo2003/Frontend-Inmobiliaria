import FormSingIn from "./components/FormSingIn";
import Button from "../../../src/components/ui/Button";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Fondo dividido */}
      <div className="absolute top-6 left-6 z-20">
      <img src="/img/logo_justhome.png" alt="JustHome Logo" className="h-10 w-auto" />
      </div>
      <div className="absolute top-0 w-full h-full flex flex-col">
        <div className="lg:h-1/2 h-full flex bg-[#1E2A3A] relative justify-center pr-96">
        <img 
        src="/img/rocket.png"
        alt="cohete" 
        className="hidden  lg:block top-10 right-24 w-auto z-10"
        />
        </div>
        <div className="lg:h-1/2 bg-white"></div>
      </div>

      {/* Contenido encima */}
      <div className="relative z-10 h-full w-full flex items-center justify-center lg:justify-end lg:px-40">
        {/* Aquí va tu login u otro contenido */}
        <div className="bg-white h-auto w-96 md:w-[450px]    p-8 rounded-xl shadow-md">
          {/* Encabezado */}
          <div className="text-base  mb-1">Bienvenido a JustHome </div>
          <div className="h-20 w-auto flex text-4xl text-center items-center justify-center font-bold mb-4 text-black">Iniciar sesión</div>
          <FormSingIn />
          {/* Botón de registro */}
          <Button variant="primary" className="w-full  py-3 rounded-lg font-semibold transition mb-4 mt-3">Acceder</Button>
          {/* Enlace de registro */}
          <div className="text-sm text-center text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;