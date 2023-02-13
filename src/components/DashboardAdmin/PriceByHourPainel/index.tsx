import { Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { SalesContext } from "../../../contexts/SalesContext";
import { PainelsCard } from "../PainelsCard";

export const PriceByHour = () => {
  const { priceByHour } = useContext(SalesContext);
  return (
    <PainelsCard title="Valor/Hora" to="">
      <Heading>
        {priceByHour.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </Heading>
    </PainelsCard>
  );
};
