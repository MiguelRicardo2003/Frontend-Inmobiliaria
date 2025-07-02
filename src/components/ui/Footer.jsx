import { ArrowRight, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2D3A4E] text-white pt-12 pb-6 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-9 gap-y-9">
        {/* Logo + Suscripción */}
        <div className="flex flex-col gap-2">
          {/* <div className="flex items-center gap-2 mb-4">
            <img src="/LogoZeta.png" alt="Logo" className="h-6" />
            <h1 className="text-xl font-bold">JustHome</h1>
          </div> */}
          <p className="text-sm mb-2">Suscribirse</p>
          <div className="flex flex-col gap-4 mb-2">  
            <input
              type="email"
              placeholder="Tu e-mail"
              className="bg-transparent border-b border-white text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 px-2 py-1 w-full sm:w-auto"
            />
            <button className="bg-[#4b658d] hover:bg-blue-600 px-4 py-2 rounded-full text-sm flex items-center gap-1 w-28">
              Envia <ArrowRight size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-300">
            Suscríbete a nuestro boletín para recibir nuestro feed semanal.
          </p>
        </div>

        {/* Descubrir */}
        <div>
          <h3 className="font-semibold mb-2">Descubrir</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>Carepa</li>
            <li>Antioquia</li>
            <li>Medellín</li>
            <li>Córdoba</li>
            <li>Envigado</li>
            <li>Apartadó</li>
          </ul>
        </div>

        {/* Enlaces Rápidos */}
        <div>
          <h3 className="font-semibold mb-2">Enlaces Rápidos</h3>
          <ul className="text-sm space-y-1 text-gray-300">
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
              <NavLink to="/politica">Políticas de Privacidad</NavLink>
            </li>
            <li>
              <NavLink to="/terminos">Términos & Condiciones</NavLink>
            </li>
          </ul>
        </div>

        {/* Contactanos */}
        <div>
          <h3 className="font-semibold mb-2">Contáctanos</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
            <Mail size={16} /> <span>@inmobiliaria.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
            <Phone size={16} /> <span>(+57) 456-7890</span>
          </div>
          <h4 className="font-semibold mb-1">Síguenos</h4>
          <div className="flex gap-3">
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
        <div>
          <h3 className="font-semibold mb-2">Nuestras Direcciones</h3>
          <p className="text-sm text-gray-300">Avenida Siempre viva</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-700 pt-4">
        Copyright © {new Date().getFullYear()} Inmobiliaria
      </div>
    </footer>
  );
};

export default Footer;
