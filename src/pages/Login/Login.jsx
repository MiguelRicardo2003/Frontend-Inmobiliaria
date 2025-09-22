import FormSignIn from "./components/FormSignIn";
import HomeButton from "../../components/ui/HomeButton";

const Login = () => {
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
            className="hidden  lg:block top-10 right-24 w-auto z-10"
          />
        </div>
        <div className="lg:h-1/2 bg-white"></div>
      </div>
      {/* Contenido encima */}
      <div className="relative z-10 h-full w-full flex items-center justify-center lg:justify-end lg:px-40">
        <FormSignIn />
      </div>
    </div>
  );
};

export default Login;
