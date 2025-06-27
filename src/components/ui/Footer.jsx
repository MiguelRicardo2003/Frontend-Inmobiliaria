import { ArrowRight,  Phone, Mail, } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#2D3A4E] py-10 flex flex-col items-center gap-10 w-full">
      {/* Logo y nombre */}
      <div className="flex gap-2 items-center">
        <img
          src="/LogoZeta.png"
          alt="Logo de la inmobiliaria"
          className="h-6"
        />
        <h1 className="text-xl font-bold text-white">Inmobiliaria</h1>
      </div>

      {/* Suscripción */}
      <div className="flex flex-col gap-4 items-center w-full max-w-md px-4">
        <h2 className="text-white text-lg font-semibold">Suscribirse</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2">
          <input
            type="email"
            placeholder="Tu email"
            className="rounded-full px-4 py-2 w-full sm:w-auto text-gray-700 focus:outline-none"
          />
          <button className="bg-blue-400 rounded-full w-full sm:w-24 h-10 flex flex-row items-center justify-center gap-2 text-white mt-2 sm:mt-0">
            Enviar
            <ArrowRight size={16} />
          </button>
        </div>
        <p className="text-white text-sm text-center">Suscríbete a nuestro boletín para recibir nuestro feed semanal</p>
      </div>

      {/* Secciones principales */}
      <div className="w-full flex flex-col md:flex-row md:justify-center md:items-start gap-10 px-4">
        {/* Descubrir */}
        <div className="flex flex-col items-center md:items-start gap-1 flex-1">
          <p className="text-white font-semibold mb-2">Descubrir</p>
          <p className="text-white text-sm">Arauca</p>
          <p className="text-white text-sm">Antioquia</p>
          <p className="text-white text-sm">Caldas</p>
          <p className="text-white text-sm">Córdoba</p>
          <p className="text-white text-sm">Medellín</p>
          <p className="text-white text-sm">Carepa</p>
        </div>
        {/* Enlaces Rápidos */}
        <div className="flex flex-col items-center md:items-start gap-1 flex-1">
          <p className="text-white font-semibold mb-2">Enlaces Rápidos</p>
          <NavLink to="/" className="text-white text-sm hover:text-blue-400">Inicio</NavLink>
          <NavLink to="/about" className="text-white text-sm hover:text-blue-400">Sobre Nosotros</NavLink>
          <NavLink to="/servicios" className="text-white text-sm hover:text-blue-400">Servicios</NavLink>
          <NavLink to="/propiedades" className="text-white text-sm hover:text-blue-400">Propiedades</NavLink>
          <NavLink to="/politica" className="text-white text-sm hover:text-blue-400">Política de privacidad</NavLink>
          <NavLink to="/terminos" className="text-white text-sm hover:text-blue-400">Términos & condiciones</NavLink>
        </div>
        {/* Contáctanos */}
        <div className="flex flex-col items-center md:items-start gap-1 flex-1">
          <p className="text-white font-semibold mb-2">Contáctanos</p>
          <div className="flex items-center gap-2 text-white text-sm">
            <Mail size={16} />
            <span>info@inmobiliaria.com</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <Phone size={16} />
            <span>+57 300 123 4567</span>
          </div>
        </div>
        {/* Síguenos */}
        <div className="flex flex-col items-center md:items-start gap-1 flex-1">
          <p className="text-white font-semibold mb-2">Síguenos</p>
          <div className="flex gap-4 mt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400"></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400"></a>
            <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400"></a>
          </div>
        </div>
      </div>

      {/* Footer base */}
      <div className="w-full text-center text-white text-xs mt-8">© {new Date().getFullYear()} Inmobiliaria. Todos los derechos reservados.</div>
    </div>
  );
};

export default Footer;
