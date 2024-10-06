// src/components/Layout/Sidebar.jsx
import React, { useRef } from 'react';
import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    useColorModeValue,
    Link,
    VStack,
    Text,
    CloseButton,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const Sidebar = ({ isOpen, onClose, onLinkClick }) => {
    const bg = useColorModeValue('white', 'gray.800');
    const { logout } = useAuth();

    const links = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Dados Cadastrais', path: '/profile' },
        { name: 'Perfil Prestador', path: '/perfil-prestador' },
        { name: 'Registrar Serviço', path: '/services/register' },
        // Adicione outras links conforme necessário
    ];

    // Estado para controlar o AlertDialog
    const [isAlertOpen, setIsAlertOpen] = React.useState(false);
    const onCloseAlert = () => setIsAlertOpen(false);
    const cancelRef = useRef();

    const handleLogout = () => {
        logout();
        onLinkClick();
    };

    const confirmLogout = () => {
        setIsAlertOpen(true);
    };

    const SidebarContent = (
        <Box
            bg={bg}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            shadow="md"
        >
            <VStack align="start" p={4} spacing={4} height="full" justifyContent="space-between">
                <VStack align="start" spacing={4}>
                  <Box display={{ base: 'flex', md: 'none' }} w="full" justifyContent="flex-end">
                    <CloseButton onClick={onClose} />
                  </Box>
                  {links.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? '#3182CE' : 'inherit',
                      })}
                      onClick={onLinkClick}
                    >
                      <Text fontSize="lg">{link.name}</Text>
                    </NavLink>
                  ))}
                  {/* Botão de Logout com confirmação */}
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    leftIcon={<ArrowForwardIcon />}
                    onClick={confirmLogout}
                    width="full"
                    justifyContent="flex-start"
                  >
                    Sair
                  </Button>
                </VStack>

                {/* AlertDialog para confirmação de logout */}
                <AlertDialog
                    isOpen={isAlertOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseAlert}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Confirmar Logout
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Tem certeza de que deseja sair?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onCloseAlert}>
                                    Cancelar
                                </Button>
                                <Button colorScheme="red" onClick={handleLogout} ml={3}>
                                    Sair
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </VStack>
        </Box>
    );

    return (
        <>
            {/* Sidebar para dispositivos maiores */}
            <Box display={{ base: 'none', md: 'block' }}>
                {SidebarContent}
            </Box>

            {/* Drawer para dispositivos móveis */}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerOverlay>
                    <DrawerContent>
                        {SidebarContent}
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default Sidebar;
