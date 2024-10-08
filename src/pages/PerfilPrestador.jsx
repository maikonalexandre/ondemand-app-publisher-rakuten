// src/pages/PerfilPrestador.jsx
import React from "react";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";

import PrestadorForm from "../components/Form/PrestadorForm";
import { useAuth } from "../contexts/AuthContext";

const PerfilPrestador = () => {
  const { usuario, prestador, loading } = useAuth();

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    ); // Exibir um spinner enquanto carrega
  }

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6}>
        {usuario?.prestador ? "Atualizar Perfil do Prestador" : "Registrar como Prestador"}
      </Heading>
      {/* Comentários de Revisão */}
      {prestador?.status == "pendente-de-revisao" && (
        <Box p={4} bg="yellow.100" borderRadius="md">
          <Text fontSize="sm" color="yellow.800">
            O seu cadastro está pendente de revisão.
          </Text>

          {prestador.comentariosRevisao && (
            <Text fontSize="sm" color="yellow.800">
              <strong>Comentários de Revisão:</strong> {prestador.comentariosRevisao}
            </Text>
          )}
        </Box>
      )}
      <PrestadorForm />
    </Box>
  );
};

export default PerfilPrestador;
