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
import { useContext, useState } from "react";
import { SpotContext } from "../../../contexts/SpotContext";

import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";

export const CreateParkingSlotsModal = ({
  isOpen,
  onClose,
}: IUserModalProps) => {
  const { registerSpot } = useContext(SpotContext);
  const [number, setNumber] = useState(0);

  const handleChange = () => {
    registerSpot({ number, onClose });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Vaga</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Digite o numero da vaga</Text>
            <Input
              type={"number"}
              placeholder="Digita o numero de uma vaga"
              onChange={(e) => setNumber(+e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleChange} colorScheme="blue">
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
