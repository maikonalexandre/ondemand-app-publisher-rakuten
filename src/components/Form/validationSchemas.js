// src/components/Form/validationSchemas.js
import * as Yup from 'yup';

export const getValidationSchema = (currentStep, tipo) => {
  switch (currentStep) {
    case 1:
      return Yup.object().shape({
        nome: Yup.string().required("Nome é obrigatório"),
        tipo: Yup.string()
          .oneOf(["pf", "pj"], "Tipo inválido")
          .required("Tipo é obrigatório"),
        documento: Yup.string().required("Documento é obrigatório"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório"),
      });
    default:
      return Yup.object();
  }
};