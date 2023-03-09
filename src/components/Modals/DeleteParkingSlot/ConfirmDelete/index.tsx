import {
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { SpotContext } from "../../../../contexts/SpotContext";
import { ISpotEditForm } from "../../../../interfaces/SpotContext.interfaces";

export const ConfirmDelete = ({ number, isOpen, onClose }: ISpotEditForm) => {
  const { isFetching, listSpot, spot, deleteSpot } = useContext(SpotContext);

  useEffect(() => {
    if (number && number !== "default") {
      listSpot(number.toString());
    }
  }, [number]);

  const spotId = spot?.id;
  return (
    <>
      {isFetching && !spot ? (
        <Spinner />
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Deletar Vaga</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Heading size={"sm"}>
                  Deseja apagar essa vaga nº <strong>{spot?.number}?</strong>
                </Heading>
              </VStack>
            </ModalBody>
            <ButtonGroup spacing={5} justifyContent="flex-end" p="1rem">
              <Button colorScheme={"red"}>Cancelar</Button>
              {spot && (
                <Button
                  onClick={() => deleteSpot({ spotId })}
                  colorScheme={"green"}
                >
                  Apagar vaga
                </Button>
              )}
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
