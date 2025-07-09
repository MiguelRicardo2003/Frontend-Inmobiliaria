const Register = () => {
  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center bg-[#1E2A3A]">
      <div className="bg-white h-[58%] w-[90%] sm:w-[400px] p-8 rounded-xl shadow-md">
        {/* Encabezado */}
        <div className="text-sm text-gray-700 mb-2">Bienvenido a JustHome</div>
        <div className="text-3xl font-semibold mb-8 text-black">Crear cuenta</div>

        {/* Usuario o correo electrónico */}
        <div className="text-sm font-medium text-gray-700 mb-1">Ingresa tu  usuario o correo electronico</div>
        <div className="mb-6">
          <div className="w-full border border-gray-300 focus-within:border-blue-500 rounded-lg px-4 py-3 text-gray-700 focus-within:outline-none">
            Usuario o contraseña
          </div>
        </div>

        {/* Nombre de usuario y número de contacto */}
        <div className="flex flex-col sm:flex-row sm:gap-4 mb-6">
          <div className="flex-1 mb-4 sm:mb-0">
            <div className="text-sm font-medium text-gray-700 mb-1">Nombre de usuario</div>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500">
              nombre de usuario
            </div>
          </div>

          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-1">Numero de contacto</div>
            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500">
              Numero de contacto
            </div>
          </div>
        </div>

        {/* Contraseña */}
        <div className="text-sm font-medium text-gray-700 mb-1">Ingresa tu contraseña</div>
        <div className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 mb-8">
          Contraseña
        </div>

        {/* Botón de registro */}
        <div className="w-full bg-[#1E2A3A] text-white text-center py-3 rounded-lg hover:bg-[#2c3e50] transition mb-4">
          Registrarse
        </div>

        {/* Enlace de registro */}
        <div className="text-sm text-center text-gray-400">
          ¿No tienes cuenta?{" "}
          <span className="text-[#1E2A3A] font-medium cursor-pointer hover:underline">
            Regístrate
          </span>
        </div>

      </div>
    </div>
  )
}

export default Register;