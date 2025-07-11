import Input from "../../../components/ui/Input";
const FormSingUp = () => {
  return (
      <div className="h-auto w-auto">
        <div className="flex flex-row gap-4 mb-4">
          <div className="flex-1">
            <form action="">
              <Input
                label="Nombre"
                type="text"
                placeholder="Nombre"
                className="mb-2"
                />
            </form>
          </div>
          <div className="flex-1">
            <form action="">
              <Input
                label="Apellido"
                type="text"
                placeholder="Apellido"
                className="mb-2"
                />
            </form>
          </div>
        </div>

        <div className="flex flex-row gap-4 mb-3 ">
          <div className="flex-1">
            <form action="">
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="Correo Electrónico"
                className="mb-3"
                />
            </form>
          </div>
          <div className="flex-1">
            <form action="">
              <Input
                label="Telefono"
                type="tel"
                placeholder="maxixo 10 digitos"
                className="mb-2"
                />
            </form>
          </div>
        </div>

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
      </div>
  )
}
export default FormSingUp;