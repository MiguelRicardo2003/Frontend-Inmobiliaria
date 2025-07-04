export const getPaginatedProperties = (properties, page, perPage) => {
    const totalPages = Math.ceil(properties.length / perPage);
    const start = (page - 1) * perPage;
    const paginated = properties.slice(start, start + perPage);
    return { paginated, totalPages };
  };
  