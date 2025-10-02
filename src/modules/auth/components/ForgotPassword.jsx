import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import HomeButton from "../../../components/ui/HomeButton";
import { useForm } from "react-hook-form";
const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Fondo dividido */}
      <div className="absolute top-6 left-6 z-20">
        <HomeButton />
      </div>

      <div className="absolute top-0 w-full h-full flex flex-col">
        <div className="lg:h-1/2 h-full flex bg-[#1E2A3A] relative justify-center pr-96">
          <img
            src="/img/rocket.png"
            alt="cohete"
            className="hidden lg:block top-10 right-24 w-auto z-10"
          />
        </div>
        <div className="lg:h-1/2 bg-white" />
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center lg:justify-end lg:px-40">
        <Card className="bg-white h-auto w-96 md:w-[450px] p-8 rounded-xl shadow-md">
          <form>
          <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
          <p className="text-gray-600 mb-4 text-center">
            Ingresa tu correo electrónico para recibir instrucciones de recuperación.
          </p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 rounded-lg font-semibold transition mb-4 mt-3"
              onClick={handleSubmit(onSubmit)}
            >
              Restablecer contraseña
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;