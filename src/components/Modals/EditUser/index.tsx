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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import {
  IRegisterUserData,
  IUserModalProps,
} from "../../../interfaces/UsersContext.interfaces";
import { EditUserForm } from "../../Forms/EditUserForm";

export const EditUserModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { data, isFetching } = useContext(UsersContext);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string>("default");

  const handleForm = (id: string) => {
    if (id !== "default") {
      setShowForm(true);
      setUserId(id);
    } else {
      setShowForm(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Funcionário</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDir="column" gap="1rem">
          <Select onChange={(e) => handleForm(e.target.value)}>
            <option value="default">Selecione o funcionário</option>
            {isFetching ? (
              <Spinner />
            ) : (
              data.map((user: IRegisterUserData) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.first_name}
                  </option>
                );
              })
            )}
          </Select>

          {showForm && userId && (
            <>
              <Divider />
              <EditUserForm userId={userId} onClose={onClose} />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
