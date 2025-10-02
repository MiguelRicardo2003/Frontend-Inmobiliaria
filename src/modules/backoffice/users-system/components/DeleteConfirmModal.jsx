import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

const DeleteConfirmModal = ({ onCancel, onConfirm }) => {
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
          exit={{ scale: 0.9, y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <AlertCircle className="text-blue-500" size={32} />
          </div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            ¿Está seguro que desea eliminar este usuario?
          </h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onCancel}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Eliminar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
