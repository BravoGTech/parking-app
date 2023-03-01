import { Flex, Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { PageContainer } from "../../PageContainer";
import { Painel } from "../Painel";
import { PainelsCard } from "../PainelsCard";
import { FaCarAlt } from "react-icons/fa";
import { TbParking } from "react-icons/tb";
import { SpotContext } from "../../../contexts/SpotContext";
import { ISpotData } from "../../../interfaces/SpotContext.interfaces";
import { CreateParkingSlotsModal } from "../../Modals/CreateParkingSlots";
import { EditParkingModal } from "../../Modals/EditParkingSlots";

export const ParkingSlotManagementContent = () => {
  const { data, isFetching, error } = useContext(SpotContext);

  const [freeSlot, setFreeSlot] = useState<ISpotData[]>();

  useEffect(() => {
    const handleOccupation = (data: ISpotData[] | undefined) => {
      const newFilter = data?.filter((elem) => elem.isAvaliable == true);
      setFreeSlot(newFilter);
    };
    handleOccupation(data);
  }, [data]);

  const {
    isOpen: isOpenSlots,
    onOpen: onOpenSlots,
    onClose: onCloseSlots,
  } = useDisclosure();
  const {
    isOpen: isOpenEditSlot,
    onOpen: onOpenEditSlot,
    onClose: onCloseEditSlot,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteSlot,
    onOpen: onOpenDeleteSlot,
    onClose: onCloseDeleteSlot,
  } = useDisclosure();
  const {
    isOpen: isOpenVehiclesList,
    onOpen: onOpenVehiclesList,
    onClose: onCloseVehiclesList,
  } = useDisclosure();

  return (
    <>
      <PageContainer title="Gerenciamento de Vagas">
        <Flex
          gap="2rem"
          wrap={"wrap"}
          align="center"
          p="0.5rem"
          justify={"center"}
        >
          <PainelsCard title="Total Vagas">
            <Heading size={"sm"}>
              {isFetching ? <Spinner /> : data?.length} Vagas
            </Heading>
          </PainelsCard>
          <PainelsCard title="Vagas Disponiveis">
            <Heading size={"sm"}>
              {isFetching && data ? <Spinner /> : freeSlot?.length} Vagas
              Disponiveis
            </Heading>
          </PainelsCard>
        </Flex>

        <Flex
          flexDir={{ base: "row", md: "row" }}
          wrap={{ base: "wrap" }}
          gap="2rem"
          align={"center"}
          justify="center"
        >
          <Painel
            onOpen={onOpenSlots}
            icon={TbParking}
            bgColor="green"
            color="white"
          >
            Criar Vaga
          </Painel>
          <Painel
            onOpen={onOpenEditSlot}
            icon={TbParking}
            bgColor="yellow"
            color="black"
          >
            Editar Vaga
          </Painel>
          <Painel
            onOpen={onOpenVehiclesList}
            icon={TbParking}
            bgColor="red"
            color="white"
          >
            Apagar Vaga
          </Painel>
          <Painel
            onOpen={onOpenVehiclesList}
            icon={FaCarAlt}
            bgColor="blue"
            color="white"
          >
            Visualizar Veiculos
          </Painel>
        </Flex>
      </PageContainer>
      <EditParkingModal isOpen={isOpenEditSlot} onClose={onCloseEditSlot} />
      <CreateParkingSlotsModal onClose={onCloseSlots} isOpen={isOpenSlots} />
    </>
  );
};
