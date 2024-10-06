import api from './api';

export const createPrestador = (prestadorData) => {
  // console.log(prestadorData);
  return api.post('/prestadores/adicionar-e-criar-ticket', prestadorData); 
};

export const getPrestadorById = (id) => {
  return api.get(`/prestadores/${id}`);
};

export const getPrestadorByUsuarioId = (id) => {
  return api.get(`/prestadores/usuario/${id}`);
};

export const updatePrestador = (id, updatedData) => {
  return api.put(`/prestadores/${id}`, updatedData);
};