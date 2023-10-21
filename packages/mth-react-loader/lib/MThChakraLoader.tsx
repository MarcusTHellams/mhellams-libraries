import { Box, BoxProps, Portal, PortalProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export type MThChakraLoaderProps = {
  show: boolean;
  boxProps?: BoxProps;
  render?: (args: { parentHeight: number }) => React.ReactNode;
} & Omit<PortalProps, 'children'>;

export const MThChakraLoader = ({
  show,
  boxProps,
  containerRef,
  render,
}: MThChakraLoaderProps) => {
  const [parentHeight, setParentHeight] = useState(0);

  useEffect(() => {
    const container = containerRef?.current;
    const resizeHandler: (ev: UIEvent) => void = () => {
      const height = window.innerHeight;
      setParentHeight(height);
    };
    if (!container) {
      window.addEventListener('resize', resizeHandler);
    }
    return () => {
      if (!container) {
        window.removeEventListener('resize', resizeHandler);
      }
    };
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef?.current;
    let resizeObserver: ResizeObserver;
    let originalPosition = '';
    if (container && show) {
      originalPosition = container.style.position;
      container.style.position = 'relative';
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.contentBoxSize[0];
            setParentHeight(contentBoxSize.blockSize);
          } else {
            setParentHeight(entry.contentRect.height);
          }
        }

        console.log('Size changed');
      });

      resizeObserver.observe(container);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (container) {
        container.style.position = originalPosition;
      }
    };
  }, [containerRef, show]);

  return show ? (
    <Portal {...{ containerRef }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position={containerRef?.current ? 'absolute' : 'fixed'}
        inset={0}
        bgColor="rgba(0, 0, 0, 0.5)"
        {...boxProps}
      >
        {render && render({ parentHeight })}
      </Box>
    </Portal>
  ) : null;
};
