import React, { createContext, useContext, useState, useEffect } from "react";
import { getPrestadorByUsuarioId } from "../services/prestadorService";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [prestador, setPrestador] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");
    const prestador = localStorage.getItem("prestador");

    if (token && usuario) {
      setUsuario(JSON.parse(usuario));
      setPrestador(JSON.parse(prestador));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoading(false);
    } else {
      console.log("Nenhum token encontrado.");
      setLoading(false);
    }
  }, []);

  const login = async (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuario(usuario);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    try {
      const prestadorData = await getPrestadorByUsuarioId(usuario._id);
      console.log("Dados do Prestador:", prestadorData);
      localStorage.setItem("prestador", JSON.stringify(prestadorData));
      setPrestador(prestadorData);
    } catch (error) {
      console.error("Erro ao buscar dados do Prestador:", error);
      localStorage.removeItem("prestador");
      setPrestador(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("prestador");
    setUsuario(null);
    setPrestador(null);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ login, logout, usuario, prestador, setPrestador, loading }}>
      {children}
    </AuthContext.Provider>
  );
};