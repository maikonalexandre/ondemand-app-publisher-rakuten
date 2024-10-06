// src/components/Form/EnderecoForm.jsx
import React from 'react';
import { VStack, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { Field } from 'formik';

const EnderecoForm = () => {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel htmlFor="endereco.rua">Rua</FormLabel>
        <Field as={Input} id="endereco.rua" name="endereco.rua" placeholder="Rua" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="endereco.numero">Número</FormLabel>
        <Field as={Input} id="endereco.numero" name="endereco.numero" placeholder="Número" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="endereco.complemento">Complemento</FormLabel>
        <Field as={Input} id="endereco.complemento" name="endereco.complemento" placeholder="Complemento" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="endereco.cidade">Cidade</FormLabel>
        <Field as={Input} id="endereco.cidade" name="endereco.cidade" placeholder="Cidade" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="endereco.estado">Estado</FormLabel>
        <Field as={Input} id="endereco.estado" name="endereco.estado" placeholder="Estado" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="endereco.cep">CEP</FormLabel>
        <Field as={Input} id="endereco.cep" name="endereco.cep" placeholder="CEP" />
      </FormControl>
    </VStack>
  );
};

export default EnderecoForm;
