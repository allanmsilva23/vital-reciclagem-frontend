import axios from 'axios';
import router from '../router'; 

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 || error.response.status === 403) {
      
      if (!originalRequest._retry) {
        originalRequest._retry = true; 

        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('admin_level');
        localStorage.removeItem('user_id');
      
        if (router) {
            console.warn('Token expirado ou inválido. Redirecionando para login.');
            router.push('/login-admin'); 
        } else {
            window.location.href = '/login-admin';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;