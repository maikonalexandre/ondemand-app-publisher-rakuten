import api from "./api";

export const createServico = (servicoData) => {
  const prestador = JSON.parse(localStorage.getItem("prestador"));
  const servico = {
    descricao: servicoData.descricao,
    data: servicoData.data,
    valor: servicoData.valor,
    prestador: prestador._id,
  };
  return api.post("/servicos/adicionar-e-criar-ticket", servico);
};
