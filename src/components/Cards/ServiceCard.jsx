// src/components/Cards/ServiceCard.jsx
import React from 'react';
import { Box, Heading, Text, Badge, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ ticket }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/services/${ticket._id}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <VStack align="start" spacing={2}>
        <Heading size="sm">{ticket.titulo}</Heading>
        <Text>{ticket.observacao}</Text>
        <Badge colorScheme={ticket.status === 'ativo' ? 'green' : 'yellow'}>
          {ticket.status}
        </Badge>
        <Button size="sm" colorScheme="teal" onClick={handleDetails}>
          Detalhes
        </Button>
      </VStack>
    </Box>
  );
};

export default ServiceCard;
