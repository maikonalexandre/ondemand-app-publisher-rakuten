// src/components/Form/PrestadorForm.jsx
import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { getValidationSchema } from './validationSchemas'; // Importando o schema
import EnderecoForm from './EnderecoForm';
import DadosBancariosForm from './DadosBancariosForm';
import PessoaFisicaForm from './PessoaFisicaForm';
import PessoaJuridicaForm from './PessoaJuridicaForm';
import { createPrestador, updatePrestador } from '../../services/prestadorService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    usuario: usuario?._id || '',
    nome: prestador?.nome || '',
    tipo: prestador?.tipo || 'pf',
    documento: prestador?.documento || '',
    email: prestador?.email || '',
    endereco: {
      rua: prestador?.endereco?.rua || '',
      numero: prestador?.endereco?.numero || '',
      complemento: prestador?.endereco?.complemento || '',
      cidade: prestador?.endereco?.cidade || '',
      estado: prestador?.endereco?.estado || '',
      cep: prestador?.endereco?.cep || '',
    },
    dadosBancarios: {
      banco: prestador?.dadosBancarios?.banco || '',
      agencia: prestador?.dadosBancarios?.agencia || '',
      conta: prestador?.dadosBancarios?.conta || '',
      tipoConta: prestador?.dadosBancarios?.tipoConta || '',
    },
    pessoaFisica: {
      dataNascimento: prestador?.pessoaFisica?.dataNascimento || '',
      pis: prestador?.pessoaFisica?.pis || '',
      nomeMae: prestador?.pessoaFisica?.nomeMae || '',
    },
    pessoaJuridica: {
      nomeEmpresa: prestador?.pessoaJuridica?.nomeEmpresa || '',
      codCNAE: prestador?.pessoaJuridica?.codCNAE || '',
      nomeCNAE: prestador?.pessoaJuridica?.nomeCNAE || '',
      codServicoNacional: prestador?.pessoaJuridica?.codServicoNacional || '',
      regimeTributario: prestador?.pessoaJuridica?.regimeTributario || '',
    },
    comentariosRevisao: prestador?.comentariosRevisao || '', // Novo campo para comentários de revisão
    confirmacao: false, // Campo para confirmação dos dados
  };

  // Função para obter o schema de validação
  const validationSchema = getValidationSchema(step, initialValues.tipo);

  const handleSubmit = async (values, actions) => {
    try {
      if (prestador) {
        const response = await updatePrestador(prestador._id, values);
        setPrestador(response.data);
        toast({
          title: 'Prestador atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        const response = await createPrestador(values);
        setPrestador(response.data);
        toast({
          title: 'Prestador cadastrado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/dashboard'); // Redirecionar para o Dashboard após a submissão bem-sucedida
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Houve um problema ao cadastrar o prestador.';
      toast({
        title: 'Erro.',
        description: errorMessage,
        status: 'error',
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
      {({ isSubmitting, values, errors, touched, setFieldValue, validateForm }) => (
        <Form>
          <VStack spacing={6} align="stretch">
            {/* Comentários de Revisão */}
            {prestador?.status == "pendente-de-revisao" && prestador?.comentariosRevisao && step === 1 && (
              <Box p={4} bg="yellow.100" borderRadius="md">
                <Text fontSize="sm" color="yellow.800">
                  <strong>Comentários de Revisão:</strong> {prestador.comentariosRevisao}
                </Text>
              </Box>
            )}

            {/* Barra de Progresso */}
            <Progress value={(step / 5) * 100} size="sm" colorScheme="teal" />

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
                      setFieldValue('tipo', selectedTipo);
                      // Resetar campos condicionais ao mudar o tipo
                      if (selectedTipo === 'pf') {
                        setFieldValue('pessoaJuridica', initialValues.pessoaJuridica);
                      } else {
                        setFieldValue('pessoaFisica', initialValues.pessoaFisica);
                      }
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
                    maxLength={values.tipo === 'pf' ? 11 : 14}
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
                  {values.tipo === 'pf' ? 'Dados da Pessoa Física' : 'Dados da Pessoa Jurídica'}
                </Heading>
                {values.tipo === 'pf' ? <PessoaFisicaForm /> : <PessoaJuridicaForm />}
              </Box>
            )}

            {step === 5 && (
              <Box>
                <Heading size="md" mb={4}>
                  Confirmação dos Dados
                </Heading>
                <VStack align="start" spacing={4}>
                  <Box p={4} bg="gray.100" borderRadius="md" width="full">
                    <Text><strong>Nome:</strong> {values.nome}</Text>
                    <Text><strong>Tipo:</strong> {values.tipo === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}</Text>
                    <Text><strong>Documento:</strong> {values.documento}</Text>
                    <Text><strong>Email:</strong> {values.email}</Text>
                    {/* Adicione outros campos conforme necessário */}
                  </Box>
                  <FormControl isInvalid={errors.confirmacao && touched.confirmacao}>
                    <Field as={Checkbox} id="confirmacao" name="confirmacao">
                      Confirmo que os dados acima estão corretos.
                    </Field>
                    <FormErrorMessage>{errors.confirmacao}</FormErrorMessage>
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
                <Button
                  onClick={async () => {
                    const formErrors = await validateForm();
                    // Filtrar erros da etapa atual
                    const currentErrors = Object.keys(formErrors).filter((key) => {
                      if (step === 1)
                        return ['nome', 'tipo', 'documento', 'email'].includes(key);
                      if (step === 2)
                        return key.startsWith('endereco.');
                      if (step === 3)
                        return key.startsWith('dadosBancarios.');
                      if (step === 4)
                        return key.startsWith('pessoaFisica.') || key.startsWith('pessoaJuridica.');
                      return false;
                    });

                    if (currentErrors.length === 0) {
                      handleNext();
                    } else {
                      // Marcar todos os campos da etapa atual como tocados para exibir erros
                      Object.keys(formErrors).forEach((field) => {
                        if (
                          (step === 1 &&
                            ['nome', 'tipo', 'documento', 'email'].includes(field)) ||
                          (step === 2 && field.startsWith('endereco.')) ||
                          (step === 3 && field.startsWith('dadosBancarios.')) ||
                          (step === 4 &&
                            (field.startsWith('pessoaFisica.') || field.startsWith('pessoaJuridica.')))
                        ) {
                          touched[field] = true;
                        }
                      });
                      toast({
                        title: 'Por favor, corrija os erros antes de continuar.',
                        status: 'error',
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

              {step === 5 && (
                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                  {prestador ? 'Atualizar Perfil' : 'Registrar Prestador'}
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
