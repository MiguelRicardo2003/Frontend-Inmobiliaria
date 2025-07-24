import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esta URL por la de tu backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 