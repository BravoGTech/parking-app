import { useContext, useEffect, useState } from "react";
import { SalesContext } from "../../../contexts/SalesContext";
import { PainelsCard } from "../PainelsCard";
import moment from "moment";
import { ISalesData } from "../../../interfaces/SalesContext.interfaces";
import { Heading, Spinner } from "@chakra-ui/react";

export const BalancePainel = () => {
  const { data, isFetching, error } = useContext(SalesContext);
  const [dailyTotal, setDailyTotal] = useState<Number | null>(0);
  const [weeklyTotal, setWeeklyTotal] = useState<Number | null>(0);
  const [monthlyTotal, setMonthlyTotal] = useState<Number | null>(0);

  const handleOccupation = (data: ISalesData[]) => {
    // Filtre os dados de vendas para remover os pagamentos com valores null
    const filteredData = data?.filter((elem) => elem.price !== null);

    // Inicialize as variáveis para armazenar o total de vendas
    let dailyTotal: number | null = 0;
    let weeklyTotal: number | null = 0;
    let monthlyTotal: number | null = 0;

    // Percorra cada objeto de venda e calcule o total de vendas
    filteredData?.forEach((sale) => {
      // Converte a data de venda para um objeto "moment"
      const saleMoment = moment(sale.end_hour);

      // Adiciona o preço da venda ao total diário, semanal e mensal
      if (dailyTotal !== null && sale.price !== null) {
        dailyTotal += +sale.price;
      }
      if (weeklyTotal !== null && sale.price !== null) {
        weeklyTotal += +sale.price;
      }
      if (monthlyTotal !== null && sale.price !== null) {
        monthlyTotal += +sale.price;
      }

      // Verifica se a data de venda não é de hoje
      if (!saleMoment.isSame(moment(), "day")) {
        // Se não é de hoje, zera o total diário
        dailyTotal = 0;
      }

      // Verifica se a data de venda não é da semana atual
      if (!saleMoment.isSame(moment(), "week")) {
        // Se não é da semana atual, zera o total semanal
        weeklyTotal = 0;
      }

      // Verifica se a data de venda não é do mês atual
      if (!saleMoment.isSame(moment(), "month")) {
        // Se não é do mês atual, zera o total mensal
        monthlyTotal = 0;
      }
    });

    // Armazene os totais de vendas em uma variável ou estado para uso posterior
    setDailyTotal(dailyTotal);
    setWeeklyTotal(weeklyTotal);
    setMonthlyTotal(monthlyTotal);
  };

  useEffect(() => {
    handleOccupation(data);
  }, [data]);

  return (
    <PainelsCard title="Balanço Mensal">
      <Heading size="md">
        {isFetching ? (
          <Spinner />
        ) : (
          `${monthlyTotal?.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}`
        )}
      </Heading>
    </PainelsCard>
  );
};
