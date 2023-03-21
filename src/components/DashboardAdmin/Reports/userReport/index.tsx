import {
  Container,
  Divider,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../../../contexts/UsersContext";
import { ISalesData } from "../../../../interfaces/SalesContext.interfaces";
import { BiUser } from "react-icons/bi";

export interface IUserReport {
  id: string;
}

export const UserReport = ({ id }: IUserReport) => {
  const { listUser, userData, isFetching } = useContext(UsersContext);

  useEffect(() => {
    listUser(id);
  }, [id]);

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

    const parkingTimeInHour = Math.ceil(parkingTime / 60 / 60);

    const newPrice = +sale.price;

    return {
      ...sale,
      sale_date: dateFormatted,
      parkingTime: parkingTimeInHour,
      price: newPrice,
    };
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
          <Flex align={"center"} gap="1rem">
            <BiUser size={"30px"} />

            <Heading>
              {userData?.first_name} {userData?.last_name}
            </Heading>
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
                {userData?.sales?.map((sale) => {
                  const newData = dataTreatment(sale);
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
              </Tbody>
            </Table>
          </Flex>
        </Container>
      )}
    </>
  );
};
