// src/pages/RegisterService.jsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  VStack,
  Select,
  Spinner,
  useToast,
  AlertIcon,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import RegisterServiceSchema from "../validationSchemas/registerServiceSchema";
import { createServico } from "../services/servicoService";
import { useAuth } from "../contexts/AuthContext";

const RegisterService = () => {
  const { prestador } = useAuth(); 
  const navigate = useNavigate();
  const toast = useToast();

  if (prestador?.status !== "ativo") {
    return (
      <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
        {prestador?.status !== "ativo" && (
          <Alert status="warning" mb={6}>
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Prestador não ativo</AlertTitle>
              <AlertDescription>
                Seu cadastro não está ativo. Por favor, entre em contato com o suporte para mais
                informações.
              </AlertDescription>
            </Box>
          </Alert>
        )}
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">
        Registrar Novo Serviço
      </Heading>
      <Formik
        initialValues={{
          descricao: "",
          data: "",
          valor: "",
        }}
        validationSchema={RegisterServiceSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await createServico(values);
            toast({
              title: "Serviço registrado com sucesso.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            navigate("/dashboard");
          } catch (error) {
            const errorMessage =
              error.response?.data?.error || "Erro ao registrar serviço";
            toast({
              title: "Erro.",
              description: errorMessage,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            actions.setFieldError("general", errorMessage);
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <VStack spacing={4} align="flex-start">
              {/* Descrição */}
              <FormControl isInvalid={errors.descricao && touched.descricao}>
                <FormLabel htmlFor="descricao">Descrição</FormLabel>
                <Field
                  as={Input}
                  id="descricao"
                  name="descricao"
                  placeholder="Descrição do Serviço"
                />
                <FormErrorMessage>{errors.descricao}</FormErrorMessage>
              </FormControl>

              {/* Data */}
              <FormControl isInvalid={errors.data && touched.data}>
                <FormLabel htmlFor="data">Data</FormLabel>
                <Field
                  as={Input}
                  type="date"
                  id="data"
                  name="data"
                  placeholder="Data do Serviço"
                />
                <FormErrorMessage>{errors.data}</FormErrorMessage>
              </FormControl>

              {/* Valor */}
              <FormControl isInvalid={errors.valor && touched.valor}>
                <FormLabel htmlFor="valor">Valor</FormLabel>
                <Field
                  as={Input}
                  type="number"
                  id="valor"
                  name="valor"
                  placeholder="Valor do Serviço"
                />
                <FormErrorMessage>{errors.valor}</FormErrorMessage>
              </FormControl>

              {/* Mensagem Geral de Erro */}
              {errors.general && <Box color="red.500">{errors.general}</Box>}

              {/* Botão de Submissão */}
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                isLoading={isSubmitting}
              >
                Registrar Serviço
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterService;
