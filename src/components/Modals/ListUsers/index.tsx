import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";

export const ListUsersModal = ({ isOpen, onClose }: IUserModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Funcionário</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button colorScheme="blue">Atualizar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
