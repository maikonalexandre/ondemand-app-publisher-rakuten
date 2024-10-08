import api from "./api";

export const createPrestador = async (prestadorData) => {
  try {
    const response = await api.post("/prestadores/adicionar-e-criar-ticket", prestadorData);
    const prestador = response.data.prestador;

    return prestador;
  } catch (error) {
    console.error("Erro ao criar prestador:", error);
    throw error;
  }
};

export const getPrestadorById = (id) => {
  return api.get(`/prestadores/${id}`);
};

export const getPrestadorByUsuarioId = async (id) => {
  try {
    const response = await api.get(`/prestadores/usuario/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;

    throw error;
  }
};

export const updatePrestador = async (id, updatedData) => {
  try {
    const response = await api.put(`/prestadores/${id}`, updatedData);
    const prestador = response.data;

    return prestador;
  } catch (error) {
    console.error("Erro ao atualizar prestador:", error);
    throw error;
  }
};
