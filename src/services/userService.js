// src/services/userService.js
import api from './api';

export const getUserProfile = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const updateUserProfile = async (id, data) => {
  const response = await api.put(`/usuarios/${id}`, data);
  return response.data;
};
