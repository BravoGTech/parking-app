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
  Select,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import {
  IRegisterUserData,
  IUserModalProps,
} from "../../../interfaces/UsersContext.interfaces";
import { ConfirmModal } from "./ConfirmModal";

export const DeleteUserModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { data, isFetching } = useContext(UsersContext);
  const [userId, setUserId] = useState<string>();

  const {
    isOpen: isOpenConfirm,
    onOpen,
    onClose: onCloseConfirm,
  } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar Funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Selecione o funcionário</Text>
            <Select onChange={(e) => setUserId(e.target.value)}>
              <option value="default">Selecione o funcionario</option>
              {isFetching ? (
                <Spinner />
              ) : (
                data.map((user: IRegisterUserData) => {
                  return (
                    <option value={user.id} key={user.id}>
                      {user.first_name}
                    </option>
                  );
                })
              )}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onOpen} colorScheme="blue">
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {userId && (
        <ConfirmModal
          onClose={onCloseConfirm}
          isOpen={isOpenConfirm}
          userId={userId}
        />
      )}
    </>
  );
};
