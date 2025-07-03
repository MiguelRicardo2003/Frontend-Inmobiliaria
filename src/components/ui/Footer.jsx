import { NavLink } from "react-router-dom";
import {ArrowRight, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Home} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2D3A4E] text-white pt-12 pb-6 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <Home size={24} />
          <h1 className="text-xl font-bold">JustHome</h1>
        </div>

        {/* Sección SUSCRIBIRSE */}
        <div className="flex flex-col items-center gap-4 text-center lg:hidden">
          <h2 className="text-base font-semibold">Suscribirse</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pb-4">
            <input
              type="email"
              placeholder="Tú email"
              className="bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 px-2 py-1 w-full border-b border-white"
            />
            <button className="bg-[#4b658d] hover:bg-blue-600 px-4 py-2 rounded-full text-sm flex items-center gap-1 w-full sm:w-24 justify-center">
              Enviar <ArrowRight size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-300 max-w-md">
            Suscríbete a nuestro boletín para recibir nuestro feed semanal.
          </p>
        </div>

        {/* Grid general para tablet y desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm w-full mt-4">
          <div className="hidden lg:flex flex-col items-start gap-4 text-left">
            <h2 className="text-base font-semibold">Suscribirse</h2>
            <div className="flex flex-col gap-3 w-full max-w-xs pb-2">
              <input
                type="email"
                placeholder="Tú email"
                className="bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 px-2 py-1 w-full border-b border-white"
              />
              <button className="bg-[#4b658d] hover:bg-blue-600 px-4 py-2 rounded-full text-sm flex items-center gap-1 w-full justify-center">
                Enviar <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Suscríbete a nuestro boletín para recibir nuestro feed semanal.
            </p>
          </div>

          {/* Descubrir */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold mb-2">Descubrir</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Arauca</li>
              <li>Antioquia</li>
              <li>Caldas</li>
              <li>Córdoba</li>
              <li>Magdalena</li>
              <li>Tolima</li>
            </ul>
          </div>

          {/* Enlaces Rápidos */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold mb-2">Enlaces Rápidos</h3>
            <ul className="space-y-1 text-gray-300">
              <li>
                <NavLink to="/">Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/about">Sobre Nosotros</NavLink>
              </li>
              <li>
                <NavLink to="/servicios">Servicios</NavLink>
              </li>
              <li>
                <NavLink to="/propiedades">Propiedades</NavLink>
              </li>
              <li>
                <NavLink to="/politica">Política de privacidad</NavLink>
              </li>
              <li>
                <NavLink to="/terminos">Términos y condiciones</NavLink>
              </li>
            </ul>
          </div>

          {/* Contáctanos + Síguenos */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold mb-2">Contáctanos</h3>
            <div className="text-gray-300">@Inmobiliaria.com</div>
            <div className="text-gray-300 mb-4">(+57) 456-7890</div>

            <h4 className="font-semibold mt-2">Síguenos</h4>
            <div className="flex gap-4 mt-1 text-gray-300">
              <a href="#" className="hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Dirección */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold mb-2">Nuestra dirección</h3>
            <p className="text-gray-300">Avenida Siempre viva</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-700 pt-4">
          Copyright © 2025. Codelab
        </div>
      </div>
    </footer>
  );
};

export default Footer;
