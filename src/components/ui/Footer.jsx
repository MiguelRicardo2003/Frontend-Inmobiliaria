import { NavLink } from "react-router-dom";
import { ArrowRight, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Home } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2D3A4E] text-white pt-12 pb-6 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* LOGO / TITULO */}
        <div className="flex items-center justify-center gap-2">
          <Home size={24} />
          <h1 className="text-xl font-bold">Inmobiliaria</h1>
        </div>

        {/* Sección SUSCRIBIRSE - solo 1 columna centrada */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-base font-semibold">Suscribirse</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Tu e-mail"
              className="bg-transparent border-b border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 px-2 py-1 w-full"
            />
            <button className="bg-[#4b658d] hover:bg-blue-600 px-4 py-2 rounded-full text-sm flex items-center gap-1 w-full sm:w-28 justify-center">
              Enviar <ArrowRight size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-300 max-w-md">
            Suscríbete a nuestro boletín para recibir nuestro feed semanal.
          </p>
        </div>

        {/* Grid: 2 columnas desde sm y 4 en lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm mt-4">

          {/* Descubrir */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold mb-2">Descubrir</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Carepa</li>
              <li>Antioquia</li>
              <li>Medellín</li>
              <li>Córdoba</li>
              <li>Envigado</li>
              <li>Apartadó</li>
            </ul>
          </div>

          {/* Enlaces Rápidos */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold mb-2">Enlaces Rápidos</h3>
            <ul className="space-y-1 text-gray-300">
              <li><NavLink to="/">Inicio</NavLink></li>
              <li><NavLink to="/about">Sobre Nosotros</NavLink></li>
              <li><NavLink to="/servicios">Servicios</NavLink></li>
              <li><NavLink to="/propiedades">Propiedades</NavLink></li>
              <li><NavLink to="/politica">Políticas de Privacidad</NavLink></li>
              <li><NavLink to="/terminos">Términos & Condiciones</NavLink></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold mb-2">Contáctanos</h3>
            <div className="flex items-center gap-2 text-gray-300 mb-1">
              <Mail size={16} /> <span>@inmobiliaria.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mb-3">
              <Phone size={16} /> <span>(+57) 456-7890</span>
            </div>
          </div>

          {/* Dirección */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold mb-2">Nuestra Dirección</h3>
            <p className="text-gray-300">Avenida Siempre viva</p>
          </div>
        </div>

        {/* Redes sociales centrado */}
        <div className="flex flex-col items-center gap-2 mt-8">
          <h4 className="font-semibold">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white"><Twitter size={18} /></a>
            <a href="#" className="hover:text-white"><Instagram size={18} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Base Footer */}
        <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-700 pt-4">
          Copyright © {new Date().getFullYear()} Inmobiliaria
        </div>
      </div>
    </footer>
  );
};

export default Footer;