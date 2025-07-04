import React from 'react'
import { Quote } from 'lucide-react'

const Testimonios = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col items-center gap-8 lg:justify-between">
        {/* Título y estadísticas */}
        <div className="text-center lg:flex lg:flex-row lg:items-center lg:justify-between w-full mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 lg:mb-0 ">
            ¿Qué dicen <br className="hidden md:block" />nuestros clientes?
          </h1>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">10m+</p>
              <p className="text-gray-600">Personas Felices</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">4.88</p>
              <p className="text-gray-600">Calificación general</p>
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="grid grid-cols-1 gap-6 w-full max-w-6xl sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md w-96 h-72 justify-self-center">
            <div className='flex items-center gap-4 mb-4'>
              <img
                src="https://i.pinimg.com/736x/a5/2c/44/a52c4459940205d17c98ab5c254689f5.jpg"
                alt="Juliana Galvis"
                className='w-16 h-16 rounded-full object-cover border-2 border-primary'
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Juliana Galvis</h3>
                <p className="text-sm text-gray-500">Cliente</p>
              </div>
              <Quote className="text-primary opacity-60" size={32} />
            </div>
            <p className="text-gray-700 italic">
              "JustHome demostró un alto nivel de profesionalismo y compromiso en cada etapa
              del proceso. Su equipo brindó un acompañamiento claro y eficiente, lo que generó
              confianza y seguridad. Recomiendo sus servicios por su seriedad y calidad en la atención."
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md w-96 h-72 justify-self-center">
            <div className='flex items-center gap-4 mb-4'>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Carlos Pérez"
                className='w-16 h-16 rounded-full object-cover border-2 border-primary'
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Carlos Pérez</h3>
                <p className="text-sm text-gray-500">Abogado</p>
              </div>
              <Quote className="text-primary opacity-60" size={32} />
            </div>
            <p className="text-gray-700 italic">
              Destaco su atención al cliente, el manejo eficiente de los trámites y la
              transparencia durante todo el proceso. Es una empresa confiable y recomendabl
              para quienes buscan servicios inmobiliarios serios y responsables.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md w-96 h-72 justify-self-center lg:col-span-2 lg:col-start-1 xl:col-span-1 xl:col-start-auto">
            <div className='flex items-center gap-4 mb-4'>
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="María López"
                className='w-16 h-16 rounded-full object-cover border-2 border-primary'
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">María López</h3>
                <p className="text-sm text-gray-500">Psicologa</p>
              </div>
              <Quote className="text-primary opacity-60" size={32} />
            </div>
            <p className="text-gray-700 italic">
              Mi experiencia con JustHome fue satisfactoria. Destaco su puntualidad,
              buen trato y conocimiento del mercado. Su gestión facilitó todo el proceso,
              lo que demuestra su compromiso con un servicio de calidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonios
