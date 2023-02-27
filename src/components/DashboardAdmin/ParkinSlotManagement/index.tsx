import { Flex, Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SalesContext } from "../../../contexts/SalesContext";
import { ISalesData } from "../../../interfaces/SalesContext.interfaces";
import { PageContainer } from "../../PageContainer";
import { Painel } from "../Painel";
import { PainelsCard } from "../PainelsCard";
import { FaCarAlt } from "react-icons/fa";
import { TbParking } from "react-icons/tb";
import { EditPakringSlotsModal } from "../../Modals/EditParkingSlots";

export const ParkingSlotManagementContent = () => {
  const { data, isFetching, error } = useContext(SalesContext);
  const [parkingSlot, setParkingSlot] = useState(0);
  const [usedParkingSlot, setUsedParkingSlot] = useState(0);
  const [newList, setNewList] = useState<ISalesData[] | undefined | null>(null);
  const [color, setColor] = useState("");

  const {
    isOpen: isOpenSlots,
    onOpen: onOpenSlots,
    onClose: onCloseSlots,
  } = useDisclosure();
  const {
    isOpen: isOpenVehiclesList,
    onOpen: onOpenVehiclesList,
    onClose: onCloseVehiclesList,
  } = useDisclosure();

  useEffect(() => {
    const handleParkingSlots = (data: ISalesData[] | []) => {
      const newFilter: ISalesData[] | [] = data?.filter(
        (elem) => elem.end_hour === null
      );
      setNewList(newFilter);
      if (newFilter) {
        setUsedParkingSlot(parkingSlot - newFilter.length);
      }
    };
    handleParkingSlots(data);
    if (newList) {
      handleColors(usedParkingSlot);
    }
  }, [data, color, parkingSlot, usedParkingSlot]);

  const handleColors = (parkingSlots: number) => {
    if (parkingSlots >= 20) {
      setColor("green");
    } else if (parkingSlots >= 10 && parkingSlots <= 20) {
      setColor("yellow");
    } else {
      setColor("red");
    }
  };

  if (!newList) {
    return <Spinner />;
  }

  return (
    <>
      <PageContainer title="Gerenciamento de Vagas">
        <Flex gap="2rem">
          <PainelsCard title="Total Vagas">
            <Heading size={"sm"}>
              {isFetching ? <Spinner /> : parkingSlot} Vagas
            </Heading>
          </PainelsCard>
          <PainelsCard title="Vagas Disponiveis" color={color}>
            <Heading size={"sm"}>
              {isFetching && !newList ? (
                <Spinner />
              ) : (
                parkingSlot - newList.length
              )}{" "}
              Vagas Disponiveis
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
            bgColor="gray"
            color="white"
          >
            Alterar Total de Vagas
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
      <EditPakringSlotsModal
        isOpen={isOpenSlots}
        onClose={onCloseSlots}
        setParkingSlot={setParkingSlot}
      />
    </>
  );
};
