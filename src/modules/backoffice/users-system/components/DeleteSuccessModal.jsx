import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DeleteSuccessModal = ({ onClose, timeout = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, timeout);
    return () => clearTimeout(timer);
  }, [onClose, timeout]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm text-center border dark:border-gray-700"
          initial={{ scale: 0.9, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <X className="text-red-500" size={32} />
          </div>
          <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Usuario eliminado</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">El usuario ha sido eliminado</p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteSuccessModal;
