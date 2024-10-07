// src/components/Layout/Sidebar.jsx
import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
  CloseButton,
} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";

const Sidebar = ({ isOpen, onClose, onLinkClick }) => {
  const bg = useColorModeValue("white", "gray.800");

  const handleLinkClick = () => {
    console.log("Link clicado, fechando o Drawer.");
    onLinkClick();
  };

  return (
    <>
      {/* Sidebar para dispositivos maiores */}
      <Box
        display={{ base: "none", md: "block" }}
        pos={{ md: "fixed" }}
        top="0"
        left="0"
        h="full"
        w={{ md: 60 }}
        bg={bg}
        shadow="md"
      >
        <SidebarContent onLinkClick={handleLinkClick} />
      </Box>

      {/* Drawer para dispositivos móveis */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={() => {
          console.log("Overlay clicado, fechando o Drawer.");
          onClose();
        }}
        size="xs" // Ajuste o tamanho conforme necessário
      >
        <DrawerOverlay>
          <DrawerContent>
            {/* Botão de fechar dentro do Drawer */}
            <Box display="flex" justifyContent="flex-end" p={4}>
              <CloseButton onClick={onClose} />
            </Box>
            {/* Conteúdo da Sidebar */}
            <SidebarContent onLinkClick={handleLinkClick} />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
