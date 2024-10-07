// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f5e6ff',
      100: '#e0b3ff',
      200: '#cc80ff',
      300: '#b84dff',
      400: '#a31aff',
      500: '#8f00e6',
      600: '#7300b3',
      700: '#560080',
      800: '#3a004d',
      900: '#1d001a',
    },
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  // Outras customizações
});

export default theme;