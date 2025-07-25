import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const Form = () => {
  return (
    <Card className="w-full bg-gray-100 rounded-lg p-6 max-w-lg">
      <form className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nombre Completo"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <Input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <Input
          type="text"
          placeholder="Teléfono"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <div>
          <p className="font-bold text-gray-800 mb-2">Me interesa:</p>
          <div className="flex flex-row gap-4 flex-wrap">
            <label className="inline-flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="interes"
                value="comprar"
                className="rounded-full border-2 border-gray-300 checked:bg-[#2D3A4E]"
              />
              Comprar
            </label>
            <label className="inline-flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="interes"
                value="rentar"
                className="accent-[#2D3A4E] rounded-full"
              />
              Rentar
            </label>
            <label className="inline-flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="interes"
                value="otro"
                className="accent-[#2D3A4E] rounded-full"
              />
              Otro
            </label>
          </div>
        </div>

        <Input
          as="textarea"
          placeholder="¿En qué podemos ayudarte?"
          rows={4}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <Button
          type="submit"
          className="bg-[#2D3A4E] hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Enviar mensaje
        </Button>
      </form>
    </Card>
  );
};

export default Form;
