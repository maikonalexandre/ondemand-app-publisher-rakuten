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
    const initializeAuth = async () => {
      console.log("Inicializando autenticação...");

      const token = localStorage.getItem("token");
      const usuarioData = localStorage.getItem("usuario");

      if (token && usuarioData) {
        try {
          const parsedUsuario = JSON.parse(usuarioData);
          setUsuario(parsedUsuario);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const prestador = await getPrestadorByUsuarioId(parsedUsuario._id);
          localStorage.setItem("prestador", JSON.stringify(prestador));
          setPrestador(prestador);
        } catch (error) {
          console.error("Erro ao inicializar a autenticação:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Nenhum token encontrado.");
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuario(usuario);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const prestador = await getPrestadorByUsuarioId(usuario._id);
      console.log("Dados do Prestador:", prestador);
      localStorage.setItem("prestador", JSON.stringify(prestador));
      setPrestador(prestador);
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
