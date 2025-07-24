import { CircleCheckIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
};

const SuccessModal = ({ message = "Acción completada correctamente", onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm text-center border dark:border-gray-700"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-2">
              <CircleCheckIcon className="text-green-600" size={36} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Actualización exitosa!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm"
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessModal;
