import { Container } from '@chakra-ui/react';
import { useState } from 'react';

import { useDeferredPromise } from '../lib';
import { Dialog } from './Dialog';
import List from './List';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { defer, deferRef } = useDeferredPromise<boolean>();

  const allowDelete = async () => {
    setIsDialogOpen(true);
    return defer().promise;
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    deferRef?.resolve(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    deferRef?.resolve(false);
  };
  return (
    <>
      <Container mt="16">
        <List {...{ allowDelete }} />
      </Container>
      <Dialog isOpen={isDialogOpen} {...{ handleConfirm, handleClose }} />
    </>
  );
}

export default App;
