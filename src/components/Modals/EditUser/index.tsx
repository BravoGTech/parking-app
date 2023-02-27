import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import {
  IUserData,
  IUserModalProps,
} from "../../../interfaces/UsersContext.interfaces";

import { ModalForm } from "./ModalForm";

export const EditUserModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { data, listUser, userData } = useContext(UsersContext);

  const { isOpen: FormOpen, onOpen, onClose: formClose } = useDisclosure();

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (userId) {
      listUser(userId);
    }
  }, [userId]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" gap="1rem">
            <Select onChange={(e) => setUserId(e.target.value)}>
              <option value="default">Selecione o funcionário</option>
              {data.map((user: IUserData) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.first_name}
                  </option>
                );
              })}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={userId === "default"}
              onClick={onOpen}
              colorScheme="blue"
            >
              Visualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ModalForm userData={userData} isOpen={FormOpen} onClose={formClose} />
    </>
  );
};
