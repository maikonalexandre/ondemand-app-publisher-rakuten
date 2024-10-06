// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000", // Substitua pela URL real do backend
  timeout: 10000,
});

// Interceptador para incluir o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido ou expirado
      // Implementar lógica para logout automático
      localStorage.removeItem("token");
      window.location.href = "/"; // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export default api;
