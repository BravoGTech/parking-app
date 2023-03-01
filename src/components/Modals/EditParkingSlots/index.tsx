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
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SpotContext } from "../../../contexts/SpotContext";

import { ISpotData } from "../../../interfaces/SpotContext.interfaces";
import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";
import { EditParkingForm } from "./EditForm";

export const EditParkingModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { data, isFetching } = useContext(SpotContext);

  const { isOpen: FormOpen, onOpen, onClose: formClose } = useDisclosure();

  const [number, setNumber] = useState<string>("default");

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Vaga</ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDir="column" gap="1rem">
              <Select onChange={(e) => setNumber(e.target.value)}>
                <option value="default">Selecione a Vaga</option>
                {isFetching ? (
                  <Spinner />
                ) : (
                  data.map((spot: ISpotData) => {
                    return (
                      <option key={spot.id} value={spot.number}>
                        {spot.number}
                      </option>
                    );
                  })
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={number === "default"}
                onClick={onOpen}
                colorScheme="blue"
              >
                Visualizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <EditParkingForm number={number} isOpen={FormOpen} onClose={formClose} />
    </>
  );
};
