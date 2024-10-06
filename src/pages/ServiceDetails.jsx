// src/pages/ServiceDetails.jsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Badge, Button, Spinner, VStack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getErrorMessage } from '../utils/errorUtils'; // Importa a função auxiliar

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${id}`);
        setTicket(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do serviço:', error);
      }
      setLoading(false);
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!ticket) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>Serviço não encontrado.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <VStack align="start" spacing={4}>
        <Heading size="md">{ticket.titulo}</Heading>
        <Text><strong>Descrição:</strong> {ticket.descricao}</Text>
        <Text><strong>Valor:</strong> R$ {ticket.valor.toFixed(2)}</Text>
        <Text><strong>Data:</strong> {new Date(ticket.data).toLocaleDateString()}</Text>
        <Badge colorScheme={ticket.status === 'ativo' ? 'green' : 'yellow'}>
          {ticket.status}
        </Badge>
        <Button colorScheme="teal" onClick={() => navigate(-1)}>Voltar</Button>
      </VStack>
    </Box>
  );
};

export default ServiceDetails;
