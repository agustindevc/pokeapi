'use client';

import { ChakraProvider as ChakraUIProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';

// Exporta ChakraProvider como ChakraProvider
export function ChakraProvider(props) {
  return (
    <ChakraUIProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraUIProvider>
  );
}


