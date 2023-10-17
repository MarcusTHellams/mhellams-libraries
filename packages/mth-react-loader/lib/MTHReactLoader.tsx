import * as Portal from '@radix-ui/react-portal';
import { type PortalProps } from '@radix-ui/react-portal';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { useLockBodyScroll, useSize, useToggle } from 'react-use';

export type MTHReactLoaderProps = {
  show: boolean;
  render?: () => React.ReactNode;
} & PortalProps;

export const MTHReactLoader = (
  props: PropsWithChildren<MTHReactLoaderProps>
) => {
  const [portalRef, setPortalRef] = useState<HTMLElement | null>(null);
  const { container, show, children, render, ...rest } = props;

  const [locked, toggle] = useToggle(false);

  useLockBodyScroll(locked);

  const portalStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    inset: 0,
    position: container ? 'absolute' : 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    if (container && show) {
      toggle(true);
    } else {
      toggle(false);
    }
    return () => {
      toggle(false);
    };
  }, [container, show, toggle]);

  return (
    <Portal.Root ref={setPortalRef} style={portalStyle} {...rest}>
      {render ? render() : children}
    </Portal.Root>
  );
};
