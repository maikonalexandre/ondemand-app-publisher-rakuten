// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#1a365d',
      // Outros tons
    },
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  // Outras customizações
});

export default theme;
