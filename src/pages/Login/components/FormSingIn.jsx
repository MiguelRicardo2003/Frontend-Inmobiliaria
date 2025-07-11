import Input from "../../../components/ui/Input";
const FormSingIn = () => {
  return (
    <div className="h-auto w-auto">
      <div className="h-50 w-auto mb-2">
        <form action="">
          <Input
            label="Ingresa tu usuario o correo electronico"
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
        </form>
      </div>
      <div className="flex text-xs text-right justify-end mb-1">
        <span className="text-gray-600 font-medium cursor-pointer hover:underline">
          Olvide la contraseña
        </span>
      </div>
    </div>
  );
}
export default FormSingIn;