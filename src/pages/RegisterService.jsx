// src/pages/RegisterService.jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading, VStack, Select } from '@chakra-ui/react';
import * as Yup from 'yup';
import { createTicket } from '../services/ticketService';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ServiceSchema = Yup.object().shape({
  baseOmie: Yup.string().required('Base Omie é obrigatória'),
  titulo: Yup.string().required('Título é obrigatório'),
  descricao: Yup.string().required('Descrição é obrigatória'),
  valor: Yup.number().min(0, 'Valor deve ser positivo').required('Valor é obrigatório'),
  data: Yup.date().required('Data é obrigatória'),
  // Adicione outros campos conforme necessário
});

const RegisterService = () => {
  const navigate = useNavigate();
  const [basesOmie, setBasesOmie] = React.useState([]);

  React.useEffect(() => {
    const fetchBasesOmie = async () => {
      try {
        const response = await api.get('/baseomies');
        setBasesOmie(response.data);
      } catch (error) {
        console.error('Erro ao buscar Bases Omie:', error);
      }
    };

    fetchBasesOmie();
  }, []);

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">Registrar Novo Serviço</Heading>
      <Formik
        initialValues={{
          baseOmie: '',
          titulo: '',
          descricao: '',
          valor: '',
          data: '',
        }}
        validationSchema={ServiceSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await createTicket(values);
            // Redirecionar para a página de detalhes do serviço ou dashboard
            navigate('/dashboard');
          } catch (error) {
            actions.setFieldError('general', error.response?.data?.error || 'Erro ao registrar serviço');
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={errors.baseOmie && touched.baseOmie}>
                <FormLabel htmlFor="baseOmie">Base Omie</FormLabel>
                <Field as={Select} id="baseOmie" name="baseOmie" placeholder="Selecione uma Base Omie">
                  {basesOmie.map(base => (
                    <option key={base._id} value={base._id}>{base.nome}</option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.baseOmie}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.titulo && touched.titulo}>
                <FormLabel htmlFor="titulo">Título</FormLabel>
                <Field as={Input} id="titulo" name="titulo" type="text" />
                <FormErrorMessage>{errors.titulo}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.descricao && touched.descricao}>
                <FormLabel htmlFor="descricao">Descrição</FormLabel>
                <Field as={Input} id="descricao" name="descricao" type="text" />
                <FormErrorMessage>{errors.descricao}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.valor && touched.valor}>
                <FormLabel htmlFor="valor">Valor</FormLabel>
                <Field as={Input} id="valor" name="valor" type="number" />
                <FormErrorMessage>{errors.valor}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.data && touched.data}>
                <FormLabel htmlFor="data">Data</FormLabel>
                <Field as={Input} id="data" name="data" type="date" />
                <FormErrorMessage>{errors.data}</FormErrorMessage>
              </FormControl>

              {/* Adicione outros campos conforme necessário */}

              {errors.general && (
                <Box color="red.500">
                  {errors.general}
                </Box>
              )}

              <Button type="submit" colorScheme="teal" width="full" isLoading={isSubmitting}>
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
