import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type DialogProps = {
  isOpen: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
};

export const Dialog = ({ isOpen, handleClose, handleConfirm }: DialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Do you really want to remove this task?</ModalBody>
        <ModalFooter gap="3">
          <Button data-testId="no" colorScheme="red" onClick={handleClose}>
            No
          </Button>
          <Button data-testId="yes" colorScheme="green" onClick={handleConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
