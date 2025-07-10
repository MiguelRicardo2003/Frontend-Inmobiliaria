import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
const FormSingUp = () => {
  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center bg-[#1E2A3A]">
      <div className="bg-white h-auto w-96 p-8 rounded-xl shadow-md">
        {/* Encabezado */}
        <div className="text-base  mb-1">Bienvenido a JustHome </div>
        <div className="text-3xl font-medium mb-6 text-black">Crear cuenta</div>
        <form action="">
          <Input
            label="Nombre"
            type="text"
            placeholder="Nombre"
            className="mb-2"
          />
          <Input
            label="Apellido"
            type="text"
            placeholder="Apellido"
            className="mb-2"
          />
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="Correo Electrónico"
            className="mb-2"
          />
          <Input
            label="Telefono"
            type="tel"
            placeholder="maxixo 10 digitos"
            className="mb-2"
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            className="mb-2"
          />
          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="Confirmar Contraseña"
            className="mb-2"
          />
        </form>

        {/* Botón de registro */}
        <Button
          variant="primary"
          className="w-full  text-center py-3 rounded-lg  transition mb-4 mt-3">Registrarse
        </Button>

        {/* Enlace de registro */}
        <div className="text-sm text-center text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <span className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
            Inicia Sesión
          </span>
        </div>

      </div>
    </div>
  )
}
export default FormSingUp;