// src/services/ticketService.js
import api from './api';

export const createTicket = (data) => {
  return api.post('/tickets', data);
};

export const getAllTickets = () => {
  return api.get('/tickets');
};

export const getTicketById = (id) => {
  return api.get(`/tickets/${id}`);
};