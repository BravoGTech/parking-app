import {
  Button,
  Container,
  Flex,
  Input,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { useContext, useEffect, useState } from "react";
import { SpotContext } from "../../../contexts/SpotContext";

import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { SalesContext } from "../../../contexts/SalesContext";
import { ConfirmSale } from "../../../components/Modals/ListParkingSlots/ConfirmPayment";
import { CreateCheckinModal } from "../../Modals/CreateCheckin";

export const ParkingSlotsEmployee = () => {
  const { data, isFetching, refetch } = useContext(SpotContext);
  const { saleData, listSale } = useContext(SalesContext);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const {
    isOpen: isOpenConfirm,
    onClose: onCloseConfirm,
    onOpen: onOpenConfirm,
  } = useDisclosure();
  const {
    isOpen: isOpenCheckin,
    onClose: onCloseCheckin,
    onOpen: onOpenCheckin,
  } = useDisclosure();

  if (!data) {
    return <h1>...carregando</h1>;
  }

  const filteredData = data?.filter((item) =>
    item.sales.some((sale) =>
      sale.carPlate.toLowerCase().includes(input.toLowerCase())
    )
  );

  const handleCheckoutButton = (saleId: string | undefined) => {
    if (saleId) {
      listSale({ saleId });
      setShow(true);
    }
    onOpenConfirm();
  };

  useEffect(() => {
    refetch();
  }, [saleData]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Container
          maxW={"4xl"}
          display="flex"
          flexDirection={"column"}
          gap="1rem"
          mt="1rem"
        >
          <Flex flexDir={{ base: "column", md: "row" }} gap="1rem">
            <Input
              placeholder="Procure a placa"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              colorScheme={"green"}
              leftIcon={<GoPlus />}
              onClick={onOpenCheckin}
            >
              Checkin
            </Button>
          </Flex>
          <Flex flexDir={"column"} overflowX="auto">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th style={{ textAlign: "center" }}>Nº vaga</Th>
                  <Th style={{ textAlign: "center" }}>Status</Th>
                  <Th style={{ textAlign: "center" }}>Carro</Th>
                  <Th style={{ textAlign: "center" }}>Placa</Th>
                  <Th style={{ textAlign: "center" }}>Entrada</Th>
                  <Th style={{ textAlign: "center" }}>Saída</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((item) => (
                  <Tr key={item.id}>
                    <Td style={{ textAlign: "center" }}>{item.number}</Td>
                    <Td style={{ textAlign: "center" }}>
                      {item.isAvaliable ? "Vago" : "Ocupado"}
                    </Td>

                    {!item.isAvaliable &&
                      item.sales.map((sale) => {
                        const checkIn = new Date(
                          sale.checkinTime
                        ).toLocaleTimeString();

                        if (!sale.checkoutTime) {
                          return (
                            <>
                              <Td style={{ textAlign: "center" }}>
                                {sale.carBrand}
                              </Td>
                              <Td style={{ textAlign: "center" }}>
                                {sale.carPlate}
                              </Td>
                              <Td style={{ textAlign: "center" }}>{checkIn}</Td>
                              <Td style={{ textAlign: "center" }}>
                                <Button
                                  onClick={() => handleCheckoutButton(sale.id)}
                                  colorScheme={"red"}
                                >
                                  Checkout
                                </Button>
                              </Td>
                            </>
                          );
                        }
                      })}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Container>
      )}

      {show && <ConfirmSale isOpen={isOpenConfirm} onClose={onCloseConfirm} />}

      <CreateCheckinModal isOpen={isOpenCheckin} onClose={onCloseCheckin} />
    </>
  );
};
