import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const stats = [
    { number: '680', label: 'Premiado' },
    { number: '8K+', label: 'Cliente feliz' },
    { number: '500+', label: 'Propiedad lista' }
  ];

  return (
    <section className="relative bg-[#1b4f5c] overflow-hidden w-full min-h-screen flex items-center">
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                El sitio #1 en el que{' '}
                <span className="text-[#e7c873]">confían</span> los profesionales inmobiliarios
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 font-light">
                Desde tan solo $10 por día con descuentos por tiempo limitado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-[#e7c873] hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Explorar más propiedades
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
           
            </div>
          </div>

          {/* Right Content - House Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern house architecture"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
            
            </div>

            {/* Background Decoration */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-full  border-2 border-white/20 rounded-2xl -z-10"></div>
          </div>
        </div>
{/* Stats Section */}
<div className="mt-12 lg:mt-20">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
    {stats.map((stat, index) => (
      <div key={index} className="text-center group">
        <div className="bg-[#e7c873] rounded-xl p-4">
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-1">
            {stat.number}
          </h3>
          <p className="text-black/70 font-medium text-base">
            {stat.label}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>

    </section>
  );
};

export default Hero;