// src/validationSchemas/registerServiceSchema.js
import * as Yup from 'yup';

const RegisterServiceSchema = Yup.object().shape({
  descricao: Yup.string().required("Descrição é obrigatória"),
  data: Yup.date().required("Data é obrigatória"),
  valor: Yup.number()
    .typeError("Valor deve ser um número")
    .positive("Valor deve ser positivo")
    .required("Valor é obrigatório"),
});

export default RegisterServiceSchema;
