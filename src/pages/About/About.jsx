import Card from "../../components/ui/Card";
const About = () => {
  return (
    <div>
      {/* Sección: Acerca de Nosotros */}
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Acerca de Nosotros
            </h1>
          </div>

          <Card className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-200">
            <p className="text-1xl text-gray-700 leading-relaxed">
              En JustHome, conectamos personas con espacios donde puedan construir sus sueños.
              Con más de 10 años de experiencia, brindamos acompañamiento cercano y transparente
              en todo el proceso inmobiliario. Nuestro compromiso va más allá de mostrar propiedades:
              ofrecemos asesoría personalizada basada en tus necesidades y estilo de vida.
              Cada cliente es único, por eso te guiamos con responsabilidad desde la primera
              visita hasta la firma final. Ya sea tu primera vivienda, una inversión o un nuevo
              lugar para crecer, estamos aquí para ayudarte a tomar la mejor decisión.
              Confía en nosotros y descubre por qué cientos de personas ya encontraron su lugar ideal.
            </p>
          </Card>
        </div>
      </div>

      {/* Sección: Equipo de Liderazgo */}
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Conozca a Nuestro Equipo de Liderazgo
          </h1>
          <p className="text-1xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            "Somos un equipo de expertos inmobiliarios dedicados a ayudarte a alcanzar
            tus objetivos. Ofrecemos un servicio de excelencia y asesoría personalizada
            para que encuentres el hogar perfecto para ti."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Carta 1 */}
          <Card className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="María García"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 border-4 border-gray-100"
              />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                María García
              </h2>
              <h3 className="text-base sm:text-lg text-blue-600 font-medium mb-3">
                Directora de Calidad
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Especialista en marketing digital y ventas. Líder en implementación de
                estrategias innovadoras para el sector inmobiliario.
              </p>
            </div>
          </Card>

          {/* Carta 2 */}
          <Card className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Carlos Rodríguez"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 border-4 border-gray-100"
              />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Carlos Rodríguez
              </h2>
              <h3 className="text-base sm:text-lg text-blue-600 font-medium mb-3">
                Gerente de Ventas
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Experto en negociación y cierre de ventas. Más de 10 años de experiencia
                en el mercado inmobiliario residencial y comercial.
              </p>
            </div>
          </Card>

          {/* Carta 3 centrada en md */}
          <Card className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 md:col-span-2 md:mx-auto md:w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Ana Martínez"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 border-4 border-gray-100"
              />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Ana Martínez
              </h2>
              <h3 className="text-base sm:text-lg text-blue-600 font-medium mb-3">
                Asesora Legal
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Abogada especializada en derecho inmobiliario. Garantiza que todas las
                transacciones cumplan con la normativa legal vigente.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Sección: Valores Fundamentales */}
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros valores fundamentales
          </h1>
          <p className="text-1xl text-gray-600 max-w-xl mx-auto">
            Estos principios guían todo lo que hacemos y nos ayudan a brindar un servicio excepcional
            a nuestros clientes.
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <Card className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Integridad
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Mantenemos los más altos estándares éticos en todos nuestros tratos,
              garantizando transparencia y confianza en cada transacción.
            </p>
          </Card>

          <Card className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Excelencia
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nos esforzamos por la excelencia en todos los aspectos de nuestro servicio,
              superando constantemente las expectativas de nuestros clientes.
            </p>
          </Card>

          <Card className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Innovación
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Adoptamos tecnología de vanguardia y soluciones innovadoras para brindar el mejor
              servicio posible a nuestros clientes.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
