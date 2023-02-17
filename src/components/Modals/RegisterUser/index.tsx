import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";
import { RegisterUserForm } from "../../Forms/RegisterUserForm";

export const RegisterUserModal = ({ isOpen, onClose }: IUserModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Funcionário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterUserForm onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
