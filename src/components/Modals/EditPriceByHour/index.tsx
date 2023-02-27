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
import { ParkingInfoContext } from "../../../contexts/ParkingInfoContext";
import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";

export const EditPriceModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { updatePrice } = useContext(ParkingInfoContext);
  const [value, setValue] = useState(0);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Valor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Digite o novo valor</Text>
            <Input
              type={"number"}
              onChange={(e) => setValue(+e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => updatePrice({ value, onClose })}
              colorScheme="blue"
            >
              Atualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
