# Documentação de Arquitetura - App-Publisher

## Índice

1. [Introdução](#introdução)
2. [Visão Geral](#visão-geral)
3. [Tecnologias e Frameworks Utilizados](#tecnologias-e-frameworks-utilizados)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Componentes Principais](#componentes-principais)
6. [Gerenciamento de Estado](#gerenciamento-de-estado)
7. [Rotas e Navegação](#rotas-e-navegação)
8. [Formulários e Validação](#formulários-e-validação)
9. [Integração com APIs](#integração-com-apis)
10. [Autenticação e Autorização](#autenticação-e-autorização)
11. [Estilização e Tematização](#estilização-e-tematização)
12. [Tratamento de Erros](#tratamento-de-erros)
13. [Build e Deploy](#build-e-deploy)
14. [Scripts de Infraestrutura](#scripts-de-infraestrutura)
15. [Considerações Finais](#considerações-finais)

---

## Introdução

Esta documentação tem como objetivo detalhar a arquitetura do **App-Publisher**, uma aplicação frontend desenvolvida com React e Vite, utilizando Chakra UI para estilização e diversas outras bibliotecas para gerenciamento de formulários, validação, roteamento e comunicação com APIs backend.

## Visão Geral

O **App-Publisher** é uma aplicação web que permite aos usuários se registrarem, autenticarem e gerenciarem perfis de prestadores de serviços. A aplicação utiliza React para a interface de usuário, Chakra UI para componentes estilizados, Formik para gerenciamento de formulários e Yup para validação. A comunicação com o backend é realizada através de Axios.

## Tecnologias e Frameworks Utilizados

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para projetos frontend.
- **Chakra UI**: Biblioteca de componentes React acessíveis e personalizáveis.
- **Formik**: Biblioteca para gerenciamento de formulários em React.
- **Yup**: Biblioteca para validação de esquemas de objetos.
- **React Router DOM**: Biblioteca para roteamento em aplicações React.
- **Axios**: Cliente HTTP para realizar requisições a APIs.
- **ESLint**: Ferramenta de linting para garantir a qualidade do código.
- **Others**: React Icons, React Input Mask, Framer Motion, etc.

## Estrutura de Pastas

A estrutura de pastas segue uma organização modular, facilitando a manutenção e escalabilidade da aplicação.

```
app-publisher/
│
├── infra/
│   └── scripts/
│       └── files.ps1
│
├── src/
│   ├── components/
│   │   ├── Cards/
│   │   │   └── ServiceCard.jsx
│   │   ├── common/
│   │   │   └── FormField.jsx
│   │   ├── Form/
│   │   │   ├── DadosBancariosForm.jsx
│   │   │   ├── DadosPessoaisForm.jsx
│   │   │   ├── EnderecoForm.jsx
│   │   │   ├── PessoaFisicaForm.jsx
│   │   │   ├── PessoaJuridicaForm.jsx
│   │   │   ├── PrestadorForm.jsx
│   │   │   ├── validationSchemas.js
│   │   │   └── prestador/
│   │   │       └── DadosPessoaisForm.jsx
│   │   └── Layout/
│   │       ├── Header.jsx
│   │       ├── Layout.jsx
│   │       ├── Sidebar.jsx
│   │       └── SidebarContent.jsx
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── PerfilPrestador.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── RegisterService.jsx
│   │   ├── RegisterSuccess.jsx
│   │   ├── ReviewService.jsx
│   │   ├── ServiceDetails.jsx
│   │   └── ValidateEmail.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── prestadorService.js
│   │   ├── servicoService.js
│   │   ├── ticketService.js
│   │   └── userService.js
│   │
│   ├── utils/
│   │   └── errorUtils.js
│   │
│   ├── validationSchemas/
│   │   └── registerServiceSchema.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.js
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Componentes Principais

### 1. **Layout**

- **Header.jsx**: Componente de cabeçalho fixo contendo o título da aplicação e um botão para abrir o menu lateral em dispositivos móveis.
- **Sidebar.jsx**: Componente de barra lateral que se adapta a diferentes tamanhos de tela, utilizando um drawer em dispositivos móveis.
- **SidebarContent.jsx**: Conteúdo interno da barra lateral, incluindo links de navegação e informações do usuário.
- **Layout.jsx**: Estrutura principal da página que incorpora o Header, Sidebar e o conteúdo principal através do `Outlet` do React Router.

### 2. **Autenticação e Contexto**

- **AuthContext.jsx**: Contexto de autenticação que gerencia o estado do usuário, prestador e status de carregamento. Fornece funções de login e logout.

### 3. **Formulários**

- **FormField.jsx**: Componente reutilizável para campos de formulário com suporte a diferentes tipos de entrada, máscaras e validação.
- **DadosBancariosForm.jsx**, **EnderecoForm.jsx**, **PessoaFisicaForm.jsx**, **PessoaJuridicaForm.jsx**, **PrestadorForm.jsx**: Componentes específicos para diferentes seções de formulários relacionados ao cadastro e edição de prestadores.

### 4. **Páginas**

- **Dashboard.jsx**: Página principal após o login, exibindo métricas e serviços recentes.
- **Login.jsx**: Página de autenticação de usuários.
- **Register.jsx**: Página de registro de novos usuários.
- **RegisterSuccess.jsx**: Página de confirmação de registro bem-sucedido.
- **Profile.jsx**: Página para visualizar e editar o perfil do usuário.
- **PerfilPrestador.jsx**: Página para registrar ou atualizar o perfil de prestador.
- **RegisterService.jsx**: Página para registrar novos serviços.
- **ServiceDetails.jsx**: Página para visualizar detalhes de um serviço específico.
- **ReviewService.jsx**: Página para revisar e aprovar ou recusar serviços.

## Gerenciamento de Estado

O gerenciamento de estado é realizado principalmente através do **Context API** do React, especificamente com o `AuthContext`. Este contexto gerencia informações sobre o usuário autenticado, seu perfil de prestador e o estado de carregamento durante a inicialização da aplicação.

### Principais Estados no `AuthContext`:

- `usuario`: Objeto contendo informações do usuário autenticado.
- `prestador`: Objeto contendo informações do prestador associado ao usuário.
- `loading`: Booleano que indica se a autenticação e carregamento dos dados estão em andamento.

## Rotas e Navegação

A navegação entre diferentes páginas é gerenciada pelo **React Router DOM**. As rotas são definidas no componente `App.jsx` utilizando o componente `Routes` e `Route`.

### Principais Rotas:

- `/`: Redireciona para a página de login.
- `/auth/login`: Página de login.
- `/auth/register`: Página de registro de novos usuários.
- `/registro-sucesso`: Página de confirmação de registro.
- `/confirmar-email`: Página para validação de e-mail.
- `/dashboard`: Dashboard principal (rota protegida).
- `/profile`: Perfil do usuário (rota protegida).
- `/perfil-prestador`: Perfil do prestador (rota protegida).
- `/services/register`: Registro de novos serviços (rota protegida).
- `/services/:id`: Detalhes de um serviço específico (rota protegida).
- `/services/:id/review`: Revisão de um serviço específico (rota protegida).

### Rotas Protegidas

O componente `PrivateRoute` é utilizado para proteger rotas que requerem autenticação. Se o usuário não estiver autenticado, será redirecionado para a página de login.

## Formulários e Validação

Os formulários são gerenciados pelo **Formik**, que facilita o gerenciamento de estados e submissões. A **Yup** é utilizada para definir esquemas de validação, garantindo que os dados inseridos pelos usuários atendam aos critérios necessários antes de serem enviados ao backend.

### Exemplos de Formulários:

- **Login**: Valida e-mail e senha.
- **Registro**: Valida nome, e-mail, senha e confirmação de senha.
- **PrestadorForm**: Formulário multi-etapas para registrar ou atualizar o perfil do prestador, incluindo dados pessoais, endereço, dados bancários e informações específicas de pessoa física ou jurídica.
- **RegisterService**: Valida descrição, data e valor do serviço.

## Integração com APIs

A comunicação com o backend é realizada através do **Axios**, configurado no arquivo `api.js`. As requisições são feitas para diferentes endpoints para operações como autenticação, gerenciamento de usuários, prestadores e serviços.

### Configuração do Axios:

- **Base URL**: Definida no arquivo `.env` como `VITE_API_URL`.
- **Interceptadores**:
  - **Request**: Inclui o token de autenticação em todas as requisições, se disponível.
  - **Response**: Trata erros de resposta, especialmente status `401` para redirecionar o usuário para a página de login caso o token seja inválido ou expirado.

### Serviços:

- **authService.js**: Contém funções para registro e login de usuários.
- **prestadorService.js**: Gerencia operações relacionadas a prestadores, como criação, obtenção e atualização.
- **servicoService.js**: Gerencia a criação de serviços.
- **ticketService.js**: Gerencia a obtenção de tickets (serviços) associados a um prestador.
- **userService.js**: Gerencia operações de perfil de usuário.

## Autenticação e Autorização

A autenticação é gerenciada pelo `AuthContext`, que armazena o token JWT no `localStorage` e o inclui em todas as requisições via Axios. As rotas protegidas garantem que apenas usuários autenticados possam acessar determinadas páginas.

### Fluxo de Autenticação:

1. **Login**: Usuário insere e-mail e senha. Após autenticação bem-sucedida, o token e os dados do usuário são armazenados no `localStorage` e no contexto.
2. **Persistência**: Ao carregar a aplicação, o `AuthContext` verifica a existência do token e carrega os dados do usuário e do prestador.
3. **Logout**: Remove o token e os dados do usuário do `localStorage` e do contexto, redirecionando o usuário para a página de login.

## Estilização e Tematização

A aplicação utiliza **Chakra UI** para estilização, proporcionando uma interface consistente e responsiva. O arquivo `theme.js` define o tema personalizado, incluindo cores, fontes e outras customizações.

### Personalizações no `theme.js`:

- **Cores**: Define uma paleta de cores personalizada sob a categoria `brand`.
- **Fontes**: Utiliza a fonte "Roboto" para títulos e corpo de texto.
- **Outras Customizações**: Possibilidade de adicionar componentes e estilos adicionais conforme necessário.

## Tratamento de Erros

Os erros são tratados de forma centralizada através dos interceptadores do Axios e funções auxiliares.

### Estratégias de Tratamento:

- **Interceptadores de Resposta**: Capturam erros HTTP e realizam ações específicas, como logout automático em caso de erro `401`.
- **Função `getErrorMessage`**: Recupera mensagens de erro estruturadas das respostas do backend, facilitando a exibição de mensagens amigáveis ao usuário.
- **Feedback ao Usuário**: Utilização de componentes de feedback do Chakra UI, como `Toast`, `Alert`, e mensagens de erro em formulários.

## Build e Deploy

A aplicação utiliza **Vite** para build e desenvolvimento, oferecendo uma experiência de desenvolvimento rápida e otimizada.

### Scripts Principais no `package.json`:

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Realiza o build de produção.
- `lint`: Executa o ESLint para verificar a qualidade do código.
- `preview`: Previsualiza o build de produção.

## Considerações Finais

O **App-Publisher** é uma aplicação bem estruturada que utiliza práticas modernas de desenvolvimento frontend com React. A integração com diversas bibliotecas facilita o gerenciamento de estado, formulários, validação e estilização, resultando em uma interface de usuário robusta e responsiva. A utilização de Context API para autenticação e roteamento protegido garante a segurança e a personalização da experiência do usuário.

Para futuras melhorias, recomenda-se:

- **Testes Automatizados**: Implementar testes unitários e de integração para garantir a estabilidade do sistema.
- **Otimização de Performance**: Analisar e otimizar pontos críticos de performance, especialmente em aplicações com grande volume de dados.
- **Documentação Adicional**: Ampliar a documentação para incluir detalhes sobre componentes específicos, padrões de codificação e fluxos de trabalho.

---

**Nota:** Esta documentação foi gerada com base nos arquivos fornecidos e pode requerer atualizações conforme o desenvolvimento contínuo do projeto.