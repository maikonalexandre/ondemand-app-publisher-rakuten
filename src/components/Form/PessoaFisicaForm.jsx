// src/components/Form/PessoaFisicaForm.jsx
import React from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage, VStack } from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';

const PessoaFisicaForm = () => {
  const { errors, touched } = useFormikContext();

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={errors.pessoaFisica?.dataNascimento && touched.pessoaFisica?.dataNascimento}>
        <FormLabel htmlFor="pessoaFisica.dataNascimento">Data de Nascimento</FormLabel>
        <Field as={Input} id="pessoaFisica.dataNascimento" name="pessoaFisica.dataNascimento" type="date" />
        <FormErrorMessage>{errors.pessoaFisica?.dataNascimento}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.pessoaFisica?.pis && touched.pessoaFisica?.pis}>
        <FormLabel htmlFor="pessoaFisica.pis">PIS</FormLabel>
        <Field as={Input} id="pessoaFisica.pis" name="pessoaFisica.pis" placeholder="PIS" />
        <FormErrorMessage>{errors.pessoaFisica?.pis}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.pessoaFisica?.nomeMae && touched.pessoaFisica?.nomeMae}>
        <FormLabel htmlFor="pessoaFisica.nomeMae">Nome da Mãe</FormLabel>
        <Field as={Input} id="pessoaFisica.nomeMae" name="pessoaFisica.nomeMae" placeholder="Nome da Mãe" />
        <FormErrorMessage>{errors.pessoaFisica?.nomeMae}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default PessoaFisicaForm;
