import {
  Home,
  KeyRound,
  Wallet,
  LineChart,
  Scale,
  Building2,
  Calculator,
  BookOpen,
  Receipt,
} from "lucide-react";

const services = [
  {
    iconName: "Home",
    title: "Compra y Venta de Propiedades",
    description:
      "Te ayudamos a encontrar la propiedad perfecta según tus necesidades y presupuesto.",
    color: "blue",
  },
  {
    iconName: "KeyRound",
    title: "Alquiler de Inmuebles",
    description:
      "Gestionamos alquileres de todo tipo de propiedades con contratos seguros.",
    color: "purple",
  },
  {
    iconName: "Scale",
    title: "Asesoramiento Legal",
    description:
      "Ofrecemos asesoramiento legal en todas las transacciones inmobiliarias.",
    color: "sky",
  },
  {
    iconName: "Wallet",
    title: "Transferencias Bancarias",
    description:
      "Proceso seguro y transparente para todas las transacciones financieras relacionadas con operaciones inmobiliarias.",
    color: "green",
  },
  {
    iconName: "BookOpen",
    title: "Asesoramiento en Ventas",
    description:
      "Estrategias personalizadas de marketing y ventas para maximizar el valor de su propiedad.",
    color: "rose",
  },
  {
    iconName: "LineChart",
    title: "Asesoramiento en Inversiones",
    description:
      "Análisis detallado del mercado y orientación experta para maximizar el retorno de inversiones inmobiliarias.",
    color: "amber",
  },
  {
    iconName: "Calculator",
    title: "Asesoramiento Financiero",
    description:
      "Consultoría financiera especializada para optimizar sus inversiones inmobiliarias y planificación fiscal.",
    color: "emerald",
  },
  {
    iconName: "Building2",
    title: "Gestión de Propiedades",
    description:
      "Administración integral de inmuebles, incluyendo mantenimiento, cobros y atención a inquilinos.",
    color: "indigo",
  },
  {
    iconName: "Receipt",
    title: "Gestión de Impuestos",
    description:
      "Asesoramiento experto en obligaciones fiscales relacionadas con operaciones inmobiliarias.",
    color: "cyan",
  },
];

const colorVariants = {
  blue: " text-blue-600 border-2 border-blue-600",
  purple: "text-purple-600 border-2 border-purple-600",
  green: "text-green-600 border-2 border-green-600",
  amber: "text-amber-600 border-2 border-amber-600",
  sky: "text-sky-600 border-2 border-sky-600",
  indigo: "text-indigo-600 border-2 border-indigo-600",
  emerald: "text-red-400 border-2 border-red-400",
  rose: "text-rose-600 border-2 border-rose-600",
  cyan: "text-cyan-600 border-2 border-cyan-600",
};

// Mapeo de nombres de iconos a componentes
const iconMap = {
  Home,
  KeyRound,
  Wallet,
  LineChart,
  Scale,
  Building2,
  Calculator,
  BookOpen,
  Receipt,
};

export { services, colorVariants, iconMap };
