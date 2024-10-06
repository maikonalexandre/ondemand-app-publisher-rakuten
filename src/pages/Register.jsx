// src/pages/Register.jsx

import React from "react";
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
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegisterSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: Yup.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmSenha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "Senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">
        Registro
      </Heading>
      <Formik
        initialValues={{
          nome: "",
          email: "",
          senha: "",
          confirmSenha: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          try {
            const { confirmSenha, ...data } = values;
            const response = await register(data);
            // Após registro, redirecionar para uma página de confirmação
            navigate("/registro-sucesso");
          } catch (error) {
            actions.setFieldError(
              "general",
              error.response?.data?.error || "Erro ao registrar usuário"
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

              <FormControl isInvalid={errors.senha && touched.senha}>
                <FormLabel htmlFor="senha">Senha</FormLabel>
                <Field as={Input} id="senha" name="senha" type="password" />
                <FormErrorMessage>{errors.senha}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmSenha && touched.confirmSenha}>
                <FormLabel htmlFor="confirmSenha">Confirmar Senha</FormLabel>
                <Field as={Input} id="confirmSenha" name="confirmSenha" type="password" />
                <FormErrorMessage>{errors.confirmSenha}</FormErrorMessage>
              </FormControl>

              {errors.general && <Box color="red.500">{errors.general}</Box>}

              <Button type="submit" colorScheme="teal" width="full" isLoading={isSubmitting}>
                Registrar
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>

      {/* Página de sucesso após registro */}
      <Box mt={6}>
        <Heading size="md" textAlign="center" display="none" id="successMessage">
          Registro realizado com sucesso!
        </Heading>
        <Text textAlign="center" display="none" id="infoMessage">
          Um e-mail de confirmação foi enviado para o seu endereço. Por favor, confirme seu e-mail para ativar sua conta.
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
