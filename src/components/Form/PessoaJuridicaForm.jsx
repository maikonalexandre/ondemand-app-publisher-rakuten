// src/components/Form/PessoaJuridicaForm.jsx
import React from 'react';
import { VStack, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { Field } from 'formik';

const PessoaJuridicaForm = () => {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel htmlFor="pessoaJuridica.nomeEmpresa">Nome da Empresa</FormLabel>
        <Field as={Input} id="pessoaJuridica.nomeEmpresa" name="pessoaJuridica.nomeEmpresa" placeholder="Nome da Empresa" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="pessoaJuridica.codCNAE">Código CNAE</FormLabel>
        <Field as={Input} id="pessoaJuridica.codCNAE" name="pessoaJuridica.codCNAE" placeholder="Código CNAE" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="pessoaJuridica.nomeCNAE">Nome CNAE</FormLabel>
        <Field as={Input} id="pessoaJuridica.nomeCNAE" name="pessoaJuridica.nomeCNAE" placeholder="Nome CNAE" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="pessoaJuridica.codServicoNacional">Código do Serviço Nacional</FormLabel>
        <Field as={Input} id="pessoaJuridica.codServicoNacional" name="pessoaJuridica.codServicoNacional" placeholder="Código do Serviço Nacional" />
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="pessoaJuridica.regimeTributario">Regime Tributário</FormLabel>
        <Field as={Input} id="pessoaJuridica.regimeTributario" name="pessoaJuridica.regimeTributario" placeholder="Regime Tributário" />
      </FormControl>
    </VStack>
  );
};

export default PessoaJuridicaForm;
