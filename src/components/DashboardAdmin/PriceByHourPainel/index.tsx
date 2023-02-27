import { Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { ParkingInfoContext } from "../../../contexts/ParkingInfoContext";
import { EditPriceModal } from "../../Modals/EditPriceByHour";
import { PainelsCard } from "../PainelsCard";

export const PriceByHour = () => {
  const { data, isFetching, error } = useContext(ParkingInfoContext);
  const numberPriceByHour = +data?.priceByHour;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <PainelsCard title="Valor/Hora" onOpen={onOpen}>
        <Heading>
          {isFetching ? (
            <Spinner />
          ) : (
            `${numberPriceByHour.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`
          )}
        </Heading>
      </PainelsCard>
      <EditPriceModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
