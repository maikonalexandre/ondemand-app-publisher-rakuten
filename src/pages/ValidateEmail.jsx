import React, { useEffect, useState, useRef } from "react";
import { Box, Heading, Text, Spinner, VStack, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useToast } from "@chakra-ui/react";

const ValidateEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [status, setStatus] = useState("validando");
  const hasValidated = useRef(false); // Referência para rastrear a validação

  useEffect(() => {
    const validate = async () => {
      if (hasValidated.current) return; // Evita execuções múltiplas
      hasValidated.current = true; // Marca como validado

      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("erro");
        toast({
          title: "Token inválido",
          description: "O token de validação é inválido ou expirou.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        // Enviar o token para o backend para confirmar o e-mail
        const response = await api.post("/auth/confirmar-email", { token });
        setStatus("sucesso");

        toast({
          title: "E-mail confirmado!",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Redirecionar para a página de login após 3 segundos
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Erro ao confirmar e-mail:", error.response);
        setStatus("erro");

        toast({
          title: "Erro na confirmação do e-mail",
          description: error.response?.data?.error || "Houve um problema ao confirmar seu e-mail.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    validate();
  }, []); // Array de dependências vazio

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md" textAlign="center">
      <VStack spacing={4}>
        {status === "validando" && <Spinner size="xl" />}
        {status === "sucesso" && (
          <>
            <Heading size="md">E-mail Validado com Sucesso!</Heading>
            <Text>Redirecionando para a página de login...</Text>
          </>
        )}
        {status === "erro" && (
          <>
            <Heading size="md">Erro na Validação do E-mail</Heading>
            <Text>Por favor, tente novamente ou contate o suporte.</Text>
            <Button colorScheme="teal" mt={4} onClick={() => navigate("/auth/login")}>
              Ir para Login
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ValidateEmail;
