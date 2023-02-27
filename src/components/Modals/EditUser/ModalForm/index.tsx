import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useConst,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../../../contexts/UsersContext";
import { IUserEditModalProps } from "../../../../interfaces/UsersContext.interfaces";
import { EditUserForm } from "../../../Forms/EditUserForm";

export const ModalForm = ({ userId, isOpen, onClose }: IUserEditModalProps) => {
  const { isFetching, listUser, userData } = useContext(UsersContext);

  useEffect(() => {
    if (userId) {
      listUser(userId);
    }
  }, [userId]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Funcionário</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Selecione o funcionário</Text>
              {userData && (
                <EditUserForm userData={userData} onClose={onClose} />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
