import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button"; // Asegúrate de importarlo si no estaba

const FormSingIn = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#1E2A3A]">
      <div className="bg-white h-auto w-96 p-8 rounded-xl shadow-md">
        {/* Encabezado */}
        <div className="text-base mb-1">Bienvenido a JustHome</div>
        <div className="h-20 w-auto flex text-4xl text-center items-center justify-center font-bold mb-6 text-black">
          Iniciar sesión
        </div>

        <form action="">
          <Input
            label="Ingresa tu usuario o correo electrónico"
            type="email"
            placeholder="Correo Electrónico"
            className="mb-8"
          />
          <Input
            label="Introduce tu contraseña"
            type="password"
            placeholder="Contraseña"
            className="mb-2"
          />

          <div className="flex text-xs text-right justify-end mb-4">
            <span className="text-gray-600 font-medium cursor-pointer hover:underline">
              Olvidé la contraseña
            </span>
          </div>

          <Button
            variant="primary"
            className="w-full text-center py-3 rounded-lg transition mb-4 mt-2"
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Enlace de registro */}
        <div className="text-sm text-center text-gray-400">
          ¿No tienes cuenta?{" "}
          <span className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
            Regístrate
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormSingIn;
