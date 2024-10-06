// src/pages/PerfilPrestador.jsx
import React from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";

import PrestadorForm from "../components/Form/PrestadorForm";
import { useAuth } from "../contexts/AuthContext";

const PerfilPrestador = () => {
  const { usuario, loading } = useAuth();

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6}>
        {usuario?.prestador ? "Atualizar Perfil do Prestador" : "Registrar como Prestador"}
      </Heading>
      <PrestadorForm />
    </Box>
  );
};

export default PerfilPrestador;
