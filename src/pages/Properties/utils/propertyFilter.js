const filterProperties = (dataProperties, filters) => {
  if (!Array.isArray(dataProperties)) return [];

  return dataProperties.filter((p) => {
    const matchesSearch =
      !filters.search ||
      p.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.ubicacion.toLowerCase().includes(filters.search.toLowerCase());

    const matchesTipo = !filters.tipo || p.tipo === filters.tipo;
    const matchesEstado = !filters.estado || p.estado === filters.estado;
    const matchesCiudad =
      !filters.ciudad || p.ciudad.toLowerCase().includes(filters.ciudad.toLowerCase());

    const matchesPrecioMin = !filters.precioMin || p.precio >= Number(filters.precioMin);
    const matchesPrecioMax = !filters.precioMax || p.precio <= Number(filters.precioMax);

    return (
      matchesSearch &&
      matchesTipo &&
      matchesEstado &&
      matchesCiudad &&
      matchesPrecioMin &&
      matchesPrecioMax
    );
  });
};

export default filterProperties;
