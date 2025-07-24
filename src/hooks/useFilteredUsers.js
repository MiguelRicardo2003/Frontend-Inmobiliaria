import { useMemo } from "react";

export const useFilteredUsers = (usuarios, searchTerm, currentPage, itemsPerPage) => {
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return usuarios.filter((u) =>
      u.nombre.toLowerCase().includes(term) ||
      u.rol.toLowerCase().includes(term) ||
      u.descripcion.toLowerCase().includes(term)
    );
  }, [usuarios, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { filteredUsers, paginatedUsers, totalPages };
};
