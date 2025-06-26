import React from 'react'

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

          <a 
            href="" 
            className="inline-block px-4 py-2 font-bold text-sm sm:px-6 sm:py-3 sm:text-base"
          >
            Ver todas las categorías
          </a>
        </div>
      </div>

      {/* Grid responsive: 1 col <640px, 2 cols ≥640px, 12-cols layout ≥1024px, 5 cols ≥1536px */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 2xl:grid-cols-5 gap-4 sm:gap-6">

        {/* Primeras 3 imágenes */}
        <div className="lg:col-span-4 2xl:col-span-1">
          <div className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src="https://www.ddc-law.com/wp-content/uploads/2023/01/LandUseLawFAQ_Callout.jpg"
              alt="Terrenos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Terrenos</h3>
              <p className="text-sm">Encuentra el terreno perfecto</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 2xl:col-span-1">
          <div className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src="https://terangaagency.com/wp-content/uploads/2024/03/h103.jpg"
              alt="Casas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Casas</h3>
              <p className="text-sm">Tu hogar ideal te espera</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 2xl:col-span-1">
          <div className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src="https://kalyanidevelopers.com/_next/image?url=https%3A%2F%2Fadmin.kalyanidevelopers.com%2Fuploads%2FRectangle_6868_206aeaed16.jpg&w=3840&q=75"
              alt="Apartamentos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Apartamentos</h3>
              <p className="text-sm">Vida urbana y moderna</p>
            </div>
          </div>
        </div>

        {/* Imágenes 4 y 5 - centradas en la segunda fila */}
        <div className="lg:col-start-3 lg:col-span-4 2xl:col-span-1">
          <div className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src="https://img.freepik.com/fotos-premium/casa-moderna-jardin_251764-379.jpg"
              alt="Casas Modernas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Casas Modernas</h3>
              <p className="text-sm">Diseño contemporáneo</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 2xl:col-span-1 hidden lg:block">
          <div className="relative w-full h-[295px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src="https://i.pinimg.com/736x/be/fc/69/befc69e1d7b8ee6f456d7743dfde2feb.jpg"
              alt="Villas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">Villas</h3>
              <p className="text-sm">Lujo y exclusividad</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Categories