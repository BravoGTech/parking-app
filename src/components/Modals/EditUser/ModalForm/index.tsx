import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { IUserEditModalProps } from "../../../../interfaces/UsersContext.interfaces";
import { EditUserForm } from "../../../Forms/EditUserForm";

export const ModalForm = ({
  userData,
  isOpen,
  onClose,
}: IUserEditModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Selecione o funcionário</Text>
            {userData && <EditUserForm userData={userData} onClose={onClose} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
