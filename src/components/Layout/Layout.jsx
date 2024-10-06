// src/components/Layout/Layout.jsx
import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Função para fechar o Sidebar ao clicar em um link
  const handleLinkClick = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <Box minH="100vh">
      <Header onOpen={onOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} onLinkClick={handleLinkClick} />
      <Box
        ml={{ base: 0, md: 60 }}
        mt="16" // Espaço para o Header fixo
        p="4"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
