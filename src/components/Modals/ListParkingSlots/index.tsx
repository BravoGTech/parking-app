import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { SpotContext } from "../../../contexts/SpotContext";

import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { SalesContext } from "../../../contexts/SalesContext";
import { ConfirmSale } from "./ConfirmPayment";

export const ListParkingSlotsModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { data, isFetching } = useContext(SpotContext);
  const { checkoutSale, saleData } = useContext(SalesContext);

  const {
    isOpen: isOpenConfirm,
    onClose: onCloseConfirm,
    onOpen: onOpenConfirm,
  } = useDisclosure();

  const handleCheckoutButton = (saleId: string | undefined) => {
    if (saleId) {
      const paymentMethod = "DIN";
      checkoutSale({ saleId, paymentMethod });
      onOpenConfirm();
    }
  };

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Listar de vagas</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowX={"auto"}>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th style={{ textAlign: "center" }}>Nº vaga</Th>
                    <Th style={{ textAlign: "center" }}>Status</Th>
                    <Th style={{ textAlign: "center" }}>Carro</Th>
                    <Th style={{ textAlign: "center" }}>Placa</Th>
                    <Th style={{ textAlign: "center" }}>Entrada</Th>
                    <Th style={{ textAlign: "center" }}>Saída</Th>
                    <Th style={{ textAlign: "center" }}>Valor</Th>
                    <Th style={{ textAlign: "center" }}>Pagamento</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item) => (
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
                          const checkOut = sale.checkoutTime
                            ? new Date(sale.checkoutTime).toLocaleTimeString()
                            : "";

                          const dataPrice = +sale.price;

                          if (!sale.checkoutTime) {
                            return (
                              <>
                                <Td style={{ textAlign: "center" }}>
                                  {sale.carBrand}
                                </Td>
                                <Td style={{ textAlign: "center" }}>
                                  {sale.carPlate}
                                </Td>
                                <Td style={{ textAlign: "center" }}>
                                  {checkIn}
                                </Td>
                                <Td style={{ textAlign: "center" }}>
                                  {checkOut ? checkOut : "-"}
                                </Td>
                                <Td style={{ textAlign: "center" }}>
                                  {dataPrice
                                    ? dataPrice.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })
                                    : "-"}
                                </Td>
                                <Td style={{ textAlign: "center" }}>
                                  {sale.paymentMethod
                                    ? sale.paymentMethod
                                    : "-"}
                                </Td>
                                <Td style={{ textAlign: "center" }}>
                                  {item.isAvaliable ? (
                                    <Button colorScheme={"green"}>
                                      Checkin
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleCheckoutButton(sale?.id)
                                      }
                                      colorScheme={"red"}
                                    >
                                      Checkout
                                    </Button>
                                  )}
                                </Td>
                              </>
                            );
                          }
                        })}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {saleData && (
        <ConfirmSale isOpen={isOpenConfirm} onClose={onCloseConfirm} />
      )}
    </>
  );
};
