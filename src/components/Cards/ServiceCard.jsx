// src/components/Cards/ServiceCard.jsx
import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const ServiceCard = ({ ticket }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <VStack align="start" spacing={2}>
        <Heading size="sm">{ticket.titulo}</Heading>
        <Text>{ticket.observacao}</Text>
        <Text>Etapa: {ticket.etapa}</Text>
        <Text>Status: {ticket.status}</Text>
      </VStack>
    </Box>
  );
};

export default ServiceCard;
