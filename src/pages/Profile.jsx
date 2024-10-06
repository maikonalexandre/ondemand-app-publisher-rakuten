// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const ProfileSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  // Adicione outros campos conforme necessário
});

const Profile = () => {
  console.log("Profile");
  
  const { usuario, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    nome: "",
    email: "",
    // Outros campos
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/usuarios/${usuario._id}`);
        setInitialValues({
          nome: response.data.nome,
          email: response.data.email,
          // Outros campos
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, [usuario._id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">
        Dados Cadastrais
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          try {
            const response = await api.put(`/usuarios/${usuario._id}`, values);
            // Atualizar o contexto de autenticação se necessário
            login(usuario.token, response.data);
          } catch (error) {
            actions.setFieldError(
              "general",
              error.response?.data?.error || "Erro ao atualizar perfil"
            );
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={errors.nome && touched.nome}>
                <FormLabel htmlFor="nome">Nome</FormLabel>
                <Field as={Input} id="nome" name="nome" type="text" />
                <FormErrorMessage>{errors.nome}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email && touched.email}>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Field as={Input} id="email" name="email" type="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              {/* Adicione outros campos conforme necessário */}

              {errors.general && <Box color="red.500">{errors.general}</Box>}

              <Button type="submit" colorScheme="teal" width="full" isLoading={isSubmitting}>
                Salvar Alterações
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Profile;
