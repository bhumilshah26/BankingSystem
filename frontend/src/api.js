import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bankingsystem-i75o.onrender.com',
  // baseURL: 'http://localhost:5000',
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
