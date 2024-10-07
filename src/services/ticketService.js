// src/services/ticketService.js
import api from './api';

export const getAllTickets = () => {
  const prestador = JSON.parse(localStorage.getItem("prestador"));
  return api.get(`/tickets/prestador/${prestador._id}`);
};

export const getTicketById = (id) => {
  return api.get(`/tickets/${id}`);
};