// src/components/Layout/Header.jsx
import React from 'react';
import {
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = ({ onOpen }) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
    >
      <IconButton
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="Open menu"
        icon={<HamburgerIcon />}
      />
      <Text fontSize="xl" fontWeight="bold" ml={{ base: 0, md: 60 }}>
        App-Publisher
      </Text>
    </Flex>
  );
};

export default Header;
