import React from 'react'
import { Quote } from 'lucide-react'
import Card from '../../../../components/ui/Card';
import { reviews } from '../../../../shared/utils/data';

const ReviewCard = ({ name, role, image, text }) => (
  <Card className="bg-[#f9f9f9] p-6 shadow-md w-96 h-72 justify-self-center">
    <div className='flex items-center gap-4 mb-4'>
      <img
        src={image}
        alt={name}
        className='w-16 h-16 rounded-full object-cover border-2 border-primary'
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <Quote className="text-primary opacity-60" size={32} />
    </div>
    <p className="text-gray-700 italic">
      {text}
    </p>
  </Card>
);

const Reviews = () => {
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
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews
