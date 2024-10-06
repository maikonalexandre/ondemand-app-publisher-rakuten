// src/components/Form/PrestadorForm.jsx
import React from "react";
import {
  Box,
  VStack,
  Button,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import EnderecoForm from "./EnderecoForm";
import DadosBancariosForm from "./DadosBancariosForm";
import PessoaFisicaForm from "./PessoaFisicaForm";
import PessoaJuridicaForm from "./PessoaJuridicaForm";

import { createPrestador, updatePrestador } from "../../services/prestadorService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PrestadorForm = () => {
  const { usuario, prestador, setPrestador, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    ); // Exibir um spinner enquanto carrega
  }

  const initialValues = {
    usuario: usuario?._id,
    nome: prestador?.nome,
    tipo: prestador?.tipo ?? "pf",
    documento: prestador?.documento,
    email: prestador?.email,
    endereco: {
      rua: prestador?.endereco?.rua,
      numero: prestador?.endereco?.numero,
      complemento: prestador?.endereco?.complemento,
      cidade: prestador?.endereco?.cidade,
      estado: prestador?.endereco?.estado,
      cep: prestador?.endereco?.cep,
    },
    dadosBancarios: {
      banco: prestador?.dadosBancarios?.banco,
      agencia: prestador?.dadosBancarios?.agencia,
      conta: prestador?.dadosBancarios?.conta,
      tipoConta: prestador?.dadosBancarios?.tipoConta,
    },
    pessoaFisica: {
      dataNascimento: prestador?.pessoaFisica?.dataNascimento,
      pis: prestador?.pessoaFisica?.pis,
      nomeMae: prestador?.pessoaFisica?.nomeMae,
    },
    pessoaJuridica: {
      nomeEmpresa: prestador?.pessoaJuridica?.nomeEmpresa,
      codCNAE: prestador?.pessoaJuridica?.codCNAE,
      nomeCNAE: prestador?.pessoaJuridica?.nomeCNAE,
      codServicoNacional: prestador?.pessoaJuridica?.codServicoNacional,
      regimeTributario: prestador?.pessoaJuridica?.regimeTributario,
    },
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    tipo: Yup.string().oneOf(["pf", "pj"], "Tipo inválido").required("Tipo é obrigatório"),
    documento: Yup.string().required("Documento é obrigatório"),
    email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  });

  const handleSubmit = async (values, actions) => {
    console.log("handleSubmit called");
    console.log("Submitted values:", values);

    try {
      if (prestador) {
        console.log("Updating prestador...");
        // Uncomment and implement the updatePrestador function
        // const response = await updatePrestador(prestador._id, values);
        // console.log("Prestador updated:", response.data);
        toast({
          title: "Prestador atualizado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log("Creating new prestador...");
        // Uncomment and implement the createPrestador function
        const response = await createPrestador(values);
        console.log("Prestador created:", response.data);
        setPrestador(response.data);
        toast({
          title: "Prestador cadastrado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/dashboard"); // Redirect to the Dashboard after successful submission
    } catch (error) {
      console.error("Error submitting form:", error.response);
      const errorMessage =
        error.response?.data?.error || "Houve um problema ao cadastrar o prestador.";
      toast({
        title: "Erro.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting, values, errors, touched, setFieldValue }) => (
        <Form>
          <VStack spacing={6} align="stretch">
            <Accordion defaultIndex={[0]} allowMultiple>
              {/* Dados Pessoais */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Dados Pessoais
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {/* Nome */}
                  <FormControl isInvalid={errors.nome && touched.nome}>
                    <FormLabel htmlFor="nome">Nome</FormLabel>
                    <Field as={Input} id="nome" name="nome" placeholder="Nome Completo" />
                    <FormErrorMessage>{errors.nome}</FormErrorMessage>
                  </FormControl>

                  {/* Tipo */}
                  <FormControl isInvalid={errors.tipo && touched.tipo}>
                    <FormLabel htmlFor="tipo">Tipo</FormLabel>
                    <Field
                      as={Select}
                      id="tipo"
                      name="tipo"
                      onChange={(e) => {
                        const selectedTipo = e.target.value;
                        setFieldValue("tipo", selectedTipo);
                      }}
                    >
                      <option value="pf">Pessoa Física</option>
                      <option value="pj">Pessoa Jurídica</option>
                    </Field>
                    <FormErrorMessage>{errors.tipo}</FormErrorMessage>
                  </FormControl>

                  {/* Documento */}
                  <FormControl isInvalid={errors.documento && touched.documento}>
                    <FormLabel htmlFor="documento">Documento (CPF/CNPJ)</FormLabel>
                    <Field
                      as={Input}
                      id="documento"
                      name="documento"
                      placeholder="CPF ou CNPJ"
                      maxLength={values.tipo === "pf" ? 11 : 14}
                    />
                    <FormErrorMessage>{errors.documento}</FormErrorMessage>
                  </FormControl>

                  {/* Email */}
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor="email">E-mail</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" placeholder="E-mail" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>

              {/* Endereço */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Endereço
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <EnderecoForm />
                </AccordionPanel>
              </AccordionItem>

              {/* Dados Bancários */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Dados Bancários
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <DadosBancariosForm />
                </AccordionPanel>
              </AccordionItem>

              {/* Pessoa Física */}
              {values.tipo === "pf" && (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Dados da Pessoa Física
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <PessoaFisicaForm />
                  </AccordionPanel>
                </AccordionItem>
              )}

              {/* Pessoa Jurídica */}
              {values.tipo === "pj" && (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Dados da Pessoa Jurídica
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <PessoaJuridicaForm />
                  </AccordionPanel>
                </AccordionItem>
              )}
            </Accordion>

            {/* Botão de Submissão */}
            <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
              {prestador ? "Atualizar Perfil" : "Registrar Prestador"}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default PrestadorForm;
