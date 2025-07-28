const PasswordChangeForm = ({ passwords, onChange }) => (
  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Cambiar Contraseña</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Contraseña actual</label>
        <input
          type="password"
          name="actual"
          value={passwords.actual}
          onChange={onChange}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nueva contraseña</label>
        <input
          type="password"
          name="nueva"
          value={passwords.nueva}
          onChange={onChange}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Confirmar nueva</label>
        <input
          type="password"
          name="confirmar"
          value={passwords.confirmar}
          onChange={onChange}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  </div>
);

export default PasswordChangeForm; 