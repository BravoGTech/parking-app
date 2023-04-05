import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../../../contexts/UsersContext";
import { ISalesData } from "../../../../interfaces/SalesContext.interfaces";
import { BiUser } from "react-icons/bi";
import moment from "moment";

export interface IUserReport {
  id: string;
}

export const UserReport = ({ id }: IUserReport) => {
  const { listUser, userData, isFetching } = useContext(UsersContext);

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [filtredList, setFiltredList] = useState<ISalesData[]>();
  const [sum, setSum] = useState<number>();

  let soma = 0;

  useEffect(() => {
    listUser(id);
    cleanFilter();
  }, [id]);

  const handleSum = () => {
    const total = userData?.sales?.reduce(
      (accumlator, sale) => accumlator + +sale.price,
      0
    );

    setSum(total);
  };

  const dataTreatment = (sale: ISalesData) => {
    //Tratamento de data
    const saleDate = new Date(sale.sale_date);

    const day = saleDate.getDate().toString().padStart(2, "0"); // adiciona um zero à esquerda para dias com apenas um dígito

    const month = (saleDate.getMonth() + 1).toString().padStart(2, "0"); // adiciona um zero à esquerda para meses com apenas um dígito

    const year = saleDate.getFullYear().toString();

    const dateFormatted = `${day}/${month}/${year}`;

    //Tratamento da permanencia
    const checkin = new Date(sale.checkinTime);
    let checkout = new Date();

    if (sale.checkoutTime) {
      checkout = new Date(sale.checkoutTime);
    }

    const parkingTime = checkout.getTime() - checkin.getTime();

    const parkingTimeInHour = Math.ceil(parkingTime / (1000 * 60 * 60));

    const newPrice = +sale.price;

    return {
      ...sale,
      sale_date: dateFormatted,
      parkingTime: parkingTimeInHour,
      price: newPrice,
    };
  };

  const filterByDate = () => {
    soma = 0;
    if (!startDate && !endDate) {
      return setError(true);
    }
    setError(false);

    const newStartDate = moment.utc(startDate!).format("L");
    const newEndDate = moment.utc(endDate!).format("L");

    if (newEndDate < newStartDate) {
      setError(true);
    }
    const sales = userData?.sales;

    const filtredSales = sales?.filter((sale) => {
      const saleDate = moment.utc(sale.sale_date).format("L");
      return moment(saleDate).isBetween(
        newStartDate,
        newEndDate,
        undefined,
        "[]"
      );
    });

    setFiltredList(filtredSales);
  };

  const cleanFilter = async () => {
    setError(false);
    setStartDate("");
    setEndDate("");
    setFiltredList(undefined);
    handleSum();
    soma = 0;
  };

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Container
          maxW={"8xl"}
          display="flex"
          flexDirection={"column"}
          gap="2rem"
          mt="1rem"
        >
          <Divider />
          <Flex
            align={{ base: "center", lg: "center" }}
            gap="1.5rem"
            flexDir={{ base: "column" }}
            justify="space-around"
          >
            <Flex gap="1rem">
              <BiUser size={"30px"} />
              <Heading>
                {userData?.first_name} {userData?.last_name}
              </Heading>
            </Flex>
            <Flex
              gap="1rem"
              flexDir={{ base: "column", lg: "row" }}
              align={{ lg: "flex-end" }}
            >
              <Flex gap="1rem" align={"center"}>
                <FormControl isInvalid={!!error} flexDir={"column"}>
                  <FormLabel>Ínicio:</FormLabel>
                  <Input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type={"date"}
                  />
                </FormControl>
                <FormControl flexDir={"column"}>
                  <FormLabel>Final:</FormLabel>
                  <Input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type={"date"}
                  />
                </FormControl>
              </Flex>
              <Button onClick={filterByDate} colorScheme={"blue"}>
                Pesquisar
              </Button>
              <Button onClick={cleanFilter} colorScheme={"red"}>
                Limpar
              </Button>
            </Flex>
            {error && <Text color="red">Datas Incorretas</Text>}
          </Flex>
          <Flex flexDir={"column"} overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th style={{ textAlign: "center" }}>Data</Th>
                  <Th style={{ textAlign: "center" }}>Placa</Th>
                  <Th style={{ textAlign: "center" }}>Nº Vaga</Th>
                  <Th style={{ textAlign: "center" }}>Permanência (hrs)</Th>
                  <Th style={{ textAlign: "center" }}>Valor Pago</Th>
                  <Th style={{ textAlign: "center" }}>Pagamento</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filtredList
                  ? filtredList.map((sale) => {
                      const newData = dataTreatment(sale);

                      soma = +newData.price;
                      return (
                        <Tr key={newData.id}>
                          <Td style={{ textAlign: "center" }}>
                            {newData.sale_date}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData?.carPlate}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData?.parkingSlot.number}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData.parkingTime.toLocaleString("pt-BR", {
                              minimumFractionDigits: 0,
                            })}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData?.price.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Td>

                          <Td style={{ textAlign: "center" }}>
                            {newData?.paymentMethod}
                          </Td>
                        </Tr>
                      );
                    })
                  : userData?.sales?.map((sale) => {
                      const newData = dataTreatment(sale);
                      soma += +sale.price;
                      return (
                        <Tr key={newData.id}>
                          <Td style={{ textAlign: "center" }}>
                            {newData.sale_date}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData?.carPlate}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData?.parkingSlot.number}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData.parkingTime.toLocaleString("pt-BR", {
                              minimumFractionDigits: 0,
                            })}
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {newData?.price.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Td>

                          <Td style={{ textAlign: "center" }}>
                            {newData?.paymentMethod}
                          </Td>
                        </Tr>
                      );
                    })}
                <Tr>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td bg={"gray"}></Td>
                  <Td bg={"gray"}></Td>
                  <Td bg={"gray"}></Td>
                  <Td
                    fontSize={"20px"}
                    style={{ textAlign: "center" }}
                    bg={"gray"}
                    color="white"
                  >
                    TOTAL
                  </Td>
                  <Td
                    fontSize={"20px"}
                    style={{ textAlign: "center" }}
                    bg={"gray"}
                    color="white"
                  >
                    {soma.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Td>
                  <Td bg={"gray"}></Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
        </Container>
      )}
    </>
  );
};
