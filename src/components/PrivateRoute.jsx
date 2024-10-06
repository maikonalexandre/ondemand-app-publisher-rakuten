// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spinner, Box } from "@chakra-ui/react";

const PrivateRoute = () => {
  // console.log("PrivateRoute");
  const { usuario, loading } = useAuth();
  // console.log(usuario);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return usuario ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
