import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Interceptor para manejo de errores global
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
    }
);

export default api;
