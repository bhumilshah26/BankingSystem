import axios from 'axios';

const api = axios.create({
  // Backend URL comes from frontend/.env (REACT_APP_BACKEND_URL).
  // Falls back to localhost for local development.
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}); 


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
