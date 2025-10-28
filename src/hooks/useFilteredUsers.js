import { useMemo } from "react";

export const useFilteredUsers = (usuarios, searchTerm, currentPage, itemsPerPage) => {
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return usuarios;
    }
    
    const term = searchTerm.toLowerCase();
    return usuarios.filter((u) => {
      const nombre = u.nombre?.toLowerCase() || '';
      const apellido = u.apellido?.toLowerCase() || '';
      const correo = u.correo?.toLowerCase() || '';
      const celular = u.celular?.toLowerCase() || '';
      const rol = u.rol?.nombre?.toLowerCase() || '';
      
      return (
        nombre.includes(term) ||
        apellido.includes(term) ||
        correo.includes(term) ||
        celular.includes(term) ||
        rol.includes(term)
      );
    });
  }, [usuarios, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { filteredUsers, paginatedUsers, totalPages };
};
