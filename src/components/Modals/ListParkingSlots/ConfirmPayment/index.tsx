import {
  Button,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SpotContext } from "../../../../contexts/SpotContext";
import { IConfirmSaleModal } from "../../../../interfaces/SalesContext.interfaces";

export const ConfirmSale = ({
  isOpen,
  onClose,
  saleData,
}: IConfirmSaleModal) => {
  const { isFetching } = useContext(SpotContext);
  const [payMethod, setPayMethod] = useState("default");
  const [change, setChange] = useState<number>();
  const [payback, setPayBack] = useState<number>();

  const checkIn = new Date(saleData.checkinTime).toLocaleTimeString();

  const checkOut = saleData.checkoutTime
    ? new Date(saleData.checkoutTime).toLocaleTimeString()
    : "";

  const dataPrice = +saleData.price;

  const handleChange = () => {
    if (change) {
      setPayBack(change - dataPrice);
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
            <ModalHeader>Checkout</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3}>
                <Heading size={"lg"}>Resumo</Heading>
                <Text>Entrada: {checkIn}</Text>
                <Text>Saida: {checkOut}</Text>
                <Heading size={"md"}>
                  Preço a pagar:
                  {dataPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Heading>
              </VStack>

              <FormLabel>Metodo de Pagamento</FormLabel>
              <Select onChange={(e) => setPayMethod(e.target.value)}>
                <option value="default">Selecione o metodo de pagamento</option>
                <option value="DIN">Dinheiro</option>
                <option value="PIX">PIX</option>
                <option value="CC">Cartão de Crédito</option>
                <option value="CD">Cartão de Débito</option>
              </Select>

              {payMethod === "DIN" && (
                <>
                  <VStack spacing={3}>
                    <Heading size={"md"}>Dinheiro</Heading>
                    <FormLabel>Valor recebido</FormLabel>
                    <Input
                      type={"number"}
                      placeholder="Digite o valor recebido"
                      onChange={(e) => setChange(+e.target.value)}
                    />
                    <Button isDisabled={!change} onClick={handleChange}>
                      Pagar
                    </Button>
                  </VStack>
                  {payback && (
                    <Heading>
                      Troco:{" "}
                      {payback.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Heading>
                  )}
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
