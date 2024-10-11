import React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import FormField from "../../common/FormField";
import { Form } from "react-router-dom";

const DadosCadastrais = () => {
  const { errors, touched, values, setFieldValue, initialValues } = useFormikContext();

  return (
    <Box>
      <Heading size="md" mb={4}>
        Dados Pessoais
      </Heading>
      <FormField label="Nome" name="nome" type="text" />
      <FormField
        label="Tipo"
        name="tipo"
        type="select"
        options={[
          { value: "pf", label: "Pessoa Física" },
          { value: "pj", label: "Pessoa Jurídica" },
        ]}
      />
      <FormField label="Documento" name="documento" type="text" maxLength={11} />
      <FormField label="E-mail" name="email" type="email" />
    </Box>
  );
};

export default DadosCadastrais;
