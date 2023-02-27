import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";

interface editParkingProps extends IUserModalProps {
  setParkingSlot: React.Dispatch<React.SetStateAction<number>>;
}

export const EditPakringSlotsModal = ({
  isOpen,
  onClose,
  setParkingSlot,
}: editParkingProps) => {
  const [newParkingSlots, setNewParkingSlot] = useState(0);

  const handleChange = () => {
    setParkingSlot(newParkingSlots);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar Capacidade Total do Estacionamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Digite a capacidade máxima de vagas</Text>
            <Input onChange={(e) => setNewParkingSlot(+e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleChange} colorScheme="blue">
              Alterar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
