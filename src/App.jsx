// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { AuthContextProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";

// Lazy load das páginas para otimização
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const RegisterSuccess = lazy(() => import("./pages/RegisterSuccess"));
const Profile = lazy(() => import("./pages/Profile"));
const PerfilPrestador = lazy(() => import("./pages/PerfilPrestador"));
const RegisterService = lazy(() => import("./pages/RegisterService"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const ReviewService = lazy(() => import("./pages/ReviewService"));
const ValidateEmail = lazy(() => import("./pages/ValidateEmail"));

function App() {
  return (
    <AuthContextProvider>
      <Suspense fallback={<Spinner size="xl" />}>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/registro-sucesso" element={<RegisterSuccess />} />
          <Route path="/confirmar-email" element={<ValidateEmail />} />

          {/* Rotas Protegidas */}
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/perfil-prestador" element={<PerfilPrestador />} />
              <Route path="/services/register" element={<RegisterService />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/services/:id/review" element={<ReviewService />} />
              {/* Adicione outras rotas protegidas conforme necessário */}
            </Route>
          </Route>

          {/* Rota padrão */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
    </AuthContextProvider>
  );
}

export default App;
