const PersonalInfoForm = ({ form, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
    <div>
      <label className="block text-sm font-medium mb-1">Nombre</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Apellidos</label>
      <input
        type="text"
        name="apellidos"
        value={form.apellidos}
        onChange={onChange}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Correo Electronico</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={onChange}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Teléfono</label>
      <input
        type="tel"
        name="telefono"
        value={form.telefono}
        onChange={onChange}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  </div>
);

export default PersonalInfoForm;
