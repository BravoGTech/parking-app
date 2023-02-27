import { Heading, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { ParkingInfoContext } from "../../../contexts/ParkingInfoContext";
import { PainelsCard } from "../PainelsCard";

export const PriceByHour = () => {
  const { data, isFetching, error } = useContext(ParkingInfoContext);
  const numberPriceByHour = +data?.priceByHour;

  return (
    <PainelsCard title="Valor/Hora" to="">
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
  );
};
