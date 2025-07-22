export const getPaginatedProperties = async (properties, page, perPage) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalPages = Math.ceil(properties.length / perPage);
      const start = (page - 1) * perPage;
      const paginated = properties.slice(start, start + perPage);
      
      resolve({ paginated, totalPages });
    }, 50);
  });
};
  