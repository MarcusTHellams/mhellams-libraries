import { Box, ChakraProvider } from '@chakra-ui/react';

import { MThChakraLoader } from '../lib/MThChakraLoader';

export const Chakra = () => {
  return (
    <ChakraProvider>
      <Box mt="16" h="56" bgColor="red" w="80%" mx="auto">
        Sup
      </Box>
      <MThChakraLoader show={true} />
    </ChakraProvider>
  );
};
