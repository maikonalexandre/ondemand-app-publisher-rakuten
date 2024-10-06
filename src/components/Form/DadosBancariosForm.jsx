// src/components/Form/DadosBancariosForm.jsx
import React from 'react';
import { VStack, FormControl, FormLabel, Input, Select, FormErrorMessage } from '@chakra-ui/react';
import { Field } from 'formik';

const DadosBancariosForm = () => {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel htmlFor="dadosBancarios.banco">Banco</FormLabel>
        <Field as={Input} id="dadosBancarios.banco" name="dadosBancarios.banco" placeholder="Banco" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="dadosBancarios.agencia">Agência</FormLabel>
        <Field as={Input} id="dadosBancarios.agencia" name="dadosBancarios.agencia" placeholder="Agência" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="dadosBancarios.conta">Conta</FormLabel>
        <Field as={Input} id="dadosBancarios.conta" name="dadosBancarios.conta" placeholder="Conta" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="dadosBancarios.tipoConta">Tipo de Conta</FormLabel>
        <Field as={Select} id="dadosBancarios.tipoConta" name="dadosBancarios.tipoConta" placeholder="Selecione">
          <option value="corrente">Corrente</option>
          <option value="poupanca">Poupança</option>
        </Field>
      </FormControl>
    </VStack>
  );
};

export default DadosBancariosForm;
