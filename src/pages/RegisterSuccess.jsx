// src/pages/RegisterSuccess.jsx

import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md" textAlign="center">
      <VStack spacing={4}>
        <Heading size="md">Registro Realizado com Sucesso!</Heading>
        <Text>
          Um e-mail de confirmação foi enviado para o seu endereço. Por favor, verifique seu e-mail e confirme sua conta para ativar seu perfil.
        </Text>
        <Button colorScheme="teal" onClick={() => navigate('/auth/login')}>
          Ir para Login
        </Button>
      </VStack>
    </Box>
  );
};

export default RegisterSuccess;
