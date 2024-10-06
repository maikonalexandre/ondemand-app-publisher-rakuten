// src/pages/ReviewService.jsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Badge, Button, Spinner, VStack, HStack, useToast } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getErrorMessage } from '../utils/errorUtils'; // Importa a função auxiliar

const ReviewService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
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

  const handleApprove = async () => {
    try {
      await api.post(`/aprovacoes/${id}/aprovar`);
      toast({
        title: 'Serviço Aprovado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao aprovar serviço:', error);
      toast({
        title: 'Erro ao aprovar serviço',
        description: getErrorMessage(error) || 'Tente novamente mais tarde.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReject = async () => {
    try {
      await api.post(`/aprovacoes/${id}/recusar`);
      toast({
        title: 'Serviço Recusado',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao recusar serviço:', error);
      toast({
        title: 'Erro ao recusar serviço',
        description: getErrorMessage(error) || 'Tente novamente mais tarde.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
        <Heading size="md">Revisar Serviço</Heading>
        <Text><strong>Título:</strong> {ticket.titulo}</Text>
        <Text><strong>Descrição:</strong> {ticket.descricao}</Text>
        <Text><strong>Valor:</strong> R$ {ticket.valor.toFixed(2)}</Text>
        <Text><strong>Data:</strong> {new Date(ticket.data).toLocaleDateString()}</Text>
        <Badge colorScheme={ticket.status === 'ativo' ? 'green' : 'yellow'}>
          {ticket.status}
        </Badge>
        <HStack spacing={4}>
          <Button colorScheme="green" onClick={handleApprove}>Aprovar</Button>
          <Button colorScheme="red" onClick={handleReject}>Recusar</Button>
        </HStack>
        <Button colorScheme="teal" variant="link" onClick={() => navigate(-1)}>Voltar</Button>
      </VStack>
    </Box>
  );
};

export default ReviewService;
