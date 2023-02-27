import { Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SpotContext } from "../../../contexts/SpotContext";
import { ISpotData } from "../../../interfaces/SpotContext.interfaces";
import { PainelsCard } from "../PainelsCard";

export const OccupationPainel = () => {
  const { data, isFetching, error } = useContext(SpotContext);

  const [newList, setNewList] = useState<ISpotData[]>();

  useEffect(() => {
    const handleOccupation = (data: ISpotData[] | undefined) => {
      const newFilter = data?.filter((elem) => elem.isAvaliable == false);
      setNewList(newFilter);
    };
    handleOccupation(data);
  }, [data]);

  return (
    <PainelsCard title="Ocupação do Estacionamento">
      <Heading size={"md"}>
        {isFetching ? <Spinner /> : newList?.length} veículo(s)
      </Heading>
      {!!error && <p>Carregando...</p>}
    </PainelsCard>
  );
};
