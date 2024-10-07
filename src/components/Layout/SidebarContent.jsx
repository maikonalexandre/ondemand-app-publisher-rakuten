// src/components/Layout/SidebarContent.jsx
import React from "react";
import {
  VStack,
  Text,
  Button,
  Avatar,
  HStack,
  Divider,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  AtSignIcon,
  InfoIcon,
  AddIcon,
  StarIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

const SidebarContent = ({ onLinkClick }) => {
  const { usuario, prestador, logout } = useAuth();

  // Definição dos links com ícones do Chakra UI
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <AtSignIcon /> },
    { name: "Dados Cadastrais", path: "/profile", icon: <InfoIcon /> },
    { name: "Perfil Prestador", path: "/perfil-prestador", icon: <StarIcon /> },
    { name: "Registrar Serviço", path: "/services/register", icon: <AddIcon /> },
    // Adicione outras links conforme necessário
  ];

  const handleLogout = () => {
    console.log("Logout clicado.");
    logout();
    onLinkClick();
  };

  return (
    <VStack align="stretch" spacing={4} height="full" justifyContent="space-between">
      <VStack align="stretch" spacing={4}>
        {/* Seção de Informações do Usuário */}
        <HStack spacing={3} mb={6}>
          <Avatar name={usuario?.nome} size="md" />
          <Box>
            <Text fontWeight="bold">{usuario?.nome}</Text>
            {prestador?.nome && (
              <Text fontSize="sm" color="gray.500">
                Prestador: {prestador.nome}
              </Text>
            )}
            {/* Opcional: Exibir o email do usuário */}
            {/* <Text fontSize="sm" color="gray.500">{usuario?.email}</Text> */}
          </Box>
        </HStack>

        {/* Links de Navegação */}
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#3182CE" : "inherit",
            })}
            onClick={() => {
              console.log(`Navegando para ${link.path}`);
              onLinkClick();
            }} // Fecha o Drawer ao clicar
          >
            <Button
              variant="ghost"
              leftIcon={link.icon}
              justifyContent="flex-start"
              width="full"
              _hover={{ bg: "teal.50" }}
              _active={{ bg: "teal.100" }}
            >
              {link.name}
            </Button>
          </NavLink>
        ))}

        {/* Divisor para separar navegação do logout */}
        <Divider />

        {/* Botão de Logout */}
        <Button
          variant="ghost"
          colorScheme="red"
          leftIcon={<ArrowForwardIcon />}
          onClick={handleLogout}
          width="full"
          justifyContent="flex-start"
          _hover={{ bg: "red.50" }}
          _active={{ bg: "red.100" }}
        >
          Sair
        </Button>
      </VStack>
    </VStack>
  );
};

export default SidebarContent;
