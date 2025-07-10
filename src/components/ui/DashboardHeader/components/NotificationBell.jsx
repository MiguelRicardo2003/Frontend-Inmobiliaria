import { useRef, useState, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShow(!show)}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
      >
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-30">
          <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold mb-2">Notificaciones</p>
            <ul className="space-y-2">
              <li>Tienes 3 nuevos mensajes</li>
              <li>Nueva propiedad registrada</li>
              <li>Nuevo cliente registrado</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
