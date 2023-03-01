import {
  Button,
  ButtonGroup,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SpotContext } from "../../../../contexts/SpotContext";
import {
  ISpotEditForm,
  IUpdateForm,
} from "../../../../interfaces/SpotContext.interfaces";

export const EditParkingForm = ({ number, isOpen, onClose }: ISpotEditForm) => {
  const { isFetching, listSpot, spot, updateSpot } = useContext(SpotContext);
  const [newNumber, setNewNumber] = useState<number>();

  useEffect(() => {
    if (number && number !== "default") {
      listSpot(number.toString());
    }
  }, [number]);

  const data: IUpdateForm = {
    number: newNumber,
    isAvaliable: spot?.isAvaliable,
    spotId: spot?.id,
  };

  return (
    <>
      {isFetching && !spot ? (
        <Spinner />
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Vaga</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Heading size={"sm"}>
                  Numero da Vaga: <strong>{spot?.number}</strong>
                </Heading>
                <Input
                  placeholder="Digite o novo numero"
                  onChange={(e) => setNewNumber(+e.target.value)}
                />
              </VStack>
            </ModalBody>
            <ButtonGroup spacing={5} justifyContent="flex-end" p="1rem">
              <Button colorScheme={"red"}>Cancelar</Button>

              <Button
                onClick={() => updateSpot(data)}
                isDisabled={!newNumber}
                colorScheme={"green"}
              >
                Atualizar vaga
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
