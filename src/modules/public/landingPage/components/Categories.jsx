import React from 'react'
import { MoveRight } from "lucide-react";
import { Link } from 'react-router-dom';
import Card from '../../../../components/ui/Card';

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:text-3xl md:text-4xl">
          Categorías
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Selecciona la categoría ideal para ti
          </p>
          <Link to="/properties"
            href=""
            className="inline-block px-4 py-2 font-bold text-sm sm:px-6 sm:py-3 sm:text-base"
          >
            <span className="flex items-center gap-2">
              Ver todas las categorías
              <MoveRight />
            </span>
          </Link>
        </div>
      </div>
      {/* Grid responsive: 1 col <640px, 2 cols ≥640px, 12-cols layout ≥1024px, 5 cols ≥1536px */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 2xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Primeras 3 imágenes */}
        <div className="lg:col-span-4 2xl:col-span-1">
          <Card className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-0">
            <img
              src="/img/houses.jpg"
              alt="Casas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Casas</h3>
              <p className="text-sm">2 Propiedades</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 2xl:col-span-1">
          <Card className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-0">
            <img
              src="/img/apartments.jpg"
              alt="Apartamentos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Apartamentos</h3>
              <p className="text-sm">3 Propiedades</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 2xl:col-span-1">
          <Card className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-0">
            <img
              src="/img/offices.webp"
              alt="Oficinas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Oficinas</h3>
              <p className="text-sm">3 Propiedades</p>
            </div>
          </Card>
        </div>
        {/* Imágenes 4 y 5 - centradas en la segunda fila */}
        <div className="lg:col-start-3 lg:col-span-4 2xl:col-span-1">
          <Card className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-0">
            <img
              src="/img/unifamiliares.avif"
              alt="Unifamiliares"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Unifamiliares</h3>
              <p className="text-sm">5 Propiedades</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 2xl:col-span-1 hidden lg:block">
          <Card className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-0">
            <img
              src="/img/hotels.jpg"
              alt="Hoteles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Hoteles</h3>
              <p className="text-sm">3 Propiedades</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Categories