import { Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SalesContext } from "../../../contexts/SalesContext";
import { ISalesData } from "../../../interfaces/SalesContext.interfaces";
import { api } from "../../../services/api";
import { PainelsCard } from "../PainelsCard";

export const OccupationPainel = () => {
  const { data, isFetching, error } = useContext(SalesContext);
  const [newList, setNewList] = useState<ISalesData[]>();

  useEffect(() => {
    const handleOccupation = (data: ISalesData[] | undefined) => {
      const newFilter = data?.filter((elem) => elem.end_hour === null);
      setNewList(newFilter);
    };
    handleOccupation(data);
  }, [data]);

  return (
    <PainelsCard title="Ocupação do Estacionamento">
      <Heading>{isFetching ? <Spinner /> : newList?.length} veículo(s)</Heading>
      {!!error && <p>Algo errado</p>}
    </PainelsCard>
  );
};
