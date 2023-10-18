import { Box, BoxProps, Portal, PortalProps } from '@chakra-ui/react';
import { useElementSize } from '@mantine/hooks';
import { useEffect } from 'react';

export type MThChakraLoaderProps = {
  show: boolean;
  boxProps?: BoxProps;
  render?: () => React.ReactNode;
} & Omit<PortalProps, 'children'>;

export const MThChakraLoader = ({
  show,
  boxProps,
  containerRef,
}: MThChakraLoaderProps) => {
  const { ref, height } = useElementSize();

  return show ? (
    <Portal {...{ containerRef }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position={containerRef?.current ? 'absolute' : 'fixed'}
        inset={0}
        color="white"
        bgColor="black"
        opacity=".5"
        {...boxProps}
      >
        MThChakraLoader
      </Box>
    </Portal>
  ) : null;
};
