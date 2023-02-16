import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { UsersContext } from "../../../../contexts/UsersContext";

import { IDeleteUserProps } from "../../../../interfaces/UsersContext.interfaces";
import { api } from "../../../../services/api";

export const ConfirmModal = ({ userId, onClose, isOpen }: IDeleteUserProps) => {
  const { deleteUser } = useContext(UsersContext);
  const { data, isFetching } = useQuery(["user", userId], async () => {
    const token = localStorage.getItem("@Parking:Token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`users/${userId}/`);
    return response.data;
  });

  const handleClick = (userId: string) => {
    deleteUser({ userId, onClose });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar Funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isFetching ? (
              <Spinner />
            ) : (
              `Deseja Deletar ${data.first_name} ${data.last_name}`
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleClick(data.id)} colorScheme="blue">
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
