import axios from 'axios';

const api = axios.create({
  // Backend URL comes from frontend/.env (REACT_APP_BACKEND_URL).
  // Falls back to the hosted backend (used for local dev too) when no .env is present.
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://bankingsystem-i75o.onrender.com',
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
