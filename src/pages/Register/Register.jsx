import FormSingUp from "./components/FormSingUp";
import Button from "../../../src/components/ui/Button"; 
import { Link } from "react-router-dom";
const Register = () => {
  return (
      <div className="h-screen w-full  flex flex-col items-center justify-center bg-[#1E2A3A]">
      <div className="bg-white h-[75%] w-[75%] md:w-[50%] md:h-[55%] p-8 rounded-xl shadow-md">
        {/* Encabezado */}
        <div className="text-base  mb-1">Bienvenido a JustHome </div>
        <div className="text-3xl font-semibold mb-6 text-black">Crear cuenta</div>
        
        <FormSingUp/>

        {/* Botón de registro */}
        <Button variant="primary" className="w-full  text-center py-3 rounded-lg  transition mb-4 mt-3">Registrarse</Button>

        {/* Enlace de registro */}
        <div className="text-sm text-center text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
            Inicia Sesión
          </Link>
        </div>
        
      </div>
    </div>
  );
}
export default Register;