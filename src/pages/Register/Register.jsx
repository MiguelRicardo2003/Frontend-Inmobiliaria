import { Link } from "react-router-dom";
import FormSignUp from "./components/FormSignUp";

const Register = () => {
  return (
    // 1. Contenedor principal con posicionamiento relativo.
    // En móvil, el fondo es oscuro. En 'md' y superior, el fondo se vuelve transparente
    // para que las divisiones horizontales sean visibles.
    <main className="relative min-h-screen w-full bg-brand-dark md:bg-transparent">
      
      {/* Logo en la esquina superior izquierda */}
      <div className="absolute top-6 left-6 z-20">
      <img src="/img/logo_justhome.png" alt="JustHome Logo" className="h-10 w-auto" />
      </div>

      {/* 2. El contenedor azul ahora es visible desde 'md' */}
      <div className="hidden md:flex items-center justify-start absolute top-0 left-0 w-full h-1/2 bg-brand-dark p-12">
        {/* La imagen dentro del contenedor solo es visible desde 'xl' */}
        <img src="/img/rocket.png" alt="Rocket Launch" className="hidden xl:block h-4/5 w-auto object-contain" />
      </div>

      {/* 3. Mitad inferior (blanca), solo visible en 'md' y superiores */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-1/2 bg-gray-100" />

      {/* 4. Contenedor del formulario, centrado y movido a la derecha en 2xl */}
      <div className="relative z-10 flex items-center justify-center xl:justify-end min-h-screen px-4 pt-24 pb-10  xl:pr-32">
        <section className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
          
          {/* Encabezado */}
          <header className="text-center mb-8">
            <p className="text-gray-500 text-left mb-4">Bienvenido a JustHome</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          </header>
          
          {/* El componente del formulario */}
          <div className="flex-grow ">
            <FormSignUp />
          </div>

          {/* Enlace de inicio de sesión */}
          <footer className="mt-6 text-sm text-center text-gray-500">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-semibold text-brand-dark hover:underline">
              Inicia Sesión
            </Link>
          </footer>
          
        </section>
      </div>
    </main>
  );
}

export default Register;