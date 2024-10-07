// src/components/Form/PrestadorForm.jsx
import React, { useState } from "react";
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
  Heading,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import EnderecoForm from "./EnderecoForm";
import DadosBancariosForm from "./DadosBancariosForm";
import PessoaFisicaForm from "./PessoaFisicaForm";
import PessoaJuridicaForm from "./PessoaJuridicaForm";

import { createPrestador, updatePrestador } from "../../services/prestadorService";
import { useAuth } from "../../contexts/AuthContext";

const PrestadorForm = () => {
  const { usuario, prestador, setPrestador, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Estado para controlar a etapa atual

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    ); // Exibir um spinner enquanto carrega
  }

  const initialValues = {
    usuario: usuario?._id,
    nome: prestador?.nome || "",
    tipo: prestador?.tipo || "pf",
    documento: prestador?.documento || "",
    email: prestador?.email || "",
    endereco: {
      rua: prestador?.endereco?.rua || "",
      numero: prestador?.endereco?.numero || "",
      complemento: prestador?.endereco?.complemento || "",
      cidade: prestador?.endereco?.cidade || "",
      estado: prestador?.endereco?.estado || "",
      cep: prestador?.endereco?.cep || "",
    },
    dadosBancarios: {
      banco: prestador?.dadosBancarios?.banco || "",
      agencia: prestador?.dadosBancarios?.agencia || "",
      conta: prestador?.dadosBancarios?.conta || "",
      tipoConta: prestador?.dadosBancarios?.tipoConta || "",
    },
    pessoaFisica: {
      dataNascimento: prestador?.pessoaFisica?.dataNascimento || "",
      pis: prestador?.pessoaFisica?.pis || "",
      nomeMae: prestador?.pessoaFisica?.nomeMae || "",
    },
    pessoaJuridica: {
      nomeEmpresa: prestador?.pessoaJuridica?.nomeEmpresa || "",
      codCNAE: prestador?.pessoaJuridica?.codCNAE || "",
      nomeCNAE: prestador?.pessoaJuridica?.nomeCNAE || "",
      codServicoNacional: prestador?.pessoaJuridica?.codServicoNacional || "",
      regimeTributario: prestador?.pessoaJuridica?.regimeTributario || "",
    },
  };

  // Definir validações por etapa
  const validationSchemas = [
    // Etapa 1: Dados Pessoais
    Yup.object().shape({
      nome: Yup.string().required("Nome é obrigatório"),
      tipo: Yup.string()
        .oneOf(["pf", "pj"], "Tipo inválido")
        .required("Tipo é obrigatório"),
      documento: Yup.string().required("Documento é obrigatório"),
      email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    }),
    // Etapa 2: Endereço
    Yup.object().shape({
      endereco: Yup.object().shape({
        rua: Yup.string().required("Rua é obrigatória"),
        numero: Yup.string().required("Número é obrigatório"),
        complemento: Yup.string(),
        cidade: Yup.string().required("Cidade é obrigatória"),
        estado: Yup.string().required("Estado é obrigatório"),
        cep: Yup.string().required("CEP é obrigatório"),
      }),
    }),
    // Etapa 3: Dados Bancários
    Yup.object().shape({
      dadosBancarios: Yup.object().shape({
        banco: Yup.string().required("Banco é obrigatório"),
        agencia: Yup.string().required("Agência é obrigatória"),
        conta: Yup.string().required("Conta é obrigatória"),
        tipoConta: Yup.string()
          .oneOf(["corrente", "poupanca"], "Tipo de conta inválido")
          .required("Tipo de conta é obrigatório"),
      }),
    }),
    // Etapa 4: Pessoa Física ou Jurídica
    Yup.object().shape({
      // Condicional com base no tipo
      pessoaFisica: Yup.object().when("tipo", {
        is: "pf",
        then: Yup.object().shape({
          dataNascimento: Yup.date().required("Data de Nascimento é obrigatória"),
          pis: Yup.string().required("PIS é obrigatório"),
          nomeMae: Yup.string().required("Nome da Mãe é obrigatório"),
        }),
      }),
      pessoaJuridica: Yup.object().when("tipo", {
        is: "pj",
        then: Yup.object().shape({
          nomeEmpresa: Yup.string().required("Nome da Empresa é obrigatório"),
          codCNAE: Yup.string().required("Código CNAE é obrigatório"),
          nomeCNAE: Yup.string().required("Nome CNAE é obrigatório"),
          codServicoNacional: Yup.string().required("Código do Serviço Nacional é obrigatório"),
          regimeTributario: Yup.string().required("Regime Tributário é obrigatório"),
        }),
      }),
    }),
  ];

  const handleSubmit = async (values, actions) => {
    console.log("handleSubmit called");
    console.log("Submitted values:", values);

    try {
      if (prestador) {
        console.log("Updating prestador...");
        const response = await updatePrestador(prestador._id, values);
        console.log("Prestador updated:", response.data);
        setPrestador(response.data);
        toast({
          title: "Prestador atualizado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log("Creating new prestador...");
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

  // Funções para navegar entre etapas
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[step - 1]}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting, values, errors, touched, setFieldValue, validateForm }) => (
        <Form>
          <VStack spacing={6} align="stretch">
            {/* Barra de Progresso */}
            <Progress value={(step / 4) * 100} size="sm" colorScheme="teal" />

            {/* Etapas do Formulário */}
            {step === 1 && (
              <Box>
                <Heading size="md" mb={4}>
                  Dados Pessoais
                </Heading>
                {/* Nome */}
                <FormControl isInvalid={errors.nome && touched.nome} mb={4}>
                  <FormLabel htmlFor="nome">Nome</FormLabel>
                  <Field as={Input} id="nome" name="nome" placeholder="Nome Completo" />
                  <FormErrorMessage>{errors.nome}</FormErrorMessage>
                </FormControl>

                {/* Tipo */}
                <FormControl isInvalid={errors.tipo && touched.tipo} mb={4}>
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
                <FormControl isInvalid={errors.documento && touched.documento} mb={4}>
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
                <FormControl isInvalid={errors.email && touched.email} mb={4}>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Field as={Input} id="email" name="email" type="email" placeholder="E-mail" />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              </Box>
            )}

            {step === 2 && (
              <Box>
                <Heading size="md" mb={4}>
                  Endereço
                </Heading>
                <EnderecoForm />
              </Box>
            )}

            {step === 3 && (
              <Box>
                <Heading size="md" mb={4}>
                  Dados Bancários
                </Heading>
                <DadosBancariosForm />
              </Box>
            )}

            {step === 4 && (
              <Box>
                <Heading size="md" mb={4}>
                  {values.tipo === "pf" ? "Dados da Pessoa Física" : "Dados da Pessoa Jurídica"}
                </Heading>
                {values.tipo === "pf" ? <PessoaFisicaForm /> : <PessoaJuridicaForm />}
              </Box>
            )}

            {/* Botões de Navegação */}
            <VStack spacing={4} align="stretch">
              <Button
                onClick={handleBack}
                isDisabled={step === 1}
                colorScheme="gray"
                variant="outline"
              >
                Anterior
              </Button>

              {step < 4 && (
                <Button
                  onClick={async () => {
                    const formErrors = await validateForm();
                    // Filtrar erros da etapa atual
                    const currentErrors = Object.keys(formErrors).filter((key) => {
                      if (step === 1)
                        return ["nome", "tipo", "documento", "email"].includes(key);
                      if (step === 2)
                        return key.startsWith("endereco.");
                      if (step === 3)
                        return key.startsWith("dadosBancarios.");
                      return false;
                    });

                    if (currentErrors.length === 0) {
                      handleNext();
                    } else {
                      // Marcar todos os campos da etapa atual como tocados para exibir erros
                      Object.keys(formErrors).forEach((field) => {
                        if (
                          (step === 1 &&
                            ["nome", "tipo", "documento", "email"].includes(field)) ||
                          (step === 2 && field.startsWith("endereco.")) ||
                          (step === 3 && field.startsWith("dadosBancarios."))
                        ) {
                          touched[field] = true;
                        }
                      });
                      toast({
                        title: "Por favor, corrija os erros antes de continuar.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                  colorScheme="teal"
                >
                  Próximo
                </Button>
              )}

              {step === 4 && (
                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  {prestador ? "Atualizar Perfil" : "Registrar Prestador"}
                </Button>
              )}
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default PrestadorForm;
