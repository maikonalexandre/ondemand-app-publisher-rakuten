// src/components/Form/PrestadorForm.jsx
import React, { useState } from "react";
import {
  Box,
  VStack,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Heading,
  Spinner,
  Progress,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field, getIn } from "formik";
import { getValidationSchema } from "./validationSchemas"; // Importando o schema
import EnderecoForm from "./EnderecoForm";
import DadosBancariosForm from "./DadosBancariosForm";
import PessoaFisicaForm from "./PessoaFisicaForm";
import PessoaJuridicaForm from "./PessoaJuridicaForm";
import { createPrestador, updatePrestador } from "../../services/prestadorService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DadosCadastrais from "./prestador/dadosPessoaisForm";

const PrestadorForm = () => {
  const { usuario, prestador, setPrestador, loading: authLoading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Estado para controlar a etapa atual

  if (authLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  // Definição dos valores iniciais dentro do componente
  const initialValues = {
    usuario: usuario?._id || "",
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
    comentariosRevisao: prestador?.comentariosRevisao || "", // Novo campo para comentários de revisão
    confirmacao: false, // Campo para confirmação dos dados
  };

  // Função para obter o schema de validação
  const validationSchema = getValidationSchema(step, initialValues.tipo);

  const handleSubmit = async (values, actions) => {
    try {
      if (prestador) {
        const response = await updatePrestador(prestador._id, values);
        setPrestador(response);
        localStorage.setItem("prestador", JSON.stringify(response));
        toast({
          title: "Prestador atualizado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const response = await createPrestador(values);
        setPrestador(response);
        localStorage.setItem("prestador", JSON.stringify(response));
        toast({
          title: "Prestador cadastrado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/dashboard"); // Redirecionar para o Dashboard após a submissão bem-sucedida
    } catch (error) {
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
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formik) => (
        <Form>
          <VStack spacing={6} align="stretch">
            {/* Barra de Progresso */}
            <Progress value={(step / 5) * 100} size="sm" colorScheme="teal" />

            {/* Etapas do Formulário */}
            {step === 1 && <DadosCadastrais />}

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
                  {formik.values.tipo === "pf"
                    ? "Dados da Pessoa Física"
                    : "Dados da Pessoa Jurídica"}
                </Heading>
                {formik.values.tipo === "pf" ? <PessoaFisicaForm /> : <PessoaJuridicaForm />}
              </Box>
            )}

            {step === 5 && (
              <Box>
                <Heading size="md" mb={4}>
                  Confirmação dos Dados
                </Heading>
                <VStack align="start" spacing={4}>
                  <Box p={4} bg="gray.100" borderRadius="md" width="full">
                    <Text>
                      <strong>Nome:</strong> {formik.values.nome}
                    </Text>
                    <Text>
                      <strong>Tipo:</strong>{" "}
                      {formik.values.tipo === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
                    </Text>
                    <Text>
                      <strong>Documento:</strong> {formik.values.documento}
                    </Text>
                    <Text>
                      <strong>Email:</strong> {formik.values.email}
                    </Text>
                    {/* Adicione outros campos conforme necessário */}
                  </Box>
                  <FormControl
                    isInvalid={
                      getIn(formik.errors.confirmacao) && getIn(formik.touched.confirmacao)
                    }
                  >
                    <Field as={Checkbox} id="confirmacao" name="confirmacao">
                      Confirmo que os dados acima estão corretos.
                    </Field>
                    <FormErrorMessage>{getIn(formik.errors, "confirmacao") || ""}</FormErrorMessage>
                  </FormControl>
                </VStack>
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

              {step < 5 && (
                <Button onClick={handleNext} colorScheme="teal">
                  Próximo
                </Button>
              )}

              {step === 5 && (
                <Button type="submit" colorScheme="teal" isLoading={formik.isSubmitting}>
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
